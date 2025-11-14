/* File: src/App.jsx
  Description: Swapped routes for Home and Leaderboard, and renamed route to /upcoming.
*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyHypePage from './pages/MyHypePage';
import SignupPage from './pages/SignupPage'; 
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
              {/* --- UPDATED: / now points to LeaderboardPage --- */}
              <Route path="/" element={<LeaderboardPage />} />
              
              {/* --- UPDATED: Renamed route and points to Home (upcoming) --- */}
              <Route path="/upcoming" element={<Home />} />
              
              <Route path="/my-hype" element={<MyHypePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;