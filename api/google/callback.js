const { exchangeCodeForTokens } = require('../../lib/google-drive-service');

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  const code = req.query.code;
  if (!code) return res.status(400).send('Missing OAuth code.');

  try {
    const tokens = await exchangeCodeForTokens(String(code));
    res.setHeader('content-type', 'text/html; charset=utf-8');
    return res.status(200).send(`<!doctype html>
      <html>
        <head><title>Google Drive Connected</title></head>
        <body style="font-family: system-ui; max-width: 760px; margin: 40px auto; line-height: 1.5;">
          <h1>Google Drive owner OAuth connected</h1>
          <p>Copy this refresh token into your environment as <strong>GOOGLE_REFRESH_TOKEN</strong>.</p>
          <textarea readonly style="width:100%; min-height:140px;">${escapeHtml(tokens.refreshToken)}</textarea>
          <p>Keep this token private. After adding it to env, restart the bot/server.</p>
        </body>
      </html>`);
  } catch (error) {
    console.error('Google OAuth callback failed:', error);
    return res.status(500).send(error.message || 'Google OAuth callback failed.');
  }
};
