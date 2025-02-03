-- DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
    unique_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Renamed id to unique_id
    user_id SERIAL UNIQUE NOT NULL, -- Auto-incrementing user ID
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    -- role VARCHAR(20) CHECK (role IN ('patient', 'psychologist')) NOT NULL,
    img VARCHAR(255) DEFAULT 'no_image.jpg', -- Stores the image path
    status VARCHAR(20) DEFAULT 'Offline now', -- User status (Active now / Offline now)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
