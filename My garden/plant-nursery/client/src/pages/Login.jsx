import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const loggedInUser = await login(email, password);
      
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (loggedInUser.role === 'SUPER_ADMIN') {
          navigate('/super-admin');
        } else if (loggedInUser.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-lg border border-[#163A24]/10 shadow-sm">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#163A24] flex items-center justify-center text-[#F7F5EE] mx-auto">
            <span className="font-serif font-semibold text-base">K</span>
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#0B2115]">
            Sign In to Kinattukara
          </h2>
          <p className="text-xs text-[#647563]">
            Access nursery management and enquiry administration.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#172018] mb-1.5 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kinattukara.com"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <Mail className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#172018] mb-1.5 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <Lock className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-medium py-3 rounded-full text-xs transition-colors flex items-center justify-center space-x-2 shadow"
          >
            <LogIn className="w-4 h-4" />
            <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#163A24]/10">
          <p className="text-xs text-[#647563]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#163A24] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
