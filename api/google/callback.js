const { exchangeCodeForTokens } = require('../../lib/google-drive-oauth');

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map(part => {
    const index = part.indexOf('=');
    if (index === -1) return ['', ''];
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookies = parseCookies(req.headers.cookie);
  const savedState = cookies.google_oauth_state;

  res.setHeader('set-cookie', 'google_oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');

  if (!code || !state || !savedState || state !== savedState) {
    res.writeHead(302, { location: '/?google=error#resources' });
    return res.end();
  }

  try {
    await exchangeCodeForTokens(code);
    res.writeHead(302, { location: '/?google=connected#resources' });
    return res.end();
  } catch (error) {
    res.writeHead(302, { location: '/?google=error#resources' });
    return res.end();
  }
};
