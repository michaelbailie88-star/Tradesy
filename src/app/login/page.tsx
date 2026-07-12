import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Vettd",
  description: "Sign in to your Vettd account to post jobs, manage bids, and message contractors.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#FCFBFA] rounded-card border border-[#E2DDD6] shadow-card p-8">
          <div className="text-center mb-6">
            <Link href="/" className="text-3xl font-extrabold text-primary-600 tracking-tight">
              Vettd
            </Link>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to Vettd
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Sign in to continue.
            </p>
          </div>
          <LoginForm />
          <div className="text-center mt-6">
            <Link href="/signup" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
