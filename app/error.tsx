'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f8] px-4 text-center">
      <h1 className="text-3xl font-light text-neutral-900 mb-4">Something went wrong</h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        An unexpected error occurred.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-black transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-neutral-300 text-neutral-900 text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
