import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('forumUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now().toString(),
      role: userData.email.includes('instructor') ? 'instructor' : 'student'
    };
    setUser(userWithId);
    localStorage.setItem('forumUser', JSON.stringify(userWithId));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forumUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isInstructor: user?.role === 'instructor'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};