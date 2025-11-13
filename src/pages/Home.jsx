import { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movies from Spring Boot
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Loading Hype...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Upcoming Indian Releases
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;