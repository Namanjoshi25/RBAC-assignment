
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Load user from token
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
          const res = await axios.get('/api/auth/currentUser');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          setError(err.response?.data?.msg || 'Authentication failed');
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  // Set auth token
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Register user
  const register = async formData => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
     

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      return { success: false, error: err.response?.data?.msg || 'Registration failed' };
    }
  };

  // Login user
  const login = async formData => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      setAuthToken(res.data.token);
      loadUser();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      return { success: false, error: err.response?.data?.msg || 'Login failed' };
    }
  };
  //preverification
  const preverify= async formData => {
    try {
      const res = await axios.post('/api/auth/preverification', formData);
      if(res)   return { success: true };
   
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      return { success: false, error: err.response?.data?.msg || 'Login failed' };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/currentUser');
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        preverify,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};