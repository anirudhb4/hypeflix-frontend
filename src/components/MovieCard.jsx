import { useState, useEffect } from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { formatReleaseDate, formatCompact } from '/src/services/utils.js'; // Corrected path

const MovieCard = ({ movie }) => {
  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const { session, hypedMovies, hypeMovie, unHypeMovie } = useAuth();
  const navigate = useNavigate();
  const isHyped = hypedMovies.has(movie.id);

  const [isHyping, setIsHyping] = useState(false);
  const [displayScore, setDisplayScore] = useState(movie.rawHypeScore);
  const [showHypeAnimation, setShowHypeAnimation] = useState(false);

  useEffect(() => {
    setDisplayScore(movie.rawHypeScore);
  }, [movie.rawHypeScore]);

  const displayHypeString = formatCompact(displayScore);

  const handleHypeClick = async () => {
    if (!session) {
      navigate('/login');
      return;
    }
    setIsHyping(true);
    
    if (isHyped) {
      // --- UN-HYPE LOGIC ---
      await unHypeMovie(movie.id);
      // 1. UPDATE THIS TO MATCH YOUR BACKEND
      setDisplayScore(prev => prev - 10000); 
    } else {
      // --- HYPE LOGIC ---
      await hypeMovie(movie.id);
      // 2. UPDATE THIS TO MATCH YOUR BACKEND
      setDisplayScore(prev => prev + 10000); 
      
      setShowHypeAnimation(true);
      setTimeout(() => {
        setShowHypeAnimation(false);
      }, 600); 
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
          {showHypeAnimation && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-green-400 font-bold animate-pop-out">
              {/* 3. UPDATE THE ANIMATION TEXT */}
              +10K
            </span>
          )}
          🔥 {displayHypeString}
        </div>
        
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {formatReleaseDate(movie.releaseDate)}
        </p> {/* <-- Fixed the closing tag here */}
        
        <button 
          onClick={handleHypeClick}
          disabled={isHyping}
          className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200
            ${isHyped 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            }
            ${isHyping && !isHyped ? 'animate-pulse' : ''}
          `}
        >
          {isHyping ? (isHyped ? 'Unhyping...' : 'Hyping...') : (isHyped ? 'Hyped!' : 'HYPE THIS!')}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;