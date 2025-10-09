import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get recent orders with user information
    const recentOrders = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        total: orders.total,
        createdAt: orders.createdAt,
        userId: orders.userId,
        userName: users.name,
        userEmail: users.email,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt))
      .limit(10);

    return NextResponse.json({ orders: recentOrders });
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent orders' },
      { status: 500 }
    );
  }
}
