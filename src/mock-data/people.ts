import { Person, ContactPerson, ProjectUser, OrganizationUser } from '../types/users';

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
    phone: '555-987-6543'
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
    phone: '555-876-5432'
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
    phone: '555-765-4321'
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
    phone: '555-654-3210'
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
    phone: '555-543-2109'
  },
  {
    id: 'CON-002',
    name: 'Maria Garcia',
    email: 'maria@bluesky.com',
    role: 'Lead Architect',
    company: 'BlueSky Architects',
    isSignedUp: false,
    isOrganizationMember: false,
    phone: '555-432-1098'
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