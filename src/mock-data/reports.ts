import { Report, ReportCategory, ReportFormat } from '../types/reports';

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Progress Report',
    projectId: 'proj-1',
    projectName: 'Main Hospital Building',
    content: '# Monthly Progress Report - April 2025\n\n## Executive Summary\nThe Main Hospital Building project continues to progress according to schedule with some minor adjustments to the procurement timeline...',
    category: 'Project Status',
    format: 'Narrative',
    createdAt: '2025-04-04T10:34:00Z',
    updatedAt: '2025-04-04T10:34:00Z',
    createdBy: {
      id: 'user-1',
      name: 'John Smith'
    },
    sharing: [
      { userId: 'user-1', userName: 'John Smith', role: 'Owner' },
      { userId: 'user-2', userName: 'Lisa Stevens', role: 'Editor' },
      { userId: 'user-3', userName: 'Mike Johnson', role: 'Viewer' }
    ],
    tags: ['monthly', 'progress', 'construction']
  },
  {
    id: '2',
    title: 'Cost Analysis Q1 2025',
    projectId: 'proj-1', 
    projectName: 'Main Hospital Building',
    content: '## Q1 2025 Cost Analysis\n\nDetailed breakdown of project expenses and budget variance...',
    category: 'Financial',
    format: 'Tabular',
    createdAt: '2025-04-03T15:15:00Z',
    updatedAt: '2025-04-03T15:15:00Z',
    createdBy: {
      id: 'user-4',
      name: 'Commercial AI'
    },
    sharing: [
      { userId: 'user-1', userName: 'John Smith', role: 'Editor' }
    ],
    tags: ['financial', 'quarterly', 'budget']
  },
  {
    id: '3',
    title: 'RFI Response Summary',
    projectId: 'proj-1',
    projectName: 'Main Hospital Building',
    content: '## RFI Response Analysis\n\nComprehensive summary of RFI responses and impact analysis...',
    category: 'Quality',
    format: 'Combined',
    createdAt: '2025-04-02T09:00:00Z',
    updatedAt: '2025-04-02T09:00:00Z',
    createdBy: {
      id: 'user-5',
      name: 'Design Manager AI'
    },
    sharing: [
      { userId: 'user-1', userName: 'John Smith', role: 'Viewer' }
    ],
    tags: ['rfi', 'quality', 'design']
  }
];

export const reportCategories: ReportCategory[] = [
  'Project Status',
  'Financial', 
  'Quality',
  'Safety'
];

export const reportFormats: ReportFormat[] = [
  'Narrative',
  'Tabular',
  'Combined'
]; 