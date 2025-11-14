/* File: src/pages/SignupPage.jsx
  Description: Removed the redundant "Sign Up with Google" button.
*/
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // For success message
  const { signUp } = useAuth(); // Removed signInWithGoogle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setMessage('Success! Check your email for a confirmation link.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-950 rounded-lg shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white">
          Create Your Account
        </h1>

        {/* --- Google Button and Divider Removed --- */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email" name="email" type="email"
                autoComplete="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password (min. 6 characters)
            </label>
            <div className="mt-1">
              <input
                id="password" name="password" type="password"
                autoComplete="new-password" required value={password}
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

          {message && (
            <div className="text-center text-green-400">
              {message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !!message} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="font-medium text-white hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;