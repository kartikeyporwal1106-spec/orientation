const crypto = require('crypto');
const { loadLocalEnv } = require('./lib/load-env');
const {
  DRIVE_ROOT_FOLDER_ID,
  ensureDrivePath,
  sanitizeDrivePath,
  uploadBufferToDrive
} = require('./lib/google-drive-service');

loadLocalEnv();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID.');
  process.exit(1);
}

const pendingUploads = new Map();
let telegramOffset = 0;

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
    return 'Google Drive permission issue. Check that the OAuth owner account can edit DRIVE_ROOT_FOLDER_ID.';
  }
  if (/quota|storage/i.test(messageText)) {
    return 'Google Drive quota issue on the owner account. Free storage or choose another Drive folder/account.';
  }
  if (/refresh token|not connected|authorize/i.test(messageText)) return 'Google Drive OAuth issue. Set GOOGLE_REFRESH_TOKEN for the owner account.';
  if (/not found|folder/i.test(messageText)) {
    return 'Google Drive folder issue. Check DRIVE_ROOT_FOLDER_ID and owner account access.';
  }
  return `Upload failed: ${messageText}`;
}

async function approveUpload(callbackQuery, request) {
  await telegram('answerCallbackQuery', { callback_query_id: callbackQuery.id, text: 'Uploading...' });
  try {
    const parentId = await ensureDrivePath(request.destination);
    const buffer = await downloadTelegramFile(request.file.fileId);
    const uploaded = await uploadBufferToDrive({
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
