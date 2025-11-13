import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import { Loader2 } from 'lucide-react';

const LeaderboardPage = () => {
  // We get the 'leaderboard' list (Top 10) from our global cache
  const { leaderboard, loading, error } = useMovies();

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
    <div 
      className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden"
    >
      {/* We map over the TOP 10 movies */}
      {leaderboard.map((movie, index) => (
        <HomeMovieCard 
          key={movie.id} 
          movie={movie} 
          rank={index + 1} // We pass the rank prop here!
        />
      ))}
    </div>
  );
};

export default LeaderboardPage;