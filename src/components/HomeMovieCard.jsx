import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatReleaseDate, formatCompact } from '../services/utils';
import { Heart, Zap } from 'lucide-react';

// This is a NEW component designed to fill the screen
const HomeMovieCard = ({ movie }) => {
  const { session, hypedMovies, hypeMovie, unHypeMovie } = useAuth();
  const navigate = useNavigate();

  // Get the initial scores
  const initialRawScore = movie.rawHypeScore;
  const initialHypeCount = movie.hypeCount;
  const isHyped = hypedMovies.has(movie.id);

  // Local state for instant UI updates
  const [currentHype, setCurrentHype] = useState(initialRawScore);
  const [currentHypeString, setCurrentHypeString] = useState(initialHypeCount);
  const [isCurrentlyHyped, setIsCurrentlyHyped] = useState(isHyped);
  const [popText, setPopText] = useState(''); // Text for the "+10K" animation

  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/original${movie.posterPath}` 
    : 'https://via.placeholder.com/1920x1080?text=Image+Not+Available';

  const handleHypeToggle = async () => {
    if (!session) {
      navigate('/login');
      return;
    }

    // Toggle logic
    if (isCurrentlyHyped) {
      // --- UNHYPE ---
      const newScore = currentHype - 10000;
      unHypeMovie(movie.id); // Call backend (no need to await)
      setIsCurrentlyHyped(false);
      setCurrentHype(newScore);
      setCurrentHypeString(formatCompact(newScore));
      setPopText('-10K'); // Show unhype animation
    } else {
      // --- HYPE ---
      const newScore = currentHype + 10000;
      hypeMovie(movie.id); // Call backend (no need to await)
      setIsCurrentlyHyped(true);
      setCurrentHype(newScore);
      setCurrentHypeString(formatCompact(newScore));
      setPopText('+10K'); // Show hype animation
    }

    // Reset animation text after it plays
    setTimeout(() => setPopText(''), 750);
  };

  return (
    // This is one "slide" in the vertical scroller
    <div className="h-screen w-screen snap-start relative flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/60" />
      
      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col gap-4 text-white">
          <p className="font-semibold text-gray-300">{formatReleaseDate(movie.releaseDate)}</p>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            {movie.title}
          </h1>
          
          <p className="text-lg text-gray-200 max-w-2xl line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex items-center gap-6 mt-6">
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
            
            {/* Hype Count */}
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{currentHypeString}</span>
              <span className="text-sm text-gray-400">Total Hype</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Empty on purpose, lets the poster shine */}
      </div>
    </div>
  );
};

export default HomeMovieCard;