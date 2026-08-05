const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const REVOKE_URL = 'https://oauth2.googleapis.com/revoke';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';
const TOKEN_PATH = process.env.GOOGLE_TOKEN_FILE || path.join(process.cwd(), '.data', 'google-tokens.json');

function getOAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.DRIVE_ROOT_FOLDER_ID || '';
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth env vars are missing.');
  }
  return { clientId, clientSecret, redirectUri, folderId };
}

function getEncryptionKey() {
  const secret = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;
  if (!secret || secret.length < 24) {
    throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY must be set to at least 24 characters.');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

function encryptJson(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(value), 'utf8'),
    cipher.final()
  ]);
  return {
    version: 1,
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
    data: ciphertext.toString('base64')
  };
}

function decryptJson(payload) {
  if (!payload?.data || !payload?.iv || !payload?.tag) return payload;
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    getEncryptionKey(),
    Buffer.from(payload.iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.data, 'base64')),
    decipher.final()
  ]);
  return JSON.parse(plaintext.toString('utf8'));
}

function safeReadTokenRecord() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  const raw = fs.readFileSync(TOKEN_PATH, 'utf8');
  if (!raw.trim()) return null;
  return decryptJson(JSON.parse(raw));
}

function saveTokenRecord(record) {
  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(encryptJson(record), null, 2));
}

function deleteTokenRecord() {
  if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH);
}

function createOAuthState() {
  return crypto.randomBytes(24).toString('hex');
}

function buildAuthUrl(state) {
  const { clientId, redirectUri } = getOAuthConfig();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: DRIVE_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    state,
    include_granted_scopes: 'true'
  });
  return `${AUTH_URL}?${params.toString()}`;
}

async function exchangeCodeForTokens(code) {
  const { clientId, clientSecret, redirectUri, folderId } = getOAuthConfig();
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.error || 'Google token exchange failed.');
  if (!data.refresh_token) {
    throw new Error('Google did not return a refresh token. Reconnect with consent or revoke old app access first.');
  }

  const accessToken = data.access_token;
  const about = await driveFetch('/about?fields=user(displayName,emailAddress)', { accessToken });
  const folder = folderId ? await getFolderInfo(folderId, accessToken).catch(() => null) : null;
  const expiresAt = Date.now() + Number(data.expires_in || 3600) * 1000;

  const record = {
    refreshToken: data.refresh_token,
    accessToken,
    expiresAt,
    scope: data.scope || DRIVE_SCOPE,
    googleEmail: about.user?.emailAddress || '',
    googleName: about.user?.displayName || '',
    folderId,
    folderName: folder?.name || ''
  };
  saveTokenRecord(record);
  return record;
}

async function refreshAccessToken(record = safeReadTokenRecord()) {
  if (!record?.refreshToken) throw new Error('Google Drive is not connected.');
  const { clientId, clientSecret } = getOAuthConfig();
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: record.refreshToken,
      grant_type: 'refresh_token'
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.error || 'Google token refresh failed.');
  const next = {
    ...record,
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000
  };
  saveTokenRecord(next);
  return next;
}

async function getValidTokenRecord() {
  const record = safeReadTokenRecord();
  if (!record?.refreshToken) throw new Error('Google Drive is not connected.');
  if (record.accessToken && record.expiresAt && record.expiresAt - 60_000 > Date.now()) return record;
  return refreshAccessToken(record);
}

async function driveFetch(pathname, options = {}) {
  const accessToken = options.accessToken || (await getValidTokenRecord()).accessToken;
  const response = await fetch(`${DRIVE_API}${pathname}`, {
    method: options.method || 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(options.headers || {})
    },
    body: options.body
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `Google Drive request failed (${response.status}).`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function getFolderInfo(folderId, accessToken) {
  return driveFetch(`/files/${encodeURIComponent(folderId)}?fields=id,name,mimeType,webViewLink`, { accessToken });
}

async function listDriveFolders() {
  return driveFetch(`/files?q=${encodeURIComponent("mimeType='application/vnd.google-apps.folder' and trashed=false")}&fields=files(id,name,webViewLink)&pageSize=100&orderBy=name`);
}

async function findOrCreateFolder(name, parentId, folderCache = new Map()) {
  const key = `${parentId}/${name}`;
  if (folderCache.has(key)) return folderCache.get(key);
  const escapedName = name.replace(/'/g, "\\'");
  const query = [
    `name='${escapedName}'`,
    `'${parentId}' in parents`,
    "mimeType='application/vnd.google-apps.folder'",
    'trashed=false'
  ].join(' and ');
  const search = await driveFetch(`/files?q=${encodeURIComponent(query)}&fields=files(id,name)`);
  if (search.files?.[0]) {
    folderCache.set(key, search.files[0].id);
    return search.files[0].id;
  }
  const folder = await driveFetch('/files?fields=id,name', {
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

async function ensureDrivePath(pathText, rootFolderId, folderCache) {
  if (!rootFolderId) throw new Error('Google Drive destination folder is not configured.');
  const parts = pathText.split('/').map(part => part.trim()).filter(Boolean);
  let parentId = rootFolderId;
  for (const part of parts) {
    parentId = await findOrCreateFolder(part, parentId, folderCache);
  }
  return parentId;
}

async function uploadBufferToDrive({ name, buffer, mimeType = 'application/octet-stream', parentId }) {
  if (!parentId) throw new Error('Google Drive destination folder is not configured.');
  const accessToken = (await getValidTokenRecord()).accessToken;
  const boundary = `upsifs-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
  const metadata = JSON.stringify({ name, parents: [parentId] });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\ncontent-type: ${mimeType}\r\n\r\n`),
    Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer),
    Buffer.from(`\r\n--${boundary}--`)
  ]);
  const response = await fetch(`${DRIVE_UPLOAD_API}/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': `multipart/related; boundary=${boundary}`
    },
    body
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `Google Drive upload failed (${response.status}).`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function revokeGoogleAccess() {
  const record = safeReadTokenRecord();
  if (record?.refreshToken) {
    await fetch(REVOKE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token: record.refreshToken })
    }).catch(() => null);
  }
  deleteTokenRecord();
}

function getSafeStatus() {
  const record = safeReadTokenRecord();
  return {
    connected: Boolean(record?.refreshToken),
    email: record?.googleEmail || '',
    accountName: record?.googleName || '',
    folderId: record?.folderId || getOAuthConfig().folderId || '',
    folderName: record?.folderName || '',
    scope: record?.scope || ''
  };
}

function createGoogleDriveClient() {
  return {
    get status() {
      return getSafeStatus();
    },
    about: {
      get: () => driveFetch('/about?fields=user(displayName,emailAddress),storageQuota')
    },
    folders: {
      list: listDriveFolders,
      get: getFolderInfo,
      ensurePath: ensureDrivePath
    },
    files: {
      create: uploadBufferToDrive
    }
  };
}

module.exports = {
  DRIVE_SCOPE,
  buildAuthUrl,
  createGoogleDriveClient,
  createOAuthState,
  deleteTokenRecord,
  exchangeCodeForTokens,
  getOAuthConfig,
  getSafeStatus,
  getValidTokenRecord,
  revokeGoogleAccess,
  saveTokenRecord,
  uploadBufferToDrive
};
