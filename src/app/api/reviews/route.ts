import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  jobId: z.string().min(1),
  subjectId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(5).max(2000).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { jobId, subjectId, rating, comment } = parsed.data;
  const userId = (session.user as any).id;

  // Verify job is completed
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  if (job.status !== "COMPLETED") {
    return NextResponse.json({ error: "Job must be completed to leave a review" }, { status: 400 });
  }

  // Verify user is authorized (homeowner or contractor involved in job)
  const isHomeowner = job.homeownerId === userId;
  const bidsForJob = await prisma.bid.findMany({ where: { jobId } });
  const isContractor = bidsForJob.some(b => b.contractorId === userId);

  if (!isHomeowner && !isContractor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check for existing review
  const existing = await prisma.review.findFirst({
    where: { authorId: userId, subjectId, jobId },
  });
  if (existing) {
    return NextResponse.json({ error: "You already reviewed this user for this job" }, { status: 400 });
  }

  // Create review and update contractor's average rating
  const review = await prisma.$transaction(async (tx) => {
    const r = await tx.review.create({
      data: { rating, comment, authorId: userId, subjectId, jobId },
    });

    // Update subject's average rating
    const allReviews = await tx.review.findMany({
      where: { subjectId },
      select: { rating: true },
    });
    const avg = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;

    await tx.user.update({
      where: { id: subjectId },
      data: { rating: Math.round(avg * 10) / 10 },
    });

    return r;
  });

  return NextResponse.json(review, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("contractorId") || searchParams.get("userId");

  const where: any = {};
  if (subjectId) where.subjectId = subjectId;

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      author: { select: { name: true, role: true } },
    },
  });

  return NextResponse.json(reviews);
}