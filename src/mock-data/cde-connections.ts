import { CDEConnection } from '../types';

export const mockCDEConnections: CDEConnection[] = [
  {
    id: 'CDE-001',
    name: 'Trimble Viewpoint',
    provider: 'Trimble',
    type: 'Project Management',
    status: 'active',
    lastSync: '2025-03-28T15:00:00Z',
    color: '#D15F36',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  },
  {
    id: 'CDE-002',
    name: 'Autodesk Construction Cloud',
    provider: 'Autodesk',
    type: 'BIM',
    status: 'active',
    lastSync: '2025-03-28T14:30:00Z',
    color: '#3A366E',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  },
  {
    id: 'CDE-003',
    name: 'Procore',
    provider: 'Procore',
    type: 'Project Management',
    status: 'inactive',
    lastSync: '2025-03-25T10:00:00Z',
    color: '#A7CEBC',
    credentials: {
      apiKey: '****',
      clientId: '****',
      clientSecret: '****'
    }
  }
]; 