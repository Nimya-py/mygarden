import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNursery } from '../context/NurseryContext';
import { LogIn, Lock, Mail, AlertCircle, X, Eye, EyeOff } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { nursery } = useNursery();
  const navigate = useNavigate();

  // Reset fields on modal open
  useEffect(() => {
    if (isOpen) {
      setError('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const loggedInUser = await login(email, password);
      onClose();

      // If Nursery Admin or Super Admin, navigate directly to dashboard
      if (loggedInUser.role === 'SUPER_ADMIN') {
        navigate('/super-admin');
      } else if (loggedInUser.role === 'ADMIN') {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0B2115]/60 backdrop-blur-md transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#163A24]/15 shadow-2xl p-7 sm:p-9 relative my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#647563] hover:text-[#0B2115] hover:bg-[#163A24]/5 rounded-full transition-colors"
          title="Close"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-xs mx-auto">
            <img
              src="/images/kinattukara_square_logo.png"
              alt="Kinattukara Emblem"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 id="login-modal-title" className="font-cormorant text-3xl sm:text-[32px] font-bold text-[#0B2115] leading-tight">
            Sign In to Kinattukara
          </h2>
          <p className="text-xs sm:text-[13px] text-[#647563] font-light max-w-xs mx-auto">
            Access nursery management, enquiries, and customer account.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#172018] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kinattukara.com"
                className="w-full bg-[#FAFBF9] border border-[#163A24]/20 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all"
              />
              <Mail className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#172018] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAFBF9] border border-[#163A24]/20 rounded-lg pl-10 pr-10 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all"
              />
              <Lock className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#647563] hover:text-[#0B2115]"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-medium py-3 rounded-full text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow"
          >
            <LogIn className="w-4 h-4" />
            <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-4 mt-4 border-t border-[#163A24]/10">
          <p className="text-xs text-[#647563]">
            Don't have an account?{' '}
            <Link
              to="/register"
              onClick={onClose}
              className="text-[#163A24] font-semibold hover:underline ml-0.5"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
