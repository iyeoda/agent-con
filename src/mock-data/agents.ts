import { Agent, AgentIconType, Task } from '../types';

export const agents: Agent[] = [
  {
    id: 'AGT-001',
    title: 'Project Manager',
    icon: AgentIconType.UserCog,
    color: '#D15F36',
    description: 'Manages project timelines, resources, and team coordination',
    tasks: [
      {
        id: 'task-1',
        name: 'Review Project Timeline',
        status: 'in_progress',
        assignedTo: 'James Wilson'
      },
      {
        id: 'task-2',
        name: 'Resource Allocation',
        status: 'pending',
        assignedTo: 'James Wilson'
      }
    ],
    status: 'active'
  },
  {
    id: 'AGT-002',
    title: 'Data Analyst',
    icon: AgentIconType.BarChart,
    color: '#3A366E',
    description: 'Analyzes project data and generates insights',
    tasks: [
      {
        id: 'task-3',
        name: 'Cost Analysis',
        status: 'pending',
        assignedTo: 'Maria Garcia'
      }
    ],
    status: 'active'
  },
  {
    id: 'AGT-003',
    title: 'Document Manager',
    icon: AgentIconType.FileStack,
    color: '#A7CEBC',
    description: 'Manages project documentation and compliance',
    tasks: [
      {
        id: 'task-4',
        name: 'Document Review',
        status: 'pending',
        assignedTo: 'Sarah Chen'
      }
    ],
    status: 'active'
  }
]; 