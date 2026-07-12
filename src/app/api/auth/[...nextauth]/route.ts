import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "127.0.0.1";
}

async function handler(request: NextRequest, context: any) {
  // Apply rate limiting on POST (sign-in attempts)
  if (request.method === "POST") {
    const ip = getClientIp(request);
    const result = checkRateLimit(ip, { maxRequests: 10, windowMs: 60 * 1000 });

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(result.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // Forward to NextAuth
  const authHandler = NextAuth(authOptions);
  return authHandler(request, context);
}

export { handler as GET, handler as POST };
