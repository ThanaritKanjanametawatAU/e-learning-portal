'use client';

import dbConnect from '@/lib/db';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  teacherId: string | null;
  studentId: string | null;
}

interface AuthContextType {
  user: User | null;
  isTeacher: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsTeacher(parsedUser.teacherId !== null); // Check for null instead of undefined
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsTeacher(userData.teacherId !== null); // Check for null instead of undefined
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsTeacher(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isTeacher, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};