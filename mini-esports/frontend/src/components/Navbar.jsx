import { Link } from 'react-router-dom';

export default function Navbar({ token, setToken, user, setUser }) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            🎮 Mini Esports
          </Link>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                {user && (
                  <span className="text-gray-300 text-sm font-medium border-r border-gray-700 pr-4 mr-2 hidden sm:inline">
                    Hello, <span className="text-primary font-bold">{user.username}</span>
                  </span>
                )}
                <Link to="/dashboard" className="hover:text-primary transition">
                  Dashboard
                </Link>
                <Link to="/create" className="hover:text-primary transition">
                  Create Tournament
                </Link>
                <button
                  onClick={() => {
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                  }}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn-secondary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
