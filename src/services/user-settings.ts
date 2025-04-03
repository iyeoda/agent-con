import api from './api';
import { UserSettings } from '../types';

export const userSettingsService = {
  // Get user settings
  get: async (): Promise<UserSettings> => {
    const response = await api.get('/user-settings');
    return response.data;
  },

  // Update user settings
  update: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    const response = await api.patch('/user-settings', settings);
    return response.data;
  },

  // Update notification preferences
  updateNotifications: async (notifications: UserSettings['notifications']): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/notifications', { notifications });
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences: UserSettings['preferences']): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/preferences', { preferences });
    return response.data;
  },

  // Update security settings
  updateSecurity: async (security: UserSettings['security']): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/security', { security });
    return response.data;
  }
}; 