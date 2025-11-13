import { useMovies } from '/src/contexts/MovieContext.jsx'; // 1. Import the hook
import MovieCard from '/src/components/MovieCard.jsx';
import { ShieldAlert } from 'lucide-react';

const LeaderboardPage = () => {
  // 2. Get data from the global cache
  const { leaderboard, loading, error } = useMovies();

  // 3. All local 'useState' and 'useEffect' are GONE!

  if (loading) return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <div className="text-white text-2xl">Calculating Top Hype...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-red-400">
      <ShieldAlert size={64} className="mb-4" />
      <h2 className="text-2xl font-semibold">{error}</h2>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4 flex items-center">
        Top 10 Hyped Movies
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 4. Make sure to map over 'leaderboard' not 'movies' */}
        {leaderboard.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;