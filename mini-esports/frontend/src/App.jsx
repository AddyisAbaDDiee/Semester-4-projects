import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTournament from './pages/CreateTournament';
import TournamentDetail from './pages/TournamentDetail';
import Bracket from './pages/Bracket';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar token={token} setToken={setToken} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
          <Route path="/dashboard" element={token ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/create" element={token ? <CreateTournament /> : <Navigate to="/login" />} />
          <Route path="/tournament/:id" element={<TournamentDetail token={token} user={user} />} />
          <Route path="/tournament/:id/bracket" element={<Bracket token={token} user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
