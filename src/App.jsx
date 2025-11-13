import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'; // 1. Import Login Page
import { AuthProvider } from './contexts/AuthContext'; // 2. Import AuthProvider

function App() {
  return (
    // 3. Wrap everything in AuthProvider
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<div className="text-center mt-10">Leaderboard Coming Soon</div>} />
            
            {/* 4. Set the login route */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;