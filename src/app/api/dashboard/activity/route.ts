import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  const messages = await prisma.message.findMany({
    where: role === "CONTRACTOR"
      ? { job: { bids: { some: { contractorId: userId } } } }
      : { job: { homeownerId: userId } },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      sender: { select: { name: true } },
      job: { select: { title: true, id: true } },
    },
  });

  const activity = messages.map(msg => ({
    type: "message" as const,
    text: `New message from ${msg.sender.name || "Someone"} about "${msg.job.title}"`,
    time: msg.createdAt.toISOString(),
    jobId: msg.job.id,
    link: `/messages?jobId=${msg.job.id}`,
  }));

  return NextResponse.json(activity);
}