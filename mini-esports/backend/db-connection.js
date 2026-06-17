const { Pool } = require('./pg-sqlite-shim');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mini_esports',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => console.error('Pool error:', err));

module.exports = pool;