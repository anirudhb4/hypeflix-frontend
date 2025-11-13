import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<div className="text-center mt-10">Leaderboard Coming Soon</div>} />
          <Route path="/login" element={<div className="text-center mt-10">Login Page Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;