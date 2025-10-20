import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories, products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function toTitleCase(input: string): string {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/\.[^.]+$/, '')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function toSlug(input: string): string {
  return input
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(_req: NextRequest) {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ error: 'images directory not found', imagesDir }, { status: 400 });
    }

    const files = fs
      .readdirSync(imagesDir)
      .filter((f) => /\.(png|jpe?g|svg|webp|avif)$/i.test(f) && f.toLowerCase() !== 'placeholder.svg');

    if (files.length === 0) {
      return NextResponse.json({ message: 'No product images found to seed.' }, { status: 200 });
    }

    // Ensure a default category exists
    const defaultCategorySlug = 'luniq';
    let existingCategory = await db.select().from(categories).where(eq(categories.slug, defaultCategorySlug));
    let categoryId: string;
    if (existingCategory.length === 0) {
      const created = await db
        .insert(categories)
        .values({
          name: 'Luniq',
          slug: defaultCategorySlug,
          description: 'Luniq curated products',
          image: null,
        })
        .returning();
      categoryId = created[0].id as string;
    } else {
      categoryId = existingCategory[0].id as string;
    }

    const createdProducts: any[] = [];

    for (const file of files) {
      const base = file;
      const name = toTitleCase(base);
      const slug = toSlug(base);
      const sku = `LQ-${slug.toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      const price = (Math.floor(Math.random() * 90) + 10).toFixed(2);

      // Skip if product with same slug exists
      const existing = await db.select().from(products).where(eq(products.slug, slug));
      if (existing.length > 0) {
        continue;
      }

      const description = `Discover ${name} by Luniq — crafted with attention to detail and a black‑and‑gold aesthetic. Perfect for elevating your everyday style.`;
      const shortDescription = `Premium ${name} from Luniq.`;

      const created = await db
        .insert(products)
        .values({
          name,
          slug,
          description,
          shortDescription,
          price,
          comparePrice: null,
          costPrice: null,
          sku,
          barcode: null,
          trackQuantity: true,
          quantity: 20,
          lowStockThreshold: 5,
          weight: null,
          dimensions: null,
          images: [`/images/products/${file}`],
          categoryId,
          status: 'active',
          featured: false,
          metaTitle: name,
          metaDescription: shortDescription,
          tags: ['luniq'],
        })
        .returning();
      createdProducts.push(created[0]);
    }

    return NextResponse.json({ created: createdProducts.length, products: createdProducts });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed products', details: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ usage: 'POST to this endpoint to seed products from public/images/products' });
}


