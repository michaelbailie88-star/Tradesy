"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  trade: z.string().min(2, "Trade is required"),
  serviceRadius: z.coerce.number().min(1, "Radius must be at least 1km"),
  isIdentityVerified: z.preprocess((val) => val === "on", z.boolean()),
  isLicensed: z.preprocess((val) => val === "on", z.boolean()),
  isInsured: z.preprocess((val) => val === "on", z.boolean()),
});

export async function updateContractorProfile(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "CONTRACTOR") {
    return { error: "Unauthorized." };
  }

  const rawData = {
    name: formData.get("name"),
    trade: formData.get("trade"),
    serviceRadius: formData.get("serviceRadius"),
    isIdentityVerified: formData.get("isIdentityVerified"),
    isLicensed: formData.get("isLicensed"),
    isInsured: formData.get("isInsured"),
  };

  const validation = profileSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { name, trade, serviceRadius, isIdentityVerified, isLicensed, isInsured } = validation.data;

  try {
    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: {
        name,
        trade,
        serviceRadius,
        isIdentityVerified,
        isLicensed,
        isInsured,
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    console.error("Update profile error:", err);
    return { error: "Failed to update profile." };
  }
}
