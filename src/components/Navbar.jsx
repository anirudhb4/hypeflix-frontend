import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 1. Import useAuth

const Navbar = () => {
  const { session, logout } = useAuth(); // 2. Get session and logout function

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-tighter">
          HYPEFLIX
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-red-400 transition">Home</Link>
          <Link to="/leaderboard" className="hover:text-red-400 transition">Leaderboard</Link>
          
          {/* 3. Add dynamic login/logout button */}
          {session ? (
            <button 
              onClick={logout}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;