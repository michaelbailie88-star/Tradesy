"use client";

import { completeJob } from "@/services/jobs";
import { useState } from "react";

export default function CompleteJobButton({ jobId }: { jobId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleComplete() {
    if (!confirm("Are you sure you want to mark this job as completed? This will finalize the project.")) {
      return;
    }
    
    setIsSubmitting(true);
    const result = await completeJob(jobId);
    
    if (result?.error) {
      alert(result.error);
      setIsSubmitting(false);
    } else {
       window.location.reload();
    }
  }

  return (
    <button
      onClick={handleComplete}
      disabled={isSubmitting}
      className="bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition text-sm disabled:bg-primary-400"
    >
      {isSubmitting ? "Processing..." : "Mark as Completed"}
    </button>
  );
}
