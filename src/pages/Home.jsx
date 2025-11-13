import { useEffect, useState, useCallback } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';

const Home = () => {
  const { movies, loading, error } = useMovies();
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5); // Start by showing 5 movies

  // This effect slices our full movie list into a "visible" list
  useEffect(() => {
    setVisibleMovies(movies.slice(0, itemsToShow));
  }, [movies, itemsToShow]);

  // This function is called by the scroll handler
  const loadMore = useCallback(() => {
    setItemsToShow(prevCount => prevCount + 5); // Load 5 more movies
  }, []);

  // This is the new scroll handler
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Check if we are near the bottom of the scrollable area
    if (scrollHeight - scrollTop <= clientHeight + 100) { // 100px buffer
      if (!loading && itemsToShow < movies.length) {
        loadMore();
      }
    }
  };

  if (loading && itemsToShow === 2) return <div className="text-white text-center mt-20">Loading Hype...</div>;
  if (error) return <div className="text-white text-center mt-20">{error}</div>;

  return (
    // This container is the key to the new layout
    // It creates a full-height, vertical snap-scrolling "feed"
    <div 
      className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden"
      onScroll={handleScroll} // Added the scroll handler here
    >
      {visibleMovies.map((movie) => (
        <HomeMovieCard key={movie.id} movie={movie} />
      ))}
      
      {/* This is the "loading more" indicator at the bottom */}
      {!loading && itemsToShow < movies.length && (
        <div className="h-20 w-full flex justify-center items-center text-gray-500">
          Loading more...
        </div>
      )}
    </div>
  );
};

export default Home;