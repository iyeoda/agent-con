import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent } from './ui/card';
import Button from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import * as Dialog from "@radix-ui/react-dialog";
import { 
  Calendar, ChevronLeft, ChevronRight, 
  Plus, Filter, MoreHorizontal, CheckCircle, Clock, AlertTriangle, FileText,
  User, Users, Search, MapPin, X
} from 'lucide-react';
import Badge from './ui/badge';
import { Separator } from "./ui/separator";
import { CalendarEvent, CalendarEventType, CalendarEventPriority, CalendarEventStatus } from '../types';
import { calendarEvents } from '../mock-data/calendar-data';
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { Label } from './ui/label';
import Input from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Textarea from './ui/textarea';

interface ProjectCalendarViewProps {
  projectId: string;
  organization?: string;
}

interface FilterState {
  type: string;
  assignee?: string;
  organization?: string;
}

interface TeamMemberFilterProps {
  selectedTeamMember: string | null;
  onTeamMemberSelect: (teamMember: string | null) => void;
}

const debugLog = (...args: any[]) => {
  console.log(...args);
};

const ProjectCalendarView: React.FC<ProjectCalendarViewProps> = ({ projectId }) => {
  const [viewType, setViewType] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date('2025-04-01'));
  const [filterState, setFilterState] = useState<FilterState>({ type: 'all' });
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: 'task',
    status: 'upcoming',
    priority: 'medium',
    assignedTo: [],
    tags: []
  });
  
  // Get events for the current project, fallback to first available project if ID doesn't exist
  const availableProjectIds = Object.keys(calendarEvents);
  const effectiveProjectId = calendarEvents[projectId] ? projectId : availableProjectIds[0];
  const allEvents = calendarEvents[effectiveProjectId] || [];
  
  // Filter events based on multiple criteria
  const events = allEvents.filter(event => {
    // Type filter
    if (filterState.type !== 'all' && event.type !== filterState.type) {
      return false;
    }
    
    // Assignee filter
    if (filterState.assignee) {
      if (filterState.assignee === 'me') {
        // Assuming current user is "John Smith" for demo
        if (!event.assignedTo.includes('John Smith')) {
          return false;
        }
      } else {
        if (!event.assignedTo.includes(filterState.assignee)) {
          return false;
        }
      }
    }
    
    // Organization filter (if we add this to the event type)
    if (filterState.organization) {
      // This would need to be implemented based on your data structure
      // return event.organization === filterState.organization;
    }
    
    return true;
  });

  // Get unique assignees from all events
  const uniqueAssignees = Array.from(
    new Set(allEvents.flatMap(event => event.assignedTo))
  ).sort();

  // Helper to get filter display text
  const getFilterDisplayText = () => {
    const parts = [];
    if (filterState.type !== 'all') {
      parts.push(filterState.type.charAt(0).toUpperCase() + filterState.type.slice(1) + 's');
    }
    if (filterState.assignee) {
      parts.push(filterState.assignee === 'me' ? 'My Items' : `${filterState.assignee}'s Items`);
    }
    if (filterState.organization) {
      parts.push(filterState.organization);
    }
    return parts.length > 0 ? parts.join(' - ') : 'All Events';
  };
  
  // Debug logging
  console.log('Calendar View:', {
    requestedProjectId: projectId,
    effectiveProjectId,
    currentDate,
    eventsCount: events.length,
    events,
    filterState,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    calendarEvents,
    availableProjectIds
  });

  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add weekday headers
    weekdays.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="text-center font-medium text-[#3A366E] p-2">
          {day}
        </div>
      );
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-100"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const cellDate = new Date(date);
        return eventDate.getFullYear() === cellDate.getFullYear() &&
               eventDate.getMonth() === cellDate.getMonth() &&
               eventDate.getDate() === cellDate.getDate();
      });
      
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`p-2 border border-gray-100 min-h-24 ${
            isToday ? 'bg-[#3A366E] bg-opacity-5 border-[#3A366E]' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`font-medium ${isToday ? 'text-[#3A366E]' : ''}`}>{day}</span>
            {dayEvents.length > 0 && (
              <span className="text-xs bg-[#D15F36] text-white rounded-full w-5 h-5 flex items-center justify-center">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEventDetailsOpen(true);
                }}
                className={`
                  text-xs p-1 rounded truncate cursor-pointer transition-colors
                  hover:opacity-90 active:opacity-80
                  ${event.type === 'deadline' 
                    ? 'bg-red-100 text-red-800' 
                    : event.type === 'milestone'
                      ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]'
                      : event.type === 'meeting'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                  }
                `}
              >
                <div className="flex items-center gap-1">
                  <span className="truncate">{event.title}</span>
                  {event.time && <span className="whitespace-nowrap">({event.time})</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-0">
        {days}
      </div>
    );
  };
  
  const renderWeekCalendar = () => {
    // Clone current date to avoid modifying the original
    const startOfWeek = new Date(currentDate);
    // Move to the start of the week (Sunday)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const weekdays = [];
    const weekdayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Generate 7 days starting from start of week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      
      const date = day.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === date);
      const isToday = new Date().toDateString() === day.toDateString();
      
      weekdays.push(
        <div key={`day-${i}`} className="border-b last:border-b-0">
          <div className={`p-3 border-b ${isToday ? 'bg-[#3A366E] bg-opacity-5' : 'bg-[#F7F5F2]'}`}>
            <div className="font-medium text-[#3A366E]">{weekdayLabels[i]}</div>
            <div className="text-sm text-[#4C5760]">{day.toLocaleDateString()}</div>
          </div>
          <div className="divide-y">
            {dayEvents.length > 0 ? (
              dayEvents.map(event => (
                <div 
                  key={event.id} 
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsEventDetailsOpen(true);
                  }}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-[#3A366E]">{event.title}</div>
                      <div className="text-xs text-[#4C5760] mt-1">
                        {event.time && (
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {event.time}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge 
                      className={`
                        ${event.type === 'deadline' 
                          ? 'bg-red-100 text-red-800' 
                          : event.type === 'milestone'
                            ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]'
                            : event.type === 'meeting'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                        }
                      `}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  {event.assignedTo.length > 0 && (
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-[#4C5760] mr-2">Assigned to:</span>
                      <div className="flex -space-x-2">
                        {event.assignedTo.map((person, idx) => (
                          <div key={idx} className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs border-2 border-white">
                            {person.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-[#4C5760] italic text-sm">No events</div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="divide-y">
        {weekdays}
      </div>
    );
  };
  
  const renderListView = () => {
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return (
      <div className="divide-y">
        {sortedEvents.map(event => (
          <div 
            key={event.id} 
            onClick={() => {
              setSelectedEvent(event);
              setIsEventDetailsOpen(true);
            }}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {event.type === 'deadline' && <AlertTriangle size={20} className="text-red-600" />}
                {event.type === 'milestone' && <CheckCircle size={20} className="text-[#D15F36]" />}
                {event.type === 'meeting' && <Calendar size={20} className="text-blue-600" />}
                {event.type === 'task' && <FileText size={20} className="text-[#3A366E]" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#3A366E]">{event.title}</h3>
                  <Badge 
                    className={`
                      ${event.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'}
                    `}
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="text-sm text-[#4C5760] mt-1">
                  Date: {new Date(event.date).toLocaleDateString()}
                  {event.time && ` at ${event.time}`}
                </div>
                {event.assignedTo.length > 0 && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-[#4C5760] mr-2">Assigned to:</span>
                    <div className="flex -space-x-2">
                      {event.assignedTo.map((person, idx) => (
                        <div key={idx} className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs border-2 border-white">
                          {person.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format current date range for display
  const getDateRangeText = () => {
    if (viewType === 'month') {
      return currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    } else if (viewType === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.toLocaleDateString('default', { month: 'long', year: 'numeric' })} ${startOfWeek.getDate()}-${endOfWeek.getDate()}`;
      } else {
        return `${startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    } else {
      return 'All Events';
    }
  };

  const EventDetailsDialog = ({ event }: { event: CalendarEvent }) => {
    return (
      <Dialog.Root open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[#A7CEBC] bg-white p-4 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-medium text-[#3A366E] mb-4">
              {event.title}
            </Dialog.Title>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  className={`
                    ${event.type === 'deadline' 
                      ? 'bg-red-100 text-red-800' 
                      : event.type === 'milestone'
                        ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]'
                        : event.type === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                    }
                  `}
                >
                  {event.type}
                </Badge>
                <Badge 
                  className={`
                    ${event.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'}
                  `}
                >
                  {event.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-[#4C5760]">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                  {event.time && ` at ${event.time}`}
                  {event.duration && ` (${event.duration})`}
                </div>
                {event.location && (
                  <div className="flex items-center text-sm text-[#4C5760]">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                )}
              </div>
              
              {event.description && (
                <div className="text-sm text-[#4C5760]">
                  <h4 className="font-medium mb-1">Description</h4>
                  <p>{event.description}</p>
                </div>
              )}
              
              {event.assignedTo.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Assigned to</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.assignedTo.map((person, idx) => (
                      <div key={idx} className="flex items-center bg-[#F7F5F2] rounded-full px-3 py-1">
                        <div className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs mr-2">
                          {person.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-[#4C5760]">{person}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Dialog.Close className="absolute top-4 right-4 text-[#4C5760] hover:text-[#3A366E]">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

  function getUniqueAssignees(): string[] {
    const assignees = new Set<string>();
    Object.values(calendarEvents).forEach(projectEvents => {
      projectEvents.forEach(event => {
        if (event.assignedTo) {
          event.assignedTo.forEach(assignee => {
            assignees.add(assignee);
          });
        }
      });
    });
    return Array.from(assignees);
  }

  function TeamMemberFilter({ selectedTeamMember, onTeamMemberSelect }: TeamMemberFilterProps) {
    const uniqueAssignees = getUniqueAssignees();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Filter className="w-4 h-4" />
            {selectedTeamMember || "Filter Team Member"}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onTeamMemberSelect(null)}>
            All Team Members
          </DropdownMenuItem>
          
          <Separator className="my-1" />
          
          {uniqueAssignees.map((assignee) => (
            <DropdownMenuItem
              key={assignee}
              onClick={() => onTeamMemberSelect(assignee)}
            >
              {assignee}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const AddEventDialog = () => {
    const [formState, setFormState] = useState<{
      title: string;
      type: CalendarEventType;
      priority: CalendarEventPriority;
      date: string;
      time: string;
      duration: string;
      location: string;
      description: string;
      assignedTo: string[];
      tags: string[];
    }>({
      title: '',
      type: 'task',
      priority: 'medium',
      date: '',
      time: '',
      duration: '',
      location: '',
      description: '',
      assignedTo: [],
      tags: []
    });

    const [isAssigneeSearchOpen, setIsAssigneeSearchOpen] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Create a new event with a unique ID
      const event: CalendarEvent = {
        id: String(Date.now()),
        title: formState.title,
        type: formState.type,
        date: formState.date || new Date().toISOString().split('T')[0],
        status: 'upcoming' as CalendarEventStatus,
        priority: formState.priority,
        time: formState.time,
        assignedTo: formState.assignedTo,
        description: formState.description,
        location: formState.location,
        duration: formState.duration,
        tags: formState.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add the event to the calendar events
      if (calendarEvents[effectiveProjectId]) {
        calendarEvents[effectiveProjectId].push(event);
      } else {
        calendarEvents[effectiveProjectId] = [event];
      }

      // Reset form and close dialog
      setFormState({
        title: '',
        type: 'task',
        priority: 'medium',
        date: '',
        time: '',
        duration: '',
        location: '',
        description: '',
        assignedTo: [],
        tags: []
      });
      setIsAddEventOpen(false);
    };

    const removeAssignee = (assigneeToRemove: string) => {
      setFormState(prev => ({
        ...prev,
        assignedTo: prev.assignedTo.filter(assignee => assignee !== assigneeToRemove)
      }));
    };

    // Define AssigneeSearchDialog within AddEventDialog to access its state
    const AssigneeSearchDialog = () => (
      <CommandDialog 
        open={isAssigneeSearchOpen} 
        onOpenChange={setIsAssigneeSearchOpen}
      >
        <Command>
          <CommandInput placeholder="Search team members..." />
          <CommandList>
            <CommandEmpty>No team members found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              <CommandItem
                value="all-stakeholders"
                onSelect={() => {
                  setFormState(prev => ({
                    ...prev,
                    assignedTo: [...prev.assignedTo, 'All Stakeholders']
                  }));
                  setIsAssigneeSearchOpen(false);
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>All Stakeholders</span>
              </CommandItem>
              {uniqueAssignees
                .filter(assignee => !formState.assignedTo.includes(assignee))
                .map(assignee => (
                  <CommandItem
                    key={assignee}
                    value={assignee}
                    onSelect={() => {
                      setFormState(prev => ({
                        ...prev,
                        assignedTo: [...prev.assignedTo, assignee]
                      }));
                      setIsAssigneeSearchOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{assignee}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    );

    return (
      <>
        <Dialog.Root open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content 
              className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[#A7CEBC] bg-white p-4 shadow-lg focus:outline-none"
              aria-describedby="add-event-description"
            >
              <Dialog.Title className="text-xl font-medium text-[#3A366E] mb-4">
                Add New Event
              </Dialog.Title>
              <div id="add-event-description" className="sr-only">
                Create a new calendar event by filling out the form below
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    type="text"
                    value={formState.title}
                    onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formState.type}
                      onValueChange={(value) => setFormState(prev => ({ ...prev, type: value as CalendarEventType }))}
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="milestone">Milestone</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formState.priority}
                      onValueChange={(value) => setFormState(prev => ({ ...prev, priority: value as CalendarEventPriority }))}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formState.date}
                      onChange={(e) => setFormState(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formState.time}
                      onChange={(e) => setFormState(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g. 2 hours"
                    value={formState.duration}
                    onChange={(e) => setFormState(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={formState.location}
                    onChange={(e) => setFormState(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={formState.description}
                    onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formState.assignedTo.map((assignee) => (
                        <Badge 
                          key={assignee} 
                          className="bg-[#F7F5F2] text-[#4C5760] hover:bg-[#E5E3E0] flex items-center gap-1"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-[10px]">
                            {assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          {assignee}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-[#D15F36]" 
                            onClick={() => removeAssignee(assignee)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setIsAssigneeSearchOpen(true)}
                    >
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search assignees...
                      </span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags (comma-separated)"
                    value={formState.tags.join(', ')}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    }))}
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddEventOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#3A366E] hover:bg-opacity-90">
                    Create Event
                  </Button>
                </div>
              </form>
              <Dialog.Close className="absolute top-4 right-4 text-[#4C5760] hover:text-[#3A366E]">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <AssigneeSearchDialog />
      </>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">Project Calendar</h1>
          <p className="text-[#4C5760]">View and manage project schedule, deadlines, and milestones</p>
        </div>
        <Button 
          className="bg-[#3A366E] hover:bg-opacity-90"
          onClick={() => setIsAddEventOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Add Event
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card className="border-[#A7CEBC]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPrevious}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" className="border-[#A7CEBC]" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNext}>
                <ChevronRight size={16} />
              </Button>
              <h2 className="text-xl font-medium text-[#3A366E] ml-2">
                {getDateRangeText()}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Tabs 
                defaultValue="month" 
                value={viewType} 
                onValueChange={setViewType}
                className="w-full sm:w-auto"
              >
                <TabsList className="bg-[#F7F5F2]">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#A7CEBC] min-w-[120px] justify-between">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <span className="truncate">{getFilterDisplayText()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ type: 'all' })}
                    className={filterState.type === 'all' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    All Events
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: 'deadline' })}
                    className={filterState.type === 'deadline' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <AlertTriangle size={16} className="mr-2 text-red-500" />
                    Deadlines
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: 'milestone' })}
                    className={filterState.type === 'milestone' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <CheckCircle size={16} className="mr-2 text-[#D15F36]" />
                    Milestones
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: 'meeting' })}
                    className={filterState.type === 'meeting' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    Meetings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: 'task' })}
                    className={filterState.type === 'task' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <FileText size={16} className="mr-2 text-[#A7CEBC]" />
                    Tasks
                  </DropdownMenuItem>

                  <Separator className="my-2" />
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, assignee: 'me' })}
                    className={filterState.assignee === 'me' ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <User size={16} className="mr-2" />
                    My Items
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setIsUserSearchOpen(true)}
                  >
                    <Search size={16} className="mr-2" />
                    Search Team Member...
                  </DropdownMenuItem>

                  <Separator className="my-2" />
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ type: 'all', assignee: undefined, organization: undefined })}
                    className="text-[#D15F36]"
                  >
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="border-[#A7CEBC]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {viewType === 'month' && renderMonthCalendar()}
            {viewType === 'week' && renderWeekCalendar()}
            {viewType === 'list' && renderListView()}
          </div>
        </CardContent>
      </Card>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-[#4C5760]">Deadline</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#D15F36]"></div>
          <span className="text-sm text-[#4C5760]">Milestone</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-[#4C5760]">Meeting</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#A7CEBC]"></div>
          <span className="text-sm text-[#4C5760]">Task</span>
        </div>
      </div>

      {/* User Search Command Dialog */}
      <CommandDialog 
        open={isUserSearchOpen} 
        onOpenChange={setIsUserSearchOpen}
      >
        <Command>
          <CommandInput placeholder="Search team members..." />
          <CommandList>
            <CommandEmpty>No team members found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              <CommandItem
                value="all"
                onSelect={() => {
                  console.log('Selected All Team Members');
                  setFilterState({ ...filterState, assignee: undefined });
                  setIsUserSearchOpen(false);
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>All Team Members</span>
              </CommandItem>
              <CommandItem
                value="all-stakeholders"
                onSelect={() => {
                  console.log('Selected All Stakeholders');
                  setFilterState({ ...filterState, assignee: 'stakeholders' });
                  setIsUserSearchOpen(false);
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>All Stakeholders</span>
              </CommandItem>
              {uniqueAssignees.map(assignee => (
                <CommandItem
                  key={assignee}
                  value={assignee}
                  onSelect={() => {
                    console.log('Selected assignee:', assignee);
                    setFilterState({ ...filterState, assignee });
                    setIsUserSearchOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{assignee}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      <AddEventDialog />

      {selectedEvent && <EventDetailsDialog event={selectedEvent} />}
    </div>
  );
};

export default ProjectCalendarView; 