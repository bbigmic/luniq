import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Simple test to get orders count
    const ordersCount = await db
      .select()
      .from(orders)
      .limit(5);

    console.log(`Found ${ordersCount.length} orders`);

    return NextResponse.json({
      success: true,
      message: 'Database connection working',
      ordersCount: ordersCount.length,
      sampleOrders: ordersCount.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        total: order.total,
        createdAt: order.createdAt
      }))
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
