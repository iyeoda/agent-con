import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/button';
import Badge from '../ui/badge';

export type CalendarView = 'month' | 'week' | 'list';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onDateChange: (date: Date) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onDateChange,
}) => {
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const getHeaderText = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };

    if (view === 'month') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (view === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startMonth = weekStart.toLocaleDateString('en-US', { month: 'long' });
      const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'long' });
      const startYear = weekStart.getFullYear();
      const endYear = weekEnd.getFullYear();

      if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startYear}`;
      } else if (startYear === endYear) {
        return `${startMonth} - ${endMonth} ${startYear}`;
      } else {
        return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-4">
        <Button onClick={handleToday} variant="outline">
          Today
        </Button>
        <div className="flex items-center space-x-1">
          <Button
            onClick={handlePrevious}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold text-[#3A366E]">
          {getHeaderText()}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onViewChange('month')}
          variant={view === 'month' ? 'default' : 'outline'}
          size="sm"
        >
          Month
        </Button>
        <Button
          onClick={() => onViewChange('week')}
          variant={view === 'week' ? 'default' : 'outline'}
          size="sm"
        >
          Week
        </Button>
        <Button
          onClick={() => onViewChange('list')}
          variant={view === 'list' ? 'default' : 'outline'}
          size="sm"
        >
          List
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader; 