import { Report, ReportCategory, ReportFormat } from '../types/reports';

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Progress Report',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    content: '# Monthly Progress Report - April 2025\n\n## Executive Summary\nThe Main Hospital Building project continues to progress according to schedule with some minor adjustments to the procurement timeline...',
    category: 'Project Status',
    format: 'Narrative',
    createdAt: '2025-04-04T10:34:00Z',
    updatedAt: '2025-04-04T10:34:00Z',
    createdBy: {
      id: 'ORG-001',
      name: 'Sarah Chen'
    },
    sharing: [
      { userId: 'ORG-001', userName: 'Sarah Chen', role: 'Owner' },
      { userId: 'ORG-002', userName: 'Mike Johnson', role: 'Editor' },
      { userId: 'PRJ-001', userName: 'Elena Rodriguez', role: 'Viewer' }
    ],
    tags: ['monthly', 'progress', 'construction']
  },
  {
    id: '2',
    title: 'Cost Analysis Q1 2025',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    content: '## Q1 2025 Cost Analysis\n\nDetailed breakdown of project expenses and budget variance...',
    category: 'Financial',
    format: 'Tabular',
    createdAt: '2025-04-03T15:15:00Z',
    updatedAt: '2025-04-03T15:15:00Z',
    createdBy: {
      id: 'ORG-002',
      name: 'Mike Johnson'
    },
    sharing: [
      { userId: 'ORG-002', userName: 'Mike Johnson', role: 'Owner' },
      { userId: 'ORG-001', userName: 'Sarah Chen', role: 'Editor' }
    ],
    tags: ['financial', 'quarterly', 'budget']
  },
  {
    id: '3',
    title: 'RFI Response Summary',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    content: '## RFI Response Analysis\n\nComprehensive summary of RFI responses and impact analysis...',
    category: 'Quality',
    format: 'Combined',
    createdAt: '2025-04-02T09:00:00Z',
    updatedAt: '2025-04-02T09:00:00Z',
    createdBy: {
      id: 'PRJ-001',
      name: 'Elena Rodriguez'
    },
    sharing: [
      { userId: 'PRJ-001', userName: 'Elena Rodriguez', role: 'Owner' },
      { userId: 'ORG-001', userName: 'Sarah Chen', role: 'Editor' },
      { userId: 'ORG-002', userName: 'Mike Johnson', role: 'Viewer' }
    ],
    tags: ['rfi', 'quality', 'design']
  },
  {
    id: '4',
    title: 'Site Safety Assessment',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    content: '## Monthly Site Safety Assessment\n\nComprehensive review of site safety measures and compliance...',
    category: 'Safety',
    format: 'Narrative',
    createdAt: '2025-03-28T14:30:00Z',
    updatedAt: '2025-03-28T14:30:00Z',
    createdBy: {
      id: 'ORG-002',
      name: 'Mike Johnson'
    },
    sharing: [
      { userId: 'ORG-002', userName: 'Mike Johnson', role: 'Owner' },
      { userId: 'ORG-001', userName: 'Sarah Chen', role: 'Editor' }
    ],
    tags: ['safety', 'assessment', 'compliance']
  },
  {
    id: '5',
    title: 'Project Risk Register',
    projectId: '550e8400-e29b-41d4-a716-446655440001',
    projectName: 'Harbor Heights Development',
    content: '## Project Risk Analysis\n\nDetailed assessment of project risks and mitigation strategies...',
    category: 'Project Status',
    format: 'Tabular',
    createdAt: '2025-03-25T09:00:00Z',
    updatedAt: '2025-03-25T09:00:00Z',
    createdBy: {
      id: 'ORG-001',
      name: 'Sarah Chen'
    },
    sharing: [
      { userId: 'ORG-001', userName: 'Sarah Chen', role: 'Owner' },
      { userId: 'PRJ-002', userName: 'David Kim', role: 'Editor' }
    ],
    tags: ['risk', 'analysis', 'planning']
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