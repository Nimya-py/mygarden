import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../../services/api';
import { Lock, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export const AdminResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(token ? '' : 'No password reset token provided. Please check your reset link.');

  // Live password validation checks
  const criteria = [
    { label: 'At least 12 characters', valid: password.length >= 12 },
    { label: 'One uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', valid: /[a-z]/.test(password) },
    { label: 'One number (0-9)', valid: /[0-9]/.test(password) },
    { label: 'One special character (!@#$%^&*)', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password) },
  ];

  const allCriteriaMet = criteria.every((c) => c.valid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (!allCriteriaMet) {
      setError('Password does not satisfy all required security criteria.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await API.post('/auth/reset-password', { token, password });
      if (res.data?.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Link may be invalid or expired.');
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
              Create New Password
            </h1>
            <p className="text-xs text-[#526651] mt-1 font-medium">
              Kinattukara Security Standard Enforced
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-left">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password Reset Successfully</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Your new administrator password has been hashed and stored securely. You can now log in to the dashboard.
              </p>
            </div>

            <Link
              to="/admin/login"
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Sign In with New Password</span>
              <ArrowRight className="w-4 h-4 text-[#C4E85A]" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 12 chars, upper, lower, num, symbol"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] shadow-2xs"
                />
                <Lock className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#637863] hover:text-[#163A24]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] shadow-2xs"
                />
                <Lock className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Live Security Checklist */}
            <div className="bg-[#FAFBF9] border border-[#E2E8DF] p-3.5 rounded-xl space-y-1.5 text-left">
              <span className="text-[11px] font-semibold text-[#0B2115] block mb-1">
                Security Policy Requirements:
              </span>
              {criteria.map((c, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[11px]">
                  {c.valid ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  )}
                  <span className={c.valid ? 'text-emerald-800 font-medium' : 'text-[#637863]'}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={submitting || !allCriteriaMet || !token}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 mt-2"
            >
              {submitting ? 'Resetting Password...' : 'Save New Password & Activate'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
