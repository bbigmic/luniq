'use client';

import { useState, useEffect } from 'react';
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
  RefreshCw,
  Loader2
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: string;
  currency: string;
  createdAt: string;
  deliveredAt?: string;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

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
