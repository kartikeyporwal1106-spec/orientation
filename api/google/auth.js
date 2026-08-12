const { buildAuthUrl } = require('../../lib/google-drive-service');

function isOAuthSetupAllowed() {
  return process.env.ALLOW_GOOGLE_OAUTH_SETUP === 'true' || process.env.NODE_ENV !== 'production';
}

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  if (!isOAuthSetupAllowed()) {
    return res.status(404).send('Not found');
  }

  try {
    return res.redirect(buildAuthUrl());
  } catch (error) {
    console.error('Google OAuth auth URL failed:', error);
    return res.status(500).send('Google OAuth env vars are missing.');
  }
};
