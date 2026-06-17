import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function Bracket({ token, user }) {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await API.get(`/tournaments/${id}`);
        const matchRes = await API.get(`/matches/tournament/${id}`);
        setTournament(tourRes.data);
        setMatches(matchRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateResult = async (matchId, winnerId) => {
    try {
      await API.post(`/matches/${matchId}/result`, { winner_id: winnerId });
      window.location.reload();
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  if (loading) return <div className="text-center mt-12 text-gray-400">Loading bracket...</div>;
  if (!tournament) return <div className="text-center mt-12 text-red-400">Tournament not found</div>;

  const rounds = {};
  matches.forEach((match) => {
    if (!rounds[match.round]) rounds[match.round] = [];
    rounds[match.round].push(match);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">{tournament.name} - Bracket</h1>

      <div className="overflow-x-auto">
        <div className="flex gap-8 pb-4">
          {Object.entries(rounds).map(([roundNum, roundMatches]) => (
            <div key={roundNum} className="flex-shrink-0">
              <h3 className="text-lg font-bold mb-4 text-center">Round {roundNum}</h3>
              <div className="space-y-4">
                {roundMatches.map((match) => (
                  <div key={match.id} className="card w-64 min-h-32">
                    <div className="space-y-2 mb-3">
                      <div className={`p-2 rounded ${match.winner_id === match.player1_id ? 'bg-green-900/50 border border-green-500' : 'bg-gray-700'}`}>
                        <p className="font-semibold">{match.player1_name || 'TBD'}</p>
                      </div>
                      {match.player2_id ? (
                        <div className={`p-2 rounded ${match.winner_id === match.player2_id ? 'bg-green-900/50 border border-green-500' : 'bg-gray-700'}`}>
                          <p className="font-semibold">{match.player2_name || 'TBD'}</p>
                        </div>
                      ) : (
                        <div className="p-2 rounded bg-gray-700">
                          <p className="font-semibold text-gray-500">Bye</p>
                        </div>
                      )}
                    </div>

                    {match.status === 'pending' && token && user && user.id === tournament.organizer_id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateResult(match.id, match.player1_id)}
                          className="text-sm btn-primary flex-1"
                        >
                          P1 Wins
                        </button>
                        {match.player2_id && (
                          <button
                            onClick={() => handleUpdateResult(match.id, match.player2_id)}
                            className="text-sm btn-primary flex-1"
                          >
                            P2 Wins
                          </button>
                        )}
                      </div>
                    )}
                    {match.status === 'completed' && (
                      <div className="text-xs text-green-400 text-center">Completed ✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
