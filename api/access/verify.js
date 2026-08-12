function parseCodes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map(code => code.trim().toLowerCase())
      .filter(Boolean)
  );
}

const JUNIOR_PROFILES = [
  {
    name: 'Aryan Tiwari',
    course: 'B.Tech-M.Tech Sem I',
    place: 'Kanpur',
    interests: 'Cricket, politics',
    topics: 'Important skills',
    tagline: '.',
    feedback: 'Photos of playground and courts',
    whatsapp: '8869935689',
    instagram: 't.aryan4'
  },
  {
    name: 'Dhruv Saxena',
    course: 'B.Tech-M.Tech Sem I',
    place: 'Prayagraj',
    interests: 'Quantum computing, research, drone & robotics technology',
    topics: 'How to join the drone and robotics lab',
    tagline: 'Playing football and coder',
    feedback: 'Everything is best',
    whatsapp: '6386246598',
    instagram: 'No',
    photo: 'assets/juniors/dhruv-saxena.png'
  },
  {
    name: 'Sanskar Yadav',
    course: 'B.Tech-M.Tech Sem I',
    place: 'Lalitpur, UP',
    interests: 'Video editing, graphic designing, robotics, travelling, badminton',
    topics: 'Startup, innovation, creativity',
    tagline: 'I think I am quite stubborn with problems',
    feedback: 'Just Include my profile. Website is damn good btw...',
    whatsapp: '9935675543',
    instagram: "I don't use Currently.",
    photo: 'assets/juniors/sanskar-yadav.png'
  }
].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

const rateLimitBuckets = new Map();

function clientKey(request) {
  const forwarded = String(request.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || request.socket?.remoteAddress || 'unknown';
}

function isRateLimited(request, bucketName) {
  const limit = Number(process.env.ACCESS_RATE_LIMIT_ATTEMPTS || 12);
  const windowMs = Number(process.env.ACCESS_RATE_LIMIT_WINDOW_MS || 60_000);
  const now = Date.now();
  const key = `${bucketName}:${clientKey(request)}`;
  const bucket = rateLimitBuckets.get(key) || { count: 0, resetAt: now + windowMs };
  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }
  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);
  return bucket.count > limit;
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
    if (isRateLimited(request, kind)) {
      sendJson(response, 429, { ok: false, error: 'Too many attempts. Try again later.' });
      return;
    }

    const allowEnrollmentForJunior = process.env.JUNIOR_ALLOW_ENROLLMENT === 'true';
    const codeAllowedForJunior = juniorCodes.has(normalizedCode) || sharedCodes.has(normalizedCode) || (allowEnrollmentForJunior && isEnrollmentNumber(code));
    const allowEnrollmentForWifi = process.env.WIFI_ALLOW_ENROLLMENT === 'true';
    const codeAllowedForWifi = wifiCodes.has(normalizedCode) || sharedCodes.has(normalizedCode) || (allowEnrollmentForWifi && isEnrollmentNumber(code));

    if (kind === 'junior') {
      sendJson(response, codeAllowedForJunior ? 200 : 403, {
        ok: codeAllowedForJunior,
        profiles: codeAllowedForJunior ? JUNIOR_PROFILES : undefined,
        feedback: codeAllowedForJunior
          ? JUNIOR_PROFILES
            .filter(profile => profile.feedback)
            .map(profile => ({
              name: profile.name,
              message: profile.feedback,
              createdAt: '2026-08-05T00:00:00.000Z'
            }))
          : undefined
      });
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
