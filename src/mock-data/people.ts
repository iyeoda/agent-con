import { Person, ContactPerson, ProjectUser, OrganizationUser, OrganizationRole } from '../types/users';
import { mockUserSettings } from './user-settings';

// Mock data for organization users (part of the organization that owns the app)
const mockOrganizationUsers: OrganizationUser[] = [
  {
    id: 'ORG-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@acme.com',
    role: 'Project Manager',
    company: 'Acme Construction',
    isSignedUp: true,
    isOrganizationMember: true,
    organizationId: 'ACME-001',
    projectIds: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
    status: 'active',
    joinedAt: '2024-01-15',
    phone: '555-987-6543',
    organizationRoles: ['org_admin', 'billing_admin'],
    department: 'Project Management',
    location: 'San Francisco, CA',
    bio: 'Experienced project manager with a focus on sustainable construction practices.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
      website: 'https://sarahchen.com'
    },
    profileSettings: {
      timezone: 'America/New_York',
      language: 'en',
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        desktop: true,
        projectUpdates: true,
        taskAssignments: true,
        drawingUpdates: true,
        mentions: true,
        comments: true
      },
      preferences: {
        dashboardLayout: 'grid',
        emailDigest: 'daily',
        taskView: 'kanban'
      },
      security: {
        twoFactorEnabled: true,
        lastPasswordChange: '2025-03-15T10:00:00Z',
        sessionTimeout: 3600
      }
    }
  },
  {
    id: 'ORG-002',
    name: 'Mike Johnson',
    email: 'mike.j@acme.com',
    role: 'Site Engineer',
    company: 'Acme Construction',
    isSignedUp: true,
    isOrganizationMember: true,
    organizationId: 'ACME-001',
    projectIds: ['550e8400-e29b-41d4-a716-446655440000'],
    status: 'active',
    joinedAt: '2024-02-01',
    phone: '555-876-5432',
    organizationRoles: ['standard'],
    department: 'Engineering',
    location: 'San Francisco, CA',
    bio: 'Civil engineer specializing in structural design and site supervision.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mikejohnson'
    },
    profileSettings: {
      timezone: 'America/Los_Angeles',
      language: 'en',
      theme: 'light',
      notifications: {
        email: true,
        push: false,
        desktop: true,
        projectUpdates: true,
        taskAssignments: true,
        drawingUpdates: true,
        mentions: true,
        comments: false
      },
      preferences: {
        dashboardLayout: 'list',
        emailDigest: 'weekly',
        taskView: 'list'
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: '2025-02-01T10:00:00Z',
        sessionTimeout: 3600
      }
    }
  }
];

// Mock data for project users (signed up but not part of the organization)
const mockProjectUsers: ProjectUser[] = [
  {
    id: 'PRJ-001',
    name: 'Elena Rodriguez',
    email: 'elena@powergrid.com',
    role: 'Electrical Consultant',
    company: 'PowerGrid Systems',
    isSignedUp: true,
    isOrganizationMember: false,
    projectIds: ['550e8400-e29b-41d4-a716-446655440000'],
    status: 'active',
    joinedAt: '2024-02-15',
    phone: '555-765-4321',
    department: 'Electrical Engineering',
    location: 'Los Angeles, CA',
    bio: 'Power systems specialist with expertise in renewable energy integration.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/elenarodriguez',
      website: 'https://powergrid.com/team/elena'
    },
    profileSettings: {
      timezone: 'America/Los_Angeles',
      language: 'es',
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        desktop: true,
        projectUpdates: true,
        taskAssignments: true,
        drawingUpdates: true,
        mentions: true,
        comments: true
      },
      preferences: {
        dashboardLayout: 'grid',
        emailDigest: 'daily',
        taskView: 'kanban'
      },
      security: {
        twoFactorEnabled: true,
        lastPasswordChange: '2025-01-15T10:00:00Z',
        sessionTimeout: 3600
      }
    }
  },
  {
    id: 'PRJ-002',
    name: 'David Kim',
    email: 'david@greenspace.com',
    role: 'Landscape Architect',
    company: 'GreenSpace Landscaping',
    isSignedUp: true,
    isOrganizationMember: false,
    projectIds: ['550e8400-e29b-41d4-a716-446655440001'],
    status: 'pending',
    joinedAt: '2024-03-01',
    phone: '555-654-3210',
    department: 'Design',
    location: 'Portland, OR',
    bio: 'Sustainable landscape architect focused on native plant integration.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidkim',
      website: 'https://greenspace.com/david'
    },
    profileSettings: {
      timezone: 'America/Los_Angeles',
      language: 'en',
      theme: 'dark',
      notifications: {
        email: true,
        push: false,
        desktop: true,
        projectUpdates: true,
        taskAssignments: true,
        drawingUpdates: true,
        mentions: true,
        comments: true
      },
      preferences: {
        dashboardLayout: 'grid',
        emailDigest: 'weekly',
        taskView: 'kanban'
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: '2025-02-28T10:00:00Z',
        sessionTimeout: 3600
      }
    }
  }
];

// Mock data for contacts (not signed up)
const mockContacts: ContactPerson[] = [
  {
    id: 'CON-001',
    name: 'Thomas Lee',
    email: 'thomas@client.com',
    role: 'Client Representative',
    company: 'Client Organization',
    isSignedUp: false,
    isOrganizationMember: false,
    phone: '555-543-2109',
    department: 'Operations',
    location: 'New York, NY',
    bio: 'Client representative overseeing multiple construction projects.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/thomaslee'
    }
  },
  {
    id: 'CON-002',
    name: 'Maria Garcia',
    email: 'maria@bluesky.com',
    role: 'Lead Architect',
    company: 'BlueSky Architects',
    isSignedUp: false,
    isOrganizationMember: false,
    phone: '555-432-1098',
    department: 'Architecture',
    location: 'Chicago, IL',
    bio: 'Award-winning architect specializing in sustainable commercial buildings.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mariagarcia',
      website: 'https://bluesky.com/team/maria'
    }
  }
];

// Combined list of all people
export const mockPeople: Person[] = [
  ...mockOrganizationUsers,
  ...mockProjectUsers,
  ...mockContacts
];

// Export individual lists for specific use cases
export const getOrganizationUsers = () => mockOrganizationUsers;
export const getProjectUsers = () => mockProjectUsers;
export const getContacts = () => mockContacts;

// Helper function to get users by project
export const getUsersByProject = (projectId: string): Person[] => {
  return mockPeople.filter(person => {
    if ('projectIds' in person) {
      return person.projectIds.includes(projectId);
    }
    return false;
  });
};

// Helper function to get organization members
export const getOrganizationMembers = (organizationId: string): OrganizationUser[] => {
  return mockOrganizationUsers.filter(user => user.organizationId === organizationId);
}; 