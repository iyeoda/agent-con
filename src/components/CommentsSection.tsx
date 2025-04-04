import React, { useState, useEffect } from 'react';
import { Comment, CommentableEntityType } from '../types';
import { getCommentsByEntity } from '../mock-data/comments';
import { getOrganizationUsers, getProjectUsers } from '../mock-data/people';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Button from './ui/button';
import Textarea from './ui/textarea';
import Avatar, { AvatarFallback, AvatarImage } from './ui/avatar';
import { MessageSquare, Paperclip, Send, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Debug helper
const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[CommentsSection]', ...args);
  }
};

interface CommentsSectionProps {
  entityType: CommentableEntityType;
  entityId: string;
  projectId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  entityType, 
  entityId,
  projectId
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get all users for reference
  const orgUsers = getOrganizationUsers();
  const projectUsers = getProjectUsers();
  const allUsers = [...orgUsers, ...projectUsers];
  
  useEffect(() => {
    debug('CommentsSection mounted');
    
    try {
      const fetchedComments = getCommentsByEntity(entityType, entityId);
      setComments(fetchedComments);
      setIsLoading(false);
    } catch (err) {
      debug('Error fetching comments:', err);
      setError('Failed to load comments');
      setIsLoading(false);
    }
  }, [entityType, entityId]);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, this would be an API call
    const comment: Comment = {
      id: `comment-${Math.random().toString(36).substring(2, 9)}`,
      content: newComment,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user-id', // In a real app, this would be the logged-in user's ID
      entityType,
      entityId,
      projectId
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };
  
  const getUserName = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  const getUserAvatar = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    return user?.avatar || '';
  };
  
  const getUserInitials = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  if (isLoading) {
    return (
      <div className="p-4 text-center text-[#4C5760]">
        Loading comments...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }
  
  return (
    <Card className="shadow-sm border-[#A7CEBC]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#3A366E] flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#D15F36]" />
          Comments
        </CardTitle>
        <CardDescription>Discussion and feedback on this item</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Add comment form */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/current-user.png" alt="Current User" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <Button variant="ghost" size="sm" className="text-[#4C5760]">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Attach
                </Button>
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-[#D15F36] hover:bg-[#B14D2A] text-white"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </div>
          
          {/* Comments list */}
          {comments.length === 0 ? (
            <div className="text-center text-[#4C5760] py-4">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={getUserAvatar(comment.createdBy)} alt={getUserName(comment.createdBy)} />
                    <AvatarFallback>{getUserInitials(comment.createdBy)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#3A366E]">
                        {getUserName(comment.createdBy)}
                      </span>
                      <span className="text-xs text-[#4C5760]">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="text-[#4C5760] mt-1">
                      {comment.content}
                    </div>
                    {comment.attachments && comment.attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {comment.attachments.map(attachment => (
                          <a
                            key={attachment.id}
                            href={attachment.url}
                            className="inline-flex items-center gap-1 text-xs text-[#3A366E] hover:text-[#D15F36]"
                          >
                            <Paperclip className="h-3 w-3" />
                            {attachment.name}
                          </a>
                        ))}
                      </div>
                    )}
                    {comment.mentions && comment.mentions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {comment.mentions.map(userId => (
                          <span key={userId} className="inline-flex items-center gap-1 text-xs bg-[#F7F5F2] px-2 py-1 rounded">
                            <User className="h-3 w-3" />
                            {getUserName(userId)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="ghost" className="text-[#3A366E]">
          View all comments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommentsSection; 