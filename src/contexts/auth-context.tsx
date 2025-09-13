"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A default mock user since login is removed.
const mockUser: User = {
  id: '1',
  name: 'Krishi User',
  email: 'farmer@krishimitra.app',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // The user is now hardcoded as we removed the login system.
  const [user] = useState<User | null>(mockUser);

  const login = async (username: string, password: string): Promise<boolean> => {
    // This function is no longer used but kept to avoid breaking other parts of the app that might still reference it.
    return true;
  };

  const logout = () => {
    // This function is no longer used.
  };

  return (
    <AuthContext.Provider value={{ user }}>
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

    