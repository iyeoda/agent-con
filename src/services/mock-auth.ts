import { Person, OrganizationUser, ProjectUser, ContactPerson } from '../types/users';
import { mockPeople, getOrganizationUsers, getProjectUsers, getContacts } from '../mock-data/people';
import config from '../config';

// Mock user types for login
export type MockUserType = 'org_admin' | 'billing_admin' | 'standard' | 'project_user' | 'contact';

// Mock user data
const mockUsers: Record<MockUserType, Person> = {
  org_admin: getOrganizationUsers().find(user => 
    user.organizationRoles.includes('org_admin')
  ) as OrganizationUser,
  billing_admin: getOrganizationUsers().find(user => 
    user.organizationRoles.includes('billing_admin')
  ) as OrganizationUser,
  standard: getOrganizationUsers().find(user => 
    user.organizationRoles.includes('standard')
  ) as OrganizationUser,
  project_user: getProjectUsers()[0] as ProjectUser,
  contact: getContacts()[0] as ContactPerson
};

// Current user state
let currentUser: Person | null = null;

// Mock authentication service
export const mockAuthService = {
  // Get all available mock user types
  getAvailableUserTypes: (): MockUserType[] => {
    return Object.keys(mockUsers) as MockUserType[];
  },

  // Get user type display name
  getUserTypeDisplayName: (userType: MockUserType): string => {
    switch (userType) {
      case 'org_admin': return 'Organization Admin';
      case 'billing_admin': return 'Billing Admin';
      case 'standard': return 'Standard User';
      case 'project_user': return 'Project User';
      case 'contact': return 'Contact Person';
      default: return userType;
    }
  },

  // Login as a specific user type
  loginAsUser: (userType: MockUserType): Person => {
    const user = mockUsers[userType];
    if (!user) {
      throw new Error(`User type ${userType} not found`);
    }
    
    currentUser = user;
    return user;
  },

  // Get current user
  getCurrentUser: (): Person | null => {
    return currentUser;
  },

  // Logout current user
  logout: (): void => {
    currentUser = null;
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return currentUser !== null;
  },

  // Get user type for current user
  getCurrentUserType: (): MockUserType | null => {
    if (!currentUser) return null;
    
    if ('organizationRoles' in currentUser) {
      const orgUser = currentUser as OrganizationUser;
      if (orgUser.organizationRoles.includes('org_admin')) return 'org_admin';
      if (orgUser.organizationRoles.includes('billing_admin')) return 'billing_admin';
      return 'standard';
    }
    
    if ('isSignedUp' in currentUser && currentUser.isSignedUp) {
      return 'project_user';
    }
    
    return 'contact';
  }
};

// Only export if in development mode
export default config.environment === 'development' ? mockAuthService : null; 