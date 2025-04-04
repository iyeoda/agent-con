import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, useUser as useClerkUser } from '@clerk/clerk-react';
import { authService } from '../services/auth-service';
import { AuthUser } from '../types/auth';
import config from '../config';

interface UserContextType {
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useClerkUser();

  useEffect(() => {
    if (config.useMockData) {
      // In development, use mock data
      const mockUser: AuthUser = {
        id: 'mock-user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Project Manager',
        avatar: null,
        organizationId: null,
        phone: '555-123-4567',
        department: 'Engineering',
        location: 'San Francisco, CA',
        bio: 'Software engineer with a focus on web technologies',
        company: 'Acme Construction',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/johndoe',
          twitter: 'https://twitter.com/johndoe'
        }
      };
      setCurrentUser(mockUser);
      authService.setMockUser(mockUser);
    } else {
      // In production, use Clerk
      if (isLoaded && isSignedIn && clerkUser) {
        const authUser: AuthUser = {
          id: clerkUser.id,
          name: clerkUser.fullName || 'Unknown User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          role: 'User',
          avatar: clerkUser.imageUrl || null,
          organizationId: clerkUser.organizationMemberships?.[0]?.organization?.id || null,
          phone: clerkUser.phoneNumbers?.[0]?.phoneNumber || '',
          department: '',
          location: '',
          bio: '',
          company: clerkUser.organizationMemberships?.[0]?.organization?.name || '',
          socialLinks: {
            linkedin: '',
            twitter: ''
          }
        };
        
        setCurrentUser(authUser);
        authService.setClerkUser(clerkUser);
      } else if (isLoaded && !isSignedIn) {
        setCurrentUser(null);
        authService.setClerkUser(null);
      }
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  const logout = async () => {
    setCurrentUser(null);
    await authService.logout();
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 