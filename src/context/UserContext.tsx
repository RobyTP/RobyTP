import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Freelancer, Client } from '../types';
import { mockFreelancers, mockClients } from '../data/mockData';

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string, userType: 'freelancer' | 'client') => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user with matching email from mock data
        const freelancer = mockFreelancers.find(f => f.email === email);
        const client = mockClients.find(c => c.email === email);
        const user = freelancer || client;
        
        // For demo purposes, any password works
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (
    userData: Partial<User>,
    password: string,
    userType: 'freelancer' | 'client'
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would send data to backend
        // For demo, just create a new user object
        const newUser = {
          id: `new-${Date.now()}`,
          ...userData,
          userType,
          createdAt: new Date().toISOString(),
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Default avatar
        } as User;
        
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};