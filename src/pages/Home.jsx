import { useEffect, useState, useRef, useCallback } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HomeMovieCard from '../components/HomeMovieCard';

const Home = () => {
  const { movies, loading, error } = useMovies();
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(2); // Start by showing 2 movies
  const loaderRef = useRef(null);

  // This effect slices our full movie list into a "visible" list
  useEffect(() => {
    setVisibleMovies(movies.slice(0, itemsToShow));
  }, [movies, itemsToShow]);

  // This function is called by the IntersectionObserver
  const loadMore = useCallback(() => {
    setItemsToShow(prevCount => prevCount + 2); // Load 2 more movies
  }, []);

  // This sets up the "infinite scroll" trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 } // Trigger when the loader is 100% visible
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, loading]);

  if (loading && itemsToShow === 2) return <div className="text-white text-center mt-20">Loading Hype...</div>;
  if (error) return <div className="text-white text-center mt-20">{error}</div>;

  return (
    // This container is the key to the new layout
    // It creates a full-height, vertical snap-scrolling "feed"
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      {visibleMovies.map((movie) => (
        <HomeMovieCard key={movie.id} movie={movie} />
      ))}
      
      {/* This is the invisible "trigger" to load more */}
      {!loading && itemsToShow < movies.length && (
        <div ref={loaderRef} className="h-20 w-full flex justify-center items-center">
          <p className="text-gray-500">Loading more...</p>
        </div>
      )}
    </div>
  );
};

export default Home;