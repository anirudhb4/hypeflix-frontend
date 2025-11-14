/* File: src/components/HomeMovieCard.jsx
  Description: Adjusted padding, typography, and button layout for mobile.
*/
import { useState, memo } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/contexts/AuthContext.jsx';
import { useMovies } from '/src/contexts/MovieContext.jsx'; 
import { formatReleaseDate, formatCompact } from '/src/services/utils.js';
import { Heart, Zap } from 'lucide-react';

const HomeMovieCard = memo(({ movie, rank = null }) => {
  const { session, hypedMovies, hypeMovieApi, unHypeMovieApi } = useAuth();
  const { updateLocalScore } = useMovies(); 
  const navigate = useNavigate();

  const [popText, setPopText] = useState('');
  
  const isCurrentlyHyped = hypedMovies.has(movie.id);
  
  const currentHypeString = formatCompact(movie.rawHypeScore);

  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w1280${movie.posterPath}` 
    : 'https://placehold.co/1280x720/000000/222222?text=Poster+Not+Available';

  const handleHypeToggle = () => {
    // ... (no changes in this function)
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
    <div className="h-screen w-screen snap-start relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <img 
        src={posterUrl} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-30"
        onError={(e) => { e.target.style.display = 'none'; }}
      />

      {/* Updated main content:
        - Reduced padding on mobile (p-6)
      */}
      <div className="relative z-20 container mx-auto p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col gap-4 text-white animate-fade-in">
          
          {rank === 1 && (
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wider mb-2 opacity-90">
              Most Hyped
            </h2>
          )}

          <p className="font-semibold text-gray-300">
            Releasing on: {formatReleaseDate(movie.releaseDate)}
          </p>
          
          {/* Responsive typography */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            {movie.title}
          </h1>
          
          {/* Responsive typography */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl line-clamp-6">
            {movie.overview}
          </p>

          {/* Updated buttons/stats container:
            - Stacks vertically on mobile (flex-col)
            - Aligns left on mobile (items-start)
            - Stacks horizontally on desktop (sm:flex-row)
          */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-6">
            <button
              onClick={handleHypeToggle}
              // Responsive button size
              className={`relative flex items-center justify-center gap-2 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold transition-all duration-300 rounded-full
                ${isCurrentlyHyped 
                  ? 'bg-white text-black' 
                  : 'bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30'
                }`}
            >
              {isCurrentlyHyped ? <Heart className="text-red-500" fill="currentColor" /> : <Zap />}
              <span>{isCurrentlyHyped ? 'Hyped!' : 'Hype This!'}</span>
              {popText && <span key={popText} className="pop-animation">{popText}</span>}
            </button>
            
            {rank && (
              // Responsive typography
              <div className="flex flex-col border-l-2 border-gray-700 pl-6">
                <span className="text-2xl sm:text-3xl font-bold text-gray-400">#{rank}</span>
                <span className="text-xs sm:text-sm text-gray-500">Rank</span>
              </div>
            )}

            {/* Responsive typography */}
            <div className={`flex flex-col ${rank ? '' : 'border-l-2 border-gray-700 pl-6'}`}>
              <span className="text-2xl sm:text-3xl font-bold">{currentHypeString}</span>
              <span className="text-xs sm:text-sm text-gray-400">Total Hype</span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[70vh] hidden md:block">
           <img 
            src={posterUrl} 
            alt={movie.title} 
            className="absolute inset-0 w-full h-full object-contain object-center rounded-lg"
          />
        </div>
      </div>
    </div>
  );
});

export default HomeMovieCard;