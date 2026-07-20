import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password — Vettd",
  description: "Reset your Vettd account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-primary-600 tracking-tight">Vettd</Link>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-500">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <ForgotPasswordForm />
        </div>
        <div className="text-center mt-6">
          <Link href="/login" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}