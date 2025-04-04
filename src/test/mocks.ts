import { vi } from 'vitest';
import { mockAuthUser } from './mockData';
import React from 'react';

// Mock all external dependencies in one place
const mockClerkUser = {
  id: 'test-user-1',
  fullName: 'Test User',
  primaryEmailAddress: { emailAddress: 'test@example.com' },
  imageUrl: null,
  organizationMemberships: [{
    organization: {
      id: 'test-org-1',
      name: 'Test Organization'
    }
  }],
  phoneNumbers: [{ phoneNumber: '555-123-4567' }]
};

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', {
    'data-testid': 'mock-clerk-provider',
    'data-mock': 'true'
  }, children),
  useUser: () => ({
    isSignedIn: true,
    isLoaded: true,
    user: mockClerkUser
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    signOut: vi.fn().mockResolvedValue(undefined)
  }),
  useClerkUser: () => ({
    isLoaded: true,
    isSignedIn: true,
    user: mockClerkUser
  }),
  useOrganization: () => ({
    isLoaded: true,
    organization: mockClerkUser.organizationMemberships[0].organization
  })
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Routes: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Route: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Navigate: () => React.createElement('div', null, 'Navigate'),
  useLocation: () => ({ pathname: '/project/550e8400-e29b-41d4-a716-446655440000/dashboard' }),
  useNavigate: () => vi.fn(),
  useParams: () => ({ projectId: '550e8400-e29b-41d4-a716-446655440000' })
}));

// Mock config to always use mock data in tests
vi.mock('../config', () => ({
  default: {
    useMockData: true,
    env: 'test',
    apiUrl: 'http://localhost:3000',
    clerkPublishableKey: 'test_key'
  }
}));

// Mock auth service
vi.mock('../services/auth-service', () => ({
  authService: {
    getCurrentUser: vi.fn().mockResolvedValue(mockAuthUser),
    setClerkUser: vi.fn(),
    setMockUser: vi.fn(),
    logout: vi.fn().mockResolvedValue(undefined)
  }
})); 