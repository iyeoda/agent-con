// Core types for the application

export enum AgentIconType {
  UserCog = 'UserCog',
  Shield = 'Shield',
  Building2 = 'Building2',
  Leaf = 'Leaf',
  BarChart = 'BarChart',
  FileStack = 'FileStack',
  FileSignature = 'FileSignature',
  ShieldAlert = 'ShieldAlert',
  Database = 'Database',
  CheckCircle = 'CheckCircle'
}

export enum DrawingType {
  Architectural = 'Architectural',
  Structural = 'Structural',
  Survey = 'Survey',
  Environmental = 'Environmental',
  MEP = 'MEP',
  Landscape = 'Landscape'
}

export enum DrawingStatus {
  InReview = 'In Review',
  Approved = 'Approved',
  InProgress = 'In Progress',
  Draft = 'Draft'
}

export type ProjectStatus = 'active' | 'archived' | 'available';
export type ProjectPhase = 'Planning' | 'Design' | 'Construction' | 'Completed';
export type CDEConnectionType = 'Project Management' | 'BIM' | 'Document Management';
export type CDEConnectionStatus = 'active' | 'inactive';

export interface Project {
  id: string;
  name: string;
  logo?: string;
  image?: string;  // URL to project image/photo
  location?: string;
  phase?: ProjectPhase;
  cde?: string;
  cdeColor?: string;
  members?: number;
  lastActivity?: string;
  status: ProjectStatus;
  archived?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
  tags?: string[];
  completionPercentage?: number;  // Project completion percentage (0-100)
}

export interface Task {
  id: string;
  name: string;
  status: string;
  assignedTo: string;
}

export interface Agent {
  id: string;
  title: string;
  icon: AgentIconType;
  tasks: Task[];
  color?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface Person {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  status?: 'active' | 'inactive';
  department?: string;
  joinDate?: string;
  skills?: string[];
  projects?: string[];
}

export interface Company {
  id: string;
  name: string;
  role: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  type?: 'Contractor' | 'Architect' | 'Consultant' | 'Client';
  status?: 'active' | 'inactive';
  joinDate?: string;
  projects?: string[];
}

export interface Drawing {
  id: string;
  name: string;
  type: DrawingType;
  version: string;
  status: DrawingStatus;
  assignedTo?: string;
}

export interface DrawingComment {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  resolved?: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string | number | Date;
  isTaskRequest?: boolean;
  metadata?: {
    taskId?: string;
    projectId?: string;
    drawingId?: string;
    agentId?: string;
  };
}

export interface CDEConnection {
  id: string;
  name: string;
  type: CDEConnectionType;
  status: CDEConnectionStatus;
  lastSync?: string;
  credentials?: {
    apiKey?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    expiresAt?: string;
  };
  settings?: {
    autoSync?: boolean;
    syncInterval?: number;
    syncTypes?: string[];
  };
  projects?: string[];
}

export interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
    taskAssignments: boolean;
    drawingUpdates: boolean;
    mentions: boolean;
    comments: boolean;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    defaultView: 'list' | 'grid' | 'calendar';
    compactMode: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: LoginHistory[];
    activeSessions: ActiveSession[];
  };
}

export interface LoginHistory {
  id: string;
  timestamp: string;
  ipAddress: string;
  location?: string;
  device?: string;
  status: 'success' | 'failed';
}

export interface ActiveSession {
  id: string;
  device: string;
  location?: string;
  lastActive: string;
  ipAddress: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectMetrics {
  completion: number;
  rfiCount: number;
  openIssues: number;
  documentsToReview: number;
  upcomingDeadlines: number;
  teamMembers: number;
}

export interface RecentActivity {
  id: number;
  type: 'document' | 'comment' | 'issue' | 'approval';
  user: string;
  action: string;
  item: string;
  time: string;
}

export interface Deadline {
  id: number;
  task: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Risk {
  id: number;
  issue: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ProjectData {
  agents: Agent[];
  drawings: Drawing[];
  tasks: Task[];
  metrics: ProjectMetrics;
  recentActivities: RecentActivity[];
  upcomingDeadlines: Deadline[];
  risks: Risk[];
} 