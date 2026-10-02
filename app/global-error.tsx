'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f9f9f8] text-neutral-900 font-sans min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4">Application Error</h1>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-black transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
