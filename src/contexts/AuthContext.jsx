import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import api from '../services/api'; // Import our Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- NEW STATE ---
  // We'll store the IDs of hyped movies in a Set.
  // Sets are very fast for checking: hypedMovies.has(123)
  const [hypedMovies, setHypedMovies] = useState(new Set());

  // --- NEW FUNCTION ---
  // Fetches the list of hyped movie IDs from our Spring Boot backend
  const fetchHypedMovies = async () => {
    try {
      // Call our backend endpoint: GET /api/movies/hyped
      const { data } = await api.get('/movies/hyped');
      
      // 'data' is an array of Movie objects. We just want their IDs.
      const idSet = new Set(data.map(movie => movie.id));
      setHypedMovies(idSet);
      
    } catch (error) {
      // This will fail if the user is logged out, which is fine.
      console.error("Failed to fetch hyped movies (user might be logged out):", error);
    }
  };

  // This useEffect runs once when the app loads
  useEffect(() => {
    // Check for an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      localStorage.setItem('hypeflix-access-token', session?.access_token || null);
      
      // --- NEW ---
      // If we have a session on page load, fetch the user's hyped movies
      if (session) {
        fetchHypedMovies();
      }
      setLoading(false);
    });

    // Listen for auth changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        localStorage.setItem('hypeflix-access-token', session?.access_token || null);
        
        // --- NEW ---
        if (session) {
          // User just logged in, fetch their list
          fetchHypedMovies();
        } else {
          // User just logged out, clear the list
          setHypedMovies(new Set());
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []); // The empty array [] means this runs only once

  const login = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    return supabase.auth.signOut();
  };

  // --- NEW FUNCTION ---
  // This function will be called from the MovieCard button
  const hypeMovie = useCallback(async (movieId) => {
    // 1. Check our Set. If it's already there, do nothing.
    if (hypedMovies.has(movieId)) {
      console.log("Already hyped, skipping.");
      return; 
    }

    try {
      // 2. Call our Spring Boot backend: POST /api/movies/{movieId}/hype
      await api.post(`/movies/${movieId}/hype`);
      
      // 3. Update our local state instantly (this is called an "Optimistic Update")
      // This makes the button change state without a page refresh.
      setHypedMovies(prevSet => new Set(prevSet).add(movieId));
      
    } catch (error) {
      console.error("Hype failed:", error);
      // If the backend says we already hyped it (e.g., race condition)
      if (error.response && error.response.status === 400) {
        // Just update the local state to match the backend
        setHypedMovies(prevSet => new Set(prevSet).add(movieId));
      }
    }
  }, [hypedMovies]); // Re-create this function only if the hypedMovies set changes

  // Expose the new state and function to the rest of the app
  const value = {
    session,
    user: session?.user,
    hypedMovies, // Pass the Set of IDs
    hypeMovie,   // Pass the function to hype a movie
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// This custom hook is how components will access the context
export const useAuth = () => {
  return useContext(AuthContext);
};