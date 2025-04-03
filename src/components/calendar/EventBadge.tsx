import React from 'react';
import { Clock } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface EventBadgeProps {
  event: CalendarEvent;
  onClick?: () => void;
  showTime?: boolean;
  className?: string;
}

export const EventBadge: React.FC<EventBadgeProps> = ({
  event,
  onClick,
  showTime = false,
  className = ''
}) => {
  const getEventTypeStyles = () => {
    switch (event.type) {
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

  return (
    <div 
      onClick={onClick}
      className={`
        text-xs p-1 rounded truncate cursor-pointer transition-colors
        hover:opacity-90 active:opacity-80
        ${getEventTypeStyles()}
        ${className}
      `}
    >
      <div className="flex items-center gap-1">
        <span className="truncate">{event.title}</span>
        {showTime && event.time && (
          <div className="flex items-center whitespace-nowrap">
            <Clock className="h-3 w-3 mr-1" />
            {event.time}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventBadge; 