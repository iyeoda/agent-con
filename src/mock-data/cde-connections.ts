import { CDEConnection } from '../types';

export const mockCDEConnections: CDEConnection[] = [
  {
    id: 'CDE-001',
    name: 'Trimble Viewpoint',
    type: 'Project Management',
    status: 'active',
    lastSync: '2025-03-28T15:00:00Z',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  },
  {
    id: 'CDE-002',
    name: 'Autodesk Construction Cloud',
    type: 'BIM',
    status: 'active',
    lastSync: '2025-03-28T14:30:00Z',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  },
  {
    id: 'CDE-003',
    name: 'Procore',
    type: 'Project Management',
    status: 'inactive',
    lastSync: '2025-03-25T10:00:00Z',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  }
]; 