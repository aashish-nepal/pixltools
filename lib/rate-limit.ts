import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * In-memory rate limiter using a sliding window.
 * Per-instance on serverless (each Vercel function instance has its own store).
 * For distributed rate limiting at scale, swap this for @upstash/ratelimit + Redis.
 *
 * Limits: 20 requests per IP per 60 seconds per API route.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const WINDOW_MS = 60_000;         // 1 minute window
const MAX_REQUESTS = 20;          // 20 requests per window per IP

const rateLimitCache = new LRUCache<string, RateLimitEntry>({
    max: 10_000,            // store up to 10k unique IP+route combos
    ttl: WINDOW_MS * 2,     // auto-expire after 2 windows
});

export function rateLimit(req: NextRequest, routeKey: string): NextResponse | null {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

    const key = `${ip}:${routeKey}`;
    const now = Date.now();
    const entry = rateLimitCache.get(key);

    if (!entry || now > entry.resetAt) {
        // Start a new window
        rateLimitCache.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return null; // OK
    }

    if (entry.count >= MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return new NextResponse(
            JSON.stringify({ error: "Too many requests. Please wait before trying again." }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(retryAfter),
                    "X-RateLimit-Limit": String(MAX_REQUESTS),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
                },
            }
        );
    }

    entry.count++;
    rateLimitCache.set(key, entry);
    return null; // OK
}
