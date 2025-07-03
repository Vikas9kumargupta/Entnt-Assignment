import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: User[] = [
  // Admin Users (Dental Professionals)
  { 
    id: "1", 
    role: "Admin", 
    email: "admin@entnt.in", 
    password: "admin123",
    name: "Dr. Sarah Johnson"
  },
  { 
    id: "8", 
    role: "Admin", 
    email: "dr.rahul@gmail.com", 
    password: "dental123",
    name: "Dr. Rahul Gupta"
  },
  { 
    id: "9", 
    role: "Admin", 
    email: "asifnaqvi64@gmail.com",
    password: "dental123",
    name: "Dr. Asif Naqvi"
  },
  
  // Patient Users
  { 
    id: "2", 
    role: "Patient", 
    email: "vikasgup074@gmail.com", 
    password: "patient123", 
    patientId: "p1",
    name: "Vikas Gupta"
  },
  { 
    id: "3", 
    role: "Patient", 
    email: "jane@gmail.com", 
    password: "patient123", 
    patientId: "p2",
    name: "Jane Smith"
  },
  { 
    id: "4", 
    role: "Patient", 
    email: "mike@gmail.com", 
    password: "patient123", 
    patientId: "p3",
    name: "Mike Johnson"
  },
  { 
    id: "5", 
    role: "Patient", 
    email: "sarah@gmail.com", 
    password: "patient123", 
    patientId: "p4",
    name: "Sarah Joseph"
  },
  { 
    id: "6", 
    role: "Patient", 
    email: "david@gmail.com", 
    password: "patient123", 
    patientId: "p5",
    name: "David Brown"
  },
  { 
    id: "7", 
    role: "Patient", 
    email: "lisa@gmail.com", 
    password: "patient123", 
    patientId: "p6",
    name: "Lisa Davis"
  },
  { 
    id: "10", 
    role: "Patient", 
    email: "robert@gmail.com", 
    password: "patient123", 
    patientId: "p7",
    name: "Robert Miller"
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize users in localStorage if not exists
    const existingUsers = localStorage.getItem('dentalUsers');
    if (!existingUsers) {
      localStorage.setItem('dentalUsers', JSON.stringify(initialUsers));
    }

    // Check for existing session
    const savedUser = localStorage.getItem('dentalCurrentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('dentalUsers') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('dentalCurrentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dentalCurrentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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