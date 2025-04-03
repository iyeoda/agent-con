import { Agent } from '../types';

interface AgentSession {
  id: string;
  agentId: string;
  projectId: string;
  mode: 'structured' | 'unstructured';
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  isTaskRequest?: boolean;
  metadata?: Record<string, any>;
}

interface AgentAction {
  id: string;
  sessionId: string;
  type: string;
  status: 'pending' | 'completed' | 'failed';
  data: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

interface Export {
  id: string;
  sessionId: string;
  type: 'excel' | 'pdf';
  status: 'pending' | 'completed' | 'failed';
  data: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

interface Reminder {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
}

class AgentSessionsService {
  private sessions: Map<string, AgentSession> = new Map();
  private actions: Map<string, AgentAction[]> = new Map();
  private exports: Map<string, Export[]> = new Map();
  private reminders: Map<string, Reminder[]> = new Map();

  createSession(agentId: string, projectId: string, mode: 'structured' | 'unstructured'): AgentSession {
    const session: AgentSession = {
      id: `session-${Date.now()}`,
      agentId,
      projectId,
      mode,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.sessions.set(session.id, session);
    return session;
  }

  addMessage(sessionId: string, message: ChatMessage): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    session.messages.push(message);
    session.updatedAt = new Date().toISOString();
  }

  createAction(sessionId: string, type: string, data: Record<string, any>): AgentAction {
    const action: AgentAction = {
      id: `action-${Date.now()}`,
      sessionId,
      type,
      status: 'pending',
      data,
      createdAt: new Date().toISOString()
    };

    const sessionActions = this.actions.get(sessionId) || [];
    sessionActions.push(action);
    this.actions.set(sessionId, sessionActions);

    return action;
  }

  createExport(sessionId: string, type: 'excel' | 'pdf', data: Record<string, any>): Export {
    const export_: Export = {
      id: `export-${Date.now()}`,
      sessionId,
      type,
      status: 'pending',
      data,
      createdAt: new Date().toISOString()
    };

    const sessionExports = this.exports.get(sessionId) || [];
    sessionExports.push(export_);
    this.exports.set(sessionId, sessionExports);

    return export_;
  }

  createReminder(sessionId: string, title: string, description: string, dueDate: string): Reminder {
    const reminder: Reminder = {
      id: `reminder-${Date.now()}`,
      sessionId,
      title,
      description,
      dueDate,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const sessionReminders = this.reminders.get(sessionId) || [];
    sessionReminders.push(reminder);
    this.reminders.set(sessionId, sessionReminders);

    return reminder;
  }

  getSession(sessionId: string): AgentSession | undefined {
    return this.sessions.get(sessionId);
  }

  getSessionActions(sessionId: string): AgentAction[] {
    return this.actions.get(sessionId) || [];
  }

  getSessionExports(sessionId: string): Export[] {
    return this.exports.get(sessionId) || [];
  }

  getSessionReminders(sessionId: string): Reminder[] {
    return this.reminders.get(sessionId) || [];
  }
}

export const agentSessionsService = new AgentSessionsService(); 