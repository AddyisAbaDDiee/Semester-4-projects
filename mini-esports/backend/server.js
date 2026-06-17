require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db-connection');

const app = express();
app.use(cors());
app.use(express.json());

// Test connection (SQLite-compatible)
pool.query('SELECT 1 AS test', (err, res) => {
  if (err) console.error('Database connection error:', err);
  else console.log('✓ Database connected');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/games', require('./routes/games'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/users', require('./routes/users'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = pool;
