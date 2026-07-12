"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(["HOMEOWNER", "CONTRACTOR"]),
});

export async function signup(formData: FormData) {
  // Rate limiting: max 5 signups per IP per minute
  const headersList = headers();
  const ip = (await headersList).get("x-forwarded-for")?.split(",")[0]?.trim()
    || (await headersList).get("x-real-ip")
    || "127.0.0.1";

  const rateLimitResult = checkRateLimit(`signup:${ip}`, {
    maxRequests: 5,
    windowMs: 60 * 1000,
  });

  if (!rateLimitResult.allowed) {
    return { error: "Too many signup attempts. Please try again later." };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  const validated = signupSchema.safeParse({ email, password, name, role });

  if (!validated.success) {
    return { error: "Invalid input" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong" };
  }
}