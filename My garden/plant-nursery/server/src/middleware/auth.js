import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

/**
 * Authenticates JWT token from HttpOnly cookie or Authorization Bearer header
 */
export const authenticate = async (req, res, next) => {
  let token;

  // 1. Check HttpOnly cookie first (recommended secure session)
  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }
  // 2. Fallback to Authorization Bearer header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. No session token provided.',
      code: 'AUTH_REQUIRED',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this session no longer exists.',
        code: 'USER_NOT_FOUND',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated. Access denied.',
        code: 'ACCOUNT_DEACTIVATED',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or token invalid. Please sign in again.',
      code: 'TOKEN_INVALID',
    });
  }
};

/**
 * Enforces email verification
 */
export const requireVerifiedEmail = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required before checking verification.',
      code: 'AUTH_REQUIRED',
    });
  }

  if (!req.user.emailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required. Please verify your email before accessing administrator resources.',
      code: 'EMAIL_NOT_VERIFIED',
    });
  }

  next();
};

/**
 * Enforces role authorization (e.g. ADMIN or SUPER_ADMIN)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required before authorization.',
        code: 'AUTH_REQUIRED',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user.role}' is not authorized for this resource.`,
        code: 'ROLE_FORBIDDEN',
      });
    }

    next();
  };
};

/**
 * Composite middleware: Authenticated + Active + Verified Email + Admin Role
 */
export const requireAdmin = [
  authenticate,
  requireVerifiedEmail,
  authorize('ADMIN', 'SUPER_ADMIN'),
];
