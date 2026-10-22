/**
 * In-memory sliding-window rate limiter for sensitive authentication endpoints
 */
export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000, // 15 minutes
  max = 5, // max requests per windowMs
  message = 'Too many requests. Please try again later.',
}) => {
  const hits = new Map(); // key -> [timestamps]

  return (req, res, next) => {
    const ip = req.ip || req.connection?.remoteAddress || '127.0.0.1';
    const key = `${req.baseUrl}${req.path}_${ip}`;
    const now = Date.now();

    let timestamps = hits.get(key) || [];
    // Filter timestamps within the current window
    timestamps = timestamps.filter((t) => now - t < windowMs);

    if (timestamps.length >= max) {
      const oldestHit = timestamps[0];
      const retryAfterSeconds = Math.ceil((windowMs - (now - oldestHit)) / 1000);

      console.warn(`[RATE LIMIT EXCEEDED] IP: ${ip} on ${req.method} ${req.originalUrl}. Blocked for ${retryAfterSeconds}s.`);

      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message: `${message} (Please wait ${Math.ceil(retryAfterSeconds / 60)} minute(s))`,
        retryAfter: retryAfterSeconds,
      });
    }

    timestamps.push(now);
    hits.set(key, timestamps);

    // Memory cleanup if map gets large
    if (hits.size > 10000) {
      for (const [k, v] of hits.entries()) {
        if (!v.some((t) => now - t < windowMs)) {
          hits.delete(k);
        }
      }
    }

    next();
  };
};

// Rate limiter instances for specific endpoints
export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Account temporarily locked for 15 minutes to prevent unauthorized access.',
});

export const forgotPasswordRateLimiter = createRateLimiter({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message: 'Too many password reset requests. Please check your inbox or wait 30 minutes.',
});

export const resendVerificationRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many verification email requests. Please check your inbox or wait 15 minutes.',
});

export const verifyEmailRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many verification attempts.',
});
