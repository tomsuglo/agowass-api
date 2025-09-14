// utils/auth/AuthProvider.js
import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Simulate app initialization
  const initiate = useCallback(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 500);
  }, []);

  const login = useCallback((studentId, password) => {
    // In real app, verify credentials here
    setUser({ id: studentId });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isReady,
        initiate,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
