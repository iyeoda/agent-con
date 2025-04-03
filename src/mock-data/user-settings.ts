import { UserSettings } from '../types';

export const mockUserSettings: UserSettings = {
  id: 'SET-001',
  userId: 'USR-001',
  notifications: {
    email: true,
    push: true,
    projectUpdates: true,
    taskAssignments: true,
    drawingUpdates: true,
    mentions: true,
    comments: true
  },
  preferences: {
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    defaultView: 'grid',
    compactMode: false
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '2025-03-15T10:00:00Z',
    loginHistory: [
      {
        id: 'LOG-001',
        timestamp: '2025-03-28T15:30:00Z',
        ipAddress: '192.168.1.100',
        location: 'New York, NY',
        device: 'Chrome on MacOS',
        status: 'success'
      },
      {
        id: 'LOG-002',
        timestamp: '2025-03-27T14:20:00Z',
        ipAddress: '192.168.1.100',
        location: 'New York, NY',
        device: 'Chrome on MacOS',
        status: 'success'
      }
    ],
    activeSessions: [
      {
        id: 'SES-001',
        device: 'Chrome on MacOS',
        location: 'New York, NY',
        lastActive: '2025-03-28T15:30:00Z',
        ipAddress: '192.168.1.100'
      }
    ]
  }
}; 