/* File: src/App.jsx
  Description: Add the new /browse route.
*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyHypePage from './pages/MyHypePage';
import SignupPage from './pages/SignupPage'; 
import BrowsePage from './pages/BrowsePage'; // 1. Import the new page
import AuthProvider from './contexts/AuthContext';
import MovieProvider from './contexts/MovieContext';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen bg-black text-white font-dm">
            <Navbar />
            <Routes>
              <Route path="/" element={<LeaderboardPage />} />
              <Route path="/upcoming" element={<Home />} />
              <Route path="/browse" element={<BrowsePage />} /> {/* 2. Add the new route */}
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