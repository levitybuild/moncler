import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f8] px-4 text-center">
      <h1 className="text-4xl font-light text-neutral-900 mb-4">404 - Page Not Found</h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-black transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
