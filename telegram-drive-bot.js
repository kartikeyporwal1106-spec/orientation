const crypto = require('crypto');
const fs = require('fs');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const GOOGLE_SERVICE_ACCOUNT_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
const DRIVE_ROOT_FOLDER_ID = process.env.DRIVE_ROOT_FOLDER_ID || '1DTSwGkV4_jniit6tv9svFZba1oa7DuUT';
const TELEGRAM_ALLOWED_CHAT_IDS = (process.env.TELEGRAM_ALLOWED_CHAT_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

if (!TELEGRAM_BOT_TOKEN || (!GOOGLE_SERVICE_ACCOUNT_JSON && !GOOGLE_SERVICE_ACCOUNT_FILE)) {
  console.error('Missing TELEGRAM_BOT_TOKEN or Google service-account credentials.');
  process.exit(1);
}

const serviceAccount = JSON.parse(
  GOOGLE_SERVICE_ACCOUNT_JSON || fs.readFileSync(GOOGLE_SERVICE_ACCOUNT_FILE, 'utf8')
);
const folderCache = new Map();
let telegramOffset = 0;
let googleToken = null;

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (googleToken && googleToken.expiresAt - 60 > now) return googleToken.accessToken;

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${header}.${claim}`)
    .sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claim}.${signature}`
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || data.error || 'Google auth failed');

  googleToken = {
    accessToken: data.access_token,
    expiresAt: now + Number(data.expires_in || 3600)
  };
  return googleToken.accessToken;
}

async function driveRequest(url, options = {}) {
  const accessToken = await getGoogleAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Drive request failed: ${response.status}`);
  return data;
}

async function findOrCreateFolder(name, parentId) {
  const key = `${parentId}/${name}`;
  if (folderCache.has(key)) return folderCache.get(key);

  const query = [
    `name='${name.replace(/'/g, "\\'")}'`,
    `'${parentId}' in parents`,
    "mimeType='application/vnd.google-apps.folder'",
    'trashed=false'
  ].join(' and ');

  const search = await driveRequest(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`
  );
  if (search.files?.[0]) {
    folderCache.set(key, search.files[0].id);
    return search.files[0].id;
  }

  const folder = await driveRequest('https://www.googleapis.com/drive/v3/files?fields=id,name', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    })
  });
  folderCache.set(key, folder.id);
  return folder.id;
}

async function ensureDrivePath(pathText) {
  const parts = pathText
    .split('/')
    .map(part => part.trim())
    .filter(Boolean);
  let parentId = DRIVE_ROOT_FOLDER_ID;
  for (const part of parts) {
    parentId = await findOrCreateFolder(part, parentId);
  }
  return parentId;
}

function parseDestination(message) {
  const text = message.caption || message.text || '';
  const match = text.match(/(?:\/upload|#path)\s+(.+)/i);
  return match ? match[1].trim() : 'Unsorted';
}

function getTelegramFile(message) {
  if (message.document) return {
    fileId: message.document.file_id,
    name: message.document.file_name || `telegram-file-${Date.now()}`
  };
  if (message.photo?.length) {
    const photo = message.photo[message.photo.length - 1];
    return {
      fileId: photo.file_id,
      name: `telegram-photo-${Date.now()}.jpg`
    };
  }
  return null;
}

async function telegram(method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!data.ok) throw new Error(data.description || `Telegram ${method} failed`);
  return data.result;
}

async function downloadTelegramFile(fileId) {
  const file = await telegram('getFile', { file_id: fileId });
  const response = await fetch(`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`);
  if (!response.ok) throw new Error(`Telegram file download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function uploadToDrive({ name, buffer, parentId }) {
  const boundary = `upsifs-${Date.now()}`;
  const metadata = JSON.stringify({ name, parents: [parentId] });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\ncontent-type: application/octet-stream\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--`)
  ]);

  return driveRequest('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: { 'content-type': `multipart/related; boundary=${boundary}` },
    body
  });
}

async function handleMessage(message) {
  const chatId = String(message.chat.id);
  if (TELEGRAM_ALLOWED_CHAT_IDS.length && !TELEGRAM_ALLOWED_CHAT_IDS.includes(chatId)) {
    await telegram('sendMessage', { chat_id: chatId, text: 'This chat is not allowed to upload UPSIFS resources.' });
    return;
  }

  const file = getTelegramFile(message);
  if (!file) {
    await telegram('sendMessage', {
      chat_id: chatId,
      text: "Send a file/photo with caption like:\n/upload BTech-MTech/2025-26/SEM II/Cyber Law/Pragati Ma'am\n\nFor common files use:\n/upload BTech-MTech/2025-26/General"
    });
    return;
  }

  const destination = parseDestination(message);
  await telegram('sendMessage', { chat_id: chatId, text: `Uploading to Resources/${destination}...` });
  const parentId = await ensureDrivePath(destination);
  const buffer = await downloadTelegramFile(file.fileId);
  const uploaded = await uploadToDrive({ name: file.name, buffer, parentId });

  await telegram('sendMessage', {
    chat_id: chatId,
    text: `Uploaded: ${uploaded.name}\n${uploaded.webViewLink}`
  });
}

async function poll() {
  while (true) {
    try {
      const updates = await telegram('getUpdates', {
        offset: telegramOffset,
        timeout: 25,
        allowed_updates: ['message']
      });
      for (const update of updates) {
        telegramOffset = update.update_id + 1;
        if (update.message) await handleMessage(update.message);
      }
    } catch (error) {
      console.error(error);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

if (require.main === module) {
  poll();
}
