CREATE TABLE IF NOT EXISTS tasks (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status VARCHAR(50) DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
('First Task', 'This is the first task', 'pending'),
('Second Task', 'This is the second task', 'completed'),
('Third Task', 'This is the third task', 'pending');
