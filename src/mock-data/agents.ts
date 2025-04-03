import { Agent } from '../types';

export const mockAgents: Agent[] = [
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
      },
      {
        id: 2,
        name: 'Resource Allocation',
        description: 'Allocate resources for upcoming construction phase',
        status: 'pending',
        priority: 'medium',
        dueDate: '2025-04-05T00:00:00Z',
        assignedTo: 'James Wilson',
        createdBy: 'System',
        createdAt: '2025-03-28T10:00:00Z'
      }
    ],
    status: 'active',
    lastActive: '2025-03-28T15:30:00Z',
    capabilities: ['timeline-management', 'resource-allocation', 'team-coordination']
  },
  {
    id: 'AGT-002',
    title: 'Data Analyst',
    icon: 'BarChart',
    color: '#3A366E',
    description: 'Analyzes project data and generates insights',
    tasks: [
      {
        id: 3,
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
  },
  {
    id: 'AGT-003',
    title: 'Document Manager',
    icon: 'FileStack',
    color: '#A7CEBC',
    description: 'Manages project documentation and compliance',
    tasks: [
      {
        id: 4,
        name: 'Document Review',
        description: 'Review and approve latest construction permits',
        status: 'pending',
        priority: 'high',
        dueDate: '2025-04-02T00:00:00Z',
        assignedTo: 'Robert Johnson',
        createdBy: 'System',
        createdAt: '2025-03-28T10:00:00Z'
      }
    ],
    status: 'active',
    lastActive: '2025-03-28T13:20:00Z',
    capabilities: ['document-management', 'compliance-tracking', 'version-control']
  }
]; 