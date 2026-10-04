import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const NurseryContext = createContext();

const safeSave = (data) => {
  try {
    localStorage.setItem('plant_nursery_profile', JSON.stringify(data));
  } catch (e) {
    try {
      const { logo, coverImage, ...trimmed } = data;
      localStorage.setItem('plant_nursery_profile', JSON.stringify(trimmed));
    } catch (err) {}
  }
};

export const NurseryProvider = ({ children }) => {
  const [nursery, setNursery] = useState(() => {
    try {
      const saved = localStorage.getItem('plant_nursery_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(!nursery);

  const fetchNursery = async () => {
    try {
      const res = await API.get('/nurseries');
      if (res.data?.success && res.data?.data?.[0]) {
        const data = res.data.data[0];
        setNursery(data);
        safeSave(data);
      }
    } catch (err) {
      console.error('Failed to load nursery profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNursery();

    const handleProfileUpdate = (e) => {
      if (e.detail) {
        setNursery(e.detail);
        safeSave(e.detail);
      } else {
        fetchNursery();
      }
    };

    window.addEventListener('nursery_updated', handleProfileUpdate);
    return () => window.removeEventListener('nursery_updated', handleProfileUpdate);
  }, []);

  const updateNursery = (updatedData) => {
    setNursery(updatedData);
    safeSave(updatedData);
    window.dispatchEvent(new CustomEvent('nursery_updated', { detail: updatedData }));
  };

  return (
    <NurseryContext.Provider value={{ nursery, loading, fetchNursery, updateNursery }}>
      {children}
    </NurseryContext.Provider>
  );
};

export const useNursery = () => useContext(NurseryContext);
