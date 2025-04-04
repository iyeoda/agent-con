import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import Button from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import * as Dialog from "@radix-ui/react-dialog";
import { 
  Calendar, ChevronLeft, ChevronRight, 
  Plus, Filter, CheckCircle, AlertTriangle, FileText,
  User, Users, Search, MapPin, X, CalendarIcon, Grid, List
} from 'lucide-react';
import Badge from './ui/badge';
import { Separator } from "./ui/separator";
import { WorkspaceItem } from '../types';
import { calendarEvents } from '../mock-data/calendar-data';
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { Label } from './ui/label';
import Input from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Textarea from './ui/textarea';

interface ProjectCalendarViewProps {
  projectId: string;
}

type ViewType = 'month' | 'week' | 'list';

interface FilterState {
  type: string[];
  priority: string[];
  assignee: string | 'all' | undefined;
}

const ProjectCalendarView: React.FC<ProjectCalendarViewProps> = ({ projectId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('month');
  const [events, setEvents] = useState<WorkspaceItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<WorkspaceItem | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isAssigneeSearchOpen, setIsAssigneeSearchOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    type: [],
    priority: [],
    assignee: 'all'
  });

  // Form state for adding new events
  const [formState, setFormState] = useState({
    title: '',
    type: 'task' as const,
    priority: 'medium' as const,
    date: '',
    time: '',
    duration: '',
    location: '',
    description: '',
    assignedTo: [] as string[],
    tags: [] as string[]
  });

  useEffect(() => {
    // Load events for the current project
    console.log('Calendar: Loading events for project:', projectId);
    console.log('Calendar: Available calendar events:', calendarEvents);
    const projectEvents = calendarEvents[projectId] || [];
    console.log('Calendar: Found project events:', projectEvents);
    setEvents(projectEvents);
  }, [projectId]);

  // Filter events based on current filter state
  const filteredEvents = events.filter(event => {
    console.log('Calendar: Filtering event:', event);
    // Filter by type
    if (filterState.type.length > 0 && event.type && !filterState.type.includes(event.type)) {
      return false;
    }

    // Filter by priority
    if (filterState.priority.length > 0 && !filterState.priority.includes(event.priority)) {
      return false;
    }

    // Filter by assignee
    if (filterState.assignee && filterState.assignee !== 'all') {
      if (filterState.assignee === 'me') {
        // Assuming current user is "John Smith" for demo
        if (!event.assignedTo || !event.assignedTo.includes('John Smith')) {
          return false;
        }
      } else {
        if (!event.assignedTo || !event.assignedTo.includes(filterState.assignee)) {
          return false;
        }
      }
    }

    return true;
  });

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle view type change with proper type conversion
  const handleViewTypeChange = (value: string) => {
    setViewType(value as ViewType);
  };

  // Calendar rendering functions
  const renderMonthView = () => {
    console.log('Calendar: Rendering month view with filtered events:', filteredEvents);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day names header
    days.push(
      <div key="header" className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map(day => (
          <div key={day} className="bg-white p-2 text-center text-sm font-medium text-[#4C5760]">
            {day}
          </div>
        ))}
      </div>
    );

    // Add empty cells for days before the first day of the month
    const emptyCells = [];
    for (let i = 0; i < startingDay; i++) {
      emptyCells.push(<div key={`empty-${i}`} className="bg-white h-32 p-2 border-t border-gray-200" />);
    }

    // Add cells for each day of the month
    const dayCells = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      console.log('Calendar: Checking events for date:', date);
      
      const dayEvents = filteredEvents.filter(event => {
        // Get the event date from either date or dueDate field
        const eventDate = event.date || event.dueDate;
        console.log('Calendar: Event:', event.title, 'Event date:', eventDate, 'Comparing with:', date);
        
        if (!eventDate) {
          console.log('Calendar: No date found for event:', event.title);
          return false;
        }

        // Compare the date strings directly
        const matches = eventDate === date;
        console.log('Calendar: Date match?', matches);
        return matches;
      });

      console.log('Calendar: Found events for date:', date, dayEvents);

      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      
      dayCells.push(
        <div 
          key={day} 
          className={`bg-white h-32 p-2 border-t border-gray-200 ${isToday ? 'bg-[#3A366E] bg-opacity-5' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${isToday ? 'font-bold text-[#3A366E]' : 'text-[#4C5760]'}`}>
              {day}
            </span>
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
                  text-xs p-1 rounded truncate cursor-pointer
                  ${event.type === 'deadline' ? 'bg-red-100 text-red-800' : ''}
                  ${event.type === 'milestone' ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]' : ''}
                  ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : ''}
                  ${event.type === 'task' ? 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]' : ''}
                  ${!event.type ? 'bg-gray-100 text-gray-800' : ''}
                `}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Combine empty cells and day cells
    const allCells = [...emptyCells, ...dayCells];
    
    // Group cells into weeks
    const weeks = [];
    for (let i = 0; i < allCells.length; i += 7) {
      weeks.push(
        <div key={`week-${i}`} className="grid grid-cols-7 gap-px bg-gray-200">
          {allCells.slice(i, i + 7)}
        </div>
      );
    }

    days.push(...weeks);
    return <div className="border border-gray-200 rounded-lg overflow-hidden">{days}</div>;
  };

  const renderWeekView = () => {
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day names header
    days.push(
      <div key="header" className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isToday = new Date().toDateString() === date.toDateString();
          
          return (
            <div key={day} className="bg-white p-2 text-center">
              <div className={`text-sm font-medium ${isToday ? 'text-[#3A366E]' : 'text-[#4C5760]'}`}>
                {day}
              </div>
              <div className={`text-xs ${isToday ? 'font-bold text-[#3A366E]' : 'text-[#4C5760]'}`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    );
    
    // Add day columns
    const dayColumns = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayEvents = filteredEvents.filter(event => {
        // Check both date and dueDate fields
        const eventDate = event.date || event.dueDate;
        if (!eventDate) return false;
        
        // Compare date strings directly
        return eventDate === dateString;
      });
      
      const isToday = new Date().toDateString() === date.toDateString();
      
      dayColumns.push(
        <div 
          key={`day-${i}`} 
          className={`bg-white p-2 min-h-[400px] ${isToday ? 'bg-[#3A366E] bg-opacity-5' : ''}`}
        >
          <div className="space-y-2">
            {dayEvents.map(event => (
              <div
                key={event.id} 
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEventDetailsOpen(true);
                }}
                className={`
                  p-3 hover:bg-gray-50 cursor-pointer transition-colors
                  ${event.type === 'deadline' ? 'border-l-4 border-red-500' : ''}
                  ${event.type === 'milestone' ? 'border-l-4 border-[#D15F36]' : ''}
                  ${event.type === 'meeting' ? 'border-l-4 border-blue-500' : ''}
                  ${event.type === 'task' ? 'border-l-4 border-[#A7CEBC]' : ''}
                  ${!event.type ? 'border-l-4 border-gray-300' : ''}
                `}
              >
                <div className="font-medium text-sm">{event.title}</div>
                {event.time && (
                  <div className="text-xs text-[#4C5760] mt-1">
                    {event.time} {event.duration && `(${event.duration})`}
                  </div>
                )}
                {event.assignedTo && event.assignedTo.length > 0 && (
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
            ))}
          </div>
        </div>
      );
    }
    
    days.push(
      <div key="days" className="grid grid-cols-7 gap-px bg-gray-200">
        {dayColumns}
      </div>
    );
    
    return <div className="border border-gray-200 rounded-lg overflow-hidden">{days}</div>;
  };

  const renderListView = () => {
    // Sort events by date
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
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
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-[#4C5760] mt-1">
                  Date: {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
                  {event.time && ` at ${event.time}`}
                </div>
                {event.assignedTo && event.assignedTo.length > 0 && (
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
              <div className="flex space-x-2">
                <Badge
                  variant={
                    event.type === 'deadline' ? 'destructive' :
                    event.type === 'milestone' ? 'default' :
                    event.type === 'meeting' ? 'outline' :
                    'secondary'
                  }
                >
                  {event.type || 'Task'}
                </Badge>
                <Badge
                  variant={
                    event.priority === 'high' ? 'destructive' :
                    event.priority === 'medium' ? 'default' :
                    'secondary'
                  }
                >
                  {event.priority}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Event details dialog
  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    return (
      <Dialog.Root open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[#A7CEBC] bg-white p-4 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-medium text-[#3A366E] mb-4">
              {selectedEvent.title}
            </Dialog.Title>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  className={`
                    ${selectedEvent.type === 'deadline' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedEvent.type === 'milestone' ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]' : ''}
                    ${selectedEvent.type === 'meeting' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedEvent.type === 'task' ? 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]' : ''}
                  `}
                >
                  {selectedEvent.type || 'Task'}
                </Badge>
                <Badge 
                  className={`
                    ${selectedEvent.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedEvent.priority === 'medium' ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]' : ''}
                  `}
                >
                  {selectedEvent.priority}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-[#4C5760]">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString() : 'No date'}
                  {selectedEvent.time && ` at ${selectedEvent.time}`}
                  {selectedEvent.duration && ` (${selectedEvent.duration})`}
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center text-sm text-[#4C5760]">
                    <MapPin className="mr-2 h-4 w-4" />
                    {selectedEvent.location}
                  </div>
                )}
              </div>
              
              {selectedEvent.description && (
                <div className="text-sm text-[#4C5760]">
                  <h4 className="font-medium mb-1">Description</h4>
                  <p>{selectedEvent.description}</p>
                </div>
              )}
              
              {selectedEvent.assignedTo && selectedEvent.assignedTo.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Assigned to</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.assignedTo.map((person, idx) => (
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
              
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.tags.map((tag, idx) => (
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

  // Add event dialog
  const renderAddEventDialog = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Create a new event
      const newEvent: WorkspaceItem = {
        id: Date.now().toString(),
        title: formState.title,
        description: formState.description,
        category: 'event',
        type: formState.type,
        status: 'open',
        priority: formState.priority,
        date: formState.date,
        dueDate: formState.date,
        time: formState.time,
        duration: formState.duration,
        location: formState.location,
        assignee: formState.assignedTo[0] || undefined,
        assignedTo: formState.assignedTo,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User',
        tags: formState.tags,
        projectId: projectId
      };
      
      // Add the event to the calendar events
      if (calendarEvents[projectId]) {
        calendarEvents[projectId].push(newEvent);
      } else {
        calendarEvents[projectId] = [newEvent];
      }
      
      // Update the events state
      setEvents([...events, newEvent]);
      
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

    // Get unique assignees from existing events
    const uniqueAssignees = Array.from(new Set(
      events.flatMap(event => event.assignedTo || [])
    )).filter(Boolean) as string[];

    return (
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
                    onValueChange={(value) => setFormState(prev => ({ ...prev, type: value as any }))}
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
                    onValueChange={(value) => setFormState(prev => ({ ...prev, priority: value as any }))}
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
                          onClick={() => {
                            setFormState(prev => ({
                              ...prev,
                              assignedTo: prev.assignedTo.filter(a => a !== assignee)
                            }));
                          }}
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
    );
  };

  // Assignee search dialog
  const renderAssigneeSearchDialog = () => {
    // Get unique assignees from existing events
    const uniqueAssignees = Array.from(new Set(
      events.flatMap(event => event.assignedTo || [])
    )).filter(Boolean) as string[];

    return (
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
                value="all"
                onSelect={() => {
                  console.log('Selected All Team Members');
                  setFilterState({ ...filterState, assignee: undefined });
                  setIsAssigneeSearchOpen(false);
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
                  setIsAssigneeSearchOpen(false);
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
  };

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">Project Calendar</h1>
          <p className="text-[#4C5760]">View and manage project schedule, deadlines, and milestones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewTypeChange('month')}
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            Month
          </Button>
          <Button
            variant={viewType === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewTypeChange('week')}
          >
            <Grid className="h-4 w-4 mr-1" />
            Week
          </Button>
          <Button
            variant={viewType === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewTypeChange('list')}
          >
            <List className="h-4 w-4 mr-1" />
            List
          </Button>
          <Button
            onClick={() => setIsAddEventOpen(true)}
            className="ml-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="border-[#A7CEBC]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousMonth}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" className="border-[#A7CEBC]" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
                <ChevronRight size={16} />
              </Button>
              <h2 className="text-xl font-medium text-[#3A366E] ml-2">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Tabs 
                defaultValue="month" 
                value={viewType} 
                onValueChange={handleViewTypeChange}
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
                      <span className="truncate">{`${filterState.type.length > 0 ? filterState.type.join(', ') : 'All Events'}`}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ type: [], priority: [], assignee: 'all' })}
                    className={filterState.type.length === 0 ? 'bg-[#3A366E] text-white' : ''}
                  >
                    All Events
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: ['deadline'] })}
                    className={filterState.type.includes('deadline') ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <AlertTriangle size={16} className="mr-2 text-red-500" />
                    Deadlines
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: ['milestone'] })}
                    className={filterState.type.includes('milestone') ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <CheckCircle size={16} className="mr-2 text-[#D15F36]" />
                    Milestones
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: ['meeting'] })}
                    className={filterState.type.includes('meeting') ? 'bg-[#3A366E] text-white' : ''}
                  >
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    Meetings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ ...filterState, type: ['task'] })}
                    className={filterState.type.includes('task') ? 'bg-[#3A366E] text-white' : ''}
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
                    onClick={() => setIsAssigneeSearchOpen(true)}
                  >
                    <Search size={16} className="mr-2" />
                    Search Team Member...
                  </DropdownMenuItem>

                  <Separator className="my-2" />
                  
                  <DropdownMenuItem 
                    onClick={() => setFilterState({ type: [], priority: [], assignee: 'all' })}
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
            {viewType === 'month' && renderMonthView()}
            {viewType === 'week' && renderWeekView()}
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

      {renderEventDetails()}
      {renderAddEventDialog()}
      {renderAssigneeSearchDialog()}
    </div>
  );
};

export default ProjectCalendarView; 