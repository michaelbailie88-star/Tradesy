"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"HOMEOWNER" | "CONTRACTOR" | "BUSINESS">("HOMEOWNER");
  const [step, setStep] = useState(1); // Step 1: role + basic info, Step 2: role-specific onboarding

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await signup(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/login?message=Account created successfully");
    }
  }

  const roleIcon = (r: string) => {
    switch (r) {
      case "HOMEOWNER": return "🏠";
      case "CONTRACTOR": return "🔨";
      case "BUSINESS": return "🏢";
      default: return "👤";
    }
  };

  const roleLabel = (r: string) => {
    switch (r) {
      case "HOMEOWNER": return "Homeowner";
      case "CONTRACTOR": return "Contractor";
      case "BUSINESS": return "Business";
      default: return r;
    }
  };

  const roles: Array<"HOMEOWNER" | "CONTRACTOR" | "BUSINESS"> = ["HOMEOWNER", "CONTRACTOR", "BUSINESS"];

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-primary-600 tracking-tight">Vettd</Link>
          <h2 className="mt-4 text-3xl font-bold text-[#163D75]">
            {step === 1 ? "Create your account" : "Tell us more"}
          </h2>
          <p className="mt-2 text-sm text-[#6B6358]">
            {step === 1
              ? "Join Vettd and find your perfect pro or your next job."
              : `Help us tailor your ${roleLabel(role)} experience.`}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-[#2852C7] text-white' : 'bg-[#E2DDD6] text-[#9C958A]'}`}>1</div>
          <div className="w-12 h-0.5 bg-[#E2DDD6] relative">
            <div className={`absolute inset-0 bg-[#2852C7] transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-[#2852C7] text-white' : 'bg-[#E2DDD6] text-[#9C958A]'}`}>2</div>
        </div>

        <div className="bg-[#FCFBFA] rounded-card border border-[#E2DDD6] shadow-card p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="hidden" name="role" value={role} />

            {/* ── Step 1: Basic Info + Role ── */}
            {step === 1 && (
              <>
                {/* 3-role toggle */}
                <div>
                  <label className="block text-sm font-medium text-[#6B6358] mb-3">I am a…</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-3 px-2 text-sm font-medium rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                          role === r
                            ? "border-[#2852C7] bg-[#EBF0F8] text-[#163D75]"
                            : "border-[#E2DDD6] text-[#6B6358] hover:border-[#2852C7]/40"
                        }`}
                      >
                        <span className="text-xl">{roleIcon(r)}</span>
                        <span>{roleLabel(r)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#6B6358]">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    minLength={2}
                    className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                    placeholder={role === "BUSINESS" ? "Business Owner Name" : "John Doe"}
                  />
                </div>

                {/* Business-specific field */}
                {role === "BUSINESS" && (
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-[#6B6358]">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      id="businessName"
                      className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                      placeholder="Acme Renovations Inc."
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#6B6358]">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#6B6358]">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    minLength={8}
                    className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                    placeholder="At least 8 characters"
                  />
                  <p className="mt-1 text-xs text-[#9C958A]">At least 8 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 btn-primary text-sm font-semibold"
                >
                  Continue →
                </button>
              </>
            )}

            {/* ── Step 2: Role-specific onboarding ── */}
            {step === 2 && (
              <>
                {role === "HOMEOWNER" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">Your Location</label>
                      <input
                        type="text"
                        name="location"
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">What type of project?</label>
                      <select
                        name="preferredCategory"
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                      >
                        <option value="">Select a category</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Painting">Painting</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="General">General / Other</option>
                      </select>
                    </div>
                  </>
                )}

                {role === "CONTRACTOR" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">Your Trade</label>
                      <select
                        name="trade"
                        required
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                      >
                        <option value="">Select your trade</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Painting">Painting</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Flooring">Flooring</option>
                        <option value="Handyman">Handyman</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Moving">Moving</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">Service Radius (km)</label>
                      <input
                        type="number"
                        name="serviceRadius"
                        min={1}
                        max={200}
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-[#6B6358]">
                        <input type="checkbox" name="isLicensed" className="rounded border-[#D6D0C8]" />
                        I am licensed
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-[#6B6358]">
                        <input type="checkbox" name="isInsured" className="rounded border-[#D6D0C8]" />
                        I am insured
                      </label>
                    </div>
                  </>
                )}

                {role === "BUSINESS" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">Business Type</label>
                      <select
                        name="businessType"
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                      >
                        <option value="">Select type</option>
                        <option value="Restaurant">Restaurant / Food Service</option>
                        <option value="Retail">Retail Store</option>
                        <option value="Office">Office / Coworking</option>
                        <option value="Salon">Salon / Spa</option>
                        <option value="Property">Property Management / Landlord</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">Business Address</label>
                      <input
                        type="text"
                        name="businessAddress"
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                        placeholder="123 Main St, City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B6358] mb-2">HST Number (optional)</label>
                      <input
                        type="text"
                        name="hstNumber"
                        className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
                        placeholder="123456789 RT0001"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-[#6B6358]">
                        <input type="checkbox" name="hasInsurance" className="rounded border-[#D6D0C8]" />
                        I have commercial liability insurance
                      </label>
                    </div>
                  </>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 btn-secondary text-sm font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 btn-primary text-sm font-semibold"
                  >
                    {loading ? "Creating account..." : `Create ${roleLabel(role)} Account`}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Login link */}
        <div className="text-center mt-6">
          <Link href="/login" className="text-[#2852C7] hover:text-[#1E4D92] text-sm font-medium transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
