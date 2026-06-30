"use client";

import { submitReview } from "@/services/reviews";
import { useState } from "react";

export default function ReviewForm({ 
  jobId, 
  subjectId,
  subjectName 
}: { 
  jobId: string; 
  subjectId: string;
  subjectName: string;
}) {
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await submitReview(formData);
    setIsSubmitting(false);
    
    if (result?.error) {
      alert(result.error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
        <h3 className="font-bold text-lg">Thank you!</h3>
        <p>Your review for {subjectName} has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Leave a Review for {subjectName}</h3>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="subjectId" value={subjectId} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  rating >= star ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Share your experience..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-700 transition disabled:bg-primary-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
