import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function CreateTournament() {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    game_id: '',
    max_players: 8,
    registration_deadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await API.get('/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'max_players' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/tournaments', {
        ...formData,
        registration_deadline: new Date(formData.registration_deadline).toISOString()
      });
      navigate(`/tournament/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tournament');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 card">
      <h2 className="text-3xl font-bold mb-6">Create Tournament</h2>
      {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tournament Name</label>
          <input
            type="text"
            name="name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Game</label>
          <select
            name="game_id"
            className="input-field"
            value={formData.game_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a game...</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.icon} {game.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Max Players</label>
          <select
            name="max_players"
            className="input-field"
            value={formData.max_players}
            onChange={handleChange}
          >
            {[2, 4, 8, 16, 32].map((num) => (
              <option key={num} value={num}>
                {num} Players
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Registration Deadline</label>
          <input
            type="datetime-local"
            name="registration_deadline"
            className="input-field"
            value={formData.registration_deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Create Tournament'}
        </button>
      </form>
    </div>
  );
}
