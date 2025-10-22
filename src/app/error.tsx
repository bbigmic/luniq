'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">500</h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Wystąpił błąd serwera
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Przepraszamy, wystąpił nieoczekiwany błąd. Nasz zespół został powiadomiony.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={reset} className="w-full">
            Spróbuj ponownie
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Powrót do strony głównej
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Jeśli problem się powtarza, skontaktuj się z nami:</p>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
            Kontakt
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Development Error Details:
            </h3>
            <pre className="text-xs text-red-700 dark:text-red-300 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
