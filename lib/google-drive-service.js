const crypto = require('crypto');
const fs = require('fs');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const ROOT_FOLDER_ID = process.env.DRIVE_ROOT_FOLDER_ID || '1DTSwGkV4_jniit6tv9svFZba1oa7DuUT';

let serviceAccount = null;
let googleToken = null;
const listingCache = new Map();
const folderCache = new Map();

function getServiceAccount() {
  if (serviceAccount) return serviceAccount;
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
  if (!json && !file) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE.');
  serviceAccount = JSON.parse(json || fs.readFileSync(file, 'utf8'));
  return serviceAccount;
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken() {
  const account = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  if (googleToken && googleToken.expiresAt - 60 > now) return googleToken.accessToken;

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: account.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${header}.${claim}`)
    .sign(account.private_key, 'base64')
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
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : null;
  if (!response.ok) throw new Error(data?.error?.message || `Drive request failed: ${response.status}`);
  return data ?? response;
}

function sanitizePathPart(part) {
  const clean = String(part || '').trim();
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

function toPublicResource(file, parentId) {
  const isFolder = file.mimeType === FOLDER_MIME;
  const ext = (file.name || '').split('.').pop()?.toLowerCase() || '';
  const previewable = isFolder ? false : (
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

  const query = `'${cacheKey}' in parents and trashed=false`;
  const params = new URLSearchParams({
    q: query,
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
  const accessToken = await getGoogleAccessToken();
  const response = await fetch(`${DRIVE_API}/files/${encodeURIComponent(fileId)}?alt=media`, {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error(`Drive file stream failed: ${response.status}`);
  return response;
}

async function findOrCreateFolder(name, parentId) {
  const cleanName = sanitizePathPart(name);
  const key = `${parentId}/${cleanName}`;
  if (folderCache.has(key)) return folderCache.get(key);
  const query = [
    `name='${cleanName.replace(/'/g, "\\'")}'`,
    `'${parentId}' in parents`,
    `mimeType='${FOLDER_MIME}'`,
    'trashed=false'
  ].join(' and ');
  const params = new URLSearchParams({ q: query, fields: 'files(id,name)' });
  const search = await driveRequest(`${DRIVE_API}/files?${params.toString()}`);
  if (search.files?.[0]) {
    folderCache.set(key, search.files[0].id);
    return search.files[0].id;
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
  ensureDrivePath,
  getFileMeta,
  listFolder,
  sanitizeDrivePath,
  streamFile,
  uploadBufferToDrive
};
