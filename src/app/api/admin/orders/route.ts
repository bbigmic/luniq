import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, users, orderItems, products } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get all orders with user information and item count
    const ordersData = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        paymentMethod: orders.paymentMethod,
        subtotal: orders.subtotal,
        tax: orders.tax,
        shipping: orders.shipping,
        total: orders.total,
        currency: orders.currency,
        shippingAddress: orders.shippingAddress,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        userId: orders.userId,
        userName: users.name,
        userEmail: users.email,
        itemCount: sql<number>`COUNT(${orderItems.id})`,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .groupBy(
        orders.id, orders.orderNumber, orders.status, orders.paymentStatus,
        orders.paymentMethod, orders.subtotal, orders.tax, orders.shipping,
        orders.total, orders.currency, orders.shippingAddress, orders.createdAt,
        orders.updatedAt, orders.userId, users.name, users.email
      )
      .orderBy(desc(orders.createdAt));

    return NextResponse.json({ orders: ordersData });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
