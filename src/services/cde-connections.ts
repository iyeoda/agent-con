import api from './api';
import { CDEConnection } from '../types';

export const cdeConnectionService = {
  // Get all CDE connections
  getAll: async (): Promise<CDEConnection[]> => {
    const response = await api.get('/cde-connections');
    return response.data;
  },

  // Get a single CDE connection by ID
  getById: async (id: string): Promise<CDEConnection> => {
    const response = await api.get(`/cde-connections/${id}`);
    return response.data;
  },

  // Create a new CDE connection
  create: async (connection: Omit<CDEConnection, 'id'>): Promise<CDEConnection> => {
    const response = await api.post('/cde-connections', connection);
    return response.data;
  },

  // Update an existing CDE connection
  update: async (id: string, connection: Partial<CDEConnection>): Promise<CDEConnection> => {
    const response = await api.patch(`/cde-connections/${id}`, connection);
    return response.data;
  },

  // Delete a CDE connection
  delete: async (id: string): Promise<void> => {
    await api.delete(`/cde-connections/${id}`);
  },

  // Test a CDE connection
  test: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post(`/cde-connections/${id}/test`);
    return response.data;
  },

  // Sync data from a CDE connection
  sync: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post(`/cde-connections/${id}/sync`);
    return response.data;
  }
}; 