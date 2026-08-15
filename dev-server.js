const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const root = __dirname;
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function makeResponse(res) {
  res.status = code => {
    res.statusCode = code;
    return res;
  };
  res.json = payload => {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(payload));
  };
  res.send = payload => {
    if (Buffer.isBuffer(payload)) {
      res.end(payload);
      return;
    }
    res.end(String(payload));
  };
  res.redirect = location => {
    res.statusCode = 302;
    res.setHeader('location', location);
    res.end();
  };
  return res;
}

function serveStatic(req, res, pathname) {
  const filePath = path.normalize(path.join(root, pathname === '/' ? 'index.html' : pathname));
  if (!filePath.startsWith(root)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, body) => {
    if (error) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    res.setHeader('content-type', mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
    res.end(body);
  });
}

function routeApi(req, res, url) {
  req.query = Object.fromEntries(url.searchParams.entries());
  const pathname = url.pathname;

  if (pathname === '/api/access/verify') return require('./api/access/verify')(req, res);
  if (pathname === '/api/resources/list') return require('./api/resources/list')(req, res);
  if (pathname === '/api/google/auth') return require('./api/google/auth')(req, res);
  if (pathname === '/api/google/callback') return require('./api/google/callback')(req, res);

  const previewMatch = pathname.match(/^\/api\/resources\/preview\/([^/]+)$/);
  if (previewMatch) {
    req.query.fileId = decodeURIComponent(previewMatch[1]);
    return require('./api/resources/preview/[fileId]')(req, res);
  }

  const downloadMatch = pathname.match(/^\/api\/resources\/download\/([^/]+)$/);
  if (downloadMatch) {
    req.query.fileId = decodeURIComponent(downloadMatch[1]);
    return require('./api/resources/download/[fileId]')(req, res);
  }

  res.status(404).json({ error: 'API route not found.' });
}

http.createServer((req, rawRes) => {
  const res = makeResponse(rawRes);
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname.startsWith('/api/')) {
    Promise.resolve(routeApi(req, res, url)).catch(error => {
      console.error(error);
      if (!res.headersSent) res.status(500).json({ error: 'Internal server error.' });
    });
    return;
  }

  serveStatic(req, res, decodeURIComponent(url.pathname));
}).listen(port, () => {
  console.log(`UPSIFS local server running at http://localhost:${port}`);
});
