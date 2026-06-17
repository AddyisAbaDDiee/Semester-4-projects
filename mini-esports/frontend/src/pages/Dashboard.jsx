import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Dashboard({ user }) {
  const [organizing, setOrganizing] = useState([]);
  const [participating, setParticipating] = useState([]);
  const [activeTab, setActiveTab] = useState('organizing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      if (!user) return;
      try {
        const [orgRes, partRes] = await Promise.all([
          API.get(`/tournaments?organizer_id=${user.id}`),
          API.get(`/tournaments?participant_id=${user.id}`)
        ]);
        setOrganizing(orgRes.data);
        setParticipating(partRes.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [user]);

  const currentTournaments = activeTab === 'organizing' ? organizing : participating;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Tournaments</h1>
        <Link to="/create" className="btn-primary">
          + Create New
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('organizing')}
          className={`py-3 px-6 font-bold text-lg border-b-2 transition ${
            activeTab === 'organizing'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Organizing ({organizing.length})
        </button>
        <button
          onClick={() => setActiveTab('participating')}
          className={`py-3 px-6 font-bold text-lg border-b-2 transition ${
            activeTab === 'participating'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Participating ({participating.length})
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading...</div>
      ) : currentTournaments.length === 0 ? (
        <div className="text-center text-gray-400 py-12 card">
          <p className="mb-4">
            {activeTab === 'organizing'
              ? "You haven't created any tournaments yet."
              : "You haven't joined any tournaments yet."}
          </p>
          {activeTab === 'organizing' && (
            <Link to="/create" className="btn-primary inline-block">
              Create Tournament
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTournaments.map((t) => (
            <div key={t.id} className="card hover:border-gray-600 transition">
              <div className="text-4xl mb-3">{t.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
              <p className="text-gray-400 mb-1">{t.game_name}</p>
              <p className="text-sm text-gray-500 mb-4">
                {t.player_count}/{t.max_players} players • Status: <span className="text-primary font-semibold">{t.status.toUpperCase()}</span>
              </p>
              <div className="flex gap-2">
                <Link to={`/tournament/${t.id}`} className="btn-primary flex-1 text-center">
                  View
                </Link>
                {(t.status === 'locked' || t.status === 'completed') && (
                  <Link to={`/tournament/${t.id}/bracket`} className="btn-secondary flex-1 text-center">
                    Bracket
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
