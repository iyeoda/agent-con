export interface Project {
  id: string;
  name: string;
  logo?: string;
  location?: string;
  phase?: string;
  cde?: string;
  cdeColor?: string;
  members?: number;
  lastActivity?: string;
  status: 'active' | 'archived' | 'available';
  archived?: string;
} 