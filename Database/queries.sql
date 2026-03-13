-- =========================
-- USERS TABLE (stores registered users)
-- =========================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- RESTAURANTS TABLE (stores restaurants information)
-- =========================
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- TABLES TABLE (tables available in each restaurant)
-- =========================
CREATE TABLE tables (
    table_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    table_number VARCHAR(10) NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- BOOKINGS TABLE (reservations made by users)
-- =========================
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    table_id INTEGER REFERENCES tables(table_id) ON DELETE CASCADE,
    number_of_people INTEGER NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    arrival_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed'
);


-- =========================
-- WAITING LIST TABLE (queue when restaurant is full)
-- =========================
CREATE TABLE waiting_list (
    wait_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    number_of_people INTEGER NOT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'waiting'
);