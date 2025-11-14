/* File: src/contexts/MovieContext.jsx
  Description: Add language filter state and compute filtered movie/leaderboard lists.
*/
import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react'; // Import useMemo
import api from '/src/services/api.js'; 
import { useAuth } from '/src/contexts/AuthContext.jsx';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  // --- NEW STATE for the filter ---
  const [languageFilter, setLanguageFilter] = useState('all'); // 'all', 'hi', 'ta', etc.
  
  // --- RENAMED STATE ---
  // This holds the original, unfiltered list of all movies
  const [masterMovieList, setMasterMovieList] = useState([]);
  
  // Original 'movies' and 'leaderboard' states are removed.
  // They will be derived using useMemo.
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!hasLoadedOnce.current) setLoading(true);
      
      try {
        // We only need to fetch the main /movies endpoint.
        // The leaderboard will be calculated from this list.
        const [moviesResponse] = await Promise.all([
          api.get('/movies'),
          // api.get('/leaderboard') // This is no longer needed
        ]);
        
        setMasterMovieList(moviesResponse.data); // Store in our master list
        // setLeaderboard(leaderboardResponse.data); // Removed
        
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

  // --- NEW: COMPUTED (FILTERED) MOVIE LIST ---
  // useMemo re-calculates this list only if masterMovieList or languageFilter changes.
  const filteredMovies = useMemo(() => {
    if (languageFilter === 'all') {
      return masterMovieList; // Return all movies
    }
    // Return only movies that match the language filter
    return masterMovieList.filter(
      movie => movie.originalLanguage === languageFilter
    );
  }, [masterMovieList, languageFilter]); // Dependencies

  // --- NEW: COMPUTED (FILTERED) LEADERBOARD ---
  // This calculates the leaderboard from the *filtered* list.
  const filteredLeaderboard = useMemo(() => {
    return [...filteredMovies] // Use the already filtered list
      .sort((a, b) => b.rawHypeScore - a.rawHypeScore) // Sort Descending
      .slice(0, 10); // Take Top 10
  }, [filteredMovies]); // Dependency

  // --- FIX: This function must now update the MASTER list ---
  const updateLocalScore = (movieId, amount) => {
    setMasterMovieList(prevMasterList => {
      // 1. Create the updated full list of movies
      const updatedMovies = prevMasterList.map(m => {
        if (m.id === movieId) {
          return { ...m, rawHypeScore: m.rawHypeScore + amount };
        }
        return m;
      });
      
      // 2. Return the updated master list
      // The useMemo hooks will automatically recalculate
      // filteredMovies and filteredLeaderboard.
      return updatedMovies;
    });
  };

  const value = {
    // --- UPDATED VALUES ---
    movies: filteredMovies,          // Provide the filtered list
    leaderboard: filteredLeaderboard, // Provide the filtered leaderboard
    loading,
    error,
    updateLocalScore, 
    
    // --- NEW VALUES TO EXPORT ---
    languageFilter,     // Expose the current filter state
    setLanguageFilter,  // Expose the function to change the filter
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