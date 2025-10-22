import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://luniq-vape.pl'),
  title: 'LuniQ Vape - Kultowy z natury | Premium Liquidy do E-papierosów',
  description: 'Odkryj wyjątkowe smaki liquidów LuniQ Vape. Kultowy z natury - najwyższa jakość, autentyczne smaki. Darmowa dostawa od 200zł. Sprawdź naszą ofertę!',
  keywords: 'liquidy, e-papierosy, vape, LuniQ, smaki, premium, polska marka, liquidy do e-papierosów',
  authors: [{ name: 'LuniQ Vape' }],
  creator: 'LuniQ Vape',
  publisher: 'LuniQ Vape',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://luniq-vape.pl',
    siteName: 'LuniQ Vape',
    title: 'LuniQ Vape - Kultowy z natury | Premium Liquidy do E-papierosów',
    description: 'Odkryj wyjątkowe smaki liquidów LuniQ Vape. Kultowy z natury - najwyższa jakość, autentyczne smaki.',
    images: [
      {
        url: '/images/luniq-logo-new.png',
        width: 1200,
        height: 630,
        alt: 'LuniQ Vape - Kultowy z natury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuniQ Vape - Kultowy z natury',
    description: 'Odkryj wyjątkowe smaki liquidów LuniQ Vape. Kultowy z natury - najwyższa jakość, autentyczne smaki.',
    images: ['/images/luniq-logo-new.png'],
  },
  alternates: {
    canonical: 'https://luniq-vape.pl',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="dark">
      <body className={`${inter.className} dark-theme`}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
