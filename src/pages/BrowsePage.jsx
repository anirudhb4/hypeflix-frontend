/* File: src/pages/BrowsePage.jsx
  Description: Moved LanguageFilter and passed the 'isStatic' prop.
*/
import { useState, useMemo } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import LanguageFilter from '../components/LanguageFilter';
import MovieCardGridSkeleton from '../components/MovieCardGridSkeleton';
import { Search, X } from 'lucide-react';

const BrowsePage = () => {
  const { movies, loading, languageFilter } = useMovies(); 
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm, languageFilter]); 

  return (
    <div className="container mx-auto p-4 pt-24">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-white mb-4 border-l-4 border-white pl-4">
        Browse Upcoming
      </h1>

      {/* Search Bar */}
      <div className="relative my-6">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for any movie..."
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" 
          size={20} 
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* --- 1. Language Filter is now here, below the search bar --- */}
      {/* --- 2. Pass the isStatic prop and remove the old wrapper div --- */}
      <LanguageFilter isStatic={true} />

      {/* Movie Grid */}
      {loading && movies.length === 0 ? (
        <MovieCardGridSkeleton />
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64 border border-dashed border-gray-800 rounded-lg mt-8">
          <p className="text-xl">No movies found.</p>
          <p className="mt-2">Try adjusting your search or language filter.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;