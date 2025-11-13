import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyHypePage from './pages/MyHypePage';
import AuthProvider from './contexts/AuthContext';
import MovieProvider from './contexts/MovieContext';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          {/* Use bg-black and our new font-dm */}
          <div className="min-h-screen bg-black text-white font-dm">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/my-hype" element={<MyHypePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;