import express from 'express';
import {
  login,
  verifyLoginOtp,
  resendLoginOtp,
  requestRegisterOtp,
  verifyRegisterOtp,
  resendRegisterOtp,
  registerAdmin,
  logout,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  clearDatabase,
  getAdminStatus,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import {
  loginRateLimiter,
  forgotPasswordRateLimiter,
  resendVerificationRateLimiter,
  verifyEmailRateLimiter,
} from '../middleware/rateLimiter.js';

const router = express.Router();

// Admin Status & Database Reset
router.get('/admin-status', getAdminStatus);
router.post('/clear-database', clearDatabase);

// Public Authentication & Recovery Endpoints (Rate Limited)
router.post('/login', loginRateLimiter, login);
router.post('/verify-otp', verifyLoginOtp);
router.post('/resend-otp', resendLoginOtp);

// One-Time Registration OTP Endpoints
router.post('/register-otp-request', requestRegisterOtp);
router.post('/register-otp-verify', verifyRegisterOtp);
router.post('/register-otp-resend', resendRegisterOtp);

router.post('/register-admin', registerAdmin);
router.post('/logout', logout);
router.post('/verify-email', verifyEmailRateLimiter, verifyEmail);
router.post('/resend-verification', resendVerificationRateLimiter, resendVerification);
router.post('/forgot-password', forgotPasswordRateLimiter, forgotPassword);
router.post('/reset-password', forgotPasswordRateLimiter, resetPassword);

// Session Verification Endpoint
router.get('/me', authenticate, getMe);

export default router;
