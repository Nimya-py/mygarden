import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Mail, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setError('');
    setSubmitting(true);

    try {
      await API.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to process reset request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#D6DDD5] shadow-xl">
        
        {/* Header Icon */}
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2115] border border-[#163A24] flex items-center justify-center text-[#C4E85A] mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 text-[#C4E85A]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0B2115] tracking-tight">
              Reset Admin Password
            </h1>
            <p className="text-xs text-[#526651] mt-1 font-medium">
              Kinattukara Security Protocol
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {submitted ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-left">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reset Link Dispatched</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                If an account exists for <span className="font-semibold">{email}</span>, a secure password reset link has been dispatched to your inbox.
              </p>
              <p className="text-[11px] text-emerald-600/90 pt-1">
                For security reasons, the link will expire in <strong>60 minutes</strong>.
              </p>
            </div>

            <Link
              to="/admin/login"
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#C4E85A]" />
              <span>Return to Admin Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[#526651] leading-relaxed">
              Enter your registered administrator email address. We will verify your account and transmit a single-use password reset link.
            </p>

            <div>
              <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
                Admin Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kinattukara.com"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] shadow-2xs"
                />
                <Mail className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Dispatching Link...</span>
                </>
              ) : (
                <span>Send Password Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/admin/login"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#163A24] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Admin Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
