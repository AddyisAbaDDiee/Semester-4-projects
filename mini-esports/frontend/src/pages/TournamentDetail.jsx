import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function TournamentDetail({ token, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await API.get(`/tournaments/${id}`);
        setTournament(tourRes.data);
      } catch (err) {
        setError('Tournament not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleJoin = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await API.post(`/tournaments/${id}/join`);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join tournament');
    }
  };

  const handleLockBracket = async () => {
    try {
      await API.post(`/tournaments/${id}/lock-bracket`);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to lock bracket');
    }
  };

  if (loading) return <div className="text-center mt-12 text-gray-400">Loading...</div>;
  if (!tournament) return <div className="text-center mt-12 text-red-400">{error}</div>;

  const isOrganizer = user && user.id === tournament.organizer_id;
  const isRegistered = tournament.players?.some(p => p.id === user?.id);
  const isFull = tournament.player_count >= tournament.max_players;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-5xl mb-3">{tournament.icon}</div>
            <h1 className="text-4xl font-bold mb-2">{tournament.name}</h1>
            <p className="text-xl text-gray-400">{tournament.game_name}</p>
            <p className="text-sm text-gray-500 mt-2">Hosted by {tournament.organizer_name}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary mb-2">{tournament.player_count}/{tournament.max_players}</div>
            <div className="px-4 py-2 bg-blue-900 rounded inline-block">
              <p className="text-sm font-semibold">{tournament.status.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4">{error}</div>}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500 text-sm">Registration Deadline</p>
            <p className="text-lg font-semibold">
              {new Date(tournament.registration_deadline).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Format</p>
            <p className="text-lg font-semibold">Single Elimination</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center mb-6">
          {tournament.status === 'registration' && (
            <>
              {isRegistered ? (
                <div className="px-4 py-2 bg-green-900/50 border border-green-500 text-green-400 font-semibold rounded-lg">
                  ✓ Registered (Ready)
                </div>
              ) : isFull ? (
                <div className="px-4 py-2 bg-red-900/50 border border-red-500 text-red-400 font-semibold rounded-lg">
                  Tournament Full
                </div>
              ) : (
                <button onClick={handleJoin} className="btn-secondary">
                  Join Tournament
                </button>
              )}
            </>
          )}

          {tournament.status === 'registration' && isOrganizer && (
            <button onClick={handleLockBracket} className="btn-primary">
              Lock Bracket & Start
            </button>
          )}

          {(tournament.status === 'locked' || tournament.status === 'completed') && (
            <button onClick={() => navigate(`/tournament/${id}/bracket`)} className="btn-primary">
              View Bracket
            </button>
          )}
        </div>

        {/* Leaderboard Section for Completed Tournaments */}
        {tournament.status === 'completed' && tournament.leaderboard && tournament.leaderboard.length > 0 && (
          <div className="border-t border-gray-700 pt-6 mt-6 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent p-5 rounded-lg border border-yellow-500/20">
            <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
              🏆 Final Results
            </h3>
            <div className="space-y-3">
              {tournament.leaderboard.map((entry) => (
                <div key={entry.user_id} className={`flex justify-between items-center p-3 rounded border ${
                  entry.placement === 1 
                    ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-200' 
                    : 'bg-gray-700/40 border-gray-600/50 text-gray-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {entry.placement === 1 ? '🥇' : '🥈'}
                    </span>
                    <span className="font-bold text-lg">{entry.username}</span>
                    {entry.user_id === tournament.organizer_id && (
                      <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded font-semibold">
                        Host
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{entry.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registered Players List Section */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Registered Players ({tournament.player_count}/{tournament.max_players})</h3>
          {tournament.players && tournament.players.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {tournament.players.map((p, idx) => (
                <div key={p.id} className="p-3 bg-gray-750 rounded border border-gray-700 flex items-center gap-2">
                  <span className="text-gray-500 font-bold text-sm">#{idx + 1}</span>
                  <span className="font-semibold text-gray-200 truncate flex-1">{p.username}</span>
                  {p.id === tournament.organizer_id && (
                    <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded font-semibold">
                      Host
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No players registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
