import { useEffect } from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import MovieCard from '/src/components/MovieCard.jsx'; // Corrected path
import { HeartCrack } from 'lucide-react';

const MyHypePage = () => {
  const { session, hypedMoviesList } = useAuth();
  const navigate = useNavigate();

  // This is a protected route.
  // If the user isn't logged in, send them to the login page.
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  // We already have the list from AuthContext, so no fetching is needed!
  const hasHypedMovies = hypedMoviesList && hypedMoviesList.length > 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
        My Hyped Movies
      </h1>
      
      {hasHypedMovies ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hypedMoviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <HeartCrack size={64} className="mb-4" />
          <h2 className="text-2xl font-semibold">You haven't hyped any movies yet.</h2>
          <p className="text-lg">Go to the Home page and click "HYPE THIS!"</p>
        </div>
      )}
    </div>
  );
};

export default MyHypePage;