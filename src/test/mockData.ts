import { AuthUser } from '../types/auth';

export const mockAuthUser: AuthUser = {
  id: 'test-user-1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'Project Manager',
  avatar: null,
  organizationId: 'test-org-1',
  phone: '555-123-4567',
  department: 'Engineering',
  location: 'San Francisco, CA',
  bio: 'Test user bio',
  company: 'Test Organization',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/testuser',
    twitter: 'https://twitter.com/testuser'
  }
};

export const mockOrganization = {
  id: 'test-org-1',
  name: 'Test Organization',
  members: [mockAuthUser]
}; 