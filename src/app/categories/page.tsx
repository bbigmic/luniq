import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoriesGrid } from '@/components/categories/categories-grid';
import { CategoriesHero } from '@/components/categories/categories-hero';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CategoriesHero />
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoriesGrid />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
