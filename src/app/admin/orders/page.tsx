import { OrdersManagement } from '@/components/admin/orders-management';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          View and manage customer orders
        </p>
      </div>
      <OrdersManagement />
    </div>
  );
}