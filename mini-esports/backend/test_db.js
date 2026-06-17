require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database time:', res.rows[0].now);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);
    console.log('Tables in database:', tables.rows.map(r => r.table_name));

    await pool.end();
  } catch (err) {
    console.error('Error running test query:', err);
    await pool.end();
  }
}

run();
