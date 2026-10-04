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
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      const { token: authToken, user: userData } = res.data.data;
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('plant_nursery_token', authToken);
      localStorage.setItem('plant_nursery_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await API.post('/auth/register', userData);
    if (res.data.success) {
      const { token: authToken, user: registeredUser } = res.data.data;
      setToken(authToken);
      setUser(registeredUser);
      localStorage.setItem('plant_nursery_token', authToken);
      localStorage.setItem('plant_nursery_user', JSON.stringify(registeredUser));
      return registeredUser;
    }
    throw new Error(res.data.message || 'Registration failed');
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('plant_nursery_token');
    localStorage.removeItem('plant_nursery_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
