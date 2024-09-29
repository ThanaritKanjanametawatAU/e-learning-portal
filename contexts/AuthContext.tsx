'use client';

import dbConnect from '@/lib/db';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  toggleTeacherRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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

  function login(user: User) {
    setUser(user);
    setIsTeacher(!!user.teacherId);
  }

  const logout = async () => {
    // Implement your logout logic here
    // This might involve clearing tokens, resetting state, etc.
    setUser(null);
    setIsTeacher(false);
    // Any other necessary cleanup
  };

  function toggleTeacherRole() {
    setIsTeacher((prevIsTeacher) => !prevIsTeacher);
  }

  return (
    <AuthContext.Provider value={{ user, isTeacher, login, logout, toggleTeacherRole }}>
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