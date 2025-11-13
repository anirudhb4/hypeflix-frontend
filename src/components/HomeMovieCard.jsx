import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatReleaseDate, formatCompact } from '../services/utils';
import { Heart, Zap } from 'lucide-react';

// This is the full-page card for the Home feed.
// Now accepts an optional 'rank' prop.
const HomeMovieCard = ({ movie, rank = null }) => {
  const { session, hypedMovies, hypeMovie, unHypeMovie } = useAuth();
  const navigate = useNavigate();

  // Use useEffect to sync state with props
  const [currentHype, setCurrentHype] = useState(movie.rawHypeScore);
  const [currentHypeString, setCurrentHypeString] = useState(movie.hypeCount);
  const [isCurrentlyHyped, setIsCurrentlyHyped] = useState(hypedMovies.has(movie.id));
  const [popText, setPopText] = useState('');

  // This ensures the card updates if the global context changes (e.g., on another page)
  useEffect(() => {
    setCurrentHype(movie.rawHypeScore);
    setCurrentHypeString(movie.hypeCount);
    setIsCurrentlyHyped(hypedMovies.has(movie.id));
  }, [movie.rawHypeScore, movie.hypeCount, hypedMovies, movie.id]);


  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w1280${movie.posterPath}` 
    : 'https://placehold.co/1280x720/000000/222222?text=Poster+Not+Available';

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
    // This is one "slide" in the vertical scroller
    <div className="h-screen w-screen snap-start relative flex items-center justify-center overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      
      {/* Background Poster Image */}
      <img 
        src={posterUrl} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-30"
        onError={(e) => { e.target.style.display = 'none'; }}
      />

      {/* Foreground Content */}
      <div className="relative z-20 container mx-auto p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col gap-4 text-white animate-fade-in">
          <p className="font-semibold text-gray-300">{formatReleaseDate(movie.releaseDate)}</p>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {movie.title}
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl line-clamp-6">
            {movie.overview}
          </p>

          <div className="flex items-end gap-6 mt-6">
            {/* The Hype Button */}
            <button
              onClick={handleHypeToggle}
              className={`relative flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300
                ${isCurrentlyHyped 
                  ? 'bg-white text-black' 
                  : 'bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30'
                }`}
            >
              {isCurrentlyHyped ? <Heart className="text-red-500" fill="currentColor" /> : <Zap />}
              <span>{isCurrentlyHyped ? 'Hyped!' : 'Hype This!'}</span>
              
              {/* Pop Animation */}
              {popText && (
                <span key={popText} className="pop-animation">
                  {popText}
                </span>
              )}
            </button>
            
            {/* Rank - ONLY shows if 'rank' prop is passed */}
            {rank && (
              <div className="flex flex-col border-l-2 border-gray-700 pl-6">
                <span className="text-3xl font-bold text-gray-400">#{rank}</span>
                <span className="text-sm text-gray-500">Rank</span>
              </div>
            )}

            {/* Hype Count */}
            <div className={`flex flex-col ${rank ? '' : 'border-l-2 border-gray-700 pl-6'}`}>
              <span className="text-3xl font-bold">{currentHypeString}</span>
              <span className="text-sm text-gray-400">Total Hype</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Poster Image */}
        <div className="relative w-full h-[70vh] hidden md:block">
           <img 
            src={posterUrl} 
            alt={movie.title} 
            className="absolute inset-0 w-full h-full object-contain object-center rounded-lg"
            onError={(e) => { e.target.src = 'https://placehold.co/1000x1500/000000/FFF?text=HYPEFLIX'; }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCard;