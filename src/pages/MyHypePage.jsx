/* File: src/pages/MyHypePage.jsx
  Description: Added user's name to the title with a fallback to their email.
*/
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';
import { Heart, Home, ShieldAlert } from 'lucide-react'; // Import ShieldAlert
import { Link } from 'react-router-dom';

const MyHypePage = () => {
  // 1. Get the 'user' object from useAuth()
  const { hypedMoviesList, session, user } = useAuth();

  // 2. Create a display name
  // This will be "Anirudh B" for Google users or "user@example.com" for email users
  const displayName = user?.user_metadata?.full_name || user?.email;

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
      {/* 3. Use the displayName in your title */}
      <h1 className="text-4xl font-bold text-white mb-4 border-l-4 border-white pl-4 flex items-center gap-3">
        <Heart />
        My Hyped Movies
      </h1>
      {/* 4. Add the user's name below the title */}
      {displayName && (
        <p className="text-lg text-gray-400 mb-8 pl-5">
          Welcome, <span className="font-semibold text-white">{displayName}</span>
        </p>
      )}
      
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