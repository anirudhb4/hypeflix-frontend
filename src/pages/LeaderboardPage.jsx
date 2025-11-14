/* File: src/pages/LeaderboardPage.jsx
  Description: Replaced loading text with the skeleton component.
*/
import { useEffect } from 'react'; 
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import { Loader2 } from 'lucide-react';
import LanguageFilter from '../components/LanguageFilter';
import HomeMovieCardSkeleton from '../components/HomeMovieCardSkeleton'; // 1. Import skeleton

const LeaderboardPage = () => {
  const { leaderboard, loading, error, languageFilter } = useMovies();

  useEffect(() => {
    document.getElementById('leaderboard-scroll-container')?.scrollTo(0, 0);
  }, [languageFilter]); 

  // 2. --- THIS IS THE KEY CHANGE ---
  // Show skeleton instead of "Calculating..." text
  if (loading && leaderboard.length === 0) {
    return <HomeMovieCardSkeleton />;
  }

  if (error) return (
    <div className="h-screen w-full flex justify-center items-center text-white text-center">
      {error}
    </div>
  );

  return (
    <>
      <LanguageFilter />
      <div 
        id="leaderboard-scroll-container" 
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