"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types';
import { mockUsers, mockUserPasswords } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from a previous session
    const storedUser = sessionStorage.getItem('agrimitra-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.name.toLowerCase() === username.toLowerCase());
    if (foundUser && mockUserPasswords[foundUser.id] === password) {
      setUser(foundUser);
      sessionStorage.setItem('agrimitra-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('agrimitra-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
