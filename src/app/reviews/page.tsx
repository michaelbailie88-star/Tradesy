import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reviews — Vettd",
  description: "Read reviews from homeowners and contractors on Vettd. See what people are saying about local tradespeople.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Reviews</h1>
        <p className="text-gray-600 mb-8">
          Read honest reviews from homeowners and contractors to help you make informed decisions.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">
            No reviews yet. Reviews will appear here once jobs are completed.
          </p>
          <Link href="/signup" className="btn-primary inline-block px-6 py-3">
            Sign Up to Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
