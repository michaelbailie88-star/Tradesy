"use client";

import { acceptBid } from "@/services/bids";
import { useState } from "react";

export default function AcceptBidButton({ bidId }: { bidId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAccept() {
    if (!confirm("Are you sure you want to accept this bid? This will award the job to this contractor.")) {
      return;
    }
    
    setIsSubmitting(true);
    const result = await acceptBid(bidId);
    
    if (result?.error) {
      alert(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <button
      onClick={handleAccept}
      disabled={isSubmitting}
      className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition text-sm disabled:bg-green-400"
    >
      {isSubmitting ? "Accepting..." : "Accept Bid"}
    </button>
  );
}
