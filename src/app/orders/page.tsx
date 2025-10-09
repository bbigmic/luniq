import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { UserOrders } from '@/components/orders/user-orders';

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your order history
          </p>
        </div>

        <Suspense fallback={<div>Loading orders...</div>}>
          <UserOrders />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
