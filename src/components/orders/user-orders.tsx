'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

// Mock order data - replace with actual data fetching
const orders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    paymentStatus: 'paid',
    total: 333.98,
    currency: 'USD',
    createdAt: new Date('2024-01-15'),
    deliveredAt: new Date('2024-01-20'),
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        image: '/images/products/headphones.svg',
        quantity: 1,
        price: 299.99,
        total: 299.99,
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'processing',
    paymentStatus: 'paid',
    total: 171.98,
    currency: 'USD',
    createdAt: new Date('2024-01-18'),
    items: [
      {
        id: '2',
        name: 'Smart Fitness Watch',
        image: '/images/products/watch.svg',
        quantity: 1,
        price: 199.99,
        total: 199.99,
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'pending',
    paymentStatus: 'pending',
    total: 107.18,
    currency: 'USD',
    createdAt: new Date('2024-01-20'),
    items: [
      {
        id: '3',
        name: 'Wireless Charging Pad',
        image: '/images/products/placeholder.svg',
        quantity: 1,
        price: 49.99,
        total: 49.99,
      },
      {
        id: '4',
        name: 'Bluetooth Speaker',
        image: '/images/products/speaker.svg',
        quantity: 1,
        price: 79.99,
        total: 79.99,
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'processing':
      return <RefreshCw className="h-5 w-5 text-blue-600" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-purple-600" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Package className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function UserOrders() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('all')}
        >
          All Orders
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground text-center">
                {filterStatus === 'all' 
                  ? "You haven't placed any orders yet."
                  : `No ${filterStatus} orders found.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      Order #{order.orderNumber}
                    </CardTitle>
                    <CardDescription>
                      Placed on {formatDate(order.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatPrice(order.total, order.currency)}
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatPrice(item.total, order.currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    <p>Payment: <span className="capitalize">{order.paymentStatus}</span></p>
                    {order.deliveredAt && (
                      <p>Delivered: {formatDate(order.deliveredAt)}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                    )}
                    {order.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
