const { buildAuthUrl } = require('../../lib/google-drive-service');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  try {
    return res.redirect(buildAuthUrl());
  } catch (error) {
    console.error('Google OAuth auth URL failed:', error);
    return res.status(500).send('Google OAuth env vars are missing.');
  }
};
