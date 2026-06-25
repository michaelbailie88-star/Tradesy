import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Don't throw at import time in dev/build — only when actually used,
  // so the app can still boot without keys set for early scaffolding.
  console.warn("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Platform fee taken on every job payment, in basis points (e.g. 1000 = 10%)
export const PLATFORM_FEE_BPS = 1000;

export function calculatePlatformFee(amountCents: number) {
  return Math.round((amountCents * PLATFORM_FEE_BPS) / 10000);
}
