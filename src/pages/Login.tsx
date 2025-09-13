import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use table-based authentication (no Supabase Auth)
      const result = await authService.login(email, password);

      if (result.success && result.user) {
        // Store user data from user_profiles table
        localStorage.setItem('user', JSON.stringify(result.user));
        console.log('Login successful, user data:', result.user);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access ASPIRE 2025</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/* Debug info - remove in production */}
          <div className="mt-4 text-center">
            <small className="text-gray-500">
              Using table-based authentication (user_profiles table)
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;