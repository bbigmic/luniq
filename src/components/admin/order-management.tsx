'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye,
  Package,
  MoreHorizontal,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

// Mock data - replace with actual data fetching
const orders = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    customer: 'John Doe',
    email: 'john@example.com',
    status: 'delivered',
    paymentStatus: 'paid',
    total: 299.99,
    items: 2,
    createdAt: '2024-01-15',
    shippingAddress: '123 Main St, City, State 12345',
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    status: 'processing',
    paymentStatus: 'paid',
    total: 149.99,
    items: 1,
    createdAt: '2024-01-15',
    shippingAddress: '456 Oak Ave, City, State 12345',
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-2024-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'pending',
    paymentStatus: 'pending',
    total: 89.99,
    items: 3,
    createdAt: '2024-01-14',
    shippingAddress: '789 Pine Rd, City, State 12345',
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-2024-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    status: 'shipped',
    paymentStatus: 'paid',
    total: 199.99,
    items: 1,
    createdAt: '2024-01-14',
    shippingAddress: '321 Elm St, City, State 12345',
  },
];

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
  refunded: XCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-red-100 text-red-800',
};

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPaymentStatus = filterPaymentStatus === 'all' || order.paymentStatus === filterPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders and track fulfillment
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All Status
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'processing' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('processing')}
              >
                Processing
              </Button>
              <Button
                variant={filterStatus === 'shipped' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('shipped')}
              >
                Shipped
              </Button>
              <Button
                variant={filterStatus === 'delivered' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('delivered')}
              >
                Delivered
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterPaymentStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaymentStatus('all')}
              >
                All Payments
              </Button>
              <Button
                variant={filterPaymentStatus === 'paid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaymentStatus('paid')}
              >
                Paid
              </Button>
              <Button
                variant={filterPaymentStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaymentStatus('pending')}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>
            A list of all customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{order.orderNumber}</h3>
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{order.items} items</span>
                        <span>Created: {formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right space-y-1">
                      <p className="font-medium">{formatPrice(order.total)}</p>
                      <Badge 
                        variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}
                      >
                        {order.paymentStatus}
                      </Badge>
                      <p className="text-xs text-muted-foreground truncate max-w-32">
                        {order.shippingAddress}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
