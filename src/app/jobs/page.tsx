import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Jobs — Vettd",
  description: "Browse available home improvement and maintenance jobs posted by homeowners near you.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find home improvement and maintenance projects posted by homeowners near you.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">
            No jobs are currently listed. Check back soon or sign up to get notified about new jobs.
          </p>
          <Link href="/signup" className="btn-primary inline-block px-6 py-3">
            Sign Up to Find Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
