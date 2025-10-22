import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Strona nie została znaleziona
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Powrót do strony głównej
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" className="w-full">
              Przejdź do produktów
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Jeśli uważasz, że to błąd, skontaktuj się z nami:</p>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
