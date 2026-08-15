const { getFileMeta, streamFile } = require('../../../lib/google-drive-service');

function isSafeDriveId(value) {
  return /^[\w-]+$/.test(String(value || ''));
}

function safeFilename(name) {
  return String(name || 'download').replace(/[\\/\r\n"]/g, '_');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const fileId = String(req.query.fileId || '');
  if (!isSafeDriveId(fileId)) return res.status(400).json({ error: 'Invalid file id.' });

  try {
    const meta = await getFileMeta(fileId);
    const driveResponse = await streamFile(fileId);
    const body = Buffer.from(await driveResponse.arrayBuffer());
    res.setHeader('content-type', meta.mimeType || driveResponse.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('content-disposition', `attachment; filename="${safeFilename(meta.name)}"`);
    res.setHeader('cache-control', 'private, max-age=60');
    return res.status(200).send(body);
  } catch (error) {
    console.error('Drive resource download failed:', error);
    return res.status(500).json({ error: 'Could not download this file.' });
  }
};
