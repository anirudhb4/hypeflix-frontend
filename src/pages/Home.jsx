/* File: src/pages/Home.jsx
  Description: Replaced loading text with the new skeleton component.
*/
import { useEffect, useState, useCallback } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';
import LanguageFilter from '../components/LanguageFilter';
import HomeMovieCardSkeleton from '../components/HomeMovieCardSkeleton'; // 1. Import skeleton

const Home = () => {
  const { movies, loading, error, languageFilter } = useMovies();
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

  // 2. Wrapped handleScroll in useCallback
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight + 100) { 
      if (!loading && itemsToShow < movies.length) {
        loadMore();
      }
    }
  }, [loading, itemsToShow, movies.length, loadMore]); // 3. Added dependencies

  // 4. --- THIS IS THE KEY CHANGE ---
  // Show the skeleton loader if loading and movie list is empty
  if (loading && movies.length === 0) return <HomeMovieCardSkeleton />;
  
  if (error) return <div className="text-white text-center mt-20">{error}</div>;

  return (
    <>
      <LanguageFilter /> 
      <div 
        id="home-scroll-container" 
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden pt-36" 
        onScroll={handleScroll} 
      >
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <HomeMovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !loading && (
            <div className="h-[calc(100vh-144px)] w-full snap-start flex items-center justify-center text-gray-500 text-lg">
              No movies found for this language.
            </div>
          )
        )}
        
        {!loading && itemsToShow < movies.length && (
          <div className="h-20 w-full flex justify-center items-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </>
  );
};

export default Home;