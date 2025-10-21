import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { orders, orderItems } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { items, customerInfo } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      );
    }

    if (!customerInfo || !customerInfo.email) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      if (!item.id || !item.quantity || !item.price) {
        return NextResponse.json(
          { error: 'Invalid item data' },
          { status: 400 }
        );
      }
      
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;
      
      processedItems.push({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: itemTotal,
      });
    }

    // Add tax (8% for demo purposes)
    const tax = totalAmount * 0.08;
    const finalAmount = totalAmount + tax;

    // Create order in database first
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newOrder = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: customerInfo.userId || null,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'card',
        subtotal: totalAmount.toString(),
        tax: tax.toString(),
        shipping: '0',
        discount: '0',
        total: finalAmount.toString(),
        currency: 'PLN',
        shippingAddress: customerInfo.shippingAddress || null,
        billingAddress: customerInfo.billingAddress || null,
        notes: customerInfo.notes || null,
      })
      .returning();

    const orderId = newOrder[0].id;

    // Create order items
    for (const item of processedItems) {
      await db.insert(orderItems).values({
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price.toString(),
        total: item.total.toString(),
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(finalAmount),
      currency: 'pln',
      metadata: {
        orderId: orderId,
        orderNumber: orderNumber,
        customerEmail: customerInfo.email,
      },
      description: `Order ${orderNumber}`,
      shipping: customerInfo.shippingAddress ? {
        name: customerInfo.shippingAddress.firstName + ' ' + customerInfo.shippingAddress.lastName,
        address: {
          line1: customerInfo.shippingAddress.address1,
          line2: customerInfo.shippingAddress.address2,
          city: customerInfo.shippingAddress.city,
          state: customerInfo.shippingAddress.state,
          postal_code: customerInfo.shippingAddress.zipCode,
          country: customerInfo.shippingAddress.country,
        },
      } : undefined,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId,
      orderNumber: orderNumber,
      amount: finalAmount,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
