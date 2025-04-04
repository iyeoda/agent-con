import { Person, isOrganizationUser, isProjectUser, isContactPerson } from '../types/users';
import { mockPeople, getOrganizationUsers, getProjectUsers, getContacts } from '../mock-data/people';
import config from '../config';

export type UserType = 'guest' | 'organization_user' | 'project_user' | 'contact';

let currentUser: Person | null = null;

const getUserType = (user: Person): UserType => {
  if (isOrganizationUser(user)) {
    return 'organization_user';
  }
  
  if (isProjectUser(user)) {
    return 'project_user';
  }
  
  if (isContactPerson(user)) {
    return 'contact';
  }
  
  return 'guest';
};

const mockAuthService = {
  // Get current user
  getCurrentUser: async (): Promise<Person | null> => {
    return currentUser;
  },

  // Set current user
  setCurrentUser: async (user: Person | null): Promise<void> => {
    currentUser = user;
  },

  // Get user type
  getUserType: async (): Promise<UserType> => {
    if (!currentUser) {
      return 'guest';
    }
    return getUserType(currentUser);
  },

  // Logout
  logout: async (): Promise<void> => {
    currentUser = null;
  }
};

// Only export if in development mode
export default config.environment === 'development' ? mockAuthService : null; 