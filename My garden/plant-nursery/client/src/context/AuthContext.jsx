import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('plant_nursery_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('plant_nursery_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('plant_nursery_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.error('Auth verification failed:', err);
          logout();
        }
      }
      setLoading(false);
    };

    checkLoggedInUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        if (res.data.requiresOtp) {
          return res.data;
        }
        const { token: authToken, user: userData } = res.data.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('plant_nursery_token', authToken);
        localStorage.setItem('plant_nursery_user', JSON.stringify(userData));
        return userData;
      }
      throw new Error(res.data.message || 'Login failed');
    } catch (err) {
      const errorData = err.response?.data;
      const error = new Error(errorData?.message || err.message || 'Login failed');
      error.code = errorData?.code;
      error.email = errorData?.email || email;
      throw error;
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await API.post('/auth/verify-otp', { email, otp });
      if (res.data.success) {
        const { token: authToken, user: userData } = res.data.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('plant_nursery_token', authToken);
        localStorage.setItem('plant_nursery_user', JSON.stringify(userData));
        return userData;
      }
      throw new Error(res.data.message || 'OTP verification failed');
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'OTP verification failed');
    }
  };

  const resendOtp = async (email) => {
    try {
      const res = await API.post('/auth/resend-otp', { email });
      return res.data;
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'Failed to resend OTP');
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (e) {
      // Ignore network errors on logout
    }
    setToken('');
    setUser(null);
    localStorage.removeItem('plant_nursery_token');
    localStorage.removeItem('plant_nursery_user');
  };

  const register = async (formData) => {
    try {
      const res = await API.post('/auth/register-admin', formData);
      if (res.data.success) {
        const { token: authToken, user: userData } = res.data.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('plant_nursery_token', authToken);
        localStorage.setItem('plant_nursery_user', JSON.stringify(userData));
        return userData;
      }
      throw new Error(res.data.message || 'Registration failed');
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'Registration failed');
    }
  };

  const requestRegisterOtp = async (formData) => {
    try {
      const res = await API.post('/auth/register-otp-request', formData);
      return res.data;
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'Registration request failed');
    }
  };

  const verifyRegisterOtp = async (email, otp) => {
    try {
      const res = await API.post('/auth/register-otp-verify', { email, otp });
      if (res.data.success) {
        const { token: authToken, user: userData } = res.data.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('plant_nursery_token', authToken);
        localStorage.setItem('plant_nursery_user', JSON.stringify(userData));
        return userData;
      }
      throw new Error(res.data.message || 'Registration verification failed');
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'Registration verification failed');
    }
  };

  const resendRegisterOtp = async (email) => {
    try {
      const res = await API.post('/auth/register-otp-resend', { email });
      return res.data;
    } catch (err) {
      const errorData = err.response?.data;
      throw new Error(errorData?.message || err.message || 'Failed to resend registration code');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        verifyOtp,
        resendOtp,
        requestRegisterOtp,
        verifyRegisterOtp,
        resendRegisterOtp,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
