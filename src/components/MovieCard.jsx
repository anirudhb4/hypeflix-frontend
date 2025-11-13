import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatReleaseDate, formatCompact } from '../services/utils';
import { Heart, Zap } from 'lucide-react';

// This is the "grid" card for Leaderboard and My Hype pages
const MovieCard = ({ movie }) => {
  const { session, hypedMovies, hypeMovie, unHypeMovie } = useAuth();
  const navigate = useNavigate();

  const initialRawScore = movie.rawHypeScore;
  const initialHypeCount = movie.hypeCount;
  const isHyped = hypedMovies.has(movie.id);

  const [currentHype, setCurrentHype] = useState(initialRawScore);
  const [currentHypeString, setCurrentHypeString] = useState(initialHypeCount);
  const [isCurrentlyHyped, setIsCurrentlyHyped] = useState(isHyped);
  const [popText, setPopText] = useState('');

  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleHypeToggle = async () => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (isCurrentlyHyped) {
      const newScore = currentHype - 10000;
      unHypeMovie(movie.id);
      setIsCurrentlyHyped(false);
      setCurrentHype(newScore);
      setCurrentHypeString(formatCompact(newScore));
      setPopText('-10K');
    } else {
      const newScore = currentHype + 10000;
      hypeMovie(movie.id);
      setIsCurrentlyHyped(true);
      setCurrentHype(newScore);
      setCurrentHypeString(formatCompact(newScore));
      setPopText('+10K');
    }
    setTimeout(() => setPopText(''), 750);
  };
  
  return (
    // Restyled to bg-gray-950 (almost black)
    <div className="bg-gray-950 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-gray-800/30 transition-all duration-300 relative group">
      
      <div className="relative">
        <img src={posterUrl} alt={movie.title} className="w-full h-96 object-cover" />
        {/* Hype Count - B&W theme */}
        <div className="absolute top-3 right-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
          <Zap size={14} />
          {currentHypeString}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{formatReleaseDate(movie.releaseDate)}</p>
        
        {/* Hype Button - B&W theme */}
        <button
          onClick={handleHypeToggle}
          className={`relative w-full mt-4 py-2 rounded transition-colors font-semibold flex items-center justify-center gap-2
            ${isCurrentlyHyped 
              ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
              : 'bg-white text-black hover:bg-gray-200'
            }`}
        >
          {isCurrentlyHyped ? <Heart size={16} /> : <Zap size={16} />}
          {isCurrentlyHyped ? 'Hyped' : 'Hype This!'}

          {/* Pop Animation */}
          {popText && (
            <span key={popText} className="pop-animation">
              {popText}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;