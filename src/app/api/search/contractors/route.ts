import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trade = searchParams.get("trade");
  const location = searchParams.get("location");
  const minRating = searchParams.get("minRating");
  const sort = searchParams.get("sort") || "rating";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: any = { role: "CONTRACTOR" };
  if (trade) where.trade = trade;
  if (location) where.location = { contains: location, mode: "insensitive" };

  const orderBy: any = sort === "jobs" ? { bids: { _count: "desc" } }
    : { rating: "desc" };

  const [contractors, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        trade: true,
        serviceRadius: true,
        rating: true,
        isLicensed: true,
        isInsured: true,
        isIdentityVerified: true,
        _count: { select: { bids: true, reviewsReceived: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  let filtered = contractors;
  if (minRating) filtered = contractors.filter(c => (c.rating || 0) >= parseFloat(minRating));

  return NextResponse.json({
    contractors: filtered,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}