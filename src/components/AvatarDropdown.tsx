import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar, { AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { 
  User, 
  Settings, 
  Shield, 
  Moon, 
  Sun, 
  Bell, 
  LogOut,
  Folder
} from 'lucide-react';
import Switch from './ui/switch';

// Sample data - replace with real data from your backend
const user = {
  name: 'John Smith',
  role: 'Project Manager',
  avatar: null,
  email: 'john.smith@acmeconstruction.com'
};

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
  const [darkMode, setDarkMode] = useState(false);

  const handleNavigation = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation failed:', error);
      // You could show a toast notification here
    }
  };

  const handleSignOut = () => {
    // Implement sign out logic
    console.log('Signing out...');
    // After sign out, navigate to login page
    handleNavigation('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="w-8 h-8 rounded-full bg-[#3A366E] text-white text-sm font-bold select-none hover:opacity-90 transition-opacity flex items-center justify-center outline-none ring-0 focus:outline-none focus:ring-0 active:outline-none active:ring-0 border-0"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {user.name.split(' ').map(n => n[0]).join('')}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {/* User Info */}
        <div className="px-3 py-2 border-b border-[#A7CEBC]">
          <div className="font-medium text-[#3A366E]">{user.name}</div>
          <div className="text-sm text-[#4C5760]">{user.role}</div>
          <div className="text-xs text-[#4C5760]">{user.email}</div>
        </div>

        {/* Quick Links */}
        <DropdownMenuItem onClick={() => handleNavigation('/settings/general')}>
          <User size={16} className="mr-2 text-[#4C5760]" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/settings/security')}>
          <Shield size={16} className="mr-2 text-[#4C5760]" />
          Security Settings
        </DropdownMenuItem>

        {/* Recent Projects */}
        <div className="px-3 py-2 border-b border-[#A7CEBC]">
          <div className="text-xs font-medium text-[#3A366E] mb-2">Recent Projects</div>
          {recentProjects.map(project => (
            <DropdownMenuItem 
              key={project.id} 
              className="flex items-center justify-between"
              onClick={() => handleNavigation(`/projects/${project.id}`)}
            >
              <div className="flex items-center">
                <Folder size={16} className="mr-2 text-[#4C5760]" />
                <span className="text-sm">{project.name}</span>
              </div>
              <span className="text-xs text-[#4C5760]">
                {new Date(project.lastAccessed).toLocaleDateString()}
              </span>
            </DropdownMenuItem>
          ))}
        </div>

        {/* Theme Toggle */}
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex items-center">
            {darkMode ? (
              <Moon size={16} className="mr-2 text-[#4C5760]" />
            ) : (
              <Sun size={16} className="mr-2 text-[#4C5760]" />
            )}
            <span className="text-sm">Dark Mode</span>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </DropdownMenuItem>

        {/* Notifications */}
        <div className="px-3 py-2 border-b border-[#A7CEBC]">
          <div className="text-xs font-medium text-[#3A366E] mb-2">Recent Notifications</div>
          {notifications.map(notification => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">{notification.title}</span>
                <span className="text-xs text-[#4C5760]">{notification.time}</span>
              </div>
              <span className="text-xs text-[#4C5760]">{notification.message}</span>
            </DropdownMenuItem>
          ))}
        </div>

        {/* Sign Out */}
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 