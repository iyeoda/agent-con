import { Project } from '../types/project';

// Mock data for projects that can be used across components
export const mockProjects: Project[] = [
  { 
    id: 'PRJ-001', 
    name: 'Woodside Tower Project',
    logo: '/viewpoint_logo.svg',
    location: 'Downtown', 
    phase: 'Construction', 
    cde: 'Trimble Viewpoint',
    cdeColor: '#D15F36',
    members: 28,
    lastActivity: '2025-03-28T14:30:00Z',
    status: 'active'
  },
  { 
    id: 'PRJ-002', 
    name: 'Harbor Heights Development',
    logo: '/autodesk_logo.svg',
    location: 'Waterfront District', 
    phase: 'Planning', 
    cde: 'Autodesk Construction Cloud',
    cdeColor: '#3A366E',
    members: 15,
    lastActivity: '2025-03-27T10:15:00Z',
    status: 'active'
  },
  { 
    id: 'PRJ-003', 
    name: 'Metro Station Expansion',
    logo: '/viewpoint_logo.svg',
    location: 'Central City', 
    phase: 'Design', 
    cde: 'Trimble Viewpoint',
    cdeColor: '#D15F36',
    members: 22,
    lastActivity: '2025-03-25T16:45:00Z',
    status: 'active'
  },
  { 
    id: 'PRJ-004', 
    name: 'City Hall Renovation',
    logo: '/autodesk_logo.svg',
    location: 'Downtown', 
    phase: 'Completed', 
    cde: 'Autodesk Construction Cloud',
    cdeColor: '#3A366E',
    members: 0,
    lastActivity: '2024-11-15T09:30:00Z',
    status: 'archived',
    archived: '2024-12-01T00:00:00Z'
  },
  { 
    id: 'PRJ-005', 
    name: 'South Bridge Repairs',
    logo: '/procore_logo.svg',
    location: 'River District', 
    phase: 'Completed', 
    cde: 'Procore',
    cdeColor: '#A7CEBC',
    members: 0,
    lastActivity: '2024-10-22T11:45:00Z',
    status: 'archived',
    archived: '2024-11-01T00:00:00Z'
  }
];

// Mock data for available projects from CDEs that haven't been imported yet
export const mockAvailableProjects: Project[] = [
  { 
    id: 'CDE-PRJ-001', 
    name: 'Eastside Office Complex',
    logo: '/viewpoint_logo.svg',
    cde: 'Trimble Viewpoint',
    cdeColor: '#D15F36',
    location: 'Eastside',
    status: 'available'
  },
  { 
    id: 'CDE-PRJ-002', 
    name: 'University Medical Center',
    logo: '/autodesk_logo.svg',
    cde: 'Autodesk Construction Cloud',
    cdeColor: '#3A366E',
    location: 'North Campus',
    status: 'available'
  },
  { 
    id: 'CDE-PRJ-003', 
    name: 'Riverside Apartments',
    logo: '/viewpoint_logo.svg',
    cde: 'Trimble Viewpoint',
    cdeColor: '#D15F36',
    location: 'Riverside District',
    status: 'available'
  }
]; 