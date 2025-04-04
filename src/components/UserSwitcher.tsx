import React from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import config from '../config';

// Only render in development mode
const UserSwitcher: React.FC = () => {
  const { 
    currentUser, 
    currentUserType, 
    loginAsUser, 
    logout, 
    availableUserTypes, 
    getUserTypeDisplayName 
  } = useUser();

  // Don't render in production
  if (config.environment !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="flex items-center gap-2 px-3 py-2 bg-[#3A366E] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <User size={16} />
            <span>
              {currentUserType ? getUserTypeDisplayName(currentUserType) : 'Switch User'}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2 border-b border-[#A7CEBC]">
            <div className="text-xs font-medium text-[#3A366E]">Current User</div>
            <div className="text-sm text-[#4C5760]">{currentUser?.name}</div>
            <div className="text-xs text-[#4C5760]">{currentUser?.email}</div>
          </div>
          
          <div className="px-3 py-2 border-b border-[#A7CEBC]">
            <div className="text-xs font-medium text-[#3A366E] mb-2">Switch To</div>
            {availableUserTypes.map(userType => (
              <DropdownMenuItem 
                key={userType} 
                className={`flex items-center ${currentUserType === userType ? 'bg-gray-50' : ''}`}
                onClick={() => loginAsUser(userType)}
              >
                <User size={16} className="mr-2 text-[#4C5760]" />
                <span className="text-sm">{getUserTypeDisplayName(userType)}</span>
              </DropdownMenuItem>
            ))}
          </div>
          
          <DropdownMenuItem onClick={logout} className="text-red-600">
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserSwitcher; 