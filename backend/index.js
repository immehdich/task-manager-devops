const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
host: process.env.DB_HOST || 'localhost',
port: process.env.DB_PORT || 5432,
database: process.env.DB_NAME || 'taskdb',
user: process.env.DB_USER || 'postgres',
password: process.env.DB_PASSWORD || 'postgres'
});

// GET all tasks
app.get('/tasks', async (req, res) => {
try {
const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
res.json(result.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// GET single task
app.get('/tasks/:id', async (req, res) => {
try {
const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
res.json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// POST create task
app.post('/tasks', async (req, res) => {
try {
const { title, description } = req.body;
const result = await pool.query(
'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
[title, description, 'pending']
);
res.status(201).json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
try {
const { title, description, status } = req.body;
const result = await pool.query(
'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
[title, description, status, req.params.id]
);
res.json(result.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
try {
await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
res.json({ message: 'Task deleted successfully' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Backend running on port ${PORT}`);
});