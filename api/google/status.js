const { getSafeStatus } = require('../../lib/google-drive-oauth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    return res.status(200).json(getSafeStatus());
  } catch (error) {
    return res.status(200).json({
      connected: false,
      email: '',
      accountName: '',
      folderId: '',
      folderName: '',
      scope: '',
      configured: false
    });
  }
};
