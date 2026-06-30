"use client";

import { updateContractorProfile } from "@/services/contractors";
import { useState } from "react";

export default function ContractorProfileForm({ 
  user 
}: { 
  user: { 
    name?: string | null, 
    trade?: string | null, 
    serviceRadius?: number | null,
    isIdentityVerified?: boolean,
    isLicensed?: boolean,
    isInsured?: boolean
  } 
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    const result = await updateContractorProfile(formData);
    
    setIsSubmitting(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-lg mb-6 border border-primary-100">
        <h3 className="text-sm font-bold text-primary-800 mb-2 uppercase tracking-tight">Trust & Verification</h3>
        <p className="text-xs text-primary-600 mb-4">Verified pros get 3x more bids. Toggle these to simulate the verification process.</p>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="isIdentityVerified"
              name="isIdentityVerified"
              type="checkbox"
              defaultChecked={user.isIdentityVerified}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isIdentityVerified" className="ml-2 block text-sm text-gray-700">
              Identity Verified
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="isLicensed"
              name="isLicensed"
              type="checkbox"
              defaultChecked={user.isLicensed}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isLicensed" className="ml-2 block text-sm text-gray-700">
              Licensed Professional
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="isInsured"
              name="isInsured"
              type="checkbox"
              defaultChecked={user.isInsured}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isInsured" className="ml-2 block text-sm text-gray-700">
              Insurance Verified
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={user.name || ""}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="trade" className="block text-sm font-medium text-gray-700">Primary Trade</label>
        <select
          name="trade"
          id="trade"
          defaultValue={user.trade || ""}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">Select a trade</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="roofing">Roofing</option>
          <option value="landscaping">Landscaping</option>
          <option value="painting">Painting</option>
          <option value="hvac">HVAC</option>
          <option value="carpentry">Carpentry</option>
          <option value="handyman">Handyman</option>
        </select>
      </div>

      <div>
        <label htmlFor="serviceRadius" className="block text-sm font-medium text-gray-700">Service Radius (km)</label>
        <input
          type="number"
          name="serviceRadius"
          id="serviceRadius"
          defaultValue={user.serviceRadius || 20}
          required
          min="1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      {success && (
        <div className="text-green-600 text-sm">Profile updated successfully!</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
