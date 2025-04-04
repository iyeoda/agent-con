export type AgentIconType = 'UserCog' | 'BarChart' | 'FileSignature' | 'Building2' | 'ShieldAlert' | 'Database' | 'FileStack' | 'CheckCircle';

export interface Task {
  id: string | number;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: AgentIconType;
  textColor?: string;
  tasks: Task[];
  status?: string;
  type: 'STRUCTURED' | 'UNSTRUCTURED';
  capabilities: string[];
  version: string;
}

export type DrawingType = 'architectural' | 'structural' | 'mechanical' | 'electrical' | 'plumbing';
export type DrawingStatus = 'current' | 'superseded' | 'pending' | 'draft';

export interface Drawing {
  id: string;
  name: string;
  type: DrawingType;
  status: DrawingStatus;
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: number;
  preview?: string;
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
  id: string;
  type: 'document' | 'comment' | 'issue' | 'approval';
  user: string;
  action: string;
  item: string;
  time: string;
}

export interface Deadline {
  id: string;
  task: string;
  dueDate: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Risk {
  id: string;
  issue: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  agents: Agent[];
  location?: string;
  phase?: string;
  cde?: string;
  cdeColor?: string;
  members?: number;
  lastActivity?: string;
  status?: string;
  archived?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
  tags?: string[];
  completionPercentage?: number;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar?: string;
  phone?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  type: string;
  status: string;
  role: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export interface CDEConnection {
  id: string;
  name: string;
  provider: string;
  type: string;
  status: string;
  lastSync?: string;
  color: string;
  projects: number;
  credentials?: {
    apiKey: string;
    clientId: string;
    clientSecret: string;
  };
}

export interface UserSettings {
  timezone: string;
  language: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
    projectUpdates: boolean;
    taskAssignments: boolean;
    drawingUpdates: boolean;
    mentions: boolean;
    comments: boolean;
  };
  preferences: {
    dashboardLayout: 'grid' | 'list';
    emailDigest: 'daily' | 'weekly' | 'never';
    taskView: 'kanban' | 'list';
  };
  security?: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    sessionTimeout: number;
  };
}

export type ProjectPhase = 'Planning' | 'Design' | 'Construction' | 'Completed';

export type CalendarEventType = 'deadline' | 'milestone' | 'meeting' | 'task';
export type CalendarEventStatus = 'upcoming' | 'completed' | 'cancelled';
export type CalendarEventPriority = 'high' | 'medium' | 'low';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string;
  status: CalendarEventStatus;
  priority: CalendarEventPriority;
  time?: string;
  assignedTo: string[];
  description?: string;
  location?: string;
  duration?: string;
  relatedDocuments?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type WorkspaceItemCategory = 'task' | 'event' | 'query' | 'insight' | 'issue';
export type WorkspaceItemStatus = 'open' | 'in_progress' | 'completed' | 'overdue' | 'upcoming';
export type WorkspaceItemPriority = 'high' | 'medium' | 'low';
export type WorkspaceItemType = 'task' | 'deadline' | 'milestone' | 'meeting';

export interface WorkspaceItem {
  id: string;
  title: string;
  description?: string;
  category: WorkspaceItemCategory;
  type?: WorkspaceItemType;
  assignee?: string;
  assignedTo?: string[];
  status: WorkspaceItemStatus;
  priority: WorkspaceItemPriority;
  dueDate?: string;
  date?: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  tags: string[];
  relatedDocuments?: string[];
  projectId: string;
  // Calendar specific fields
  time?: string;
  location?: string;
  duration?: string;
  // Additional metadata
  parentId?: string;
  dependencies?: string[];
  progress?: number;
  estimatedHours?: number;
  actualHours?: number;
}

// User Activity Types
export type ActivityActionType = 
  | 'created' 
  | 'updated' 
  | 'deleted' 
  | 'viewed' 
  | 'commented' 
  | 'approved' 
  | 'rejected' 
  | 'assigned' 
  | 'uploaded' 
  | 'downloaded' 
  | 'shared' 
  | 'logged_in' 
  | 'logged_out' 
  | 'settings_changed' 
  | 'role_changed';

export type ActivityEntityType = 
  | 'project' 
  | 'document' 
  | 'task' 
  | 'comment' 
  | 'issue' 
  | 'user' 
  | 'agent' 
  | 'drawing' 
  | 'calendar_event' 
  | 'workspace_item' 
  | 'system';

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: ActivityActionType;
  entityType: ActivityEntityType;
  entityId: string;
  entityName: string;
  projectId?: string;
  projectName?: string;
  timestamp: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
} 