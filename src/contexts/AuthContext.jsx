import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; // Corrected path
import api from '../services/api'; // Corrected path

const AuthContext = createContext();

// This is the hook we will export as a NAMED export
export const useAuth = () => {
  return useContext(AuthContext);
};

// This is the component we will export as a DEFAULT export
const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for the button logic (fast ID check)
  const [hypedMovies, setHypedMovies] = useState(new Set());
  
  // State for "My Hype Page" (full movie objects)
  const [hypedMoviesList, setHypedMoviesList] = useState([]);

  
  const fetchHypedMovies = async () => {
    try {
      const { data } = await api.get('/movies/hyped');
      setHypedMoviesList(data);
      const idSet = new Set(data.map(movie => movie.id));
      setHypedMovies(idSet);
    } catch (error) {
      console.error("Failed to fetch hyped movies:", error);
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
      setHypedMovies(prevSet => new Set(prevSet).add(movieId));
      fetchHypedMovies(); // Re-fetch full list for "My Hype Page"
    } catch (error) {
      console.error("Hype failed:", error);
      if (error.response && error.response.status === 400) {
        setHypedMovies(prevSet => new Set(prevSet).add(movieId));
        fetchHypedMovies();
      }
    }
  }, [hypedMovies]); // Keep deps simple

  // NEW Hype Toggle Function
  const unHypeMovie = useCallback(async (movieId) => {
    if (!hypedMovies.has(movieId)) {
      return;
    }
    try {
      await api.delete(`/movies/${movieId}/hype`); // Call the new DELETE endpoint
      
      // Update the button set
      setHypedMovies(prevSet => {
        const newSet = new Set(prevSet);
        newSet.delete(movieId);
        return newSet;
      });
      
      // Update the "My Hype Page" list
      fetchHypedMovies(); 
    } catch (error) {
      console.error("Un-Hype failed:", error);
    }
  }, [hypedMovies]); // Dependency array

  const value = {
    session,
    user: session?.user,
    hypedMovies,    
    hypedMoviesList, 
    hypeMovie,
    unHypeMovie, // Add the new function
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Make the component the DEFAULT export
export default AuthProvider;