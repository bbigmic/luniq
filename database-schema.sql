-- E-Commerce Platform Database Schema
-- For Neon PostgreSQL Database
-- Run this in your Neon SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
    avatar TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    zip_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    sku TEXT UNIQUE,
    barcode TEXT,
    track_quantity BOOLEAN DEFAULT true NOT NULL,
    quantity INTEGER DEFAULT 0 NOT NULL,
    low_stock_threshold INTEGER DEFAULT 5,
    weight DECIMAL(8,2),
    dimensions JSONB,
    images JSONB DEFAULT '[]'::jsonb,
    category_id UUID REFERENCES categories(id),
    status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'active', 'archived')),
    featured BOOLEAN DEFAULT false NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Product variants table
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) NOT NULL,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price DECIMAL(10,2),
    compare_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    quantity INTEGER DEFAULT 0 NOT NULL,
    weight DECIMAL(8,2),
    image TEXT,
    attributes JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status TEXT DEFAULT 'pending' NOT NULL CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_method TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0,
    shipping DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'PLN' NOT NULL,
    shipping_address JSONB,
    billing_address JSONB,
    notes TEXT,
    tracking_number TEXT,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    variant_id UUID REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Cart table
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    variant_id UUID REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_cart_user_id ON cart(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
-- Sample categories with more comprehensive data
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Latest gadgets and technology'),
('Fashion', 'fashion', 'Trendy clothing and accessories'),
('Home & Garden', 'home-garden', 'Everything for your home'),
('Sports', 'sports', 'Fitness and outdoor gear'),
('Books', 'books', 'Knowledge and entertainment'),
('Beauty', 'beauty', 'Health and beauty products'),
('Automotive', 'automotive', 'Car accessories and parts'),
('Health', 'health', 'Health and wellness products'),
('Toys', 'toys', 'Fun toys for all ages'),
('Jewelry', 'jewelry', 'Beautiful jewelry and watches');

-- Users will be created dynamically through the application registration system

-- Sample products with images - Electronics Category
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images) VALUES
('Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.', 'Premium wireless headphones with noise cancellation', 299.99, 399.99, 'PWH-001', 50, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/headphones.svg"]'),
('Smart Fitness Watch', 'smart-fitness-watch', 'Advanced fitness tracking with heart rate monitoring, GPS, and water resistance. Track your workouts and health metrics.', 'Smart fitness watch with health tracking', 199.99, 249.99, 'SFW-002', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/watch.svg"]'),
('Wireless Charging Pad', 'wireless-charging-pad', 'Fast wireless charging for your devices. Compatible with all Qi-enabled smartphones and accessories.', 'Fast wireless charging pad', 49.99, 69.99, 'WCP-003', 30, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'),
('Bluetooth Speaker', 'bluetooth-speaker', 'Portable speaker with excellent sound quality and long battery life. Perfect for outdoor adventures and parties.', 'Portable Bluetooth speaker', 79.99, 99.99, 'BS-004', 15, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/speaker.svg"]'),
('Gaming Laptop', 'gaming-laptop', 'High-performance gaming laptop with RTX graphics and fast SSD storage. Perfect for gaming and content creation.', 'High-performance gaming laptop', 1299.99, 1499.99, 'GL-005', 8, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/laptop.svg"]'),
('Smartphone Pro', 'smartphone-pro', 'Latest smartphone with advanced camera system, 5G connectivity, and all-day battery life.', 'Latest smartphone with pro camera', 899.99, 999.99, 'SP-006', 20, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/phone.svg"]'),
('Digital Camera', 'digital-camera', 'Professional digital camera with 4K video recording and advanced autofocus system.', 'Professional digital camera', 599.99, 699.99, 'DC-007', 12, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/camera.svg"]'),
('Tablet Pro', 'tablet-pro', 'High-resolution tablet with powerful processor and long battery life. Perfect for work and entertainment.', 'High-resolution tablet', 399.99, 499.99, 'TP-008', 18, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/tablet.svg"]'),
('Mechanical Keyboard', 'mechanical-keyboard', 'Premium mechanical keyboard with RGB lighting and tactile switches for the ultimate typing experience.', 'Premium mechanical keyboard', 149.99, 179.99, 'MK-009', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/keyboard.svg"]'),
('Wireless Mouse', 'wireless-mouse', 'Ergonomic wireless mouse with precision tracking and long battery life.', 'Wireless ergonomic mouse', 59.99, 79.99, 'WM-010', 35, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'),
('Monitor 4K', 'monitor-4k', '27-inch 4K monitor with stunning clarity and color accuracy.', '4K Ultra HD Monitor', 399.99, 499.99, 'M4K-011', 15, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'),
('Webcam HD', 'webcam-hd', 'High-definition webcam perfect for video calls and streaming.', 'HD Webcam', 89.99, 119.99, 'WH-012', 22, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'),

-- Fashion Category
('Classic Denim Jacket', 'classic-denim-jacket', 'Timeless denim jacket made from premium cotton. Perfect for casual wear.', 'Premium denim jacket', 89.99, 119.99, 'CDJ-013', 40, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', true, '["/images/products/denim-jacket.svg"]'),
('Cotton T-Shirt', 'cotton-t-shirt', 'Soft cotton t-shirt available in multiple colors. Comfortable and stylish.', 'Premium cotton t-shirt', 24.99, 34.99, 'CTS-014', 100, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/tshirt.svg"]'),
('Running Sneakers', 'running-sneakers', 'Comfortable running shoes with excellent cushioning and support.', 'Athletic running shoes', 129.99, 159.99, 'RS-015', 30, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/sneakers.svg"]'),
('Leather Handbag', 'leather-handbag', 'Elegant leather handbag perfect for everyday use.', 'Genuine leather handbag', 199.99, 249.99, 'LH-016', 20, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', true, '["/images/products/handbag.svg"]'),
('Winter Coat', 'winter-coat', 'Warm winter coat with water-resistant fabric and cozy lining.', 'Insulated winter coat', 149.99, 199.99, 'WC-017', 25, (SELECT id FROM categories WHERE slug = 'fashion'), 'active', false, '["/images/products/winter-coat.svg"]'),

-- Home & Garden Category
('Smart Coffee Maker', 'smart-coffee-maker', 'WiFi-enabled coffee maker with app control and precise brewing.', 'Smart coffee maker', 199.99, 249.99, 'SCM-018', 15, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', true, '["/images/products/coffee-maker.svg"]'),
('Air Purifier', 'air-purifier', 'HEPA air purifier that removes 99.97% of airborne particles.', 'HEPA air purifier', 179.99, 229.99, 'AP-019', 20, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/air-purifier.svg"]'),
('Garden Tools Set', 'garden-tools-set', 'Complete set of garden tools for all your gardening needs.', 'Professional garden tools', 79.99, 99.99, 'GTS-020', 35, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/garden-tools.svg"]'),
('Smart Thermostat', 'smart-thermostat', 'WiFi smart thermostat that learns your schedule and saves energy.', 'Smart home thermostat', 129.99, 159.99, 'ST-021', 18, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/thermostat.svg"]'),
('Bed Sheets Set', 'bed-sheets-set', 'Luxury cotton bed sheets in various sizes and colors.', 'Premium cotton bed sheets', 69.99, 89.99, 'BSS-022', 50, (SELECT id FROM categories WHERE slug = 'home-garden'), 'active', false, '["/images/products/bed-sheets.svg"]'),

-- Sports Category
('Yoga Mat', 'yoga-mat', 'Non-slip yoga mat with excellent grip and cushioning.', 'Premium yoga mat', 39.99, 54.99, 'YM-023', 60, (SELECT id FROM categories WHERE slug = 'sports'), 'active', true, '["/images/products/yoga-mat.svg"]'),
('Dumbbell Set', 'dumbbell-set', 'Adjustable dumbbell set for home workouts.', 'Adjustable dumbbells', 149.99, 199.99, 'DS-024', 25, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/dumbbells.svg"]'),
('Running Treadmill', 'running-treadmill', 'Foldable treadmill with incline and heart rate monitoring.', 'Home treadmill', 599.99, 799.99, 'RT-025', 8, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/treadmill.svg"]'),
('Basketball', 'basketball', 'Official size basketball with excellent grip and durability.', 'Professional basketball', 29.99, 39.99, 'BB-026', 45, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/basketball.svg"]'),
('Swimming Goggles', 'swimming-goggles', 'Anti-fog swimming goggles with UV protection.', 'Competition swimming goggles', 24.99, 34.99, 'SG-027', 70, (SELECT id FROM categories WHERE slug = 'sports'), 'active', false, '["/images/products/goggles.svg"]'),

-- Books Category
('Programming Guide', 'programming-guide', 'Complete guide to modern programming techniques and best practices.', 'Programming fundamentals', 49.99, 69.99, 'PG-028', 80, (SELECT id FROM categories WHERE slug = 'books'), 'active', true, '["/images/products/book.svg"]'),
('Fiction Novel', 'fiction-novel', 'Bestselling fiction novel with compelling characters and plot.', 'Award-winning fiction', 16.99, 24.99, 'FN-029', 120, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'),
('Cookbook', 'cookbook', 'Beautiful cookbook with recipes from around the world.', 'International cuisine cookbook', 34.99, 44.99, 'CB-030', 90, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'),
('History Book', 'history-book', 'Comprehensive history book covering major world events.', 'World history reference', 42.99, 59.99, 'HB-031', 65, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'),
('Self-Help Book', 'self-help-book', 'Motivational self-help book for personal development.', 'Personal growth guide', 19.99, 29.99, 'SHB-032', 110, (SELECT id FROM categories WHERE slug = 'books'), 'active', false, '["/images/products/book.svg"]'),

-- Beauty Category
('Skincare Set', 'skincare-set', 'Complete skincare routine with cleanser, toner, and moisturizer.', 'Anti-aging skincare set', 89.99, 119.99, 'SS-033', 40, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', true, '["/images/products/placeholder.svg"]'),
('Makeup Palette', 'makeup-palette', 'Professional makeup palette with 20 versatile colors.', 'Professional makeup set', 49.99, 69.99, 'MP-034', 55, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'),
('Hair Dryer', 'hair-dryer', 'Professional hair dryer with ionic technology and multiple settings.', 'Ionic hair dryer', 79.99, 99.99, 'HD-035', 30, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'),
('Perfume', 'perfume', 'Luxury perfume with long-lasting fragrance.', 'Premium fragrance', 129.99, 159.99, 'PF-036', 25, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'),
('Face Mask Set', 'face-mask-set', 'Hydrating face mask set for all skin types.', 'Hydrating face masks', 24.99, 34.99, 'FMS-037', 75, (SELECT id FROM categories WHERE slug = 'beauty'), 'active', false, '["/images/products/placeholder.svg"]'),

-- Automotive Category
('Car Phone Mount', 'car-phone-mount', 'Magnetic phone mount for car dashboard with strong grip.', 'Dashboard phone holder', 19.99, 29.99, 'CPM-038', 100, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/car-mount.svg"]'),
('Car Charger', 'car-charger', 'Fast charging car charger with multiple USB ports.', 'USB car charger', 24.99, 34.99, 'CC-039', 85, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/car-charger.svg"]'),
('Car Floor Mats', 'car-floor-mats', 'All-weather car floor mats with custom fit.', 'All-weather floor mats', 49.99, 69.99, 'CFM-040', 60, (SELECT id FROM categories WHERE slug = 'automotive'), 'active', false, '["/images/products/floor-mats.svg"]'),

-- Health Category
('Blood Pressure Monitor', 'blood-pressure-monitor', 'Digital blood pressure monitor with large display.', 'Digital BP monitor', 59.99, 79.99, 'BPM-041', 45, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'),
('Vitamin Supplements', 'vitamin-supplements', 'Daily multivitamin supplements for overall health.', 'Daily multivitamins', 29.99, 39.99, 'VS-042', 90, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'),
('Massage Gun', 'massage-gun', 'Deep tissue massage gun for muscle recovery.', 'Therapeutic massage device', 89.99, 119.99, 'MG-043', 35, (SELECT id FROM categories WHERE slug = 'health'), 'active', false, '["/images/products/placeholder.svg"]'),

-- Toys Category
('Building Blocks Set', 'building-blocks-set', 'Creative building blocks set for endless fun.', 'Educational building blocks', 39.99, 54.99, 'BBS-044', 70, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'),
('Remote Control Car', 'remote-control-car', 'Fast remote control car with LED lights.', 'RC racing car', 79.99, 99.99, 'RCC-045', 40, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'),
('Board Game', 'board-game', 'Classic board game for family entertainment.', 'Strategy board game', 34.99, 44.99, 'BG-046', 55, (SELECT id FROM categories WHERE slug = 'toys'), 'active', false, '["/images/products/placeholder.svg"]'),

-- Jewelry Category
('Gold Necklace', 'gold-necklace', 'Elegant gold necklace with pendant.', '14K gold necklace', 299.99, 399.99, 'GN-047', 20, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', true, '["/images/products/necklace.svg"]'),
('Silver Ring', 'silver-ring', 'Sterling silver ring with gemstone.', 'Sterling silver ring', 89.99, 119.99, 'SR-048', 35, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', false, '["/images/products/ring.svg"]'),
('Diamond Earrings', 'diamond-earrings', 'Beautiful diamond earrings for special occasions.', 'Diamond stud earrings', 499.99, 699.99, 'DE-049', 15, (SELECT id FROM categories WHERE slug = 'jewelry'), 'active', false, '["/images/products/earrings.svg"]');

-- Orders and order items will be created dynamically by the application

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, product_id)
);

-- Sample wishlist items
INSERT INTO wishlist (user_id, product_id, created_at) VALUES
((SELECT id FROM users WHERE email = 'john@example.com'), (SELECT id FROM products WHERE sku = 'SFW-002'), NOW() - INTERVAL '2 days'),
((SELECT id FROM users WHERE email = 'john@example.com'), (SELECT id FROM products WHERE sku = 'WCP-003'), NOW() - INTERVAL '1 day'),
((SELECT id FROM users WHERE email = 'jane@example.com'), (SELECT id FROM products WHERE sku = 'PWH-001'), NOW() - INTERVAL '3 days'),
((SELECT id FROM users WHERE email = 'jane@example.com'), (SELECT id FROM products WHERE sku = 'BS-004'), NOW() - INTERVAL '1 day'),
((SELECT id FROM users WHERE email = 'bob@example.com'), (SELECT id FROM products WHERE sku = 'GN-047'), NOW() - INTERVAL '4 days');