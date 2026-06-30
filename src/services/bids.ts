"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const bidSchema = z.object({
  jobId: z.string().min(1),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  message: z.string().optional(),
});

export async function submitBid(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "CONTRACTOR") {
    return { error: "Unauthorized. Only contractors can submit bids." };
  }

  const rawData = {
    jobId: formData.get("jobId"),
    amount: formData.get("amount"),
    message: formData.get("message"),
  };

  const validation = bidSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { jobId, amount, message } = validation.data;

  try {
    // Check if job exists and is OPEN
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { error: "Job not found." };
    }

    if (job.status !== "OPEN") {
      return { error: "This job is no longer accepting bids." };
    }

    // Check if contractor already bid
    const existingBid = await prisma.bid.findFirst({
      where: {
        jobId,
        contractorId: (session.user as any).id,
      },
    });

    if (existingBid) {
      return { error: "You have already submitted a bid for this job." };
    }

    const bid = await prisma.bid.create({
      data: {
        amount: Math.round(amount * 100), // Convert to cents
        message,
        jobId,
        contractorId: (session.user as any).id,
        status: "PENDING",
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard");

    return { success: true, bidId: bid.id };
  } catch (err) {
    console.error("Submit bid error:", err);
    return { error: "Failed to submit bid. Please try again." };
  }
}

export async function acceptBid(bidId: String) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "HOMEOWNER") {
    return { error: "Unauthorized. Only homeowners can accept bids." };
  }

  try {
    const bid = await prisma.bid.findUnique({
      where: { id: bidId as string },
      include: { job: true },
    });

    if (!bid) {
      return { error: "Bid not found." };
    }

    if (bid.job.homeownerId !== (session.user as any).id) {
      return { error: "Unauthorized. You don't own this job." };
    }

    if (bid.job.status !== "OPEN") {
      return { error: "Job is already awarded or closed." };
    }

    // Accept this bid and reject others? Or just set job to AWARDED.
    // Let's use a transaction
    await prisma.$transaction([
      // Update job status
      prisma.job.update({
        where: { id: bid.jobId },
        data: { status: "AWARDED" },
      }),
      // Update the accepted bid
      prisma.bid.update({
        where: { id: bidId as string },
        data: { status: "ACCEPTED" },
      }),
      // Reject other bids
      prisma.bid.updateMany({
        where: {
          jobId: bid.jobId,
          id: { not: bidId as string },
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      }),
    ]);

    revalidatePath(`/my-jobs/${bid.jobId}`);
    revalidatePath("/my-jobs");

    return { success: true };
  } catch (err) {
    console.error("Accept bid error:", err);
    return { error: "Failed to accept bid." };
  }
}
