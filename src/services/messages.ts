"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const messageSchema = z.object({
  jobId: z.string().min(1),
  content: z.string().min(1, "Message cannot be empty"),
});

export async function sendMessage(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized." };
  }

  const rawData = {
    jobId: formData.get("jobId"),
    content: formData.get("content"),
  };

  const validation = messageSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { jobId, content } = validation.data;

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { bids: true }
    });

    if (!job) {
      return { error: "Job not found." };
    }

    const isHomeowner = job.homeownerId === (session.user as any).id;
    const hasBid = job.bids.some(b => b.contractorId === (session.user as any).id);

    if (!isHomeowner && !hasBid) {
      return { error: "You must be the homeowner or have submitted a bid to message." };
    }

    await prisma.message.create({
      data: {
        content,
        jobId,
        senderId: (session.user as any).id,
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath(`/my-jobs/${jobId}`);
    return { success: true };
  } catch (err) {
    console.error("Send message error:", err);
    return { error: "Failed to send message." };
  }
}

export async function getMessages(jobId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return [];
  }

  try {
    return await prisma.message.findMany({
      where: { jobId },
      include: {
        sender: { select: { name: true, role: true } }
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    console.error("Get messages error:", err);
    return [];
  }
}
