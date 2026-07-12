import Link from "next/link";

export default function PostJobSuccessPage({
  searchParams,
}: {
  searchParams: { jobId?: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Your project is now live on the Vettd marketplace. Contractors will be notified and you'll start receiving bids soon.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Go to Home
          </Link>
          <Link
            href={`/profile`}
            className="block w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            View My Job (Profile)
          </Link>
        </div>
      </div>
    </div>
  );
}
