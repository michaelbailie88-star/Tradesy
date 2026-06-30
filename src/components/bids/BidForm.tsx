"use client";

import { submitBid } from "@/services/bids";
import { useState } from "react";

export default function BidForm({ jobId }: { jobId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    const result = await submitBid(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // Success - the page will revalidate and show the "Bid Submitted" state
      // due to revalidatePath in the server action.
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Submit a Bid</h3>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="jobId" value={jobId} />
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Your Quote (£)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="e.g. 150"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message to Homeowner
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Explain why you're a good fit..."
          ></textarea>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-700 transition disabled:bg-primary-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Bid"}
        </button>
      </form>
    </div>
  );
}
