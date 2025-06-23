/*

-- 1. ROLES TABLE
CREATE TABLE brewcrafter.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL CHECK (name IN ('admin', 'customer')),
    description TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS TABLE (client and admin)
CREATE TABLE brewcrafter.users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INTEGER REFERENCES brewcrafter.roles(id),
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR (250) UNIQUE NOT NULL,
    user_password VARCHAR (250) NOT NULL,
    user_phone VARCHAR (50),
    user_address TEXT,
    loyalty_points INTEGER DEFAULT 0,
    last_login TIMESTAMP,
    user_status VARCHAR (50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. CATEGORIES TABLE
CREATE TABLE brewcrafter.categories(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR (100) UNIQUE NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 4. PRODUCT TABLE
CREATE TABLE brewcrafter.products(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id INTEGER REFERENCES brewcrafter.categories(id),
    product_name VARCHAR (100) NOT NULL,
    product_description TEXT,
    product_price DECIMAL (10,2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    ingredients TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 5. ORDER TABLES
CREATE TABLE brewcrafter.orders(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES brewcrafter.users(id),
    total_amount DECIMAL (10, 2) NOT NULL,
    status VARCHAR (20) DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT 'cash',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 6. ORDERED ITEMS
CREATE TABLE brewcrafter.order_items(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES brewcrafter.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES brewcrafter.products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL (10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 7. CUSTOM DRINKS
CREATE TABLE brewcrafter.custom_drinks(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES brewcrafter.users(id),
    base VARCHAR (100) NOT NULL,
    size VARCHAR (100) NOT NULL,
    milk VARCHAR (100),
    sweetener VARCHAR(50),
    toppings TEXT[], -- this is the extras. can be skipped
    add_ins TEXT[], -- add ins. can be skipped
    temperature VARCHAR(20), -- final touches
    name VARCHAR (100) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 8. CART TABLE
CREATE TABLE brewcrafter.cart_items(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES brewcrafter.users(id),
    product_id UUID REFERENCES brewcrafter.products(id),
    custom_drink_id UUID REFERENCES brewcrafter.custom_drinks(id),
    quantity INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_item CHECK(
        (product_id IS NOT NULL AND custom_drink_id IS NULL) OR
        (product_id IS NULL AND custom_drink_id IS NOT NULL)
    )
);


-- 9. INVENTORY TABLE
CREATE TABLE brewcrafter.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_level DECIMAL(10,2),
    price_per_unit DECIMAL(10,2),
    category_id INTEGER REFERENCES brewcrafter.categories(id),
    status VARCHAR(20) DEFAULT 'In Stock',
    last_restocked TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/


/*
ALTER TABLE brewcrafter.users
ADD COLUMN is_verified BOOLEAN DEFAULT false,
ADD COLUMN verification_token TEXT,
ADD COLUMN google_id TEXT,
ADD COLUMN facebook_id TEXT;
*/

/*
INSERT INTO brewcrafter.roles (id, name, description) 
VALUES 
  (1, 'admin', 'Administrator role'),
  (2, 'customer', 'Regular customer role')
*/


-- admin user and password
 /*
INSERT INTO brewcrafter.roles (id, name, description) 
VALUES 
  (1, 'admin', 'Administrator role'),
  (2, 'customer', 'Regular customer role')
ON CONFLICT (id) DO NOTHING;

INSERT INTO brewcrafter.users (
    role_id, user_name, user_email, user_password, is_verified
) VALUES (
    1, 'Admin', 'super.admin.2025@brewcrafter.com', '$2b$10$mA08OSVyaUTVDyFSxhTPSu5bO/gMsCgSzkxOOXpeqYT5ngvlesUFa', true
);

DELETE FROM brewcrafter.users WHERE role_id = 1 AND user_email != 'super.admin.2025@brewcrafter.com';
*/


 
/*
SELECT id, total_amount, status, created_at
FROM brewcrafter.orders
WHERE created_at >= NOW() - INTERVAL '6 days'
ORDER BY created_at DESC;

UPDATE brewcrafter.orders
SET status = 'completed'
WHERE status = 'pending'
  AND created_at >= NOW() - INTERVAL '6 days';
  
  
UPDATE brewcrafter.orders
SET status = 'completed'
WHERE status != 'completed';
*/


/*

SELECT id, total_amount, status, created_at
FROM brewcrafter.orders
ORDER BY created_at DESC;

SELECT id, total_amount, status, created_at
FROM brewcrafter.orders
WHERE DATE(created_at) = CURRENT_DATE
  AND status = 'completed';
  
  
  
UPDATE brewcrafter.orders
SET status = 'completed', created_at = NOW()
WHERE status != 'completed' OR DATE(created_at) != CURRENT_DATE;

UPDATE brewcrafter.order_items
SET created_at = NOW()
WHERE DATE(created_at) != CURRENT_DATE;


SELECT * FROM brewcrafter.order_items
WHERE custom_drink_id IS NOT NULL
  AND DATE(created_at) = CURRENT_DATE;
  
SELECT * FROM brewcrafter.order_items;

SELECT * FROM brewcrafter.orders;

DELETE FROM brewcrafter.order_items;
DELETE FROM brewcrafter.orders;

SELECT column_name FROM information_schema.columns
WHERE table_name = 'order_items';

SELECT * FROM brewcrafter.orders


SELECT * FROM brewcrafter.orders WHERE DATE(created_at) = CURRENT_DATE AND status = 'completed';
SELECT * FROM brewcrafter.order_items WHERE DATE(created_at) = CURRENT_DATE AND custom_drink_id IS NOT NULL;

SHOW timezone;

SELECT * FROM products;

SELECT * FROM brewcrafter.users;

ALTER TABLE brewcrafter.users ADD COLUMN birthday DATE;
ALTER TABLE brewcrafter.users
  ADD COLUMN failed_login_attempts INT DEFAULT 0,
  ADD COLUMN last_failed_login TIMESTAMP,
  ADD COLUMN is_locked BOOLEAN DEFAULT FALSE,
  ADD COLUMN lock_until TIMESTAMP;
  
*/

DELETE FROM brewcrafter.users WHERE user_email = 'cosgafa.j.bscs@gmail.com';


DELETE FROM brewcrafter.custom_drinks
WHERE user_id = (SELECT id FROM brewcrafter.users WHERE user_email = 'duartejudeanthone@gmail.com');

DELETE FROM brewcrafter.users
WHERE user_email = 'hudeus28@gmail.com';

SELECT user_email, birthday FROM brewcrafter.users WHERE user_email = 'judeanthone28@gmail.com';


SELECT * FROM brewcrafter.users


ALTER TABLE brewcrafter.users ALTER COLUMN birthday TYPE VARCHAR(10);

DELETE FROM brewcrafter.users WHERE user_email = 'brewcraftercs2a@gmail.com';

SELECT user_email, verification_token FROM brewcrafter.users WHERE user_email = 'brewcraftercs2a@gmail.com';

ALTER TABLE brewcrafter.users ADD COLUMN stepup_token VARCHAR(10);

DELETE FROM brewcrafter.users WHERE user_email = 'hudeus28@gmail.com';


-- Insert into orders
INSERT INTO brewcrafter.orders (id, user_id, total_amount, status, payment_method, created_at, updated_at)
VALUES (
  '4c14add9-9f2b-40e1-8214-283b55288127',
  '9e7300ed-526b-4566-aa89-0989b85a660d',
  250.00,
  'completed',
  'cash',
  '2025-06-21 10:00:00',
  '2025-06-21 10:00:00'
);

-- Insert into order_items (example)
INSERT INTO brewcrafter.order_items (order_id, product_id, custom_drink_id, quantity, unit_price, subtotal, notes, created_at)
VALUES (
  '4c14add9-9f2b-40e1-8214-283b55288127',
  '"acaa7d06-b6c5-4087-92b8-f005605144cb"',
  NULL,
  2,
  125.00,
  250.00,
  'No sugar',
  '2025-06-21 10:00:00'
);

SELECT * FROM brewcrafter.testing