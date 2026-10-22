import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../../services/api';
import { CheckCircle2, AlertCircle, RefreshCw, LogIn, Mail, ShieldCheck } from 'lucide-react';

export const AdminVerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [verifying, setVerifying] = useState(Boolean(token));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(token ? '' : 'No verification token provided. Please check your email link.');

  // Resend form state
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  useEffect(() => {
    if (!token) return;

    const performVerification = async () => {
      setVerifying(true);
      setError('');
      try {
        const res = await API.post('/auth/verify-email', { token });
        if (res.data?.success) {
          setSuccess(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Verification token is invalid or has expired.');
      } finally {
        setVerifying(false);
      }
    };

    performVerification();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail) return;

    setResending(true);
    setResendMsg('');
    try {
      const res = await API.post('/auth/resend-verification', { email: resendEmail });
      setResendMsg(res.data?.message || 'If an unverified account exists, a new verification email has been dispatched.');
    } catch (err) {
      setResendMsg(err.response?.data?.message || 'Failed to dispatch verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#D6DDD5] shadow-xl text-center">
        
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0B2115] border border-[#163A24] flex items-center justify-center text-[#C4E85A] mx-auto shadow-md">
          <ShieldCheck className="w-7 h-7 text-[#C4E85A]" />
        </div>

        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0B2115] tracking-tight">
            Admin Email Verification
          </h1>
          <p className="text-xs text-[#526651] mt-1 font-medium">
            Kinattukara Nursery Security Protocol
          </p>
        </div>

        {/* 1. Verifying State */}
        {verifying && (
          <div className="py-8 space-y-3">
            <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-[#526651] font-medium">
              Validating cryptographic security token...
            </p>
          </div>
        )}

        {/* 2. Success State */}
        {!verifying && success && (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-left">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Email Verified Successfully</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Your administrator email has been authenticated. You can now access the Kinattukara Nursery dashboard.
              </p>
            </div>

            <Link
              to="/admin/login"
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <LogIn className="w-4 h-4 text-[#C4E85A]" />
              <span>Proceed to Admin Sign In</span>
            </Link>
          </div>
        )}

        {/* 3. Error / Expired State */}
        {!verifying && error && (
          <div className="space-y-5 text-left">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1.5">
              <div className="flex items-center space-x-2 text-red-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Verification Failed</span>
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                {error}
              </p>
            </div>

            <div className="bg-[#FAFBF9] border border-[#E2E8DF] p-5 rounded-xl space-y-3">
              <h2 className="text-xs font-semibold text-[#0B2115]">
                Request a New Verification Link
              </h2>
              <form onSubmit={handleResend} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="admin@kinattukara.com"
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24]"
                  />
                  <Mail className="w-4 h-4 text-[#637863] absolute left-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  disabled={resending}
                  className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                  <span>{resending ? 'Dispatching...' : 'Send New Verification Link'}</span>
                </button>
              </form>

              {resendMsg && (
                <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 mt-2">
                  {resendMsg}
                </p>
              )}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/admin/login"
                className="text-xs font-semibold text-[#163A24] hover:underline"
              >
                Back to Admin Login
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
