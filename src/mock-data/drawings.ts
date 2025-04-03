import { Drawing } from '../types';

export const mockDrawings: Drawing[] = [
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
    comments: [
      {
        id: 'COM-001',
        content: 'Foundation depth needs to be adjusted for soil conditions',
        createdBy: 'Robert Johnson',
        createdAt: '2025-03-28T10:15:00Z',
        resolved: false
      }
    ]
  },
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
    comments: [
      {
        id: 'COM-002',
        content: 'All electrical specifications meet code requirements',
        createdBy: 'Maria Garcia',
        createdAt: '2025-03-27T15:30:00Z',
        resolved: true,
        resolvedBy: 'Thomas Lee',
        resolvedAt: '2025-03-27T16:45:00Z'
      }
    ]
  },
  {
    id: 'DRW-003',
    name: 'Structural Details',
    type: 'Structural',
    version: 'C.3',
    lastModified: '2025-03-26T09:15:00Z',
    status: 'Draft',
    assignedTo: 'Robert Johnson',
    fileSize: 6291456,
    fileUrl: '/drawings/structural-details.pdf',
    thumbnailUrl: '/drawings/thumbnails/structural-details.jpg',
    createdBy: 'Robert Johnson',
    createdAt: '2025-03-22T14:00:00Z',
    tags: ['structural', 'engineering', 'details'],
    relatedDrawings: ['DRW-001'],
    comments: []
  },
  {
    id: 'DRW-004',
    name: 'HVAC System',
    type: 'MEP',
    version: 'A.1',
    lastModified: '2025-03-25T11:20:00Z',
    status: 'In Review',
    assignedTo: 'James Wilson',
    fileSize: 4194304,
    fileUrl: '/drawings/hvac-system.pdf',
    thumbnailUrl: '/drawings/thumbnails/hvac-system.jpg',
    createdBy: 'Thomas Lee',
    createdAt: '2025-03-23T10:00:00Z',
    tags: ['HVAC', 'MEP', 'systems'],
    relatedDrawings: ['DRW-002'],
    comments: [
      {
        id: 'COM-003',
        content: 'Need to verify duct sizing calculations',
        createdBy: 'Maria Garcia',
        createdAt: '2025-03-25T10:30:00Z',
        resolved: false
      }
    ]
  },
  {
    id: 'DRW-005',
    name: 'Landscape Design',
    type: 'Landscape',
    version: 'B.2',
    lastModified: '2025-03-24T13:40:00Z',
    status: 'Approved',
    assignedTo: 'David Kim',
    fileSize: 2097152,
    fileUrl: '/drawings/landscape-design.pdf',
    thumbnailUrl: '/drawings/thumbnails/landscape-design.jpg',
    createdBy: 'David Kim',
    createdAt: '2025-03-21T09:00:00Z',
    tags: ['landscape', 'exterior', 'design'],
    relatedDrawings: [],
    comments: [
      {
        id: 'COM-004',
        content: 'Plant selection approved by client',
        createdBy: 'James Wilson',
        createdAt: '2025-03-24T13:40:00Z',
        resolved: true,
        resolvedBy: 'David Kim',
        resolvedAt: '2025-03-24T13:40:00Z'
      }
    ]
  }
]; 