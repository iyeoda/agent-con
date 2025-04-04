import { Report, ReportCategory, ReportFormat } from '../types/reports';

// Sample tabular report data
const tabularReportContent = JSON.stringify([
  {
    id: 'header-row',
    cells: [
      { id: 'header-0', value: 'Task', isHeader: true },
      { id: 'header-1', value: 'Status', isHeader: true },
      { id: 'header-2', value: 'Assigned To', isHeader: true },
      { id: 'header-3', value: 'Due Date', isHeader: true },
      { id: 'header-4', value: 'Progress', isHeader: true }
    ]
  },
  {
    id: 'row-0',
    cells: [
      { id: 'cell-0-0', value: 'Foundation Work', isHeader: false },
      { id: 'cell-0-1', value: 'In Progress', isHeader: false },
      { id: 'cell-0-2', value: 'John Smith', isHeader: false },
      { id: 'cell-0-3', value: '2024-03-15', isHeader: false },
      { id: 'cell-0-4', value: '75%', isHeader: false }
    ]
  },
  {
    id: 'row-1',
    cells: [
      { id: 'cell-1-0', value: 'Structural Steel', isHeader: false },
      { id: 'cell-1-1', value: 'Pending', isHeader: false },
      { id: 'cell-1-2', value: 'Sarah Johnson', isHeader: false },
      { id: 'cell-1-3', value: '2024-04-01', isHeader: false },
      { id: 'cell-1-4', value: '0%', isHeader: false }
    ]
  },
  {
    id: 'row-2',
    cells: [
      { id: 'cell-2-0', value: 'HVAC Installation', isHeader: false },
      { id: 'cell-2-1', value: 'Completed', isHeader: false },
      { id: 'cell-2-2', value: 'Mike Wilson', isHeader: false },
      { id: 'cell-2-3', value: '2024-02-28', isHeader: false },
      { id: 'cell-2-4', value: '100%', isHeader: false }
    ]
  },
  {
    id: 'row-3',
    cells: [
      { id: 'cell-3-0', value: 'Electrical Systems', isHeader: false },
      { id: 'cell-3-1', value: 'In Progress', isHeader: false },
      { id: 'cell-3-2', value: 'Emily Davis', isHeader: false },
      { id: 'cell-3-3', value: '2024-03-20', isHeader: false },
      { id: 'cell-3-4', value: '45%', isHeader: false }
    ]
  },
  {
    id: 'row-4',
    cells: [
      { id: 'cell-4-0', value: 'Interior Finishing', isHeader: false },
      { id: 'cell-4-1', value: 'Pending', isHeader: false },
      { id: 'cell-4-2', value: 'David Brown', isHeader: false },
      { id: 'cell-4-3', value: '2024-05-01', isHeader: false },
      { id: 'cell-4-4', value: '0%', isHeader: false }
    ]
  }
]);

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Progress Report - April 2025',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    content: '# Monthly Progress Report - April 2025\n\n## Executive Summary\nThe Main Hospital Building project continues to progress according to schedule with some minor adjustments to the procurement timeline...',
    category: 'Progress',
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
    title: 'Project Risk Register - Q1 2025',
    projectId: '550e8400-e29b-41d4-a716-446655440001',
    projectName: 'Harbor Heights Development',
    content: '## Project Risk Analysis\n\nDetailed assessment of project risks and mitigation strategies...',
    category: 'Risk',
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
  },
  {
    id: '6',
    title: 'Construction Task Tracker - March 2024',
    content: tabularReportContent,
    format: 'Tabular',
    category: 'Progress',
    projectId: '550e8400-e29b-41d4-a716-446655440000',
    projectName: 'Woodside Tower Project',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    createdBy: {
      id: 'user-1',
      name: 'John Smith'
    },
    tags: ['progress', 'tasks', 'timeline'],
    sharing: [
      {
        userId: 'user-2',
        userName: 'Sarah Johnson',
        role: 'Editor'
      },
      {
        userId: 'user-3',
        userName: 'Mike Wilson',
        role: 'Viewer'
      }
    ]
  }
];

export const reportCategories: ReportCategory[] = [
  'Progress',
  'Financial',
  'Quality',
  'Safety'
];

export const reportFormats: ReportFormat[] = [
  'Narrative',
  'Tabular',
  'Combined'
]; 