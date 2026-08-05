const { DRIVE_ROOT_FOLDER_ID, listFolder } = require('../../lib/google-drive-service');

function isSafeDriveId(value) {
  return !value || /^[\w-]+$/.test(value);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const folderId = String(req.query.folderId || DRIVE_ROOT_FOLDER_ID);
  if (!isSafeDriveId(folderId)) return res.status(400).json({ error: 'Invalid folder id.' });

  try {
    const data = await listFolder(folderId);
    res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Drive resource listing failed:', error);
    return res.status(500).json({ error: 'Could not load Drive resources.' });
  }
};
