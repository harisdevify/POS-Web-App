'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-135px)] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold tracking-tight ">404</h1>
      <p className="mt-2 text-lg font-medium ">Page Not Found</p>
      <p className="mt-1 text-sm  max-w-md">
        Sorry, the page{' '}
        <span className="font-semibold text-red-600">
          {} ({pathname}) {}
        </span>
        you are looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" className="mt-5 ">
        <Button className="cursor-pointer">Go to Dashboard</Button>
      </Link>
    </div>
  );
}
