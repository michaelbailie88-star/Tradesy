"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6B6358]">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#6B6358]">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 block w-full px-4 py-2.5 border border-[#D6D0C8] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2852C7]/20 focus:border-[#2852C7] outline-none text-[#2D2A25]"
            placeholder="Enter your password"
          />
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <Link href="/forgot-password" className="text-xs text-[#2852C7] hover:text-[#1E4D92] px-2 py-1 inline-block">
              Forgot?
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 btn-primary text-sm font-semibold"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="text-center">
        <Link href="/signup" className="text-[#2852C7] hover:text-[#1E4D92] text-sm font-medium transition-colors">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </form>
  );
}
