'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    search: '',
  });

  // Read URL parameters on page load
  useEffect(() => {
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const search = searchParams.get('search');

    setFilters({
      category: category || 'all',
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : 1000,
      inStock: inStock === 'true',
      search: search || '',
    });
  }, [searchParams]);

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">All Products</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Discover our complete collection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <ProductFilters 
              onFiltersChange={handleFiltersChange} 
              initialFilters={filters}
            />
          </aside>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Loading products...</div></div>}>
              <ProductGrid filters={filters} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
