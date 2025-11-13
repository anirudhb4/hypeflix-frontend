import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/contexts/AuthContext.jsx';
import { useMovies } from '/src/contexts/MovieContext.jsx';
import { formatReleaseDate, formatCompact } from '/src/services/utils.js';
import { Heart, Zap } from 'lucide-react';
import { useState } from 'react';

const MovieCard = ({ movie, rank = null }) => {
  const { session, hypedMovies, hypeMovieApi, unHypeMovieApi } = useAuth();
  const { updateLocalScore } = useMovies();
  const navigate = useNavigate();

  const [popText, setPopText] = useState('');
  const isCurrentlyHyped = hypedMovies.has(movie.id);
  const currentHypeString = formatCompact(movie.rawHypeScore);

  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
    : 'https://placehold.co/500x750/000000/222222?text=No+Image';

  const handleHypeToggle = () => {
    if (!session) {
      navigate('/login');
      return;
    }
    
    if (isCurrentlyHyped) {
      unHypeMovieApi(movie.id);
      updateLocalScore(movie.id, -10000);
      setPopText('-10K');
    } else {
      hypeMovieApi(movie.id);
      updateLocalScore(movie.id, 10000);
      setPopText('+10K');
    }
    setTimeout(() => setPopText(''), 750);
  };
  
  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-900 hover:shadow-xl hover:shadow-gray-800/30 transition-all duration-300 relative group">
      <div className="relative">
        <img src={posterUrl} alt={movie.title} className="w-full h-96 object-cover" />
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-3">
          {rank && <span className="text-gray-400">#{rank}</span>}
          <div className="flex items-center gap-1">
            <Zap size={14} className="text-white" />
            <span>{currentHypeString}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1">
          Releasing on: {formatReleaseDate(movie.releaseDate)}
        </p>
        
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
          {popText && <span key={popText} className="pop-animation">{popText}</span>}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;