import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';
import { Heart, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyHypePage = () => {
  const { hypedMoviesList, session } = useAuth();

  if (!session) {
    return (
       <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-gray-400">
        <ShieldAlert size={64} className="mb-4" />
        <h2 className="text-2xl font-semibold">You must be logged in to view this page.</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-white pl-4 flex items-center gap-3">
        <Heart />
        My Hyped Movies
      </h1>
      
      {hypedMoviesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hypedMoviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64 border border-dashed border-gray-800 rounded-lg">
          <p className="text-xl">You haven't hyped any movies yet.</p>
          <p className="mt-2">Go to the Home page and click "HYPE THIS!"</p>
          <Link to="/" className="mt-6 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition font-medium flex items-center gap-2">
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyHypePage;