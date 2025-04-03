import React from 'react';
import { CalendarEvent } from '../../../types';
import EventBadge from '../EventBadge';
import Badge from '../../ui/badge';
import { Clock, Calendar } from 'lucide-react';

interface ListViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  currentDate,
  events,
  onEventClick
}) => {
  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date + (a.time || ''));
    const dateB = new Date(b.date + (b.time || ''));
    return dateA.getTime() - dateB.getTime();
  });

  // Group events by date
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => {
        const eventDate = new Date(date);
        const isToday = new Date().toDateString() === eventDate.toDateString();
        
        return (
          <div key={date} className="bg-white rounded-lg shadow-sm">
            <div className={`p-4 border-b ${isToday ? 'bg-[#3A366E] bg-opacity-5' : ''}`}>
              <div className="flex items-center">
                <Calendar size={16} className="text-[#3A366E] mr-2" />
                <span className="font-medium text-[#3A366E]">
                  {eventDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {isToday && (
                  <Badge className="ml-2 bg-[#3A366E] text-white">Today</Badge>
                )}
              </div>
            </div>
            <div className="divide-y">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="font-medium text-[#3A366E]">{event.title}</h3>
                        <Badge 
                          className={`ml-2 ${
                            event.type === 'deadline' 
                              ? 'bg-red-100 text-red-800' 
                              : event.type === 'milestone'
                                ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]'
                                : event.type === 'meeting'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                          }`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      {event.time && (
                        <div className="flex items-center mt-1 text-sm text-[#4C5760]">
                          <Clock size={14} className="mr-1" />
                          {event.time}
                          {event.duration && <span className="ml-1">({event.duration})</span>}
                        </div>
                      )}
                      {event.location && (
                        <div className="mt-1 text-sm text-[#4C5760]">
                          📍 {event.location}
                        </div>
                      )}
                      {event.description && (
                        <div className="mt-2 text-sm text-[#4C5760]">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {event.assignedTo.length > 0 && (
                    <div className="flex items-center mt-3">
                      <span className="text-xs text-[#4C5760] mr-2">Assigned to:</span>
                      <div className="flex -space-x-2">
                        {event.assignedTo.map((person, idx) => (
                          <div 
                            key={idx} 
                            className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs border-2 border-white"
                            title={person}
                          >
                            {person.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {event.tags.map((tag, idx) => (
                        <Badge 
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {Object.keys(groupedEvents).length === 0 && (
        <div className="text-center p-8 text-[#4C5760]">
          <p className="text-lg font-medium">No events found</p>
          <p className="text-sm mt-1">There are no events scheduled for this period.</p>
        </div>
      )}
    </div>
  );
};

export default ListView; 