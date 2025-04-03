import React from 'react';
import { CalendarEvent, CalendarEventType, CalendarEventPriority } from '../../types';
import CalendarHeader, { CalendarView } from './CalendarHeader';
import CalendarFilters from './CalendarFilters';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import ListView from './views/ListView';
import AddEventDialog from './AddEventDialog';
import EventDetailsDialog from './EventDetailsDialog';
import Button from '../ui/button';
import { Plus } from 'lucide-react';

interface ProjectCalendarViewProps {
  events: CalendarEvent[];
  onEventAdd: (event: CalendarEvent) => void;
  onEventUpdate: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  availableUsers: string[];
  projectId: string;
}

export const ProjectCalendarView: React.FC<ProjectCalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  availableUsers,
  projectId,
}) => {
  // State
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState<CalendarView>('month');
  const [selectedTypes, setSelectedTypes] = React.useState<CalendarEventType[]>([]);
  const [selectedPriorities, setSelectedPriorities] = React.useState<CalendarEventPriority[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null);

  // Filter events based on selected filters
  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(event.type);
      const matchesPriority = selectedPriorities.length === 0 || (event.priority && selectedPriorities.includes(event.priority));
      const matchesUser = selectedUsers.length === 0 || event.assignedTo.some(user => selectedUsers.includes(user));
      return matchesType && matchesPriority && matchesUser;
    });
  }, [events, selectedTypes, selectedPriorities, selectedUsers]);

  // Event handlers
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleEventAdd = (event: CalendarEvent) => {
    onEventAdd(event);
    setIsAddEventOpen(false);
  };

  const handleEventUpdate = (event: CalendarEvent) => {
    onEventUpdate(event);
    setSelectedEvent(null);
  };

  const handleEventDelete = (eventId: string) => {
    onEventDelete(eventId);
    setSelectedEvent(null);
  };

  // Render current view
  const renderView = () => {
    const viewProps = {
      currentDate,
      events: filteredEvents,
      onEventClick: handleEventClick,
    };

    switch (view) {
      case 'month':
        return <MonthView {...viewProps} />;
      case 'week':
        return <WeekView {...viewProps} />;
      case 'list':
        return <ListView {...viewProps} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F5F2]">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold text-[#3A366E]">Project Calendar</h1>
        <Button onClick={() => setIsAddEventOpen(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onDateChange={setCurrentDate}
      />

      <CalendarFilters
        selectedTypes={selectedTypes}
        selectedPriorities={selectedPriorities}
        selectedUsers={selectedUsers}
        onTypeChange={setSelectedTypes}
        onPriorityChange={setSelectedPriorities}
        onUserChange={setSelectedUsers}
        availableUsers={availableUsers}
      />

      <div className="flex-grow overflow-auto">
        {renderView()}
      </div>

      <AddEventDialog
        isOpen={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onEventAdded={handleEventAdd}
        uniqueAssignees={availableUsers}
        projectId={projectId}
      />

      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onOpenChange={(open) => !open && setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default ProjectCalendarView; 