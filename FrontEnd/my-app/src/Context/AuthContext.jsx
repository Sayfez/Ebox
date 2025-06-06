
import React, { createContext, useState, useEffect } from 'react';
import { signIn, signUp, logout, refreshTokens } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optionally, check for user authentication state (e.g., from localStorage or by refreshing tokens)
  }, []);

  const login = async (email, password) => {
    const userData = await signIn(email, password);
    setUser(userData);
    // Save tokens or user data as needed
  };

  const register = async (userData) => {
    const newUser = await signUp(userData);
    setUser(newUser);
    // Save tokens or user data as needed
  };

  const signout = async () => {
    await logout();
    setUser(null);
    // Remove tokens or user data as needed
  };

  return (
    <AuthContext.Provider value={{ user, login, register, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;