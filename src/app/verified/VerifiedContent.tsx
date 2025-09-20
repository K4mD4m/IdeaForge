"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerifiedContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isSuccess = status === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 shadow-lg shadow-purple-500/30 rounded-2xl p-8 text-center">
        {isSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-purple-400">
              Email verified 🎉
            </h1>
            <p className="mt-4 text-gray-300">
              Your email has been successfully verified. You can now publish
              your ideas.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-500">
              Verification failed ❌
            </h1>
            <p className="mt-4 text-gray-300">
              The verification link is invalid or has expired. Please try again.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
