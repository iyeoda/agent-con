import { UserSettings } from '../types';
import api from './api';

export const userSettingsService = {
  // Get user settings
  getSettings: async (): Promise<UserSettings> => {
    const response = await api.get('/user-settings');
    return response.data;
  },

  // Update notifications settings
  updateNotifications: async (notifications: UserSettings['notifications']): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/notifications', { notifications });
    return response.data;
  },

  // Update theme
  updateTheme: async (theme: UserSettings['theme']): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/theme', { theme });
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences: Record<string, any>): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/preferences', { preferences });
    return response.data;
  },

  // Update security settings
  updateSecurity: async (security: NonNullable<UserSettings['security']>): Promise<UserSettings> => {
    const response = await api.patch('/user-settings/security', { security });
    return response.data;
  }
}; 