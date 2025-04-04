import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';

// Sample data - replace with real data from your backend
const recentProjects = [
  { id: '1', name: 'Woodside Project', lastAccessed: '2024-03-28T10:30:00Z' },
  { id: '2', name: 'Downtown Tower', lastAccessed: '2024-03-27T15:45:00Z' },
  { id: '3', name: 'City Center Mall', lastAccessed: '2024-03-26T09:15:00Z' }
];

const notifications = [
  { id: '1', title: 'Document Updated', message: 'Floor plan A-101 has been updated', time: '5m ago' },
  { id: '2', title: 'New Comment', message: 'John commented on your review', time: '1h ago' },
  { id: '3', title: 'Task Assigned', message: 'You have been assigned to review drawings', time: '2h ago' }
];

export const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { currentUser, logout: userLogout } = useUser();

  // Use current user data if available, otherwise use default
  const user = currentUser || {
    id: 'default',
    name: 'John Smith',
    role: 'Project Manager',
    avatar: null,
    email: 'john.smith@acmeconstruction.com'
  };

  const handleNavigation = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation failed:', error);
      // You could show a toast notification here
    }
  };

  const handleSignOut = () => {
    // Call the logout function from user context
    userLogout();
    // After sign out, navigate to login page
    handleNavigation('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3A366E] text-white hover:bg-opacity-90 transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {user.avatar ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {/* User Info */}
        <div className="px-3 py-2 border-b border-[#A7CEBC]">
          <div className="font-medium text-[#3A366E]">{user.name}</div>
          <div className="text-sm text-[#4C5760]">{user.role || 'User'}</div>
          <div className="text-xs text-[#4C5760]">{user.email}</div>
        </div>

        {/* Quick Links */}
        <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
          <User size={16} className="mr-2 text-[#4C5760]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
          <Settings size={16} className="mr-2 text-[#4C5760]" />
          Settings
        </DropdownMenuItem>

        {/* Sign Out */}
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut size={16} className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 