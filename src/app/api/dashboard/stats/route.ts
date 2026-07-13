import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  if (role === "CONTRACTOR") {
    const [openJobs, myBids] = await Promise.all([
      prisma.job.count({ where: { status: "OPEN" } }),
      prisma.bid.findMany({ where: { contractorId: userId } }),
    ]);

    const activeBids = myBids.filter(b => b.status === "PENDING").length;
    const acceptedBids = myBids.filter(b => b.status === "ACCEPTED").length;
    const totalEarnings = myBids.filter(b => b.status === "ACCEPTED").reduce((sum, b) => sum + b.amount, 0);

    return NextResponse.json({
      openJobs,
      activeBids,
      acceptedBids,
      totalEarnings,
      totalBids: myBids.length,
    });
  }

  // Homeowner
  const myJobs = await prisma.job.findMany({ where: { homeownerId: userId } });
  const activeJobs = myJobs.filter(j => j.status === "OPEN" || j.status === "IN_PROGRESS").length;
  const completedJobs = myJobs.filter(j => j.status === "COMPLETED").length;
  const totalSpent = myJobs.reduce((sum, j) => sum + (j.budget || 0), 0);

  const pendingBids = await prisma.bid.count({
    where: { job: { homeownerId: userId }, status: "PENDING" },
  });

  return NextResponse.json({
    activeJobs,
    pendingBids,
    completedJobs,
    totalJobs: myJobs.length,
    totalSpent,
  });
}