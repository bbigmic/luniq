import { Suspense } from 'react';
import { AddProductForm } from '@/components/admin/add-product-form';

export default function AddProductPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Create a new product for your e-commerce store
        </p>
      </div>
      <div className="bg-card rounded-lg border p-4 sm:p-6">
        <Suspense fallback={<div>Loading form...</div>}>
          <AddProductForm />
        </Suspense>
      </div>
    </div>
  );
}
