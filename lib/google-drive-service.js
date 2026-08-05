const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const ROOT_FOLDER_ID = process.env.DRIVE_ROOT_FOLDER_ID || '1DTSwGkV4_jniit6tv9svFZba1oa7DuUT';
const TOKEN_PATH = process.env.GOOGLE_TOKEN_FILE || path.join(process.cwd(), '.data', 'google-tokens.json');

let tokenRecord = null;
const listingCache = new Map();
const folderCache = new Map();

function getOAuthConfig({ requireRedirect = false } = {}) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || (requireRedirect && !redirectUri)) {
    throw new Error('Missing Google owner OAuth env vars.');
  }
  return { clientId, clientSecret, redirectUri };
}

function getEncryptionKey() {
  const secret = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY || process.env.GOOGLE_CLIENT_SECRET || '';
  if (secret.length < 24) throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY must be at least 24 characters when using token file storage.');
  return crypto.createHash('sha256').update(secret).digest();
}

function encryptJson(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return {
    version: 1,
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
    data: data.toString('base64')
  };
}

function decryptJson(payload) {
  if (!payload?.data || !payload?.iv || !payload?.tag) return payload;
  const decipher = crypto.createDecipheriv('aes-256-gcm', getEncryptionKey(), Buffer.from(payload.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  const data = Buffer.concat([decipher.update(Buffer.from(payload.data, 'base64')), decipher.final()]);
  return JSON.parse(data.toString('utf8'));
}

function readTokenFile() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  const raw = fs.readFileSync(TOKEN_PATH, 'utf8');
  if (!raw.trim()) return null;
  return decryptJson(JSON.parse(raw));
}

function saveTokenFile(record) {
  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(encryptJson(record), null, 2));
}

function getStoredTokenRecord() {
  if (tokenRecord) return tokenRecord;
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    tokenRecord = { refreshToken: process.env.GOOGLE_REFRESH_TOKEN };
    return tokenRecord;
  }
  tokenRecord = readTokenFile();
  return tokenRecord;
}

function buildAuthUrl(state = crypto.randomBytes(16).toString('hex')) {
  const { clientId, redirectUri } = getOAuthConfig({ requireRedirect: true });
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: DRIVE_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true',
    state
  });
  return `${AUTH_URL}?${params.toString()}`;
}

async function exchangeCodeForTokens(code) {
  const { clientId, clientSecret, redirectUri } = getOAuthConfig({ requireRedirect: true });
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
  if (!data.refresh_token) throw new Error('Google did not return a refresh token. Revoke app access and try again with prompt=consent.');

  tokenRecord = {
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
    scope: data.scope || DRIVE_SCOPE
  };
  saveTokenFile(tokenRecord);
  return tokenRecord;
}

async function refreshAccessToken() {
  const record = getStoredTokenRecord();
  if (!record?.refreshToken) throw new Error('Missing GOOGLE_REFRESH_TOKEN. Authorize owner Google OAuth once.');
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
  tokenRecord = {
    ...record,
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000
  };
  if (!process.env.GOOGLE_REFRESH_TOKEN) saveTokenFile(tokenRecord);
  return tokenRecord.accessToken;
}

async function getAccessToken() {
  const record = getStoredTokenRecord();
  if (record?.accessToken && record.expiresAt && record.expiresAt - 60_000 > Date.now()) return record.accessToken;
  return refreshAccessToken();
}

async function driveRequest(url, options = {}) {
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(options.headers || {})
    }
  });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : null;
  if (!response.ok) throw new Error(data?.error?.message || `Drive request failed: ${response.status}`);
  return data ?? response;
}

function sanitizePathPart(part) {
  const clean = String(part || '').trim().replace(/\s+/g, ' ');
  if (!clean || clean === '.' || clean === '..' || clean.includes('..') || /[\\:*?"<>|]/.test(clean)) {
    throw new Error('Invalid folder path.');
  }
  if (clean.length > 80) throw new Error('Folder name is too long.');
  return clean;
}

function sanitizeDrivePath(rawPath, maxDepth = 8) {
  const text = String(rawPath || '').trim();
  if (!text || text.startsWith('/') || /^[a-zA-Z]:[\\/]/.test(text)) throw new Error('Invalid folder path.');
  const parts = text.split('/').map(sanitizePathPart).filter(Boolean);
  if (!parts.length || parts.length > maxDepth) throw new Error('Invalid folder path.');
  return parts.join('/');
}

function normalizeFolderName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function toPublicResource(file, parentId) {
  const isFolder = file.mimeType === FOLDER_MIME;
  const ext = (file.name || '').split('.').pop()?.toLowerCase() || '';
  const previewable = !isFolder && (
    file.mimeType === 'application/pdf' ||
    file.mimeType?.startsWith('image/') ||
    file.mimeType?.startsWith('text/')
  );
  return {
    id: file.id,
    parentId,
    name: file.name,
    mimeType: file.mimeType,
    type: isFolder ? 'folder' : 'file',
    extension: ext,
    size: file.size ? Number(file.size) : null,
    modifiedTime: file.modifiedTime || '',
    webViewLink: file.webViewLink || '',
    previewable,
    previewUrl: previewable ? `/api/resources/preview/${encodeURIComponent(file.id)}` : '',
    downloadUrl: isFolder ? '' : `/api/resources/download/${encodeURIComponent(file.id)}`
  };
}

async function listFolder(folderId = ROOT_FOLDER_ID) {
  const cacheKey = folderId || ROOT_FOLDER_ID;
  const cached = listingCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const params = new URLSearchParams({
    q: `'${cacheKey}' in parents and trashed=false`,
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink)',
    pageSize: '1000',
    orderBy: 'folder,name'
  });
  const data = await driveRequest(`${DRIVE_API}/files?${params.toString()}`);
  const items = (data.files || [])
    .map(file => toPublicResource(file, cacheKey))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });

  const result = { folderId: cacheKey, rootFolderId: ROOT_FOLDER_ID, items };
  listingCache.set(cacheKey, { data: result, expiresAt: Date.now() + 60_000 });
  return result;
}

async function getFileMeta(fileId) {
  return driveRequest(`${DRIVE_API}/files/${encodeURIComponent(fileId)}?fields=id,name,mimeType,size,modifiedTime,webViewLink`);
}

async function streamFile(fileId) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${DRIVE_API}/files/${encodeURIComponent(fileId)}?alt=media`, {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error(`Drive file stream failed: ${response.status}`);
  return response;
}

async function findOrCreateFolder(name, parentId) {
  const cleanName = sanitizePathPart(name);
  const normalizedName = normalizeFolderName(cleanName);
  const key = `${parentId}/${normalizedName}`;
  if (folderCache.has(key)) return folderCache.get(key);

  const query = [`'${parentId}' in parents`, `mimeType='${FOLDER_MIME}'`, 'trashed=false'].join(' and ');
  const params = new URLSearchParams({
    q: query,
    fields: 'files(id,name)',
    pageSize: '1000',
    orderBy: 'name'
  });
  const search = await driveRequest(`${DRIVE_API}/files?${params.toString()}`);
  const existing = (search.files || []).find(folder => normalizeFolderName(folder.name) === normalizedName);
  if (existing) {
    folderCache.set(key, existing.id);
    return existing.id;
  }

  const folder = await driveRequest(`${DRIVE_API}/files?fields=id,name`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: cleanName, mimeType: FOLDER_MIME, parents: [parentId] })
  });
  folderCache.set(key, folder.id);
  listingCache.clear();
  return folder.id;
}

async function ensureDrivePath(pathText, rootFolderId = ROOT_FOLDER_ID) {
  const parts = sanitizeDrivePath(pathText).split('/');
  let parentId = rootFolderId;
  for (const part of parts) parentId = await findOrCreateFolder(part, parentId);
  return parentId;
}

async function uploadBufferToDrive({ name, buffer, mimeType, parentId }) {
  const boundary = `upsifs-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
  const metadata = JSON.stringify({ name, parents: [parentId] });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\ncontent-type: ${mimeType || 'application/octet-stream'}\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--`)
  ]);
  const uploaded = await driveRequest(`${DRIVE_UPLOAD_API}/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink`, {
    method: 'POST',
    headers: { 'content-type': `multipart/related; boundary=${boundary}` },
    body
  });
  listingCache.clear();
  return uploaded;
}

module.exports = {
  DRIVE_ROOT_FOLDER_ID: ROOT_FOLDER_ID,
  FOLDER_MIME,
  buildAuthUrl,
  exchangeCodeForTokens,
  ensureDrivePath,
  getFileMeta,
  listFolder,
  sanitizeDrivePath,
  streamFile,
  uploadBufferToDrive
};
