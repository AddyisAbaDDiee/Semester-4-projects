import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Home({ token }) {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await API.get('/tournaments');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mini Esports Tournament Manager
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Organize and manage gaming tournaments with ease
        </p>
        {!token && (
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Active Tournaments</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading tournaments...</div>
        ) : tournaments.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No tournaments yet. {token && <Link to="/create" className="text-primary">Create one!</Link>}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="card hover:border-primary transition cursor-pointer">
                <div className="text-3xl mb-2">{tournament.icon}</div>
                <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                <p className="text-gray-400 mb-2">{tournament.game_name}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {tournament.player_count}/{tournament.max_players} players
                </p>
                <Link
                  to={`/tournament/${tournament.id}`}
                  className="btn-primary w-full text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
