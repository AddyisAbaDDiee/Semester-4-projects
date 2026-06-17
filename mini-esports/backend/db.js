require('dotenv').config();
const { Pool } = require('./pg-sqlite-shim');

const initDb = async () => {
  try {
    // Connect directly to the database
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
      ssl: { rejectUnauthorized: false }
    });

    console.log('Creating tables...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        icon VARCHAR(20) DEFAULT '🎮'
      );

      CREATE TABLE IF NOT EXISTS tournaments (
        id SERIAL PRIMARY KEY,
        organizer_id INTEGER NOT NULL REFERENCES users(id),
        game_id INTEGER NOT NULL REFERENCES games(id),
        name VARCHAR(255) NOT NULL,
        format VARCHAR(50) DEFAULT 'single_elimination',
        max_players INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'registration' CHECK (status IN ('registration', 'locked', 'in_progress', 'completed', 'cancelled')),
        registration_deadline TIMESTAMP NOT NULL,
        bracket_locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'registered' CHECK (status IN ('registered', 'withdrawn')),
        UNIQUE(tournament_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
        round INTEGER NOT NULL,
        player1_id INTEGER REFERENCES users(id),
        player2_id INTEGER REFERENCES users(id),
        winner_id INTEGER REFERENCES users(id),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
        scheduled_time TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL REFERENCES tournaments(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        placement INTEGER NOT NULL,
        points INTEGER DEFAULT 0,
        UNIQUE(tournament_id, user_id)
      );

      CREATE INDEX idx_tournament_status ON tournaments(status);
      CREATE INDEX idx_match_tournament ON matches(tournament_id);
      CREATE INDEX idx_registration_tournament ON registrations(tournament_id);
    `);

    console.log('✓ Tables created');

    // Seed games
    const gamesToInsert = [
      { name: 'Tekken 8', icon: '🥋' },
      { name: 'Street Fighter 6', icon: '👊' },
      { name: 'Valorant', icon: '🎯' },
      { name: 'League of Legends', icon: '⚔️' },
      { name: 'Counter-Strike 2', icon: '🔫' },
      { name: 'Dota 2', icon: '⚡' },
      { name: 'Super Smash Bros', icon: '💥' },
      { name: 'Fortnite', icon: '🏚️' },
      { name: 'Apex Legends', icon: '🎪' },
      { name: 'Overwatch 2', icon: '🛡️' }
    ];

    for (const game of gamesToInsert) {
      await pool.query(
        'INSERT INTO games (name, icon) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING',
        [game.name, game.icon]
      );
    }

    console.log('✓ Games seeded');
    console.log('\n✅ Database setup complete!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('⚠️  Database already exists, skipping creation');

      const pool = new Pool({
        connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mini_esports'
      });

      try {
        const result = await pool.query('SELECT COUNT(*) FROM games');
        if (result.rows[0].count > 0) {
          console.log('✅ Database already initialized');
          await pool.end();
          process.exit(0);
        }
      } catch (e) {
        console.log('Re-initializing tables...');
      }
    }

    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

initDb();
