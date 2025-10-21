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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">Koszyk zakupów</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Przejrzyj swoje przedmioty przed finalizacją zamówienia
          </p>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-muted-foreground">Ładowanie koszyka...</div></div>}>
          <CartItems />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
