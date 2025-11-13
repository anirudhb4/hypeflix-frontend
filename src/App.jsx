import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '/src/components/Navbar.jsx';
import Home from '/src/pages/Home.jsx';
import LoginPage from '/src/pages/LoginPage.jsx';
import LeaderboardPage from '/src/pages/LeaderboardPage.jsx';
import MyHypePage from '/src/pages/MyHypePage.jsx'; // 1. Import new page
import { AuthProvider } from '/src/contexts/AuthContext.jsx';
import { MovieProvider } from '/src/contexts/MovieContext.jsx'; // 2. Import cache

function App() {
  return (
    <AuthProvider>
      <MovieProvider> {/* 3. Wrap the Router with the MovieProvider */}
        <Router>
          <div className="min-h-screen bg-gray-900 text-white font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-hype" element={<MyHypePage />} /> {/* 4. Add new route */}
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;