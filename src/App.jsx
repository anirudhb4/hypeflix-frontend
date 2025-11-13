import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyHypePage from './pages/MyHypePage'; 

// 1. Import contexts as DEFAULT (no braces)
import AuthProvider from './contexts/AuthContext';
import MovieProvider from './contexts/MovieContext';

function App() {
  return (
    // 2. Use the default imports
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-white font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-hype" element={<MyHypePage />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;