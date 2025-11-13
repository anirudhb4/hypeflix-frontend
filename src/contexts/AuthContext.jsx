import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; // Corrected relative path
import api from '../services/api'; // Corrected relative path

const AuthContext = createContext();

// 1. Remove 'export' from here
const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for the button logic (fast ID check)
  const [hypedMovies, setHypedMovies] = useState(new Set());
  
  // --- 1. ADD NEW STATE ---
  // State for "My Hype Page" (full movie objects)
  const [hypedMoviesList, setHypedMoviesList] = useState([]);

  
  const fetchHypedMovies = async () => {
    try {
      const { data } = await api.get('/movies/hyped');
      
      // --- 2. UPDATE THIS FUNCTION ---
      // 'data' is an array of Movie objects.
      
      // A) Save the full list for "My Hype Page"
      setHypedMoviesList(data);
      
      // B) Save the Set of IDs for the buttons
      const idSet = new Set(data.map(movie => movie.id));
      setHypedMovies(idSet);
      
    } catch (error) {
      console.error("Failed to fetch hyped movies (user might be logged out):", error);
      // Clear both on error
      setHypedMovies(new Set());
      setHypedMoviesList([]);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      localStorage.setItem('hypeflix-access-token', session?.access_token || null);
      if (session) {
        fetchHypedMovies();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        localStorage.setItem('hypeflix-access-token', session?.access_token || null);
        
        if (session) {
          fetchHypedMovies();
        } else {
          // --- 3. UPDATE LOGOUT ---
          // Clear both states on logout
          setHypedMovies(new Set());
          setHypedMoviesList([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []); 

  const login = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    return supabase.auth.signOut();
  };

  const hypeMovie = useCallback(async (movieId) => {
    if (hypedMovies.has(movieId)) {
      return; 
    }
    try {
      await api.post(`/movies/${movieId}/hype`);
      
      // 1. Optimistic update for the button
      setHypedMovies(prevSet => new Set(prevSet).add(movieId));
      
      // --- 4. UPDATE HYPE FUNCTION ---
      // Re-fetch the full list to keep "My Hype Page" in sync
      fetchHypedMovies(); 

    } catch (error) {
      console.error("Hype failed:", error);
      if (error.response && error.response.status === 400) {
        setHypedMovies(prevSet => new Set(prevSet).add(movieId));
        // Also re-fetch here just in case
        fetchHypedMovies();
      }
    }
  }, [hypedMovies]); // We can keep deps simple

  // --- 1. ADD THIS FUNCTION ---
  const unHypeMovie = useCallback(async (movieId) => {
    if (!hypedMovies.has(movieId)) {
      return; // Already unhyped
    }
    try {
      await api.delete(`/movies/${movieId}/hype`);
      
      // A) Optimistic update for the button
      setHypedMovies(prevSet => {
        const newSet = new Set(prevSet);
        newSet.delete(movieId);
        return newSet;
      });
      
      // B) Re-fetch the full list to update "My Hype Page"
      // This ensures the "My Hype" page is accurate
      fetchHypedMovies(); 

    } catch (error) {
      console.error("Un-Hype failed:", error);
    }
  }, [hypedMovies]); // Add hypedMovies to dependency array


  const value = {
    session,
    user: session?.user,
    hypedMovies,    // The Set of IDs
    hypedMoviesList, // --- 5. EXPORT THE NEW LIST ---
    hypeMovie,   
    unHypeMovie, // <-- 2. Add this
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 2. The hook remains a named export
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Make the component the default export
export default AuthProvider;