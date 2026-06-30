"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  budget: z.coerce.number().min(0).optional(),
  location: z.string().min(1, "Location is required"),
  timeline: z.string().min(1, "Timeline is required"),
});

export async function createJob(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "HOMEOWNER") {
    return { error: "Unauthorized. Only homeowners can post jobs." };
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    budget: formData.get("budget") || undefined,
    location: formData.get("location"),
    timeline: formData.get("timeline"),
    photos: formData.get("photos"),
  };

  const validation = jobSchema.extend({
    photos: z.string().optional(),
  }).safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { title, description, category, budget, location, timeline, photos } = validation.data;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        budget: budget ? Math.round(budget * 100) : null, // Convert to cents
        location,
        timeline,
        photos,
        homeownerId: (session.user as any).id,
        status: "OPEN",
      },
    });

    return { success: true, jobId: job.id };
  } catch (err) {
    console.error("Create job error:", err);
    return { error: "Failed to create job. Please try again." };
  }
}

export async function completeJob(jobId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized." };
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { error: "Job not found." };
    }

    // Only homeowner or the awarded contractor should be able to mark as complete?
    // Usually homeowner confirms it.
    if (job.homeownerId !== (session.user as any).id) {
      return { error: "Unauthorized. Only the homeowner can mark a job as completed." };
    }

    if (job.status !== "AWARDED") {
      return { error: "Only awarded jobs can be marked as completed." };
    }

    await prisma.job.update({
      where: { id: jobId },
      data: { status: "COMPLETED" },
    });

    return { success: true };
  } catch (err) {
    console.error("Complete job error:", err);
    return { error: "Failed to complete job." };
  }
}
