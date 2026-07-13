import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");
  const status = searchParams.get("status") || "OPEN";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: any = {};
  if (status) where.status = status;
  if (category) where.category = category;
  if (location) where.location = { contains: location, mode: "insensitive" };
  if (minBudget) where.budget = { ...(where.budget || {}), gte: parseInt(minBudget) };
  if (maxBudget) where.budget = { ...(where.budget || {}), lte: parseInt(maxBudget) };

  const orderBy: any = sort === "oldest" ? { createdAt: "asc" }
    : sort === "budget_high" ? { budget: "desc" }
    : sort === "budget_low" ? { budget: "asc" }
    : { createdAt: "desc" };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        homeowner: { select: { name: true, customerType: true } },
        _count: { select: { bids: true } },
      },
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({
    jobs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}