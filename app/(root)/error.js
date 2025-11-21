'use client';

import { AlertTriangle } from 'lucide-react'; // optional icon from lucide
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-135px)] flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center rounded-2xl p-10 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-semibold  mb-2">
          <span className="text-red-500">Oops!</span> Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <button
          className="cursor-pointer rounded-lg px-2 py-1 border "
          onClick={() => reset()}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
