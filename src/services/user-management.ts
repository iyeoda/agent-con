import api from './api';
import { Person, OrganizationUser, ProjectUser, ContactPerson, OrganizationRole } from '../types/users';
import { getOrganizationMembers as getMockOrgMembers, getProjectUsers as getMockProjectUsers } from '../mock-data/people';
import config from '../config';

// Mock data storage for development
let mockOrgMembers: OrganizationUser[] = [];
let mockProjectMembers: ProjectUser[] = [];

// Initialize mock data only if not already initialized
const ensureMockData = (organizationId: string = 'ACME-001') => {
  if (mockOrgMembers.length === 0) {
    mockOrgMembers = [...getMockOrgMembers(organizationId)];
  }
  if (mockProjectMembers.length === 0) {
    mockProjectMembers = [...getMockProjectUsers()];
  }
};

// Helper function to create a ProjectUser from a ContactPerson
const createProjectUser = (projectId: string, userData: Partial<ProjectUser>): ProjectUser => {
  return {
    id: `user-${Date.now()}`,
    name: userData.name || '',
    email: userData.email || '',
    role: userData.role || 'Project Member',
    company: userData.company || '',
    isSignedUp: true,
    isOrganizationMember: false,
    projectIds: [projectId],
    projectId: projectId,
    status: 'active',
    joinedAt: new Date().toISOString().split('T')[0],
    phone: userData.phone || '',
    department: userData.department || '',
    location: userData.location || '',
    bio: userData.bio || '',
    socialLinks: userData.socialLinks || {},
    avatar: null,
    organizationId: null,
    organizationRoles: [],
    projectRole: 'project_member'
  };
};

const createOrganizationUser = (organizationId: string, userData: Partial<OrganizationUser>): OrganizationUser => {
  return {
    id: `user-${Date.now()}`,
    name: userData.name || '',
    email: userData.email || '',
    role: userData.role || 'Organization Member',
    company: userData.company || '',
    isSignedUp: true,
    isOrganizationMember: true,
    organizationId,
    projectIds: [],
    status: 'active',
    joinedAt: new Date().toISOString().split('T')[0],
    phone: userData.phone || '',
    department: userData.department || '',
    location: userData.location || '',
    bio: userData.bio || '',
    socialLinks: userData.socialLinks || {},
    avatar: null,
    organizationRoles: userData.organizationRoles || ['standard'],
    organizationRole: 'standard'
  };
};

export const userManagementService = {
  // Get organization members
  getOrganizationMembers: async (organizationId: string): Promise<OrganizationUser[]> => {
    if (config.useMockData) {
      ensureMockData(organizationId);
      return mockOrgMembers.filter(member => member.organizationId === organizationId);
    }
    
    const response = await api.get(`/organizations/${organizationId}/members`);
    return response.data;
  },

  // Get project members
  getProjectMembers: async (projectId: string): Promise<Person[]> => {
    if (config.useMockData) {
      ensureMockData();
      
      // Get organization members who are part of this project
      const orgMembersInProject = mockOrgMembers.filter(member => 
        member.projectIds.includes(projectId)
      );

      // Get project-specific members
      const projectOnlyMembers = mockProjectMembers.filter(member => 
        member.projectIds.includes(projectId)
      );

      return [...orgMembersInProject, ...projectOnlyMembers];
    }
    
    const response = await api.get(`/projects/${projectId}/members`);
    return response.data;
  },

  // Add a member to an organization
  addOrganizationMember: async (
    organizationId: string,
    name: string,
    email: string, 
    role: string,
    organizationRoles: OrganizationRole[] = ['standard']
  ): Promise<OrganizationUser> => {
    if (config.useMockData) {
      ensureMockData(organizationId);
      const newMember: OrganizationUser = {
        id: `ORG-${Date.now()}`,
        name,
        email,
        role,
        company: 'Acme Construction',
        isSignedUp: true,
        isOrganizationMember: true,
        organizationId,
        projectIds: [],
        status: 'pending',
        joinedAt: new Date().toISOString().split('T')[0],
        phone: '',
        organizationRoles,
        avatar: null,
        department: '',
        location: '',
        organizationRole: 'standard'
      };

      // Add to mock storage
      mockOrgMembers.push(newMember);
      return newMember;
    }
    
    const response = await api.post(`/organizations/${organizationId}/members`, {
      name,
      email,
      role,
      organizationRoles
    });
    return response.data;
  },

  // Update an organization member's roles
  updateOrganizationMemberRoles: async (
    organizationId: string,
    userId: string,
    organizationRoles: OrganizationRole[]
  ): Promise<OrganizationUser> => {
    if (config.useMockData) {
      ensureMockData(organizationId);
      const memberIndex = mockOrgMembers.findIndex(
        member => member.id === userId && member.organizationId === organizationId
      );
      
      if (memberIndex === -1) {
        throw new Error('Organization member not found');
      }
      
      // Update the member's roles
      mockOrgMembers[memberIndex] = {
        ...mockOrgMembers[memberIndex],
        organizationRoles
      };
      
      return mockOrgMembers[memberIndex];
    }
    
    const response = await api.patch(`/organizations/${organizationId}/members/${userId}/roles`, {
      organizationRoles
    });
    return response.data;
  },

  // Add a member to a project
  addProjectMember: async (
    projectId: string, 
    userId: string, 
    role: string
  ): Promise<Person> => {
    if (config.useMockData) {
      ensureMockData();
      // Find the organization member to copy their details
      const orgMember = mockOrgMembers.find(m => m.id === userId);
      if (!orgMember) {
        throw new Error('Member not found');
      }

      // Update the org member's projectIds if not already included
      if (!orgMember.projectIds.includes(projectId)) {
        orgMember.projectIds.push(projectId);
      }

      // Return the member with their original properties but updated role
      return {
        ...orgMember,
        role // Use the new project-specific role
      };
    }
    
    const response = await api.post(`/projects/${projectId}/members`, {
      userId,
      role
    });
    return response.data;
  },

  // Add a new member to a project (for users not in the organization)
  addNewProjectMember: async (
    projectId: string,
    name: string,
    email: string,
    role: string
  ): Promise<ProjectUser> => {
    if (config.useMockData) {
      ensureMockData();
      
      // Create a new project user
      const newMember: ProjectUser = {
        id: `PRJ-${Date.now()}`,
        name,
        email,
        role,
        company: email.split('@')[1].split('.')[0], // Extract company from email domain
        isSignedUp: true,
        isOrganizationMember: false,
        projectIds: [projectId],
        projectId: projectId,
        status: 'pending',
        joinedAt: new Date().toISOString().split('T')[0],
        phone: '',
        department: '',
        location: '',
        bio: '',
        socialLinks: {},
        avatar: null,
        organizationId: null,
        organizationRoles: [],
        projectRole: 'project_member'
      };

      // Add to mock storage
      mockProjectMembers.push(newMember);
      return newMember;
    }
    
    const response = await api.post(`/projects/${projectId}/members/invite`, {
      name,
      email,
      role
    });
    return response.data;
  },

  // Remove a member from a project
  removeProjectMember: async (projectId: string, userId: string): Promise<void> => {
    if (config.useMockData) {
      ensureMockData();
      
      // Check if it's an organization member
      const orgMember = mockOrgMembers.find(m => m.id === userId);
      if (orgMember) {
        // Remove the project from their projectIds
        orgMember.projectIds = orgMember.projectIds.filter(id => id !== projectId);
      } else {
        // Remove from project members if they're a project-only user
        mockProjectMembers = mockProjectMembers.filter(
          member => !(member.id === userId && member.projectIds.includes(projectId))
        );
      }
      return;
    }
    
    await api.delete(`/projects/${projectId}/members/${userId}`);
  },

  // Remove a member from an organization
  removeOrganizationMember: async (organizationId: string, userId: string): Promise<void> => {
    if (config.useMockData) {
      ensureMockData(organizationId);
      mockOrgMembers = mockOrgMembers.filter(
        member => !(member.id === userId && member.organizationId === organizationId)
      );
      return;
    }
    
    await api.delete(`/organizations/${organizationId}/members/${userId}`);
  }
};