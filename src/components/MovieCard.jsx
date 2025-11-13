import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { formatReleaseDate } from '../services/utils.js'; // Corrected path

const MovieCard = ({ movie }) => {
  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // --- GET DATA FROM OUR AUTH CONTEXT ---
  // 1. Get the new 'unHypeMovie' function
  const { session, hypedMovies, hypeMovie, unHypeMovie } = useAuth();
  const navigate = useNavigate();

  // --- CHECK IF THIS MOVIE ID IS IN OUR SET ---
  const isHyped = hypedMovies.has(movie.id);
  
  // Local state just for the "Loading..." text
  const [isHyping, setIsHyping] = useState(false);

  const handleHypeClick = async () => {
    // 1. If not logged in, go to login page
    if (!session) { // Check against session
      navigate('/login');
      return;
    }

    setIsHyping(true);
    
    // 2. --- UPDATE THIS LOGIC ---
    // If we are already hyped, call unHype. Otherwise, call hype.
    if (isHyped) {
      await unHypeMovie(movie.id);
    } else {
      await hypeMovie(movie.id);
    }
    
    setIsHyping(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-96 object-cover group-hover:blur-[2px] transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="p-4 relative -mt-16 z-10">
        <div 
          className="absolute top-0 right-4 -mt-6 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-gray-800 backdrop-blur-sm bg-opacity-70"
        >
          🔥 {movie.hypeCount}
        </div>
        
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {formatReleaseDate(movie.releaseDate)}
        </p>
        
        <button 
          onClick={handleHypeClick}
          disabled={isHyping} // 3. --- UPDATE THIS LOGIC --- (Allow clicking if hyped)
          className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200
            ${isHyped 
              ? 'bg-green-600 hover:bg-green-700' // Make it clickable (was cursor-not-allowed)
              : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            }
            ${isHyping ? 'animate-pulse' : ''}
          `}
        >
          {isHyped ? 'Hyped!' : (isHyping ? 'Hyping...' : 'HYPE THIS!')}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;