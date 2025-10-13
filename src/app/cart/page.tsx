import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartItems } from '@/components/cart/cart-items';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Review your items before checkout
          </p>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Loading cart...</div></div>}>
          <CartItems />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
