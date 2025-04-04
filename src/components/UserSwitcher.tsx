import React from 'react';
import { useUser } from '../contexts/UserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Button from './ui/button';
import { User } from 'lucide-react';

const UserSwitcher: React.FC = () => {
  const { currentUser, logout } = useUser();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {currentUser?.name || 'Switch User'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2 border-b border-[#A7CEBC]">
            <div className="text-xs font-medium text-[#3A366E] mb-2">Current User</div>
            <div className="font-medium text-[#3A366E]">{currentUser?.name}</div>
            <div className="text-sm text-[#4C5760]">{currentUser?.email}</div>
          </div>
          <DropdownMenuItem onClick={() => logout()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserSwitcher; 