export interface BasePerson {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar?: string;
  phone?: string;
  department?: string;
  location?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  profileSettings?: {
    timezone: string;
    language: string;
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
      projectUpdates: boolean;
      taskAssignments: boolean;
      drawingUpdates: boolean;
      mentions: boolean;
      comments: boolean;
    };
    preferences: {
      dashboardLayout: 'grid' | 'list';
      emailDigest: 'daily' | 'weekly' | 'never';
      taskView: 'kanban' | 'list';
    };
    security?: {
      twoFactorEnabled: boolean;
      lastPasswordChange: string;
      sessionTimeout: number;
    };
  };
}

// Organization role types
export type OrganizationRole = 'billing_admin' | 'org_admin' | 'standard';
export type OrganizationRoles = OrganizationRole[];

export interface ContactPerson extends BasePerson {
  // Base contact information for people in the project contact list
  // who are not signed up to the app
  isSignedUp: false;
  isOrganizationMember: false;
}

export interface ProjectUser extends BasePerson {
  // Users who have signed up and are associated with a project
  // but are not part of the organization that owns the app
  isSignedUp: true;
  isOrganizationMember: false;
  projectIds: string[];
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
}

export interface OrganizationUser extends BasePerson {
  // Users who are part of the organization that owns the project
  isSignedUp: true;
  isOrganizationMember: true;
  organizationId: string;
  projectIds: string[];
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  organizationRoles: OrganizationRoles; // Multiple roles within the organization
}

// Type for any kind of user in the system
export type Person = ContactPerson | ProjectUser | OrganizationUser;

// Helper type guards
export const isContactPerson = (person: Person): person is ContactPerson => {
  return !person.isSignedUp && !person.isOrganizationMember;
};

export const isProjectUser = (person: Person): person is ProjectUser => {
  return person.isSignedUp && !person.isOrganizationMember;
};

export const isOrganizationUser = (person: Person): person is OrganizationUser => {
  return person.isSignedUp && person.isOrganizationMember;
}; 