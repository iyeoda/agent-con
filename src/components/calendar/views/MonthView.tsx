import React from 'react';
import { CalendarEvent } from '../../../types';
import EventBadge from '../EventBadge';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick
}) => {
  // Helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar grid
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
            <EventBadge
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
              showTime
            />
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

export default MonthView; 