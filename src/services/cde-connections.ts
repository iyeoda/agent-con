import api from './api';
import { CDEConnection } from '../types';
import AuthService from './auth';
import { AxiosResponse } from 'axios';

export const cdeConnectionService = {
  // Get all CDE connections
  getAll: async (): Promise<CDEConnection[]> => {
    const response = await api.get<CDEConnection[]>('/cde-connections');
    return response.data;
  },

  // Get a single CDE connection by ID
  getById: async (id: string): Promise<CDEConnection> => {
    const response = await api.get<CDEConnection>(`/cde-connections/${id}`);
    return response.data;
  },

  // Create a new CDE connection
  create: async (connection: Omit<CDEConnection, 'id'>): Promise<CDEConnection> => {
    const response = await api.post<CDEConnection>('/cde-connections', connection);
    return response.data;
  },

  // Update an existing CDE connection
  update: async (id: string, connection: Partial<CDEConnection>): Promise<CDEConnection> => {
    const response = await api.patch<CDEConnection>(`/cde-connections/${id}`, connection);
    return response.data;
  },

  // Delete a CDE connection
  delete: async (id: string): Promise<void> => {
    await api.delete(`/cde-connections/${id}`);
  },

  // Test a CDE connection
  test: async (id: string): Promise<{ success: boolean; message: string }> => {
    const connection = await cdeConnectionService.getById(id);
    if (!connection.provider) {
      throw new Error('Invalid connection: missing provider');
    }

    const accessToken = await AuthService.getAccessToken(connection.provider);
    if (!accessToken) {
      throw new Error('No valid access token available');
    }

    const response = await api.post<{ success: boolean; message: string }>(`/cde-connections/${id}/test`, {
      access_token: accessToken
    });
    return response.data;
  },

  // Sync data from a CDE connection
  sync: async (id: string): Promise<{ success: boolean; message: string }> => {
    const connection = await cdeConnectionService.getById(id);
    if (!connection.provider) {
      throw new Error('Invalid connection: missing provider');
    }

    const accessToken = await AuthService.getAccessToken(connection.provider);
    if (!accessToken) {
      throw new Error('No valid access token available');
    }

    const response = await api.post<{ success: boolean; message: string }>(`/cde-connections/${id}/sync`, {
      access_token: accessToken
    });
    return response.data;
  },

  // Initiate OAuth2 flow for a provider
  initiateOAuth: async (provider: string): Promise<{ url: string }> => {
    const response = await api.post<{ url: string }>(`/auth/${provider}/initiate`);
    return response.data;
  },

  // Handle OAuth2 callback
  handleOAuthCallback: async (provider: string, code: string): Promise<CDEConnection> => {
    const response = await api.post<{ tokens: any; connection: CDEConnection }>(`/auth/${provider}/callback`, { code });
    const { tokens, connection } = response.data;
    
    // Store the tokens securely
    AuthService.storeNewTokens(provider, tokens);
    
    return connection;
  },

  // Disconnect a CDE connection
  disconnect: async (id: string): Promise<void> => {
    const connection = await cdeConnectionService.getById(id);
    if (!connection.provider) {
      throw new Error('Invalid connection: missing provider');
    }

    await api.delete(`/cde-connections/${id}`);
    AuthService.removeProviderTokens(connection.provider);
  }
}; 