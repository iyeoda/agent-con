export type OrganizationRole = 'org_admin' | 'org_member' | 'billing_admin' | 'standard';
export type ProjectRole = 'project_admin' | 'project_member' | 'project_viewer';

export interface ProfileSettings {
  timezone: string;
  language: string;
  theme: string;
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
    dashboardLayout: string;
    emailDigest: string;
    taskView: string;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    sessionTimeout: number;
  };
}

export interface BasePerson {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  organizationId: string | null;
  isOrganizationMember: boolean;
  projectIds: string[];
  status: 'active' | 'inactive' | 'pending';
  organizationRoles: string[];
  company: string;
  phone: string;
  department: string;
  location: string;
  bio?: string;
  socialLinks?: Record<string, string>;
  joinedAt?: string;
  profileSettings?: ProfileSettings;
}

export interface ContactPerson extends BasePerson {
  isSignedUp: boolean;
}

export interface ProjectUser extends BasePerson {
  projectRole: ProjectRole;
  projectId: string;
  isSignedUp: boolean;
}

export interface OrganizationUser extends BasePerson {
  organizationRole: OrganizationRole;
  isSignedUp: boolean;
}

export type Person = BasePerson | ContactPerson | ProjectUser | OrganizationUser;

export function isProjectUser(person: Person): person is ProjectUser {
  return 'projectRole' in person && 'projectId' in person;
}

export function isOrganizationUser(person: Person): person is OrganizationUser {
  return 'organizationRole' in person;
}

export function isContactPerson(person: Person): person is ContactPerson {
  return 'isSignedUp' in person;
} 