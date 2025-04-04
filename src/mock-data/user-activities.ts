import { UserActivity, Project } from '../types';
import { getOrganizationUsers, getProjectUsers } from './people';
import { mockProjects } from './projects';

// Helper function to generate a random date within the last 30 days
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const randomDate = new Date(now);
  randomDate.setDate(now.getDate() - daysAgo);
  randomDate.setHours(Math.floor(Math.random() * 24));
  randomDate.setMinutes(Math.floor(Math.random() * 60));
  return randomDate.toISOString();
};

// Helper function to format date as "X time ago"
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};

// Get all users for reference
const orgUsers = getOrganizationUsers();
const projectUsers = getProjectUsers();
const allUsers = [...orgUsers, ...projectUsers];

// Generate mock user activities
const generateUserActivities = (): UserActivity[] => {
  const activities: UserActivity[] = [];
  
  // Project activities
  mockProjects.forEach((project: Project) => {
    // Project creation
    const creator = allUsers[Math.floor(Math.random() * allUsers.length)];
    activities.push({
      id: `activity-${project.id}-created`,
      userId: creator.id,
      userName: creator.name,
      action: 'created',
      entityType: 'project',
      entityId: project.id,
      entityName: project.name,
      projectId: project.id,
      projectName: project.name,
      timestamp: new Date(project.startDate || '2024-01-01').toISOString(),
      metadata: {
        description: project.description,
        location: project.location,
        phase: project.phase
      }
    });
    
    // Project updates
    if (project.phase) {
      const updater = allUsers[Math.floor(Math.random() * allUsers.length)];
      activities.push({
        id: `activity-${project.id}-updated-phase`,
        userId: updater.id,
        userName: updater.name,
        action: 'updated',
        entityType: 'project',
        entityId: project.id,
        entityName: project.name,
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          field: 'phase',
          oldValue: 'Planning',
          newValue: project.phase
        }
      });
    }
    
    // Document activities
    const documentUsers = allUsers.slice(0, 3);
    documentUsers.forEach(user => {
      activities.push({
        id: `activity-${project.id}-doc-${Math.random().toString(36).substring(2, 9)}`,
        userId: user.id,
        userName: user.name,
        action: 'uploaded',
        entityType: 'document',
        entityId: `doc-${Math.random().toString(36).substring(2, 9)}`,
        entityName: `Document ${Math.floor(Math.random() * 100) + 1}`,
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          fileType: 'pdf',
          fileSize: Math.floor(Math.random() * 10000) + 1000
        }
      });
    });
    
    // Task activities
    const taskUsers = allUsers.slice(0, 5);
    taskUsers.forEach(user => {
      activities.push({
        id: `activity-${project.id}-task-${Math.random().toString(36).substring(2, 9)}`,
        userId: user.id,
        userName: user.name,
        action: 'created',
        entityType: 'task',
        entityId: `task-${Math.random().toString(36).substring(2, 9)}`,
        entityName: `Task ${Math.floor(Math.random() * 100) + 1}`,
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
          status: 'open'
        }
      });
    });
    
    // Comment activities
    const commentUsers = allUsers.slice(0, 4);
    commentUsers.forEach(user => {
      activities.push({
        id: `activity-${project.id}-comment-${Math.random().toString(36).substring(2, 9)}`,
        userId: user.id,
        userName: user.name,
        action: 'commented',
        entityType: 'comment',
        entityId: `comment-${Math.random().toString(36).substring(2, 9)}`,
        entityName: `Comment on ${['Task', 'Document', 'Issue'][Math.floor(Math.random() * 3)]} ${Math.floor(Math.random() * 100) + 1}`,
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          commentLength: Math.floor(Math.random() * 200) + 10
        }
      });
    });
    
    // Issue activities
    const issueUsers = allUsers.slice(0, 3);
    issueUsers.forEach(user => {
      activities.push({
        id: `activity-${project.id}-issue-${Math.random().toString(36).substring(2, 9)}`,
        userId: user.id,
        userName: user.name,
        action: 'created',
        entityType: 'issue',
        entityId: `issue-${Math.random().toString(36).substring(2, 9)}`,
        entityName: `Issue ${Math.floor(Math.random() * 100) + 1}`,
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
          status: 'open'
        }
      });
    });
    
    // User login activities
    const loginUsers = allUsers.slice(0, 5);
    loginUsers.forEach(user => {
      activities.push({
        id: `activity-${project.id}-login-${Math.random().toString(36).substring(2, 9)}`,
        userId: user.id,
        userName: user.name,
        action: 'logged_in',
        entityType: 'system',
        entityId: 'system',
        entityName: 'System',
        projectId: project.id,
        projectName: project.name,
        timestamp: getRandomRecentDate(),
        metadata: {
          device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
          browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)]
        }
      });
    });
  });
  
  // Sort activities by timestamp (newest first)
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate the mock activities
const mockUserActivities = generateUserActivities();

// Helper function to get activities for a specific project
export const getActivitiesByProject = (projectId: string): UserActivity[] => {
  return mockUserActivities.filter(activity => activity.projectId === projectId);
};

// Helper function to get activities for a specific user
export const getActivitiesByUser = (userId: string): UserActivity[] => {
  return mockUserActivities.filter(activity => activity.userId === userId);
};

// Helper function to get recent activities (last 30 days)
export const getRecentActivities = (limit: number = 50): UserActivity[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return mockUserActivities
    .filter(activity => new Date(activity.timestamp) >= thirtyDaysAgo)
    .slice(0, limit);
};

// Export all activities
export const userActivities = mockUserActivities; 