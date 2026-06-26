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
