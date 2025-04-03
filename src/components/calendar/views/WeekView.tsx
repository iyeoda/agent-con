import React from 'react';
import { CalendarEvent } from '../../../types';
import EventBadge from '../EventBadge';
import Badge from '../../ui/badge';
import { Clock } from 'lucide-react';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick
}) => {
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
                onClick={() => onEventClick(event)}
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

export default WeekView; 