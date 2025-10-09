import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET all products for admin
export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(products.createdAt);

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received product creation request:', body);
    
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      comparePrice,
      costPrice,
      sku,
      barcode,
      quantity,
      lowStockThreshold,
      weight,
      categoryId,
      status,
      featured,
      metaTitle,
      metaDescription,
      tags,
      images,
    } = body;

    // Validate required fields
    if (!name || !slug || !description || !price || !sku || !quantity || !categoryId) {
      console.log('Missing required fields:', { name, slug, description, price, sku, quantity, categoryId });
      return NextResponse.json(
        { error: 'Missing required fields', details: { name: !!name, slug: !!slug, description: !!description, price: !!price, sku: !!sku, quantity: !!quantity, categoryId: !!categoryId } },
        { status: 400 }
      );
    }

    console.log('Creating product with data:', {
      name,
      slug,
      description,
      shortDescription: shortDescription || null,
      price: price.toString(),
      comparePrice: comparePrice ? comparePrice.toString() : null,
      costPrice: costPrice ? costPrice.toString() : null,
      sku,
      barcode: barcode || null,
      quantity,
      lowStockThreshold: lowStockThreshold || 5,
      weight: weight || null,
      dimensions: null,
      images: images || [],
      categoryId,
      status: status || 'active',
      featured: featured || false,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      tags: tags || [],
    });

    // Create the product
    const newProduct = await db
      .insert(products)
      .values({
        name,
        slug,
        description,
        shortDescription: shortDescription || null,
        price: price.toString(),
        comparePrice: comparePrice ? comparePrice.toString() : null,
        costPrice: costPrice ? costPrice.toString() : null,
        sku,
        barcode: barcode || null,
        quantity,
        lowStockThreshold: lowStockThreshold || 5,
        weight: weight || null,
        dimensions: null,
        images: images || [],
        categoryId,
        status: status || 'active',
        featured: featured || false,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        tags: tags || [],
      })
      .returning();

    console.log('Product created successfully:', newProduct[0]);
    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
