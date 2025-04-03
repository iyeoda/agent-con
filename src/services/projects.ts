import api from './api';
import { Project } from '../types';

export const projectService = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get a single project by ID
  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create a new project
  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const response = await api.post('/projects', project);
    return response.data;
  },

  // Update an existing project
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, project);
    return response.data;
  },

  // Delete a project
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Archive a project
  archive: async (id: string): Promise<Project> => {
    const response = await api.post(`/projects/${id}/archive`);
    return response.data;
  },

  // Get available projects from CDEs
  getAvailableFromCDEs: async (): Promise<Project[]> => {
    const response = await api.get('/projects/available');
    return response.data;
  }
}; 