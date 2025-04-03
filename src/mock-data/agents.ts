import { Agent, AgentIconType, Task, AgentResponseType, AgentActionType } from '../types';

export const agents: Agent[] = [
  {
    id: 'AGT-001',
    title: 'Project Manager',
    icon: AgentIconType.UserCog,
    color: '#D15F36',
    description: 'Manages project timelines, resources, and team coordination',
    type: AgentResponseType.STRUCTURED,
    capabilities: [
      AgentActionType.ADD_TO_DIRECTORY,
      AgentActionType.CREATE_REMINDER,
      AgentActionType.GENERATE_REPORT
    ],
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['add_user', 'create_reminder', 'generate_report']
        },
        parameters: {
          type: 'object'
        }
      }
    },
    outputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        result: { type: 'object' }
      }
    },
    version: '1.0',
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
    type: AgentResponseType.UNSTRUCTURED,
    capabilities: [
      AgentActionType.EXPORT_EXCEL,
      AgentActionType.EXPORT_PDF,
      AgentActionType.CREATE_REMINDER
    ],
    version: '1.0',
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
    type: AgentResponseType.STRUCTURED,
    capabilities: [
      AgentActionType.EXPORT_PDF,
      AgentActionType.GENERATE_REPORT,
      AgentActionType.ADD_TO_DIRECTORY
    ],
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['export_document', 'generate_report', 'add_to_directory']
        },
        parameters: {
          type: 'object'
        }
      }
    },
    outputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        result: { type: 'object' }
      }
    },
    version: '1.0',
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