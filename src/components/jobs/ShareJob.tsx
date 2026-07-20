"use client";

import { useState } from "react";

interface ShareJobProps {
  jobTitle: string;
  jobId: string;
}

export default function ShareJob({ jobTitle, jobId }: ShareJobProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? `${window.location.origin}/jobs/${jobId}` : `/jobs/${jobId}`;
  const text = `Check out this job on Vettd: ${jobTitle}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: jobTitle, text, url });
        return;
      } catch {
        // User cancelled or fallback needed
      }
    }
    setShowPopup(!showPopup);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "bg-[#1877F2]" },
    { name: "Twitter / X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, color: "bg-[#1DA1F2]" },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, color: "bg-[#25D366]" },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B6358] bg-[#F0EDE8] hover:bg-[#E2DDD6] rounded-lg transition-colors"
        aria-label="Share this job"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </button>

      {showPopup && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowPopup(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-[#E2DDD6] rounded-xl shadow-lg p-4 w-56">
            <p className="text-xs font-semibold text-[#6B6358] mb-3 uppercase tracking-wider">Share this job</p>
            <div className="space-y-2">
              {shareLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#2D2A25] hover:bg-[#F0EDE8] rounded-lg transition-colors"
                >
                  <span className={`w-5 h-5 rounded ${link.color} flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{link.name[0]}</span>
                  </span>
                  {link.name}
                </a>
              ))}
              <hr className="border-[#E2DDD6]" />
              <button
                onClick={copyLink}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#2D2A25] hover:bg-[#F0EDE8] rounded-lg transition-colors w-full"
              >
                <span className="w-5 h-5 rounded bg-[#2852C7] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </span>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}