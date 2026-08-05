const {
  createGoogleDriveClient,
  getOAuthConfig,
  uploadBufferToDrive
} = require('./lib/google-drive-oauth');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DRIVE_ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.DRIVE_ROOT_FOLDER_ID || '';
const TELEGRAM_ALLOWED_CHAT_IDS = (process.env.TELEGRAM_ALLOWED_CHAT_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Missing TELEGRAM_BOT_TOKEN.');
  process.exit(1);
}

try {
  getOAuthConfig();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const drive = createGoogleDriveClient();
const folderCache = new Map();
let telegramOffset = 0;

async function ensureDrivePath(pathText) {
  return drive.folders.ensurePath(pathText, DRIVE_ROOT_FOLDER_ID, folderCache);
}

function parseDestination(message) {
  const text = message.caption || message.text || '';
  const match = text.match(/(?:\/upload|#path)\s+(.+)/i);
  return match ? match[1].trim() : 'Unsorted';
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

  let driveConnected = false;
  try {
    driveConnected = drive.status.connected;
  } catch {
    driveConnected = false;
  }

  if (!driveConnected) {
    await telegram('sendMessage', {
      chat_id: chatId,
      text: 'Google Drive is not connected yet. Open the website resources page and connect Google Drive first.'
    });
    return;
  }

  if (!DRIVE_ROOT_FOLDER_ID) {
    await telegram('sendMessage', {
      chat_id: chatId,
      text: 'Google Drive folder is not configured. Set GOOGLE_DRIVE_FOLDER_ID and restart the bot.'
    });
    return;
  }

  const destination = parseDestination(message);
  await telegram('sendMessage', { chat_id: chatId, text: `Uploading to Resources/${destination}...` });
  let uploaded;
  try {
    const parentId = await ensureDrivePath(destination);
    const buffer = await downloadTelegramFile(file.fileId);
    uploaded = await uploadBufferToDrive({ name: file.name, buffer, mimeType: file.mimeType, parentId });
  } catch (error) {
    const messageText = String(error.message || '');
    const friendly = /not connected|invalid_grant/i.test(messageText)
      ? 'Google Drive access expired or was disconnected. Reconnect Google Drive from the website.'
      : /permission|forbidden|insufficient/i.test(messageText)
        ? 'Google Drive permission issue. Make sure the connected account can edit the selected folder.'
        : /not found|folder/i.test(messageText)
          ? 'Google Drive folder issue. Check GOOGLE_DRIVE_FOLDER_ID and folder access.'
          : /quota|storage/i.test(messageText)
            ? 'Google Drive quota issue on the connected Google account.'
            : `Upload failed: ${messageText}`;
    await telegram('sendMessage', { chat_id: chatId, text: friendly });
    return;
  }

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
