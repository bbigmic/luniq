'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  Loader2
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  featuredProducts: number;
  outOfStockProducts: number;
  paidOrders: number;
  revenueGrowth: number;
  ordersGrowth: number;
  productsGrowth: number;
  usersGrowth: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: string;
  createdAt: string;
  userName: string;
  userEmail: string;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/recent-orders')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData.orders);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      change: `+${stats.revenueGrowth}%`,
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: `+${stats.ordersGrowth}%`,
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      change: `+${stats.productsGrowth}%`,
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.usersGrowth}%`,
      changeType: 'positive' as const,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Featured Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground">
              Highlighted in catalog
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Out of Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paid Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paidOrders}</div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No recent orders</p>
                </div>
              ) : (
                recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(parseFloat(order.total))}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Update Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}