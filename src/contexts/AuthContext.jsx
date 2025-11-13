import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '/src/supabaseClient.js'; 
import api from '/src/services/api.js'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hypedMovies, setHypedMovies] = useState(new Set());
  const [hypedMoviesList, setHypedMoviesList] = useState([]);

  const fetchHypedMovies = async () => {
    try {
      const { data } = await api.get('/movies/hyped');
      setHypedMoviesList(data);
      const idSet = new Set(data.map(movie => movie.id));
      setHypedMovies(idSet);
    } catch (error) {
      setHypedMovies(new Set());
      setHypedMoviesList([]);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      localStorage.setItem('hypeflix-access-token', session?.access_token || null);
      if (session) fetchHypedMovies();
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

  const login = (email, password) => supabase.auth.signInWithPassword({ email, password });
  const logout = () => supabase.auth.signOut();

  // API Calls - these now ONLY update the backend and the ID set
  const hypeMovieApi = useCallback(async (movieId) => {
    setHypedMovies(prev => new Set(prev).add(movieId)); // Optimistic ID add
    try {
      await api.post(`/movies/${movieId}/hype`);
      fetchHypedMovies(); // Update "My Hype" list in background
    } catch (e) {
      setHypedMovies(prev => { // Rollback
        const s = new Set(prev); s.delete(movieId); return s;
      });
    }
  }, []);

  const unHypeMovieApi = useCallback(async (movieId) => {
    setHypedMovies(prev => { // Optimistic ID remove
        const s = new Set(prev); s.delete(movieId); return s;
    }); 
    try {
      await api.delete(`/movies/${movieId}/hype`);
      fetchHypedMovies(); 
    } catch (e) {
      setHypedMovies(prev => new Set(prev).add(movieId)); // Rollback
    }
  }, []);

  const value = {
    session,
    user: session?.user,
    hypedMovies,    
    hypedMoviesList, 
    hypeMovieApi,   // Renamed to be clear it's the API call
    unHypeMovieApi, // Renamed
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;