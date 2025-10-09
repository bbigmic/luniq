import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, orders, users } from '@/lib/db/schema';
import { eq, sql, and } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get total products count
    const totalProducts = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(eq(products.status, 'active'));

    // Get total users count
    const totalUsers = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);

    // Get total orders count
    const totalOrders = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(orders);

    // Get total revenue
    const totalRevenue = await db
      .select({ 
        revenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        paidOrders: sql<number>`COUNT(CASE WHEN ${orders.paymentStatus} = 'paid' THEN 1 END)`
      })
      .from(orders)
      .where(eq(orders.paymentStatus, 'paid'));

    // Get featured products count
    const featuredProducts = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(and(eq(products.featured, true), eq(products.status, 'active')));

    // Get out of stock products count
    const outOfStockProducts = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(eq(products.quantity, 0));

    // Calculate growth percentages (mock for now - in real app, compare with previous period)
    const stats = {
      totalRevenue: totalRevenue[0]?.revenue || 0,
      totalOrders: totalOrders[0]?.count || 0,
      totalProducts: totalProducts[0]?.count || 0,
      totalUsers: totalUsers[0]?.count || 0,
      featuredProducts: featuredProducts[0]?.count || 0,
      outOfStockProducts: outOfStockProducts[0]?.count || 0,
      paidOrders: totalRevenue[0]?.paidOrders || 0,
      // Mock growth percentages - in real app, calculate from historical data
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      productsGrowth: 15.2,
      usersGrowth: 22.1,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
