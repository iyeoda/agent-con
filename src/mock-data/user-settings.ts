import { UserSettings } from '../types';

export const mockUserSettings: UserSettings = {
  id: 'SET-001',
  notifications: {
    email: true,
    push: true,
    desktop: true,
    projectUpdates: true,
    taskAssignments: true,
    drawingUpdates: true,
    mentions: true,
    comments: true
  },
  theme: 'light',
  language: 'en',
  timezone: 'America/New_York',
  preferences: {
    dashboardLayout: 'grid',
    emailDigest: 'daily',
    taskView: 'kanban'
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '2025-03-15T10:00:00Z',
    sessionTimeout: 3600
  }
}; 