import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import { Loader2 } from 'lucide-react';
import LanguageFilter from '../components/LanguageFilter'; // 1. Import the new component
import { useEffect } from 'react'; // 1. Import useEffect

const LeaderboardPage = () => {
  // We get the 'leaderboard' list (Top 10) from our global cache
  const { leaderboard, loading, error, languageFilter } = useMovies();

  useEffect(() => {
    // Scroll to top when the filter changes
    document.getElementById('leaderboard-scroll-container')?.scrollTo(0, 0);
  }, [languageFilter]); // Dependency is the language filter

  if (loading && leaderboard.length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-white text-2xl flex items-center gap-3">
          <Loader2 className="animate-spin" />
          Calculating Top Hype...
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="h-screen w-full flex justify-center items-center text-white text-center">
      {error}
    </div>
  );

  return (
    // This container creates the same full-height, 
    // vertical snap-scrolling "feed" as your Home.jsx
    <>
    <LanguageFilter /> {/* 2. Render the filter */}

      <div id="leaderboard-scroll-container"
        // 3. Add padding-top here as well
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden pt-36"
      >
        {/* Check if the filtered leaderboard is empty */}
        {leaderboard.length > 0 ? (
          leaderboard.map((movie, index) => (
            <HomeMovieCard 
              key={movie.id} 
              movie={movie} 
              rank={index + 1} 
            />
          ))
        ) : (
          // Show a message if no movies match
          !loading && (
            <div className="h-[calc(100vh-144px)] w-full snap-start flex items-center justify-center text-gray-500 text-lg">
              No movies found for this language.
            </div>
          )
        )}
      </div>
    </>
    
  );
};

export default LeaderboardPage;