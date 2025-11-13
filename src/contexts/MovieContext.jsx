import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '/src/services/api.js'; 
import { useAuth } from '/src/contexts/AuthContext.jsx';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!hasLoadedOnce.current) setLoading(true);
      
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
        setLoading(false);
        hasLoadedOnce.current = true;
      }
    };
    
    fetchAllData();
  }, []); 

  // --- FIX: RE-CALCULATE LEADERBOARD FROM SCRATCH ---
  const updateLocalScore = (movieId, amount) => {
    setMovies(prevMovies => {
      // 1. Create the updated full list of movies
      const updatedMovies = prevMovies.map(m => {
        if (m.id === movieId) {
          return { ...m, rawHypeScore: m.rawHypeScore + amount };
        }
        return m;
      });

      // 2. Derive the new Top 10 from the updated full list
      const newLeaderboard = [...updatedMovies]
        .sort((a, b) => b.rawHypeScore - a.rawHypeScore) // Sort Descending
        .slice(0, 10); // Take Top 10

      // 3. Update the leaderboard state
      setLeaderboard(newLeaderboard);
      
      // 4. Return the updated movies list
      return updatedMovies;
    });
  };

  const value = {
    movies,
    leaderboard,
    loading,
    error,
    updateLocalScore, 
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MovieContext);
};

export default MovieProvider;