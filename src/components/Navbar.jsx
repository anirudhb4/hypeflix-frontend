import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { Clapperboard } from 'lucide-react';

const Navbar = () => {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-tighter flex items-center gap-2">
          <Clapperboard />
          HYPEFLIX
        </Link>
        
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/leaderboard" className="text-gray-300 hover:text-white transition">Leaderboard</Link>
          
          {/* --- THIS IS THE NEW LOGIC --- */}
          {session ? (
            <>
              <Link to="/my-hype" className="text-gray-300 hover:text-white transition">My Hype</Link>
              <button 
                onClick={handleLogout}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Login
            </Link>
          )}
          {/* --- END OF NEW LOGIC --- */}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;