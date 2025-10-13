import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    console.log('Running wishlist table migration...');
    
    // Create wishlist table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS wishlist (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        UNIQUE(user_id, product_id)
      )
    `);
    
    console.log('Wishlist table created successfully');
    
    // Add some sample data
    await db.execute(sql`
      INSERT INTO wishlist (user_id, product_id, created_at) 
      SELECT 
        u.id,
        p.id,
        NOW() - INTERVAL '2 days'
      FROM users u, products p 
      WHERE u.email = 'john@example.com' 
      AND p.sku = 'SFW-002'
      ON CONFLICT (user_id, product_id) DO NOTHING
    `);
    
    await db.execute(sql`
      INSERT INTO wishlist (user_id, product_id, created_at) 
      SELECT 
        u.id,
        p.id,
        NOW() - INTERVAL '1 day'
      FROM users u, products p 
      WHERE u.email = 'john@example.com' 
      AND p.sku = 'WCP-003'
      ON CONFLICT (user_id, product_id) DO NOTHING
    `);
    
    console.log('Sample wishlist data added');
    
    return NextResponse.json({
      success: true,
      message: 'Wishlist table migration completed successfully'
    });
    
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
