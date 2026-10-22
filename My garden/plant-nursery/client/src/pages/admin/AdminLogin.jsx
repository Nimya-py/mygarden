import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import {
  LogIn,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  UserPlus,
  User,
  Phone,
  KeyRound,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'

  // Step states
  // 'credentials' -> 'loginOtp' for Login
  // 'regForm' -> 'registerOtp' for Setup
  const [step, setStep] = useState('credentials'); // 'credentials' | 'loginOtp' | 'registerOtp'

  const [pendingEmail, setPendingEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');

  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // New Admin Setup state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Common UI states
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resending, setResending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasAdmins, setHasAdmins] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');

  const {
    login,
    verifyOtp,
    resendOtp,
    requestRegisterOtp,
    verifyRegisterOtp,
    resendRegisterOtp,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // Check whether any administrators currently exist in the database
  const checkAdminStatus = async () => {
    try {
      const res = await API.get('/auth/admin-status');
      if (res.data?.success) {
        setHasAdmins(res.data.hasAdmins);
        if (res.data.adminEmail) {
          setAdminEmail(res.data.adminEmail);
        }
        if (!res.data.hasAdmins) {
          setActiveTab('register');
        } else {
          setActiveTab('login');
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  // Quick Action: Wipe/Clear existing database data and registered admins
  const handleClearDatabase = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to completely remove all registered admins, sample products, and test enquiries from the database?'
    );
    if (!confirmed) return;

    setError('');
    setSuccessMsg('');
    try {
      const res = await API.post('/auth/clear-database');
      setSuccessMsg(res.data?.message || 'Database records successfully wiped.');
      setHasAdmins(false);
      setActiveTab('register');
      setStep('credentials');
      setPendingEmail('');
      setOtpCode('');
      setDevOtpHint('');
    } catch (err) {
      setError(err.message || 'Failed to clear database records.');
    }
  };

  // ----------------------------------------------------
  // 1. REGULAR LOGIN FLOW
  // ----------------------------------------------------

  // Step 1: Submit Login Credentials -> Dispatches Login OTP
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.requiresOtp) {
        setStep('loginOtp');
        setPendingEmail(result.email || email);
        if (result.devOtp) {
          setDevOtpHint(result.devOtp);
        }
        setSuccessMsg(`A 6-digit login verification code has been dispatched to ${result.email || email}.`);
      } else if (result.role === 'ADMIN' || result.role === 'SUPER_ADMIN') {
        navigate(from, { replace: true });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid administrator email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Submit Regular Login OTP
  const handleLoginOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the complete 6-digit login code.');
      setSubmitting(false);
      return;
    }

    try {
      const loggedInUser = await verifyOtp(pendingEmail, otpCode.trim());
      if (loggedInUser.role === 'ADMIN' || loggedInUser.role === 'SUPER_ADMIN') {
        navigate(from, { replace: true });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid or expired login OTP code.');
    } finally {
      setSubmitting(false);
    }
  };

  // Resend Regular Login OTP
  const handleResendLoginOtp = async () => {
    if (!pendingEmail) return;
    setResending(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await resendOtp(pendingEmail);
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      setSuccessMsg(`A fresh 6-digit login code has been dispatched to ${pendingEmail}.`);
    } catch (err) {
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  // ----------------------------------------------------
  // 2. ONE-TIME REGISTRATION OTP FLOW
  // ----------------------------------------------------

  // Step 1: Submit Registration Form -> Dispatches Registration OTP
  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setSubmitting(true);

    if (!registerData.name.trim()) {
      setError('Full name is required.');
      setSubmitting(false);
      return;
    }

    if (!registerData.email.trim()) {
      setError('Email address is required.');
      setSubmitting(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await requestRegisterOtp(registerData);
      setStep('registerOtp');
      setPendingEmail(registerData.email.trim());
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      setSuccessMsg(`A 6-digit one-time registration code has been dispatched to ${registerData.email.trim()}.`);
    } catch (err) {
      setError(err.message || 'Failed to request registration code. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Submit One-Time Registration OTP -> Activates & Opens Dashboard
  const handleRegisterOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the complete 6-digit registration code.');
      setSubmitting(false);
      return;
    }

    try {
      const newUser = await verifyRegisterOtp(pendingEmail, otpCode.trim());
      if (newUser.role === 'ADMIN' || newUser.role === 'SUPER_ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid or expired registration code.');
    } finally {
      setSubmitting(false);
    }
  };

  // Resend One-Time Registration OTP
  const handleResendRegisterOtp = async () => {
    if (!pendingEmail) return;
    setResending(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await resendRegisterOtp(pendingEmail);
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      setSuccessMsg(`A fresh 6-digit registration code has been dispatched to ${pendingEmail}.`);
    } catch (err) {
      setError(err.message || 'Failed to resend registration code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  // Helper to switch modes
  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setStep('credentials');
    setOtpCode('');
    setError('');
    setSuccessMsg('');
    setDevOtpHint('');
  };

  return (
    <div className="bg-[#F7F5EE] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#D6DDD5] shadow-xl">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2115] border border-[#163A24] flex items-center justify-center text-[#C4E85A] mx-auto shadow-md">
            {step !== 'credentials' ? (
              <KeyRound className="w-7 h-7 text-[#C4E85A]" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-[#C4E85A]" />
            )}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0B2115] tracking-tight">
              {step === 'registerOtp'
                ? 'Verify Registration OTP'
                : step === 'loginOtp'
                ? 'Two-Factor Login OTP'
                : 'Kinattukara Admin Portal'}
            </h1>
            <p className="text-xs text-[#526651] mt-1 font-medium">
              {step !== 'credentials'
                ? `Enter 6-digit code sent to ${pendingEmail}`
                : 'Nutmeg Plantation & Nursery Management System'}
            </p>
          </div>
        </div>

        {/* Tab Switcher: Only visible when entering credentials */}
        {step === 'credentials' && (
          <div className="flex bg-[#F0F3EE] p-1 rounded-xl border border-[#DCE4D9]">
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'login'
                  ? 'bg-white text-[#0B2115] shadow-xs'
                  : 'text-[#637863] hover:text-[#0B2115]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In (Regular OTP)</span>
            </button>

            {hasAdmins ? (
              <button
                type="button"
                onClick={() => handleSwitchTab('register')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'register'
                    ? 'bg-white text-[#0B2115] shadow-xs'
                    : 'text-[#8E9B8D] hover:text-[#0B2115]'
                }`}
                title="Administrator is already registered. Registration locked."
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Registered</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  Locked
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSwitchTab('register')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'register'
                    ? 'bg-white text-[#0B2115] shadow-xs'
                    : 'text-[#637863] hover:text-[#0B2115]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Set Up Admin (One-Time OTP)</span>
              </button>
            )}
          </div>
        )}

        {/* First-time Master Admin Setup Banner */}
        {hasAdmins === false && step === 'credentials' && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start space-x-2.5 text-xs text-emerald-900 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Clean Slate Database Detected</p>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                No administrator registered yet. Use the <strong>Set Up Admin</strong> tab below to create your master admin account with One-Time OTP.
              </p>
            </div>
          </div>
        )}

        {/* Development Helper Pill (Displays generated OTP for demo ease) */}
        {devOtpHint && step !== 'credentials' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 shadow-2xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {step === 'registerOtp' ? 'Registration OTP:' : 'Login OTP:'}
              </span>
              <strong className="font-mono tracking-widest text-sm bg-white px-2 py-0.5 rounded border border-amber-300">
                {devOtpHint}
              </strong>
            </div>
            <button
              type="button"
              onClick={() => setOtpCode(devOtpHint)}
              className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950"
            >
              Auto-fill
            </button>
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs text-red-800 shadow-2xs">
            <div className="flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Success Status Banner */}
        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* -------------------------------------------------------------------
            SCREEN A: REGULAR LOGIN OTP VERIFICATION STEP
           ------------------------------------------------------------------- */}
        {step === 'loginOtp' && (
          <form onSubmit={handleLoginOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#172018] mb-2 font-semibold text-center">
                Enter 6-Digit Login Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  inputMode="numeric"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full bg-[#FAFBF9] border-2 border-[#163A24]/30 focus:border-[#163A24] rounded-xl py-3 text-center font-mono text-2xl font-bold tracking-[0.5em] text-[#0B2115] placeholder-[#CCDBC9] focus:outline-none transition-all shadow-xs"
                />
              </div>
              <p className="text-[11px] text-[#637863] text-center mt-2">
                Valid for 10 minutes.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C4E85A]" />
                  <span>Verify Login OTP & Open Dashboard</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setOtpCode('');
                  setError('');
                }}
                className="inline-flex items-center space-x-1 font-semibold text-[#637863] hover:text-[#0B2115]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Email / Password</span>
              </button>

              <button
                type="button"
                disabled={resending}
                onClick={handleResendLoginOtp}
                className="inline-flex items-center space-x-1 font-semibold text-[#163A24] hover:underline disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                <span>{resending ? 'Sending...' : 'Resend Code'}</span>
              </button>
            </div>
          </form>
        )}

        {/* -------------------------------------------------------------------
            SCREEN B: ONE-TIME REGISTRATION OTP VERIFICATION STEP
           ------------------------------------------------------------------- */}
        {step === 'registerOtp' && (
          <form onSubmit={handleRegisterOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#172018] mb-2 font-semibold text-center">
                Enter 6-Digit Registration OTP <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  inputMode="numeric"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full bg-[#FAFBF9] border-2 border-[#163A24]/30 focus:border-[#163A24] rounded-xl py-3 text-center font-mono text-2xl font-bold tracking-[0.5em] text-[#0B2115] placeholder-[#CCDBC9] focus:outline-none transition-all shadow-xs"
                />
              </div>
              <p className="text-[11px] text-[#637863] text-center mt-2">
                One-time code to activate your new admin credentials.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Activating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-[#C4E85A]" />
                  <span>Verify OTP & Create Account</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setOtpCode('');
                  setError('');
                }}
                className="inline-flex items-center space-x-1 font-semibold text-[#637863] hover:text-[#0B2115]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Registration Details</span>
              </button>

              <button
                type="button"
                disabled={resending}
                onClick={handleResendRegisterOtp}
                className="inline-flex items-center space-x-1 font-semibold text-[#163A24] hover:underline disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                <span>{resending ? 'Sending...' : 'Resend Code'}</span>
              </button>
            </div>
          </form>
        )}

        {/* -------------------------------------------------------------------
            SCREEN C: CREDENTIALS INPUT FORM (Sign In vs Setup Admin)
           ------------------------------------------------------------------- */}
        {step === 'credentials' && activeTab === 'login' && (
          /* --- SIGN IN --- */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#172018] mb-1.5 font-semibold">
                Admin Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered admin email"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
                <Mail className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-[#172018] font-semibold">
                  Secret Password <span className="text-red-500">*</span>
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-[11px] font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow disabled:opacity-50 mt-2"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials & Sending OTP...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#C4E85A]" />
                  <span>Continue with Regular Email OTP</span>
                </>
              )}
            </button>
          </form>
        )}

        {step === 'credentials' && activeTab === 'register' && (
          hasAdmins ? (
            /* --- ALREADY REGISTERED CARD --- */
            <div className="p-6 bg-amber-50/80 border border-amber-300 rounded-2xl text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-base font-bold text-amber-950">
                  Administrator Already Registered
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed max-w-xs mx-auto">
                  This nursery portal is already initialized with an active administrator account{adminEmail ? ` (${adminEmail})` : ''}.
                </p>
                <p className="text-[11px] text-amber-700/90 font-medium">
                  Additional registrations are locked to secure the nursery dashboard. Please sign in below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSwitchTab('login')}
                className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <LogIn className="w-4 h-4 text-[#C4E85A]" />
                <span>Go to Sign In (Regular OTP)</span>
              </button>
            </div>
          ) : (
            /* --- SET UP NEW ADMIN WITH ONE-TIME OTP --- */
            <form onSubmit={handleRegisterFormSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs text-[#172018] mb-1 font-semibold">
                Admin Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  placeholder="Enter administrator full name"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
                <User className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#172018] mb-1 font-semibold">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="Enter email to verify and sign in with"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
                <Mail className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#172018] mb-1 font-semibold">
                Choose Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Create password (min. 6 characters)"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
                <Lock className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-2.5 text-[#637863] hover:text-[#163A24] transition-colors"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#172018] mb-1 font-semibold">
                Phone Number <span className="text-xs text-[#8E9B8D] font-normal">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  placeholder="+91 94473 12890"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
                <Phone className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow disabled:opacity-50 mt-3"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Dispatching One-Time Registration OTP...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-[#C4E85A]" />
                  <span>Send One-Time Registration OTP</span>
                </>
              )}
            </button>
          </form>
        ))}

        <div className="flex items-center justify-between pt-3 border-t border-[#F0F3EE] text-[11px] text-[#637863]">
          <p>Kinattukara Two-Factor Security</p>
          <button
            type="button"
            onClick={handleClearDatabase}
            className="text-[11px] text-red-600 hover:text-red-800 font-medium hover:underline transition-colors"
            title="Wipe sample products, test enquiries, and reset all admin accounts"
          >
            Clear Database
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
