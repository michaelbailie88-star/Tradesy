"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"HOMEOWNER" | "CONTRACTOR">("HOMEOWNER");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-primary-600 tracking-tight">Tradesy</Link>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-500">Join Tradesy and find your perfect pro or your next job.</p>
        </div>

        {/* Role toggle */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card p-1 flex mb-6">
          <button
            type="button"
            onClick={() => setRole("HOMEOWNER")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-button transition-all ${role === "HOMEOWNER" ? "bg-primary-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            🏠 Homeowner
          </button>
          <button
            type="button"
            onClick={() => setRole("CONTRACTOR")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-button transition-all ${role === "CONTRACTOR" ? "bg-primary-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            🔨 Contractor
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="hidden" name="role" value={role} />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="name" name="name" type="text" required
                className="block w-full rounded-button border border-gray-300 py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 sm:text-sm"
                placeholder="John Doe" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input id="email" name="email" type="email" required
                className="block w-full rounded-button border border-gray-300 py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 sm:text-sm"
                placeholder="john@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" name="password" type="password" required minLength={8}
                className="block w-full rounded-button border border-gray-300 py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 sm:text-sm"
                placeholder="At least 8 characters" />
            </div>

            {role === "CONTRACTOR" && (
              <>
                <div>
                  <label htmlFor="trade" className="block text-sm font-medium text-gray-700 mb-1">Trade Specialty</label>
                  <select id="trade" name="trade" required
                    className="block w-full rounded-button border border-gray-300 py-2.5 px-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 sm:text-sm bg-white">
                    <option value="">Select your trade…</option>
                    <option value="PLUMBING">Plumbing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="ROOFING">Roofing</option>
                    <option value="LANDSCAPING">Landscaping</option>
                    <option value="PAINTING">Painting</option>
                    <option value="HVAC">HVAC</option>
                    <option value="CARPENTRY">Carpentry</option>
                    <option value="FLOORING">Flooring</option>
                    <option value="HANDYMAN">Handyman</option>
                    <option value="CLEANING">Cleaning</option>
                  </select>
                </div>
                <div className="bg-primary-50 rounded-button p-3 border border-primary-100">
                  <p className="text-xs text-primary-700 font-medium mb-1">🔒 Trust & Verification</p>
                  <p className="text-xs text-primary-600">We verify licenses, insurance, and background. You&apos;ll set these up after signing up.</p>
                </div>
              </>
            )}

            {error && (
              <div className="bg-error/10 border border-error/20 text-error text-sm rounded-button p-3">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 rounded-button text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors">
              {loading ? "Creating account…" : `Create ${role === "HOMEOWNER" ? "Homeowner" : "Contractor"} Account`}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}