"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";
import Link from "next/link";

export default function SignupForm() {
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
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-primary-600 tracking-tight">Vettd</Link>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-500">Join Vettd and find your perfect pro or your next job.</p>
        </div>

        {/* Role toggle */}
        <div className="bg-[#FCFBFA] rounded-card border border-[#E2DDD6] shadow-card p-1 flex mb-6">
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
        <div className="bg-[#FCFBFA] rounded-card border border-[#E2DDD6] shadow-card p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="hidden" name="role" value={role} />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                minLength={2}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="At least 8 characters"
              />
              <p className="mt-1 text-xs text-gray-400">At least 8 characters</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating account..." : `Create ${role === "HOMEOWNER" ? "Homeowner" : "Contractor"} Account`}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
