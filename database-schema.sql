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
    currency TEXT DEFAULT 'USD' NOT NULL,
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
-- Sample categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Latest gadgets and technology'),
('Fashion', 'fashion', 'Trendy clothing and accessories'),
('Home & Garden', 'home-garden', 'Everything for your home'),
('Sports', 'sports', 'Fitness and outdoor gear'),
('Books', 'books', 'Knowledge and entertainment'),
('Beauty', 'beauty', 'Health and beauty products');

-- Sample admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', 'admin');

-- Sample regular users (password: user123)
INSERT INTO users (name, email, password, role, phone, address, city, country, zip_code) VALUES
('John Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', 'user', '+1-555-0123', '123 Main St', 'New York', 'USA', '10001'),
('Jane Smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', 'user', '+1-555-0124', '456 Oak Ave', 'Los Angeles', 'USA', '90210'),
('Bob Johnson', 'bob@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', 'user', '+1-555-0125', '789 Pine Rd', 'Chicago', 'USA', '60601');

-- Sample products with images
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, quantity, category_id, status, featured, images) VALUES
('Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.', 'Premium wireless headphones with noise cancellation', 299.99, 399.99, 'PWH-001', 50, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/headphones.svg"]'),
('Smart Fitness Watch', 'smart-fitness-watch', 'Advanced fitness tracking with heart rate monitoring, GPS, and water resistance. Track your workouts and health metrics.', 'Smart fitness watch with health tracking', 199.99, 249.99, 'SFW-002', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/watch.svg"]'),
('Wireless Charging Pad', 'wireless-charging-pad', 'Fast wireless charging for your devices. Compatible with all Qi-enabled smartphones and accessories.', 'Fast wireless charging pad', 49.99, 69.99, 'WCP-003', 30, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/placeholder.svg"]'),
('Bluetooth Speaker', 'bluetooth-speaker', 'Portable speaker with excellent sound quality and long battery life. Perfect for outdoor adventures and parties.', 'Portable Bluetooth speaker', 79.99, 99.99, 'BS-004', 15, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/speaker.svg"]'),
('Gaming Laptop', 'gaming-laptop', 'High-performance gaming laptop with RTX graphics and fast SSD storage. Perfect for gaming and content creation.', 'High-performance gaming laptop', 1299.99, 1499.99, 'GL-005', 8, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/laptop.svg"]'),
('Smartphone Pro', 'smartphone-pro', 'Latest smartphone with advanced camera system, 5G connectivity, and all-day battery life.', 'Latest smartphone with pro camera', 899.99, 999.99, 'SP-006', 20, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', true, '["/images/products/phone.svg"]'),
('Digital Camera', 'digital-camera', 'Professional digital camera with 4K video recording and advanced autofocus system.', 'Professional digital camera', 599.99, 699.99, 'DC-007', 12, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/camera.svg"]'),
('Tablet Pro', 'tablet-pro', 'High-resolution tablet with powerful processor and long battery life. Perfect for work and entertainment.', 'High-resolution tablet', 399.99, 499.99, 'TP-008', 18, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/tablet.svg"]'),
('Mechanical Keyboard', 'mechanical-keyboard', 'Premium mechanical keyboard with RGB lighting and tactile switches for the ultimate typing experience.', 'Premium mechanical keyboard', 149.99, 179.99, 'MK-009', 25, (SELECT id FROM categories WHERE slug = 'electronics'), 'active', false, '["/images/products/keyboard.svg"]');

-- Sample orders
INSERT INTO orders (order_number, user_id, status, payment_status, payment_method, subtotal, tax, shipping, total, currency, shipping_address, created_at) VALUES
('ORD-2024-001', (SELECT id FROM users WHERE email = 'john@example.com'), 'delivered', 'paid', 'credit_card', 299.99, 24.00, 9.99, 333.98, 'USD', '{"firstName": "John", "lastName": "Doe", "address1": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001", "country": "USA"}', NOW() - INTERVAL '5 days'),
('ORD-2024-002', (SELECT id FROM users WHERE email = 'jane@example.com'), 'processing', 'paid', 'paypal', 149.99, 12.00, 9.99, 171.98, 'USD', '{"firstName": "Jane", "lastName": "Smith", "address1": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zipCode": "90210", "country": "USA"}', NOW() - INTERVAL '3 days'),
('ORD-2024-003', (SELECT id FROM users WHERE email = 'bob@example.com'), 'pending', 'pending', 'credit_card', 89.99, 7.20, 9.99, 107.18, 'USD', '{"firstName": "Bob", "lastName": "Johnson", "address1": "789 Pine Rd", "city": "Chicago", "state": "IL", "zipCode": "60601", "country": "USA"}', NOW() - INTERVAL '1 day');

-- Sample order items
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
((SELECT id FROM orders WHERE order_number = 'ORD-2024-001'), (SELECT id FROM products WHERE sku = 'PWH-001'), 1, 299.99, 299.99),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), (SELECT id FROM products WHERE sku = 'SFW-002'), 1, 199.99, 199.99),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-003'), (SELECT id FROM products WHERE sku = 'WCP-003'), 1, 49.99, 49.99),
((SELECT id FROM orders WHERE order_number = 'ORD-2024-003'), (SELECT id FROM products WHERE sku = 'BS-004'), 1, 79.99, 79.99);
