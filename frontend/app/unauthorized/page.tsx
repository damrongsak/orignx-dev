// app/unauthorized/page.tsx
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-700">Access Denied</h1>
      <p className="mb-8 text-lg text-red-600">
        You do not have the necessary permissions to view this page.
      </p>
      <Link
        href="/"
        className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go to Home Page
      </Link>
      <Link href="/login" className="mt-4 text-blue-600 hover:underline">
        Login with different account
      </Link>
    </div>
  );
}
