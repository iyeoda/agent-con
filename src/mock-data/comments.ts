import { Comment } from '../types';
import { getOrganizationUsers, getProjectUsers } from './people';
import { drawings } from './drawings';
import { mockWorkspaceItems } from './workspace-data';

// Get all users for reference
const orgUsers = getOrganizationUsers();
const projectUsers = getProjectUsers();
const allUsers = [...orgUsers, ...projectUsers];

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

// Generate mock comments for drawings
const generateDrawingComments = (): Comment[] => {
  const comments: Comment[] = [];
  
  drawings.forEach(drawing => {
    // Generate 2-5 comments per drawing
    const commentCount = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < commentCount; i++) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      const createdAt = getRandomRecentDate();
      
      comments.push({
        id: `comment-drawing-${drawing.id}-${i}`,
        content: `Comment on ${drawing.name}: ${['Please review this section', 'Need clarification on dimensions', 'Updated specifications required', 'Approval needed for changes'][Math.floor(Math.random() * 4)]}`,
        createdAt,
        createdBy: user.id,
        entityType: 'drawing',
        entityId: drawing.id,
        projectId: '550e8400-e29b-41d4-a716-446655440000', // Default project ID
        mentions: i % 2 === 0 ? [allUsers[Math.floor(Math.random() * allUsers.length)].id] : undefined,
        attachments: i % 3 === 0 ? [{
          id: `attachment-${Math.random().toString(36).substring(2, 9)}`,
          name: 'reference-document.pdf',
          url: '/attachments/reference-document.pdf',
          type: 'application/pdf',
          size: Math.floor(Math.random() * 1000000) + 100000
        }] : undefined
      });
    }
  });
  
  return comments;
};

// Generate mock comments for workspace items
const generateWorkspaceItemComments = (): Comment[] => {
  const comments: Comment[] = [];
  
  Object.entries(mockWorkspaceItems).forEach(([projectId, items]) => {
    items.forEach(item => {
      // Generate 1-3 comments per workspace item
      const commentCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < commentCount; i++) {
        const user = allUsers[Math.floor(Math.random() * allUsers.length)];
        const createdAt = getRandomRecentDate();
        
        comments.push({
          id: `comment-workspace-${item.id}-${i}`,
          content: `Comment on ${item.title}: ${['Task progress update', 'Additional information needed', 'Resource allocation required', 'Timeline adjustment needed'][Math.floor(Math.random() * 4)]}`,
          createdAt,
          createdBy: user.id,
          entityType: 'workspace_item',
          entityId: item.id,
          projectId,
          mentions: i % 2 === 0 ? [allUsers[Math.floor(Math.random() * allUsers.length)].id] : undefined
        });
      }
    });
  });
  
  return comments;
};

// Combine all comments
export const mockComments: Comment[] = [
  ...generateDrawingComments(),
  ...generateWorkspaceItemComments()
];

// Helper function to get comments for a specific entity
export const getCommentsByEntity = (entityType: string, entityId: string): Comment[] => {
  return mockComments.filter(comment => 
    comment.entityType === entityType && comment.entityId === entityId
  );
};

// Helper function to get comments for a specific project
export const getCommentsByProject = (projectId: string): Comment[] => {
  return mockComments.filter(comment => comment.projectId === projectId);
};

// Helper function to get comments by user
export const getCommentsByUser = (userId: string): Comment[] => {
  return mockComments.filter(comment => comment.createdBy === userId);
}; 