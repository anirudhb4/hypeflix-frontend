/* File: src/components/Navbar.jsx
  Description: Made the navbar stack vertically on mobile (sm) and wrap links.
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
    // Added padding for mobile
    <nav className="fixed top-0 left-0 w-full bg-black/30 text-white p-4 shadow-lg z-50 backdrop-blur-md">
      {/* Updated container: 
        - Stacks vertically on mobile (flex-col)
        - Stacks horizontally on small screens and up (sm:flex-row)
      */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Added margin-bottom on mobile */}
        <Link to="/" className="text-2xl font-bold text-white tracking-widest flex items-center gap-2 mb-3 sm:mb-0">
          <Clapperboard />
          HYPEFLIX
        </Link>
        
        {/* Updated links container:
          - Wraps links on mobile (flex-wrap)
          - Centers links on mobile (justify-center)
          - Justifies to the end on desktop (sm:justify-end)
          - Uses 'gap' for responsive spacing
        */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-2 sm:gap-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/upcoming" className="text-gray-300 hover:text-white transition">Upcoming</Link>
          <Link to="/browse" className="text-gray-300 hover:text-white transition">Browse</Link>
          
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