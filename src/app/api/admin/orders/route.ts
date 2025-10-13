import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get all orders with user information
    const allOrders = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        total: orders.total,
        subtotal: orders.subtotal,
        tax: orders.tax,
        shipping: orders.shipping,
        currency: orders.currency,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        shippingAddress: orders.shippingAddress,
        billingAddress: orders.billingAddress,
        userId: orders.userId,
        userName: users.name,
        userEmail: users.email,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(orders.createdAt);

    // Get items count for each order
    const ordersWithItemsCount = await Promise.all(
      allOrders.map(async (order) => {
        const itemsCountResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(sql`order_items`)
          .where(sql`order_id = ${order.id}`);
        
        const itemsCount = itemsCountResult[0]?.count || 0;
        
        return {
          ...order,
          itemsCount,
        };
      })
    );

    return NextResponse.json({
      orders: ordersWithItemsCount,
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}