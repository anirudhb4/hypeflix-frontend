/* File: src/pages/LoginPage.jsx
  Description: Add Google sign-in and link to signup page.
*/
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // 1. Import Link

// 2. Copy the GoogleIcon from the new SignupPage
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.806 9.654C34.897 6.02 29.754 4 24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691c-1.321 3.016-2.091 6.315-2.091 9.81s.77 6.794 2.091 9.81l-5.012 3.882C.281 33.633 0 28.98 0 24s.281-9.633 1.294-14.191L6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.412-5.337l-5.111-3.958c-1.748 1.173-3.876 1.866-6.301 1.866c-5.223 0-9.643-3.54-11.231-8.28H1.488v.011C6.01 40.066 14.37 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.23-2.167 4.14-3.964 5.717l5.111 3.958C41.714 34.063 44 29.49 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth(); // 3. Get signInWithGoogle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await login(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/'); // Redirect to home on success
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Add Google sign-in handler
  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      } else {
        navigate('/'); 
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-950 rounded-lg shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white">
          Login to HypeFlix
        </h1>

        {/* 5. Add Google Sign-in button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-md border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center text-gray-600">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-4 text-xs">OR CONTINUE WITH EMAIL</span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-center text-red-400">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        {/* 6. Add the link to Sign Up */}
        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-white hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;