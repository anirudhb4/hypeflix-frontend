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

  // We only fetch ONCE on mount. We do NOT listen to auth changes automatically.
  // This prevents the "full reload" flicker.
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

  // --- NEW FUNCTION: Manually update the cache without refetching ---
  const updateLocalScore = (movieId, amount) => {
    const updateList = (list) => list.map(m => {
      if (m.id === movieId) {
        const newScore = m.rawHypeScore + amount;
        // We need to manually format the new string if we want it perfectly synced,
        // but for now, let's trust the raw score update
        return { ...m, rawHypeScore: newScore };
      }
      return m;
    });

    setMovies(prev => updateList(prev));
    setLeaderboard(prev => updateList(prev).sort((a,b) => b.rawHypeScore - a.rawHypeScore));
  };

  const value = {
    movies,
    leaderboard,
    loading,
    error,
    updateLocalScore, // Expose this function
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

// --- FIX: EXPORT DEFAULT ---
export default MovieProvider;