/* File: src/components/Navbar.jsx
  Description: Updated Leaderboard nav link to "Upcoming".
*/
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clapperboard } from 'lucide-react';

const Navbar = () => {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 text-white p-4 shadow-lg z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-widest flex items-center gap-2">
          <Clapperboard />
          HYPEFLIX
        </Link>
        
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          
          {/* --- UPDATED: Link text and path --- */}
          <Link to="/upcoming" className="text-gray-300 hover:text-white transition">Upcoming</Link>
          
          {session && (
            <Link to="/my-hype" className="text-gray-300 hover:text-white transition">My Hype</Link>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800 transition font-medium"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;