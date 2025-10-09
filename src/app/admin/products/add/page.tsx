import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AddProductForm } from '@/components/admin/add-product-form';

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <AdminHeader title="Add New Product" />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                <Suspense fallback={<div>Loading form...</div>}>
                  <AddProductForm />
                </Suspense>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
