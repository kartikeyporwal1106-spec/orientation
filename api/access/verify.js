function parseCodes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map(code => code.trim().toLowerCase())
      .filter(Boolean)
  );
}

function isEnrollmentNumber(value) {
  return /^\d{6,}$/.test(String(value || '').trim());
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

module.exports = function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  let body = '';
  request.on('data', chunk => {
    body += chunk;
    if (body.length > 4096) request.destroy();
  });

  request.on('end', () => {
    let payload;
    try {
      payload = JSON.parse(body || '{}');
    } catch {
      sendJson(response, 400, { ok: false, error: 'Invalid JSON' });
      return;
    }

    const kind = String(payload.kind || '').trim().toLowerCase();
    const code = String(payload.code || '').trim();
    const normalizedCode = code.toLowerCase();

    if (!kind || !normalizedCode) {
      sendJson(response, 400, { ok: false, error: 'Missing access data' });
      return;
    }

    const juniorCodes = parseCodes(process.env.JUNIOR_ACCESS_CODES);
    const wifiCodes = parseCodes(process.env.WIFI_ACCESS_CODES);
    const sharedCodes = parseCodes(process.env.SHARED_ACCESS_CODES);
    const codeAllowedForJunior = juniorCodes.has(normalizedCode) || sharedCodes.has(normalizedCode);
    const allowEnrollmentForWifi = process.env.WIFI_ALLOW_ENROLLMENT === 'true';
    const codeAllowedForWifi = wifiCodes.has(normalizedCode) || sharedCodes.has(normalizedCode) || (allowEnrollmentForWifi && isEnrollmentNumber(code));

    if (kind === 'junior') {
      sendJson(response, codeAllowedForJunior ? 200 : 403, { ok: codeAllowedForJunior });
      return;
    }

    if (kind === 'wifi') {
      if (!codeAllowedForWifi) {
        sendJson(response, 403, { ok: false });
        return;
      }

      const academicPassword = process.env.WIFI_PASSWORD_ACADEMIC || '';
      const hostelPassword = process.env.WIFI_PASSWORD_HOSTEL || '';
      if (!academicPassword || !hostelPassword) {
        sendJson(response, 503, { ok: false, error: 'Wi-Fi access is not configured' });
        return;
      }

      sendJson(response, 200, {
        ok: true,
        passwords: {
          academic: academicPassword,
          hostel: hostelPassword
        }
      });
      return;
    }

    sendJson(response, 400, { ok: false, error: 'Unknown access type' });
  });
};
