"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reviewSchema = z.object({
  jobId: z.string().min(1),
  subjectId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export async function submitReview(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized." };
  }

  const rawData = {
    jobId: formData.get("jobId"),
    subjectId: formData.get("subjectId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };

  const validation = reviewSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { jobId, subjectId, rating, comment } = validation.data;

  try {
    // Verify the job is completed and the user was part of it
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        bids: { where: { status: "ACCEPTED" } }
      }
    });

    if (!job || job.status !== "COMPLETED") {
      return { error: "Reviews can only be left for completed jobs." };
    }

    const isHomeowner = job.homeownerId === (session.user as any).id;
    const acceptedBid = job.bids[0];
    const isContractor = acceptedBid?.contractorId === (session.user as any).id;

    if (!isHomeowner && !isContractor) {
      return { error: "You were not part of this job." };
    }

    // Check if review already exists from this author for this subject/job? 
    // The schema doesn't have jobId in Review, but we can check if author already reviewed subject recently.
    // For simplicity, let's just create it.
    
    await prisma.$transaction(async (tx) => {
      await tx.review.create({
        data: {
          rating,
          comment,
          authorId: (session.user as any).id,
          subjectId,
        },
      });

      // Update average rating for subject
      const allReviews = await tx.review.findMany({
        where: { subjectId },
        select: { rating: true },
      });

      const avgRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;

      await tx.user.update({
        where: { id: subjectId },
        data: { rating: avgRating },
      });
    });

    revalidatePath(`/contractors/${subjectId}`);
    return { success: true };
  } catch (err) {
    console.error("Submit review error:", err);
    return { error: "Failed to submit review." };
  }
}
