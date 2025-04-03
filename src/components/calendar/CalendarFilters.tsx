import React from 'react';
import { Check, Filter } from 'lucide-react';
import Button from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CalendarEventType, CalendarEventPriority } from '../../types';
import Badge from '../ui/badge';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../ui/command';

interface CalendarFiltersProps {
  selectedTypes: CalendarEventType[];
  selectedPriorities: CalendarEventPriority[];
  selectedUsers: string[];
  onTypeChange: (types: CalendarEventType[]) => void;
  onPriorityChange: (priorities: CalendarEventPriority[]) => void;
  onUserChange: (users: string[]) => void;
  availableUsers: string[];
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  selectedTypes,
  selectedPriorities,
  selectedUsers,
  onTypeChange,
  onPriorityChange,
  onUserChange,
  availableUsers,
}) => {
  const eventTypes: CalendarEventType[] = ['deadline', 'milestone', 'meeting', 'task'];
  const priorities: CalendarEventPriority[] = ['high', 'medium', 'low'];

  const [isUserSearchOpen, setIsUserSearchOpen] = React.useState(false);

  const handleTypeToggle = (type: CalendarEventType) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const handlePriorityToggle = (priority: CalendarEventPriority) => {
    if (selectedPriorities.includes(priority)) {
      onPriorityChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPriorityChange([...selectedPriorities, priority]);
    }
  };

  const handleUserToggle = (user: string) => {
    if (selectedUsers.includes(user)) {
      onUserChange(selectedUsers.filter(u => u !== user));
    } else {
      onUserChange([...selectedUsers, user]);
    }
  };

  const getTypeColor = (type: CalendarEventType) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'milestone':
        return 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]';
    }
  };

  const getPriorityColor = (priority: CalendarEventPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-white border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Event Type
            {selectedTypes.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedTypes.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <div className="px-2 py-1.5 text-sm font-medium">Event Types</div>
          <div className="h-px bg-[#A7CEBC] my-1" />
          {eventTypes.map(type => (
            <DropdownMenuItem
              key={type}
              onClick={() => handleTypeToggle(type)}
              className="flex items-center justify-between"
            >
              <span className="capitalize">{type}</span>
              <Badge className={getTypeColor(type)}>
                {selectedTypes.includes(type) && <Check className="h-4 w-4" />}
              </Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Priority
            {selectedPriorities.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedPriorities.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <div className="px-2 py-1.5 text-sm font-medium">Priority Levels</div>
          <div className="h-px bg-[#A7CEBC] my-1" />
          {priorities.map(priority => (
            <DropdownMenuItem
              key={priority}
              onClick={() => handlePriorityToggle(priority)}
              className="flex items-center justify-between"
            >
              <span className="capitalize">{priority}</span>
              <Badge className={getPriorityColor(priority)}>
                {selectedPriorities.includes(priority) && <Check className="h-4 w-4" />}
              </Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={isUserSearchOpen} onOpenChange={setIsUserSearchOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Assigned To
            {selectedUsers.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedUsers.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search team members..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {availableUsers.map(user => (
                  <CommandItem
                    key={user}
                    onSelect={() => handleUserToggle(user)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs mr-2">
                        {user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{user}</span>
                    </div>
                    {selectedUsers.includes(user) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>

      {(selectedTypes.length > 0 || selectedPriorities.length > 0 || selectedUsers.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onTypeChange([]);
            onPriorityChange([]);
            onUserChange([]);
          }}
          className="text-[#3A366E]"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default CalendarFilters; 