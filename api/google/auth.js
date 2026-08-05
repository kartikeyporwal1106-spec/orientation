const { buildAuthUrl, createOAuthState } = require('../../lib/google-drive-oauth');

function isProduction(req) {
  return req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const state = createOAuthState();
    const cookie = [
      `google_oauth_state=${state}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=600',
      isProduction(req) ? 'Secure' : ''
    ].filter(Boolean).join('; ');

    res.setHeader('set-cookie', cookie);
    res.writeHead(302, { location: buildAuthUrl(state) });
    return res.end();
  } catch (error) {
    return res.status(500).json({ error: 'Google Drive OAuth is not configured.' });
  }
};
