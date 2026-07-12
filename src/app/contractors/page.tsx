import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Contractors — Vettd",
  description: "Browse verified, licensed, and insured local contractors for your home projects.",
};

export default function ContractorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Contractors</h1>
        <p className="text-gray-600 mb-8">
          Browse verified local tradespeople ready to take on your project.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">
            No contractors are currently listed. Check back soon or post a job to receive bids.
          </p>
          <Link href="/signup" className="btn-primary inline-block px-6 py-3">
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}
