import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { Nursery } from '../models/Nursery.js';
import { Product } from '../models/Product.js';
import { Enquiry } from '../models/Enquiry.js';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendLoginOtpEmail,
  sendRegistrationOtpEmail,
} from '../utils/emailService.js';
import { validatePasswordStrength } from '../utils/security.js';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Helper to attach secure HttpOnly cookie
const setAuthCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
};

// Helper to clear secure cookie
const clearAuthCookie = (res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  });
};

// @desc    Admin / User Login
// @route   POST /api/auth/login
// @access  Public (Rate-limited)
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find user with password and security lockout fields
    const user = await User.findOne({ email: cleanEmail }).select(
      '+password +failedLoginAttempts +lockUntil'
    );

    // Check account lockout
    if (user && user.lockUntil && user.lockUntil > Date.now()) {
      const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
      return res.status(429).json({
        success: false,
        message: `Account temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      const MAX_ATTEMPTS = 5;
      
      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
        await user.save();
        return res.status(429).json({
          success: false,
          message: 'Account temporarily locked for 15 minutes due to 5 consecutive failed login attempts.',
        });
      }

      await user.save();
      const attemptsLeft = MAX_ATTEMPTS - user.failedLoginAttempts;

      return res.status(401).json({
        success: false,
        message: `Invalid credentials. (${attemptsLeft} attempt(s) remaining before security lockout)`,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account is deactivated. Please contact support.',
      });
    }

    // Require Email Verification before dashboard access
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Email address has not been verified. Please verify your email before accessing the nursery management portal.',
        email: user.email,
      });
    }

    // Generate secure 6-digit OTP
    const otp = user.createLoginOtp();
    await user.save();

    // Dispatch OTP to email
    await sendLoginOtpEmail({
      to: user.email,
      name: user.name,
      otp,
    });

    res.status(200).json({
      success: true,
      requiresOtp: true,
      email: user.email,
      message: `A 6-digit verification code has been dispatched to ${user.email}.`,
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify 6-digit Login OTP & Issue Session
// @route   POST /api/auth/verify-otp
// @access  Public (Rate-limited)
export const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and 6-digit OTP code are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();
    const hashedOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    const user = await User.findOne({
      email: cleanEmail,
      loginOtpHash: hashedOtp,
      loginOtpExpires: { $gt: Date.now() },
    }).select('+loginOtpHash +loginOtpExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code. Please request a new code.',
      });
    }

    // Reset OTP and security counters
    user.loginOtpHash = undefined;
    user.loginOtpExpires = undefined;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          emailVerified: user.emailVerified,
          isActive: user.isActive,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend Login OTP
// @route   POST /api/auth/resend-otp
// @access  Public (Rate-limited)
export const resendLoginOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+loginOtpHash +loginOtpExpires');

    if (!user || !user.isActive) {
      return res.status(200).json({
        success: true,
        message: 'If an active account exists, a new code has been sent.',
      });
    }

    const otp = user.createLoginOtp();
    await user.save();

    await sendLoginOtpEmail({
      to: user.email,
      name: user.name,
      otp,
    });

    res.status(200).json({
      success: true,
      message: `A new 6-digit verification code has been dispatched to ${user.email}.`,
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin / User Logout
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

// @desc    Verify Email with Token
// @route   POST /api/auth/verify-email
// @access  Public (Rate-limited)
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required.',
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationTokenHash: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    }).select('+emailVerificationTokenHash +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification link. Please request a new verification email.',
      });
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    console.log(`[AUTH] Admin email verified successfully: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. You may now sign in to your administrator dashboard.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend Verification Email
// @route   POST /api/auth/resend-verification
// @access  Public (Rate-limited)
export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+emailVerificationTokenHash +emailVerificationExpires');

    // If user exists and is not verified yet, send verification email
    if (user && !user.emailVerified && user.isActive) {
      const verificationToken = user.createEmailVerificationToken();
      await user.save();

      await sendVerificationEmail({
        to: user.email,
        name: user.name,
        verificationToken,
      });
    }

    // Always return generic response to prevent email enumeration
    res.status(200).json({
      success: true,
      message: 'If an unverified account exists for this email, a new verification link has been sent to your inbox.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Request Password Reset Link
// @route   POST /api/auth/forgot-password
// @access  Public (Rate-limited)
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered administrator email address.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+passwordResetTokenHash +passwordResetExpires');

    // If user exists and is active, create reset token
    if (user && user.isActive) {
      const resetToken = user.createPasswordResetToken();
      await user.save();

      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetToken,
      });
    }

    // Generic response prevents account enumeration
    res.status(200).json({
      success: true,
      message: 'If an account exists for this email address, a password reset link has been dispatched to your inbox.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password with Token
// @route   POST /api/auth/reset-password
// @access  Public (Rate-limited)
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is required.',
      });
    }

    // Validate strong password requirements
    const validation = validatePasswordStrength(password);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetTokenHash: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetTokenHash +passwordResetExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset link. Please request a new reset email.',
      });
    }

    // Set new password (pre-save hook hashes with bcrypt salt 12)
    user.password = password;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    console.log(`[AUTH] Password successfully reset for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You may now log in with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Logged-in User
// @route   GET /api/auth/me
// @access  Private (Auth required)
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register / Set up a new Administrator Account
// @route   POST /api/auth/register-admin
// @access  Public
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone?.trim() || '',
      role: 'ADMIN',
      emailVerified: true, // Auto-verified for seamless setup
      isActive: true,
    });

    // Ensure default nursery owner is set
    const nursery = await Nursery.findOne();
    if (nursery && !nursery.owner) {
      nursery.owner = user._id;
      await nursery.save();
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          emailVerified: user.emailVerified,
          isActive: user.isActive,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// In-memory store for pending registrations with auto-expiry
const pendingRegistrations = new Map();

const cleanExpiredRegistrations = () => {
  const now = Date.now();
  for (const [key, val] of pendingRegistrations.entries()) {
    if (val.expiresAt < now) pendingRegistrations.delete(key);
  }
};

// @desc    Step 1: Request One-Time OTP for New Admin Registration
// @route   POST /api/auth/register-otp-request
// @access  Public
export const requestRegisterOtp = async (req, res, next) => {
  try {
    cleanExpiredRegistrations();
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check if an administrator is already registered in the system
    const existingAdmin = await User.findOne({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        code: 'ADMIN_ALREADY_REGISTERED',
        message: 'An administrator account is already registered for this nursery portal. Please sign in.',
      });
    }

    // 2. Check if this specific email is already registered
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({
        success: false,
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Generate 6-digit registration OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Save to pending registrations
    pendingRegistrations.set(cleanEmail, {
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone?.trim() || '',
      hashedOtp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    await sendRegistrationOtpEmail({
      to: cleanEmail,
      name: name.trim(),
      otp,
    });

    res.status(200).json({
      success: true,
      requiresOtp: true,
      email: cleanEmail,
      message: `A 6-digit registration code has been sent to ${cleanEmail}.`,
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Step 2: Verify Registration OTP & Finalize Admin Account
// @route   POST /api/auth/register-otp-verify
// @access  Public
export const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and 6-digit registration code are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();
    const hashedOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    const pending = pendingRegistrations.get(cleanEmail);
    if (!pending || pending.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Registration session expired or not found. Please fill in the registration form again.',
      });
    }

    if (pending.hashedOtp !== hashedOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration code. Please enter the correct code.',
      });
    }

    // Ensure an admin wasn't created while registration was in progress
    const existingAdmin = await User.findOne({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
    if (existingAdmin) {
      pendingRegistrations.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        code: 'ADMIN_ALREADY_REGISTERED',
        message: 'An administrator account is already registered for this nursery portal. Please sign in.',
      });
    }

    // Ensure user doesn't already exist
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      pendingRegistrations.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please sign in.',
      });
    }

    // Create verified admin user
    const user = await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      phone: pending.phone,
      role: 'ADMIN',
      emailVerified: true,
      isActive: true,
    });

    pendingRegistrations.delete(cleanEmail);

    // Associate with nursery if owner unset
    const nursery = await Nursery.findOne();
    if (nursery && !nursery.owner) {
      nursery.owner = user._id;
      await nursery.save();
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Admin account created and verified successfully.',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          emailVerified: user.emailVerified,
          isActive: user.isActive,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend One-Time Registration OTP
// @route   POST /api/auth/register-otp-resend
// @access  Public
export const resendRegisterOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const pending = pendingRegistrations.get(cleanEmail);

    if (!pending || pending.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'No active registration session found. Please fill in the registration form again.',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    pending.hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    pending.expiresAt = Date.now() + 10 * 60 * 1000;

    await sendRegistrationOtpEmail({
      to: cleanEmail,
      name: pending.name,
      otp,
    });

    res.status(200).json({
      success: true,
      message: `A fresh 6-digit registration code has been sent to ${cleanEmail}.`,
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear database records (Users, Products, Enquiries)
// @route   POST /api/auth/clear-database
// @access  Public
export const clearDatabase = async (req, res, next) => {
  try {
    const usersDeleted = await User.deleteMany({});
    const productsDeleted = await Product.deleteMany({});
    const enquiriesDeleted = await Enquiry.deleteMany({});

    // Detach owner from nursery
    await Nursery.updateMany({}, { owner: null });

    // Clear in-memory pending registrations
    pendingRegistrations.clear();

    console.log(`[DB CLEAR] Successfully wiped ${usersDeleted.deletedCount} users, ${productsDeleted.deletedCount} products, ${enquiriesDeleted.deletedCount} enquiries.`);

    res.status(200).json({
      success: true,
      message: 'Existing database records and registered admins successfully removed.',
      deleted: {
        users: usersDeleted.deletedCount,
        products: productsDeleted.deletedCount,
        enquiries: enquiriesDeleted.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get count of registered admin users
// @route   GET /api/auth/admin-status
// @access  Public
export const getAdminStatus = async (req, res, next) => {
  try {
    const adminUser = await User.findOne({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } }).select('email name createdAt');
    const hasAdmins = !!adminUser;
    res.status(200).json({
      success: true,
      hasAdmins,
      count: hasAdmins ? 1 : 0,
      adminEmail: adminUser?.email || null,
      adminName: adminUser?.name || null,
    });
  } catch (error) {
    next(error);
  }
};


