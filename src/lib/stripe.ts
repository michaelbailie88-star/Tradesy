import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set — payments are unavailable");
    }
    stripeInstance = new Stripe(key, {
      apiVersion: "2026-06-24.dahlia" as any,
    });
  }
  return stripeInstance;
}

// Platform fee taken on every job payment, in basis points (e.g. 1000 = 10%)
export const PLATFORM_FEE_BPS = 1000;

export function calculatePlatformFee(amountCents: number) {
  return Math.round((amountCents * PLATFORM_FEE_BPS) / 10000);
}