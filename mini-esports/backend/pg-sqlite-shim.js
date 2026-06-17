const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

class Pool {
  constructor(config) {
    console.log('Using SQLite Database Shim at:', dbPath);
  }

  on(event, callback) {
    // Mock error handler
    if (event === 'error') {
      db.on('error', callback);
    }
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      let sqliteSql = sql;
      
      // 1. Convert SERIAL PRIMARY KEY to INTEGER PRIMARY KEY AUTOINCREMENT for SQLite
      sqliteSql = sqliteSql.replace(/SERIAL PRIMARY KEY/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
      
      // 2. Convert PostgreSQL placeholders ($1, $2, ...) to SQLite placeholders (?)
      sqliteSql = sqliteSql.replace(/\$\d+/g, '?');

      // 3. For schema setup with multiple statements and no parameters, use db.exec
      const statements = sqliteSql.trim().split(';').filter(s => s.trim().length > 0);
      if (params.length === 0 && statements.length > 1) {
        db.exec(sqliteSql, (err) => {
          if (err) {
            console.error('SQLite exec error:', err.message, '\nSQL:', sqliteSql);
            reject(err);
          } else {
            resolve({ rows: [] });
          }
        });
      } else {
        db.all(sqliteSql, params, (err, rows) => {
          if (err) {
            console.error('SQLite query error:', err.message, '\nSQL:', sqliteSql, '\nParams:', params);
            reject(err);
          } else {
            resolve({ rows: rows || [] });
          }
        });
      }
    });
  }

  async connect() {
    return this;
  }

  release() {}

  async end() {
    return new Promise((resolve) => {
      db.close(() => resolve());
    });
  }
}

module.exports = { Pool };
