-- Insert missing products for categories that show 0 products
-- This script will only insert products that don't already exist

-- Books Category Products
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Programming Guide',
    'programming-guide',
    'Complete guide to modern programming techniques and best practices.',
    'Programming fundamentals',
    49.99,
    69.99,
    'PG-028',
    80,
    (SELECT id FROM categories WHERE slug = 'books'),
    'active',
    true,
    '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'programming-guide');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Fiction Novel',
    'fiction-novel',
    'Bestselling fiction novel with compelling characters and plot.',
    'Award-winning fiction',
    16.99,
    24.99,
    'FN-029',
    120,
    (SELECT id FROM categories WHERE slug = 'books'),
    'active',
    false,
    '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'fiction-novel');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Cookbook',
    'cookbook',
    'Beautiful cookbook with recipes from around the world.',
    'International cuisine cookbook',
    34.99,
    44.99,
    'CB-030',
    90,
    (SELECT id FROM categories WHERE slug = 'books'),
    'active',
    false,
    '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'cookbook');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'History Book',
    'history-book',
    'Comprehensive history book covering major world events.',
    'World history reference',
    42.99,
    59.99,
    'HB-031',
    65,
    (SELECT id FROM categories WHERE slug = 'books'),
    'active',
    false,
    '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'history-book');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Self-Help Book',
    'self-help-book',
    'Motivational self-help book for personal development.',
    'Personal growth guide',
    19.99,
    29.99,
    'SHB-032',
    110,
    (SELECT id FROM categories WHERE slug = 'books'),
    'active',
    false,
    '["/images/products/book.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'self-help-book');

-- Beauty Category Products
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Skincare Set',
    'skincare-set',
    'Complete skincare routine with cleanser, toner, and moisturizer.',
    'Anti-aging skincare set',
    89.99,
    119.99,
    'SS-033',
    40,
    (SELECT id FROM categories WHERE slug = 'beauty'),
    'active',
    true,
    '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'skincare-set');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Makeup Palette',
    'makeup-palette',
    'Professional makeup palette with 20 versatile colors.',
    'Professional makeup set',
    49.99,
    69.99,
    'MP-034',
    55,
    (SELECT id FROM categories WHERE slug = 'beauty'),
    'active',
    false,
    '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'makeup-palette');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Hair Dryer',
    'hair-dryer',
    'Professional hair dryer with ionic technology and multiple settings.',
    'Ionic hair dryer',
    79.99,
    99.99,
    'HD-035',
    30,
    (SELECT id FROM categories WHERE slug = 'beauty'),
    'active',
    false,
    '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'hair-dryer');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Perfume',
    'perfume',
    'Luxury perfume with long-lasting fragrance.',
    'Premium fragrance',
    129.99,
    159.99,
    'PF-036',
    25,
    (SELECT id FROM categories WHERE slug = 'beauty'),
    'active',
    false,
    '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'perfume');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Face Mask Set',
    'face-mask-set',
    'Hydrating face mask set for all skin types.',
    'Hydrating face masks',
    24.99,
    34.99,
    'FMS-037',
    75,
    (SELECT id FROM categories WHERE slug = 'beauty'),
    'active',
    false,
    '["/images/products/placeholder.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'face-mask-set');

-- Automotive Category Products
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Car Phone Mount',
    'car-phone-mount',
    'Magnetic phone mount for car dashboard with strong grip.',
    'Dashboard phone holder',
    19.99,
    29.99,
    'CPM-038',
    100,
    (SELECT id FROM categories WHERE slug = 'automotive'),
    'active',
    false,
    '["/images/products/car-mount.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-phone-mount');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Car Charger',
    'car-charger',
    'Fast charging car charger with multiple USB ports.',
    'USB car charger',
    24.99,
    34.99,
    'CC-039',
    85,
    (SELECT id FROM categories WHERE slug = 'automotive'),
    'active',
    false,
    '["/images/products/car-charger.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-charger');

INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images)
SELECT 
    'Car Floor Mats',
    'car-floor-mats',
    'All-weather car floor mats with custom fit.',
    'All-weather floor mats',
    49.99,
    69.99,
    'CFM-040',
    60,
    (SELECT id FROM categories WHERE slug = 'automotive'),
    'active',
    false,
    '["/images/products/floor-mats.svg"]'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-floor-mats');
