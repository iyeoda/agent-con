import React, { useMemo } from 'react';
import { WorkspaceItem } from '../../types';
import Badge from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/button';

interface TimelineViewProps {
  items: WorkspaceItem[];
  onItemClick: (itemId: string) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ items, onItemClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // Group items by date
  const itemsByDate = useMemo(() => {
    const grouped = items.reduce((acc, item) => {
      const date = item.dueDate ? new Date(item.dueDate) : new Date(item.createdAt);
      const dateKey = date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {} as Record<string, WorkspaceItem[]>);

    return grouped;
  }, [items]);

  // Get all dates that have items
  const dates = useMemo(() => {
    return Object.keys(itemsByDate).sort();
  }, [itemsByDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Get days in current month
  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }, [currentDate]);

  // Get first day of month (0-6, where 0 is Sunday)
  const firstDayOfMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  }, [currentDate]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];
    const totalDays = firstDayOfMonth + daysInMonth;
    const weeks = Math.ceil(totalDays / 7);

    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const dayNumber = week * 7 + day - firstDayOfMonth + 1;
        if (dayNumber > 0 && dayNumber <= daysInMonth) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
          const dateKey = date.toISOString().split('T')[0];
          days.push({
            day: dayNumber,
            date: dateKey,
            items: itemsByDate[dateKey] || []
          });
        } else {
          days.push({ day: null, date: null, items: [] });
        }
      }
    }

    return days;
  }, [currentDate, firstDayOfMonth, daysInMonth, itemsByDate]);

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={handlePreviousMonth}
          className="border-[#A7CEBC] text-[#4C5760]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-medium text-[#3A366E]">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button
          variant="outline"
          onClick={handleNextMonth}
          className="border-[#A7CEBC] text-[#4C5760]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-[#4C5760] py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map(({ day, date, items }, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-2 border border-[#A7CEBC] rounded-lg ${
              day ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-[#3A366E] mb-2">
                  {day}
                </div>
                <div className="space-y-1">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="text-xs p-1 rounded bg-[#A7CEBC] bg-opacity-20 text-[#3A366E] cursor-pointer hover:bg-opacity-30"
                      onClick={() => onItemClick(item.id)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView; 