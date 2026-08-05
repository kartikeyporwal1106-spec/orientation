const { revokeGoogleAccess } = require('../../lib/google-drive-oauth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    await revokeGoogleAccess();
    return res.status(200).json({ connected: false });
  } catch (error) {
    return res.status(500).json({ error: 'Could not disconnect Google Drive.' });
  }
};
