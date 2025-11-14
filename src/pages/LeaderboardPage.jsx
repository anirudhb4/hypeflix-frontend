/* File: src/pages/LeaderboardPage.jsx
  Description: Ensure top padding is correct to match Home.jsx.
*/
import { useEffect } from 'react'; 
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import { Loader2 } from 'lucide-react';
import LanguageFilter from '../components/LanguageFilter';

const LeaderboardPage = () => {
  const { leaderboard, loading, error, languageFilter } = useMovies();

  useEffect(() => {
    document.getElementById('leaderboard-scroll-container')?.scrollTo(0, 0);
  }, [languageFilter]); 

  if (loading && leaderboard.length === 0) {
    // ... (no changes)
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
    // ... (no changes)
    <div className="h-screen w-full flex justify-center items-center text-white text-center">
      {error}
    </div>
  );

  return (
    <>
      <LanguageFilter />

      <div 
        id="leaderboard-scroll-container" 
        // --- UPDATED: Kept pt-36 (9rem / 144px) ---
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden pt-36"
      >
        {leaderboard.length > 0 ? (
          leaderboard.map((movie, index) => (
            <HomeMovieCard 
              key={movie.id} 
              movie={movie} 
              rank={index + 1} 
            />
          ))
        ) : (
          !loading && (
            // --- UPDATED: Height calculation matches padding ---
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