import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { trade: true },
  });

  const recommended = await prisma.job.findMany({
    where: {
      status: "OPEN",
      ...(user?.trade ? { category: user.trade } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      homeowner: { select: { name: true } },
      _count: { select: { bids: true } },
    },
  });

  return NextResponse.json(recommended);
}