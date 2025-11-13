import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-tighter">
          HYPEFLIX
        </Link>
        
        <div className="space-x-6">
          <Link to="/" className="hover:text-red-400 transition">Home</Link>
          <Link to="/leaderboard" className="hover:text-red-400 transition">Leaderboard</Link>
          {/* We will update this link later to handle Logout */}
          <Link to="/login" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;