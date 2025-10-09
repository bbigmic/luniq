import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { EditProductForm } from '@/components/admin/edit-product-form';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">
            Update product information and settings
          </p>
        </div>
      </div>

      <EditProductForm productId={id} />
    </div>
  );
}
