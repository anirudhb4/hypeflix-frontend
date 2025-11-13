import { createContext, useContext, useState, useEffect, useRef } from 'react'; // 1. Import useRef
import api from '../services/api'; // Corrected path
import { useAuth } from './AuthContext'; // Corrected path

const MovieContext = createContext();

export const useMovies = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { hypedMoviesList } = useAuth();

  // --- THIS IS THE "SILENT" REFRESH FUNCTION ---
  const refreshAllData = async () => {
    try {
      const [moviesResponse, leaderboardResponse] = await Promise.all([
        api.get('/movies'),
        api.get('/leaderboard')
      ]);
      setMovies(moviesResponse.data);
      setLeaderboard(leaderboardResponse.data);
    } catch (err) {
      console.error("Failed to silently refresh movie data:", err);
    }
  };

  // --- THIS IS THE "INITIAL LOAD" FUNCTION ---
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true); // Show the loading spinner
      try {
        const [moviesResponse, leaderboardResponse] = await Promise.all([
          api.get('/movies'),
          api.get('/leaderboard')
        ]);
        setMovies(moviesResponse.data);
        setLeaderboard(leaderboardResponse.data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
        setError("Failed to load data. Is the backend running?");
      } finally {
        setLoading(false); // Hide the loading spinner
      }
    };
    
    initialLoad();
  }, []); // Empty array means it runs only ONCE.

  
  // --- THIS IS THE "REFRESH ON HYPE" HOOK (NEW LOGIC) ---
  
  // 2. Use a ref to track if this is the first run
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 3. Check the ref's "current" value
    if (isInitialMount.current) {
      // This is the first render, so set the ref to false and do nothing.
      // The "initialLoad" useEffect is already handling the first fetch.
      isInitialMount.current = false;
    } else {
      // This is not the first render, it's a change to hypedMoviesList
      // (from login, hype, or unhype).
      // So, run the "silent" refresh.
      refreshAllData();
    }
  }, [hypedMoviesList]); // This is the dependency that triggers the refresh


  const value = {
    movies,
    leaderboard,
    loading,
    error,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;