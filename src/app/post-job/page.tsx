"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/services/jobs";
import Link from "next/link";

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Painting",
  "HVAC",
  "Carpentry",
  "Flooring",
  "Handyman",
  "Moving",
  "Cleaning",
];

export default function PostJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await createJob(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/post-job/success?jobId=${res.jobId}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
          &larr; Back to Home
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                placeholder="e.g. Fix leaking pipe in kitchen"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
              >
                <option value="">Select a trade</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                placeholder="e.g. London, SW1"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range (optional, £)
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                placeholder="e.g. 500"
              />
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
              >
                <option value="">When do you need it?</option>
                <option value="Emergency">Emergency / ASAP</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Flexible">I'm flexible</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                Photo URLs (comma separated)
              </label>
              <input
                id="photos"
                name="photos"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                placeholder="Describe the job, including any specific requirements or issues..."
              ></textarea>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-sm font-bold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Job Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
