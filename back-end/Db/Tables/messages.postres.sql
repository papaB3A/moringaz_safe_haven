CREATE TABLE messages (
    msg_id SERIAL PRIMARY KEY, -- Auto-incrementing message ID
    incoming_msg_id UUID NOT NULL, -- Sender's unique_id (user who sent the message)
    outgoing_msg_id UUID NOT NULL, -- Receiver's unique_id (user who receives the message)
    msg TEXT NOT NULL, -- Message content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of message sent
    FOREIGN KEY (incoming_msg_id) REFERENCES users(unique_id) ON DELETE CASCADE, -- Links sender to users table
    FOREIGN KEY (outgoing_msg_id) REFERENCES users(unique_id) ON DELETE CASCADE  -- Links receiver to users table
);
