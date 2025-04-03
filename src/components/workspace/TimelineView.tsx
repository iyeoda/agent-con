import React, { useMemo } from 'react';
import { WorkspaceItem } from '../../types';
import Badge from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/button';

interface TimelineViewProps {
  items: WorkspaceItem[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ items }) => {
  const [startDate, setStartDate] = React.useState(() => {
    const today = new Date();
    today.setDate(1); // Start from the first day of the month
    return today;
  });

  // Calculate the number of days to display (2 months)
  const daysToShow = 60;

  // Generate dates for the timeline
  const dates = useMemo(() => {
    const result = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < daysToShow; i++) {
      result.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return result;
  }, [startDate]);

  // Filter and sort items with due dates
  const timelineItems = useMemo(() => {
    return items
      .filter(item => item.dueDate)
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  }, [items]);

  // Navigate timeline
  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(startDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setStartDate(newDate);
  };

  return (
    <div className="p-4">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-[#A7CEBC]"
            onClick={() => handleNavigate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-[#3A366E]">
            {startDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <Button
            variant="outline"
            className="border-[#A7CEBC]"
            onClick={() => handleNavigate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border border-[#A7CEBC] rounded-lg overflow-hidden">
        {/* Timeline Header */}
        <div className="grid grid-cols-[200px_1fr] border-b border-[#A7CEBC]">
          <div className="p-3 bg-[#3A366E] bg-opacity-5 font-medium text-[#3A366E]">
            Item
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[repeat(60,_40px)] bg-[#3A366E] bg-opacity-5">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`
                    p-2 text-center text-xs font-medium text-[#4C5760] border-l border-[#A7CEBC]
                    ${date.getDate() === 1 ? 'border-l-2' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="divide-y divide-[#A7CEBC]">
          {timelineItems.map(item => {
            const itemDate = new Date(item.dueDate!);
            const startIndex = Math.floor(
              (itemDate.getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div key={item.id} className="grid grid-cols-[200px_1fr]">
                {/* Item Details */}
                <div className="p-3 bg-white">
                  <div className="font-medium text-[#3A366E] mb-1">{item.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#A7CEBC] bg-opacity-20 text-[#3A366E]">
                      {item.category}
                    </Badge>
                    <Badge className={`
                      ${item.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                      ${item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${item.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {item.priority}
                    </Badge>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="relative">
                  <div className="grid grid-cols-[repeat(60,_40px)] h-full">
                    {dates.map((_, index) => (
                      <div
                        key={index}
                        className={`
                          border-l border-[#A7CEBC] h-full
                          ${index === 0 ? 'border-l-0' : ''}
                        `}
                      />
                    ))}
                  </div>
                  {startIndex >= 0 && startIndex < daysToShow && (
                    <div
                      className={`
                        absolute top-1/2 h-4 -mt-2 rounded
                        ${item.status === 'completed' ? 'bg-green-500' : 'bg-[#3A366E]'}
                        opacity-75
                      `}
                      style={{
                        left: `${startIndex * 40}px`,
                        width: '40px',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {timelineItems.length === 0 && (
            <div className="p-8 text-center text-[#4C5760]">
              No items with due dates found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineView; 