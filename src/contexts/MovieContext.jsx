import { createContext, useContext, useState, useEffect } from 'react';
import api from '/src/services/api.js'; // Corrected to absolute path

const MovieContext = createContext();

// 1. Remove 'export' from here
const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ALL data one time when the app loads
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Use Promise.all to fetch both endpoints at the same time
        const [moviesResponse, leaderboardResponse] = await Promise.all([
          api.get('/movies'),
          api.get('/leaderboard')
        ]);
        
        setMovies(moviesResponse.data);
        setLeaderboard(leaderboardResponse.data);
        setError(null);
      } catch (err) {
        console.error("Failed to load app data:", err);
        setError("Failed to load data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Provide the data and loading state to the whole app
  const value = {
    movies,
    leaderboard,
    loading,
    error,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

// 2. The hook remains a named export
export const useMovies = () => {
  return useContext(MovieContext);
};

// 3. Make the component the default export
export default MovieProvider;