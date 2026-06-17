const express = require('express');
const pool = require('../db-connection');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/tournament/:tournament_id', async (req, res) => {
  try {
    const { tournament_id } = req.params;
    const result = await pool.query(`
      SELECT m.*, u1.username as player1_name, u2.username as player2_name, uw.username as winner_name
      FROM matches m
      LEFT JOIN users u1 ON m.player1_id = u1.id
      LEFT JOIN users u2 ON m.player2_id = u2.id
      LEFT JOIN users uw ON m.winner_id = uw.id
      WHERE m.tournament_id = $1
      ORDER BY m.round, m.id
    `, [tournament_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/result', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { winner_id } = req.body;

    if (!winner_id) return res.status(400).json({ error: 'Winner ID required' });

    const match = await pool.query('SELECT * FROM matches WHERE id = $1', [id]);
    if (!match.rows[0]) return res.status(404).json({ error: 'Match not found' });
    if (match.rows[0].status === 'completed') return res.status(400).json({ error: 'Result already recorded' });

    const tournament = await pool.query('SELECT * FROM tournaments WHERE id = $1', [match.rows[0].tournament_id]);
    if (tournament.rows[0].organizer_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    const m = match.rows[0];
    if (winner_id !== m.player1_id && winner_id !== m.player2_id) {
      return res.status(400).json({ error: 'Invalid winner' });
    }

    const result = await pool.query(
      'UPDATE matches SET winner_id = $1, status = $2 WHERE id = $3 RETURNING *',
      [winner_id, 'completed', id]
    );

    const current_match = result.rows[0];
    const all_matches = await pool.query(
      'SELECT * FROM matches WHERE tournament_id = $1 AND round = $2 ORDER BY id',
      [current_match.tournament_id, current_match.round]
    );

    const all_complete = all_matches.rows.every(m => m.status === 'completed');
    if (all_complete) {
      if (all_matches.rows.length > 1) {
        const next_round = current_match.round + 1;
        const winners = all_matches.rows.map(m => m.winner_id);

        for (let i = 0; i < winners.length; i += 2) {
          if (winners[i + 1]) {
            await pool.query(
              'INSERT INTO matches (tournament_id, round, player1_id, player2_id) VALUES ($1, $2, $3, $4)',
              [current_match.tournament_id, next_round, winners[i], winners[i + 1]]
            );
          }
        }
      } else if (all_matches.rows.length === 1) {
        // Final match of the tournament has completed!
        const final_match = all_matches.rows[0];
        const runner_up_id = final_match.winner_id === final_match.player1_id ? final_match.player2_id : final_match.player1_id;

        await pool.query(
          "UPDATE tournaments SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE id = $1",
          [current_match.tournament_id]
        );

        // Record winner in leaderboard
        await pool.query(
          "INSERT INTO leaderboard (tournament_id, user_id, placement, points) VALUES ($1, $2, 1, 100) ON CONFLICT (tournament_id, user_id) DO NOTHING",
          [current_match.tournament_id, final_match.winner_id]
        );

        // Record runner-up in leaderboard
        if (runner_up_id) {
          await pool.query(
            "INSERT INTO leaderboard (tournament_id, user_id, placement, points) VALUES ($1, $2, 2, 50) ON CONFLICT (tournament_id, user_id) DO NOTHING",
            [current_match.tournament_id, runner_up_id]
          );
        }
      }
    }

    res.json({ message: 'Result recorded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record result' });
  }
});

module.exports = router;
