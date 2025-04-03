import { Drawing, DrawingType, DrawingStatus } from '../types';

export const drawings: Drawing[] = [
  {
    id: 'DRW-001',
    name: 'Foundation Plan',
    type: DrawingType.Architectural,
    version: 'A.2',
    status: DrawingStatus.InReview,
    assignedTo: 'Maria Garcia'
  },
  {
    id: 'DRW-002',
    name: 'Electrical Layout',
    type: DrawingType.MEP,
    version: 'B.1',
    status: DrawingStatus.Approved,
    assignedTo: 'Thomas Lee'
  },
  {
    id: 'DRW-003',
    name: 'Structural Details',
    type: DrawingType.Structural,
    version: 'C.3',
    status: DrawingStatus.Draft,
    assignedTo: 'Robert Johnson'
  },
  {
    id: 'DRW-004',
    name: 'HVAC System',
    type: DrawingType.MEP,
    version: 'A.1',
    status: DrawingStatus.InReview,
    assignedTo: 'James Wilson'
  },
  {
    id: 'DRW-005',
    name: 'Landscape Design',
    type: DrawingType.Landscape,
    version: 'B.2',
    status: DrawingStatus.Approved,
    assignedTo: 'David Kim'
  }
]; 