import { ProjectPhase } from './index';

export interface Project {
  id: string;
  name: string;
  logo?: string;
  location?: string;
  phase?: ProjectPhase;
  cde?: string;
  cdeColor?: string;
  members?: number;
  lastActivity?: string;
  status: 'active' | 'archived' | 'available';
  archived?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
  tags?: string[];
  completionPercentage?: number;
} 