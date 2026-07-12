import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Health check endpoint for monitoring and uptime tracking.
 * Returns minimal info in production, detailed info in development.
 *
 * GET /api/health
 */
export async function GET() {
  // In production, return minimal info
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return NextResponse.json(
        { status: "ok" },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      return NextResponse.json(
        { status: "error" },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  // In development, return detailed info
  const checks: Record<string, string | { status: string; error?: string }> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: String(process.uptime()),
    environment: process.env.NODE_ENV || "unknown",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "connected" };
  } catch (error) {
    checks.database = {
      status: "disconnected",
      error: error instanceof Error ? error.message : "Unknown database error",
    };
    checks.status = "degraded";
  }

  const statusCode = checks.status === "ok" ? 200 : 200;

  return NextResponse.json(checks, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    },
  });
}