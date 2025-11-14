/* File: src/pages/Home.jsx
  Description: Ensure top padding is correct for the new filter position.
*/
import { useEffect, useState, useCallback } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import LanguageFilter from '../components/LanguageFilter';

const Home = () => {
  const { movies, loading, error, languageFilter } = useMovies();
  // ... (no changes in this section)
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5); 

  useEffect(() => {
    setVisibleMovies(movies.slice(0, itemsToShow));
  }, [movies, itemsToShow]);

  useEffect(() => {
    setItemsToShow(5); 
    document.getElementById('home-scroll-container')?.scrollTo(0, 0);
  }, [languageFilter]); 

  const loadMore = useCallback(() => {
    setItemsToShow(prevCount => prevCount + 5); 
  }, []);

  const handleScroll = (e) => {
    // ... (no changes in this section)
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight + 100) { 
      if (!loading && itemsToShow < movies.length) {
        loadMore();
      }
    }
  };

  if (loading && itemsToShow === 5) return <div className="text-white text-center mt-20">Loading Hype...</div>;
  if (error) return <div className="text-white text-center mt-20">{error}</div>;

  return (
    <>
      <LanguageFilter /> 

      <div 
        id="home-scroll-container" 
        // --- UPDATED: Kept pt-36 (9rem / 144px) ---
        // This covers the h-20 (80px) navbar + ~h-14 (56px) filter + 8px gap
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden pt-36" 
        onScroll={handleScroll} 
      >
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <HomeMovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !loading && (
            // --- UPDATED: Height calculation matches padding ---
            <div className="h-[calc(100vh-144px)] w-full snap-start flex items-center justify-center text-gray-500 text-lg">
              No movies found for this language.
            </div>
          )
        )}
        
        {!loading && itemsToShow < movies.length && (
          // ... (no changes)
          <div className="h-20 w-full flex justify-center items-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </>
  );
};

export default Home;