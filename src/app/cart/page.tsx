import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartItems } from '@/components/cart/cart-items';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground text-lg">
            Review your items before checkout
          </p>
        </div>

        <Suspense fallback={<div>Loading cart...</div>}>
          <CartItems />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
