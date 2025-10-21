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
        <span className="ml-2">Ładowanie panelu...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nie udało się załadować danych panelu</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Całkowity przychód',
      value: formatPrice(stats.totalRevenue),
      change: `+${stats.revenueGrowth}%`,
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Całkowite zamówienia',
      value: stats.totalOrders.toLocaleString(),
      change: `+${stats.ordersGrowth}%`,
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Całkowite produkty',
      value: stats.totalProducts.toLocaleString(),
      change: `+${stats.productsGrowth}%`,
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Całkowici użytkownicy',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.usersGrowth}%`,
      changeType: 'positive' as const,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Panel administracyjny</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Witaj z powrotem! Oto co dzieje się w Twoim sklepie.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj produkt
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold truncate">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600 flex-shrink-0" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600 flex-shrink-0" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="ml-1 hidden sm:inline">z ostatniego miesiąca</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Polecane produkty
            </CardTitle>
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground">
              Podświetlone w katalogu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Brak w magazynie
            </CardTitle>
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{stats.outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              Wymagają uzupełnienia
            </p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Opłacone zamówienia
            </CardTitle>
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{stats.paidOrders}</div>
            <p className="text-xs text-muted-foreground">
              Pomyślnie przetworzone
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Ostatnie zamówienia</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Najnowsze zamówienia od Twoich klientów
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">Brak ostatnich zamówień</p>
                </div>
              ) : (
                recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium truncate">{order.orderNumber}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-xs sm:text-sm font-medium">{formatPrice(parseFloat(order.total))}</p>
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
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Szybkie akcje</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Częste zadania administracyjne
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-2 sm:space-y-3">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Dodaj nowy produkt</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Eye className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Zobacz wszystkie zamówienia</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Zarządzaj użytkownikami</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Package className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Aktualizuj magazyn</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}