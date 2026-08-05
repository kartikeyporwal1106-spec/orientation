const crypto = require('crypto');
const fs = require('fs');
const { loadLocalEnv } = require('./lib/load-env');

loadLocalEnv();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;
const DRIVE_ROOT_FOLDER_ID = process.env.DRIVE_ROOT_FOLDER_ID || '1DTSwGkV4_jniit6tv9svFZba1oa7DuUT';
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const GOOGLE_SERVICE_ACCOUNT_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
const MAX_FOLDER_DEPTH = Number(process.env.DRIVE_MAX_FOLDER_DEPTH || 8);
const MAX_FOLDER_PART_LENGTH = Number(process.env.DRIVE_MAX_FOLDER_PART_LENGTH || 80);

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID.');
  process.exit(1);
}

if (!GOOGLE_SERVICE_ACCOUNT_JSON && !GOOGLE_SERVICE_ACCOUNT_FILE) {
  console.error('Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE.');
  process.exit(1);
}

const serviceAccount = JSON.parse(
  GOOGLE_SERVICE_ACCOUNT_JSON || fs.readFileSync(GOOGLE_SERVICE_ACCOUNT_FILE, 'utf8')
);
const pendingUploads = new Map();
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
  const data = await response.json().catch(() => ({}));
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

function sanitizeDrivePath(rawPath) {
  const pathText = String(rawPath || '').trim();
  if (!pathText) throw new Error('Caption must contain a folder path, like Physics/Waves/Sound Waves.');
  if (pathText.startsWith('/') || /^[a-zA-Z]:[\\/]/.test(pathText)) {
    throw new Error('Folder path must be relative, not absolute.');
  }
  const parts = pathText
    .split('/')
    .map(part => part.trim())
    .filter(Boolean);
  if (!parts.length) throw new Error('Folder path is empty.');
  if (parts.length > MAX_FOLDER_DEPTH) throw new Error(`Folder path can have at most ${MAX_FOLDER_DEPTH} levels.`);
  for (const part of parts) {
    if (part === '.' || part === '..' || part.includes('..')) {
      throw new Error('Folder path cannot contain path traversal.');
    }
    if (/[\\:*?"<>|]/.test(part)) {
      throw new Error('Folder names cannot contain \\ : * ? " < > | characters.');
    }
    if (part.length > MAX_FOLDER_PART_LENGTH) {
      throw new Error(`Each folder name must be ${MAX_FOLDER_PART_LENGTH} characters or less.`);
    }
  }
  return parts.join('/');
}

function parseDestination(message) {
  const text = (message.caption || message.text || '').trim();
  const match = text.match(/^(?:\/upload|#path)\s+(.+)/i);
  return sanitizeDrivePath(match ? match[1] : text);
}

function getTelegramFile(message) {
  if (message.document) return {
    fileId: message.document.file_id,
    name: message.document.file_name || `telegram-file-${Date.now()}`,
    mimeType: message.document.mime_type || 'application/octet-stream'
  };
  if (message.photo?.length) {
    const photo = message.photo[message.photo.length - 1];
    return {
      fileId: photo.file_id,
      name: `telegram-photo-${Date.now()}.jpg`,
      mimeType: 'image/jpeg'
    };
  }
  return null;
}

function getSenderLabel(message) {
  const user = message.from || {};
  if (user.username) return `@${user.username}`;
  return [user.first_name, user.last_name].filter(Boolean).join(' ') || String(message.chat.id);
}

async function telegram(method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!data.ok) throw new Error(data.description || `Telegram ${method} failed`);
  return data.result;
}

async function downloadTelegramFile(fileId) {
  const file = await telegram('getFile', { file_id: fileId });
  const response = await fetch(`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`);
  if (!response.ok) throw new Error(`Telegram file download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
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
  const parts = sanitizeDrivePath(pathText).split('/');
  let parentId = DRIVE_ROOT_FOLDER_ID;
  for (const part of parts) {
    parentId = await findOrCreateFolder(part, parentId);
  }
  return parentId;
}

async function uploadToDrive({ name, buffer, mimeType, parentId }) {
  const boundary = `upsifs-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
  const metadata = JSON.stringify({ name, parents: [parentId] });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\ncontent-type: ${mimeType || 'application/octet-stream'}\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--`)
  ]);

  return driveRequest('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink', {
    method: 'POST',
    headers: { 'content-type': `multipart/related; boundary=${boundary}` },
    body
  });
}

function buildApprovalKeyboard(requestId) {
  return {
    inline_keyboard: [[
      { text: 'Approve', callback_data: `approve:${requestId}` },
      { text: 'Reject', callback_data: `reject:${requestId}` }
    ]]
  };
}

async function handleMessage(message) {
  const chatId = String(message.chat.id);
  const file = getTelegramFile(message);
  if (!file) {
    await telegram('sendMessage', {
      chat_id: chatId,
      text: 'Send a file/photo with caption as folder path:\nPhysics/Waves/Sound Waves\n\nOptional:\n/upload Chemistry/Organic/Alcohol and Ether'
    });
    return;
  }

  let destination;
  try {
    destination = parseDestination(message);
  } catch (error) {
    await telegram('sendMessage', { chat_id: chatId, text: `Invalid destination: ${error.message}` });
    return;
  }

  const requestId = crypto.randomBytes(8).toString('hex');
  const request = {
    id: requestId,
    file,
    destination,
    chatId,
    messageId: message.message_id,
    from: getSenderLabel(message),
    createdAt: Date.now()
  };
  pendingUploads.set(requestId, request);

  await telegram('sendMessage', {
    chat_id: chatId,
    text: `Upload request sent for approval.\n\nFile: ${file.name}\nDestination: ${destination}`
  });

  await telegram('sendMessage', {
    chat_id: TELEGRAM_ADMIN_CHAT_ID,
    text: [
      'New upload request',
      '',
      `File: ${file.name}`,
      `From: ${request.from}`,
      `Destination: ${destination}`,
      '',
      `Request ID: ${requestId}`
    ].join('\n'),
    reply_markup: buildApprovalKeyboard(requestId)
  });
}

function friendlyDriveError(error) {
  const messageText = String(error.message || '');
  if (/permission|forbidden|insufficient/i.test(messageText)) {
    return 'Google Drive permission issue. Share the root folder with the service-account email as Editor.';
  }
  if (/quota|storage/i.test(messageText)) {
    return 'Google Drive quota issue. Use a Shared Drive or owner OAuth if service-account quota blocks this folder.';
  }
  if (/not found|folder/i.test(messageText)) {
    return 'Google Drive folder issue. Check DRIVE_ROOT_FOLDER_ID and service-account access.';
  }
  return `Upload failed: ${messageText}`;
}

async function approveUpload(callbackQuery, request) {
  await telegram('answerCallbackQuery', { callback_query_id: callbackQuery.id, text: 'Uploading...' });
  try {
    const parentId = await ensureDrivePath(request.destination);
    const buffer = await downloadTelegramFile(request.file.fileId);
    const uploaded = await uploadToDrive({
      name: request.file.name,
      buffer,
      mimeType: request.file.mimeType,
      parentId
    });
    pendingUploads.delete(request.id);
    const finalPath = `Academic Resources/${request.destination}/${uploaded.name}`;

    await telegram('sendMessage', {
      chat_id: request.chatId,
      text: `Approved and uploaded successfully.\n\nPath:\n${finalPath}\n\n${uploaded.webViewLink}`
    });
    await telegram('editMessageText', {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      text: `Approved and uploaded successfully.\n\nFile: ${uploaded.name}\nFrom: ${request.from}\nPath: ${finalPath}\n${uploaded.webViewLink}`
    });
  } catch (error) {
    await telegram('sendMessage', {
      chat_id: TELEGRAM_ADMIN_CHAT_ID,
      text: friendlyDriveError(error)
    });
  }
}

async function rejectUpload(callbackQuery, request) {
  pendingUploads.delete(request.id);
  await telegram('answerCallbackQuery', { callback_query_id: callbackQuery.id, text: 'Rejected.' });
  await telegram('sendMessage', {
    chat_id: request.chatId,
    text: `Your upload request was rejected.\n\nFile: ${request.file.name}\nDestination: ${request.destination}`
  });
  await telegram('editMessageText', {
    chat_id: callbackQuery.message.chat.id,
    message_id: callbackQuery.message.message_id,
    text: `Rejected upload request.\n\nFile: ${request.file.name}\nFrom: ${request.from}\nDestination: ${request.destination}`
  });
}

async function handleCallbackQuery(callbackQuery) {
  const adminChatId = String(callbackQuery.message?.chat?.id || callbackQuery.from?.id || '');
  if (adminChatId !== String(TELEGRAM_ADMIN_CHAT_ID)) {
    await telegram('answerCallbackQuery', {
      callback_query_id: callbackQuery.id,
      text: 'Only admin can approve uploads.',
      show_alert: true
    });
    return;
  }

  const [action, requestId] = String(callbackQuery.data || '').split(':');
  const request = pendingUploads.get(requestId);
  if (!request) {
    await telegram('answerCallbackQuery', {
      callback_query_id: callbackQuery.id,
      text: 'Request expired or already handled.',
      show_alert: true
    });
    return;
  }

  if (action === 'approve') {
    await approveUpload(callbackQuery, request);
    return;
  }
  if (action === 'reject') {
    await rejectUpload(callbackQuery, request);
  }
}

async function poll() {
  while (true) {
    try {
      const updates = await telegram('getUpdates', {
        offset: telegramOffset,
        timeout: 25,
        allowed_updates: ['message', 'callback_query']
      });
      for (const update of updates) {
        telegramOffset = update.update_id + 1;
        if (update.message) await handleMessage(update.message);
        if (update.callback_query) await handleCallbackQuery(update.callback_query);
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
