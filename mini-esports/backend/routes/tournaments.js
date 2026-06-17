const express = require('express');
const pool = require('../db-connection');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Helper: Generate single elimination bracket
const generateBracket = async (tournament_id, players) => {
  const rounds = Math.ceil(Math.log2(players.length));
  const bracket_size = Math.pow(2, rounds);
  const num_matches = bracket_size / 2;
  const num_active = players.length - num_matches;

  const shuffled = [...players].sort(() => Math.random() - 0.5);

  for (let m = 0; m < num_matches; m++) {
    if (m < num_active) {
      const p1 = shuffled[2 * m];
      const p2 = shuffled[2 * m + 1];
      await pool.query(
        'INSERT INTO matches (tournament_id, round, player1_id, player2_id, status) VALUES ($1, $2, $3, $4, $5)',
        [tournament_id, 1, p1, p2, 'pending']
      );
    } else {
      const p1 = shuffled[2 * num_active + (m - num_active)];
      await pool.query(
        'INSERT INTO matches (tournament_id, round, player1_id, winner_id, status) VALUES ($1, $2, $3, $4, $5)',
        [tournament_id, 1, p1, p1, 'completed']
      );
    }
  }
};

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { game_id, name, max_players, registration_deadline } = req.body;
    const organizer_id = req.user.id;

    if (!name || !game_id || !max_players || !registration_deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (![2, 4, 8, 16, 32].includes(max_players)) {
      return res.status(400).json({ error: 'Invalid player count' });
    }
    if (new Date(registration_deadline) <= new Date()) {
      return res.status(400).json({ error: 'Deadline must be in the future' });
    }

    const gameCheck = await pool.query('SELECT id FROM games WHERE id = $1', [game_id]);
    if (!gameCheck.rows[0]) return res.status(400).json({ error: 'Invalid game' });

    const result = await pool.query(
      'INSERT INTO tournaments (organizer_id, game_id, name, max_players, registration_deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [organizer_id, game_id, name, max_players, registration_deadline]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tournament' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { organizer_id, participant_id } = req.query;
    let query = `
      SELECT t.*, g.name as game_name, g.icon, u.username as organizer_name,
             COUNT(r.id) as player_count
      FROM tournaments t
      JOIN games g ON t.game_id = g.id
      JOIN users u ON t.organizer_id = u.id
      LEFT JOIN registrations r ON t.id = r.tournament_id AND r.status = 'registered'
    `;
    const params = [];
    const conditions = [];

    if (organizer_id) {
      params.push(organizer_id);
      conditions.push(`t.organizer_id = $${params.length}`);
    }

    if (participant_id) {
      params.push(participant_id);
      conditions.push(`t.id IN (SELECT tournament_id FROM registrations WHERE user_id = $${params.length} AND status = 'registered')`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += `
      GROUP BY t.id, g.name, g.icon, u.username
      ORDER BY t.created_at DESC
    `;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT t.*, g.name as game_name, g.icon, u.username as organizer_name,
             COUNT(r.id) as player_count
      FROM tournaments t
      JOIN games g ON t.game_id = g.id
      JOIN users u ON t.organizer_id = u.id
      LEFT JOIN registrations r ON t.id = r.tournament_id AND r.status = 'registered'
      WHERE t.id = $1
      GROUP BY t.id, g.name, g.icon, u.username
    `, [id]);

    if (!result.rows[0]) return res.status(404).json({ error: 'Tournament not found' });
    
    const tournament = result.rows[0];

    // Fetch registered players
    const playersResult = await pool.query(`
      SELECT u.id, u.username, u.email, r.registration_time
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.tournament_id = $1 AND r.status = 'registered'
      ORDER BY r.registration_time ASC
    `, [id]);
    tournament.players = playersResult.rows;

    // Fetch leaderboard if tournament is completed
    const leaderboardResult = await pool.query(`
      SELECT l.placement, l.points, u.username, u.id as user_id
      FROM leaderboard l
      JOIN users u ON l.user_id = u.id
      WHERE l.tournament_id = $1
      ORDER BY l.placement ASC
    `, [id]);
    tournament.leaderboard = leaderboardResult.rows;

    res.json(tournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/join', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const tournament = await pool.query('SELECT * FROM tournaments WHERE id = $1', [id]);
    if (!tournament.rows[0]) return res.status(404).json({ error: 'Tournament not found' });
    if (tournament.rows[0].status !== 'registration') return res.status(400).json({ error: 'Registration closed' });
    if (new Date(tournament.rows[0].registration_deadline) <= new Date()) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    // Check if already registered
    const existing = await pool.query(
      'SELECT id FROM registrations WHERE tournament_id = $1 AND user_id = $2 AND status = $3',
      [id, user_id, 'registered']
    );
    if (existing.rows[0]) return res.status(400).json({ error: 'Already registered' });

    // Check if tournament is full
    const count = await pool.query(
      'SELECT COUNT(*) FROM registrations WHERE tournament_id = $1 AND status = $2',
      [id, 'registered']
    );
    if (parseInt(count.rows[0].count) >= tournament.rows[0].max_players) {
      return res.status(400).json({ error: 'Tournament is full' });
    }

    const result = await pool.query(
      'INSERT INTO registrations (tournament_id, user_id) VALUES ($1, $2) RETURNING *',
      [id, user_id]
    );

    res.json({ message: 'Successfully joined tournament' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join tournament' });
  }
});

router.post('/:id/lock-bracket', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const tournament = await pool.query('SELECT * FROM tournaments WHERE id = $1', [id]);
    if (!tournament.rows[0]) return res.status(404).json({ error: 'Tournament not found' });
    if (tournament.rows[0].organizer_id !== user_id) return res.status(403).json({ error: 'Unauthorized' });
    if (tournament.rows[0].status !== 'registration') return res.status(400).json({ error: 'Bracket already locked' });

    const players = await pool.query(
      'SELECT user_id FROM registrations WHERE tournament_id = $1 AND status = $2',
      [id, 'registered']
    );

    const player_ids = players.rows.map(r => r.user_id);
    if (player_ids.length < 2) return res.status(400).json({ error: 'Minimum 2 players required' });

    await generateBracket(id, player_ids);

    const result = await pool.query(
      'UPDATE tournaments SET status = $1, bracket_locked_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      ['locked', id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to lock bracket' });
  }
});

module.exports = router;
