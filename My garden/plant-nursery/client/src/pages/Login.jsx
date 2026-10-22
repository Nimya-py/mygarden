import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        if (loggedInUser.role === 'SUPER_ADMIN' || loggedInUser.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your administrator email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#D6DDD5] shadow-lg">
        
        {/* Security Shield & Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] border border-[#C5D0C4] flex items-center justify-center text-[#163A24] mx-auto shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-[#163A24]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0B2115] tracking-tight">
              Nursery Admin Login
            </h1>
            <p className="text-xs text-[#526651] mt-1 font-medium">
              Kinattukara Nutmeg Plantation & Nursery Management
            </p>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAFBF9] border border-[#E2E8DF] text-[10px] font-semibold text-[#163A24]">
            <Lock className="w-3 h-3 text-[#163A24]" />
            <span>256-Bit Encrypted & Brute-Force Protected</span>
          </div>
        </div>

        {/* Security Alert Banner */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
              Administrator Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kinattukara.com"
                className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
              />
              <Mail className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
              Secret Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
              />
              <Lock className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#637863] hover:text-[#163A24] transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In Securely</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-[#F0F3EE] text-[11px] text-[#637863]">
          <p>Restricted Portal • Authorized Staff & Nursery Owner Only</p>
        </div>

      </div>
    </div>
  );
};

