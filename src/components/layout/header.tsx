'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Strona główna - Left */}
          <div className="justify-self-start">
            <Link 
              href="/" 
              className="text-base font-medium hover:text-primary transition-colors"
            >
              Strona główna
            </Link>
          </div>

          {/* Logo - Center */}
          <div className="justify-self-center">
            <Link href="/">
              <img 
                src="/images/luniq-logo-new.png" 
                alt="Luniq Logo" 
                className="h-12 w-12 rounded-lg object-cover"
              />
            </Link>
          </div>

          {/* Kontakt - Right */}
          <div className="justify-self-end">
            <Link 
              href="/contact" 
              className="text-base font-medium hover:text-primary transition-colors"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
