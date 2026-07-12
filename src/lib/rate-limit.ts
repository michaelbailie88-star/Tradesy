/**
 * Simple in-memory rate limiter for auth endpoints.
 * Tracks request counts per IP and blocks when exceeded.
 * Resets after the window expires.
 */
const requestCounts = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  /** Max requests allowed within the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

const defaultOptions: RateLimitOptions = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
};

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = defaultOptions
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    // First request or window expired — reset
    requestCounts.set(ip, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, remaining: options.maxRequests - 1, resetIn: options.windowMs };
  }

  if (entry.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: options.maxRequests - entry.count, resetIn: entry.resetAt - now };
}

/**
 * Clean up stale entries every 5 minutes to prevent memory leaks.
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of requestCounts.entries()) {
    if (now > entry.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);
