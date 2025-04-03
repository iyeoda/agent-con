import { Project, Agent, Drawing, Task } from '../types';

// Project-specific data mapping
export const projectData: Record<string, {
  project: Project;
  agents: Agent[];
  drawings: Drawing[];
  tasks: Task[];
}> = {
  'PRJ-001': {
    project: {
      id: 'PRJ-001',
      name: 'Woodside Tower Project',
      logo: '/viewpoint_logo.svg',
      image: '/projects/woodside-tower.jpg',
      location: 'Downtown',
      phase: 'Construction',
      cde: 'Trimble Viewpoint',
      cdeColor: '#D15F36',
      members: 28,
      lastActivity: '2025-03-28T14:30:00Z',
      status: 'active',
      description: 'A 50-story office tower in downtown area',
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2026-12-31T00:00:00Z',
      budget: 150000000,
      currency: 'USD',
      tags: ['commercial', 'high-rise', 'office'],
      completionPercentage: 35
    },
    agents: [
      {
        id: 'AGT-001',
        title: 'Project Manager',
        icon: 'UserCog',
        color: '#D15F36',
        description: 'Manages project timelines, resources, and team coordination',
        tasks: [
          {
            id: 1,
            name: 'Review Project Timeline',
            description: 'Review and update project timeline for Woodside Tower',
            status: 'in_progress',
            priority: 'high',
            dueDate: '2025-04-01T00:00:00Z',
            assignedTo: 'James Wilson',
            createdBy: 'System',
            createdAt: '2025-03-28T10:00:00Z',
            updatedAt: '2025-03-28T14:30:00Z'
          }
        ],
        status: 'active',
        lastActive: '2025-03-28T15:30:00Z',
        capabilities: ['timeline-management', 'resource-allocation', 'team-coordination']
      }
    ],
    drawings: [
      {
        id: 'DRW-001',
        name: 'Foundation Plan',
        type: 'Architectural',
        version: 'A.2',
        lastModified: '2025-03-28T14:30:00Z',
        status: 'In Review',
        assignedTo: 'Maria Garcia',
        fileSize: 5242880,
        fileUrl: '/drawings/foundation-plan.pdf',
        thumbnailUrl: '/drawings/thumbnails/foundation-plan.jpg',
        createdBy: 'James Wilson',
        createdAt: '2025-03-25T09:00:00Z',
        tags: ['foundation', 'architectural', 'structural'],
        relatedDrawings: ['DRW-002', 'DRW-003'],
        comments: []
      }
    ],
    tasks: [
      {
        id: 'TASK-001',
        name: 'Foundation Work',
        description: 'Complete foundation work for tower section',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2025-04-15T00:00:00Z',
        assignedTo: 'Robert Johnson',
        createdBy: 'James Wilson',
        createdAt: '2025-03-28T10:00:00Z',
        updatedAt: '2025-03-28T14:30:00Z'
      }
    ]
  },
  'PRJ-002': {
    project: {
      id: 'PRJ-002',
      name: 'Harbor Heights Development',
      logo: '/autodesk_logo.svg',
      image: '/projects/harbor-heights.jpg',
      location: 'Waterfront District',
      phase: 'Planning',
      cde: 'Autodesk Construction Cloud',
      cdeColor: '#3A366E',
      members: 15,
      lastActivity: '2025-03-27T10:15:00Z',
      status: 'active',
      description: 'Mixed-use development with residential and retail spaces',
      startDate: '2025-06-01T00:00:00Z',
      endDate: '2027-12-31T00:00:00Z',
      budget: 85000000,
      currency: 'USD',
      tags: ['mixed-use', 'residential', 'retail'],
      completionPercentage: 5
    },
    agents: [
      {
        id: 'AGT-002',
        title: 'Data Analyst',
        icon: 'BarChart',
        color: '#3A366E',
        description: 'Analyzes project data and generates insights',
        tasks: [
          {
            id: 2,
            name: 'Cost Analysis',
            description: 'Analyze construction costs for Q1 2025',
            status: 'pending',
            priority: 'medium',
            dueDate: '2025-04-10T00:00:00Z',
            assignedTo: 'Maria Garcia',
            createdBy: 'System',
            createdAt: '2025-03-28T10:00:00Z'
          }
        ],
        status: 'active',
        lastActive: '2025-03-28T14:45:00Z',
        capabilities: ['data-analysis', 'cost-tracking', 'performance-metrics']
      }
    ],
    drawings: [
      {
        id: 'DRW-002',
        name: 'Electrical Layout',
        type: 'MEP',
        version: 'B.1',
        lastModified: '2025-03-27T16:45:00Z',
        status: 'Approved',
        assignedTo: 'Thomas Lee',
        fileSize: 3145728,
        fileUrl: '/drawings/electrical-layout.pdf',
        thumbnailUrl: '/drawings/thumbnails/electrical-layout.jpg',
        createdBy: 'Thomas Lee',
        createdAt: '2025-03-20T11:00:00Z',
        tags: ['electrical', 'MEP', 'systems'],
        relatedDrawings: ['DRW-001', 'DRW-004'],
        comments: []
      }
    ],
    tasks: [
      {
        id: 'TASK-002',
        name: 'Site Preparation',
        description: 'Begin site preparation and clearing',
        status: 'pending',
        priority: 'high',
        dueDate: '2025-06-15T00:00:00Z',
        assignedTo: 'David Kim',
        createdBy: 'James Wilson',
        createdAt: '2025-03-28T10:00:00Z'
      }
    ]
  }
  // Add more projects as needed
}; 