const rateLimitMap = new Map<string, number[]>();

export function isRateLimited(ip: string, limit = 5, windowMs = 60_000): boolean {
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];

    const recent = timestamps.filter((ts) => now - ts < windowMs);
    recent.push(now);

    rateLimitMap.set(ip, recent);
    return recent.length > limit;
}