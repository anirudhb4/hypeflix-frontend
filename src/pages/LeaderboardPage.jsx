import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { ShieldAlert, Trophy } from 'lucide-react';

const LeaderboardPage = () => {
  // We get data from the cache now!
  const { leaderboard, loading, error } = useMovies();

  if (loading) return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <div className="text-white text-2xl">Calculating Top Hype...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-gray-400">
      <ShieldAlert size={64} className="mb-4" />
      <h2 className="text-2xl font-semibold">{error}</h2>
    </div>
  );

  return (
    // Added padding-top to account for fixed navbar
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-white pl-4 flex items-center gap-3">
        <Trophy />
        Top 10 Hyped Movies
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {leaderboard.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;