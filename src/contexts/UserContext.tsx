import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Person } from '../types/users';
import mockAuthService, { MockUserType } from '../services/mock-auth';
import config from '../config';

// Define the context type
interface UserContextType {
  currentUser: Person | null;
  isLoggedIn: boolean;
  loginAsUser: (userType: MockUserType) => void;
  logout: () => void;
  currentUserType: MockUserType | null;
  availableUserTypes: MockUserType[];
  getUserTypeDisplayName: (userType: MockUserType) => string;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  currentUser: null,
  isLoggedIn: false,
  loginAsUser: () => {},
  logout: () => {},
  currentUserType: null,
  availableUserTypes: [],
  getUserTypeDisplayName: () => '',
});

// Provider props
interface UserProviderProps {
  children: ReactNode;
}

// User provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Person | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserType, setCurrentUserType] = useState<MockUserType | null>(null);

  // Initialize with mock auth service if in development
  useEffect(() => {
    if (config.environment === 'development' && mockAuthService) {
      // Check if there's a saved user in localStorage
      const savedUserType = localStorage.getItem('mockUserType') as MockUserType | null;
      
      if (savedUserType) {
        loginAsUser(savedUserType);
      } else {
        // Default to org_admin if no saved user
        loginAsUser('org_admin');
      }
    }
  }, []);

  // Login as a specific user type
  const loginAsUser = (userType: MockUserType) => {
    if (config.environment === 'development' && mockAuthService) {
      const user = mockAuthService.loginAsUser(userType);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentUserType(userType);
      
      // Save to localStorage for persistence
      localStorage.setItem('mockUserType', userType);
    }
  };

  // Logout current user
  const logout = () => {
    if (config.environment === 'development' && mockAuthService) {
      mockAuthService.logout();
      setCurrentUser(null);
      setIsLoggedIn(false);
      setCurrentUserType(null);
      
      // Remove from localStorage
      localStorage.removeItem('mockUserType');
    }
  };

  // Get available user types
  const availableUserTypes = config.environment === 'development' && mockAuthService
    ? mockAuthService.getAvailableUserTypes()
    : [];

  // Get user type display name
  const getUserTypeDisplayName = (userType: MockUserType): string => {
    return config.environment === 'development' && mockAuthService
      ? mockAuthService.getUserTypeDisplayName(userType)
      : userType;
  };

  // Context value
  const value: UserContextType = {
    currentUser,
    isLoggedIn,
    loginAsUser,
    logout,
    currentUserType,
    availableUserTypes,
    getUserTypeDisplayName,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 