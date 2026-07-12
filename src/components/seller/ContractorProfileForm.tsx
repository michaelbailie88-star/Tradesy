"use client";

import { useState } from "react";
import { updateContractorProfile } from "@/services/contractors";

interface ContractorProfileFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    trade: string | null;
    serviceRadius: number | null;
    isIdentityVerified: boolean;
    isLicensed: boolean;
    isInsured: boolean;
    rating: number | null;
  };
}

export default function ContractorProfileForm({ user }: ContractorProfileFormProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateContractorProfile(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess("Profile updated successfully.");
    }
    setLoading(false);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={user.name || ""}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div>
        <label htmlFor="trade" className="block text-sm font-medium text-gray-700 mb-1">Trade</label>
        <select
          name="trade"
          id="trade"
          defaultValue={user.trade || ""}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select your trade</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Roofing">Roofing</option>
          <option value="Landscaping">Landscaping</option>
          <option value="Painting">Painting</option>
          <option value="HVAC">HVAC</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Flooring">Flooring</option>
          <option value="Handyman">Handyman</option>
          <option value="Cleaning">Cleaning</option>
        </select>
      </div>

      <div>
        <label htmlFor="serviceRadius" className="block text-sm font-medium text-gray-700 mb-1">Service Radius (km)</label>
        <input
          type="number"
          name="serviceRadius"
          id="serviceRadius"
          defaultValue={user.serviceRadius || 25}
          min={1}
          max={500}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}