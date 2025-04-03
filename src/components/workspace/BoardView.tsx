import React from 'react';
import { WorkspaceItem } from '../../types';
import Badge from '../ui/badge';

interface BoardViewProps {
  items: WorkspaceItem[];
}

const statusColumns = [
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'overdue', label: 'Overdue' }
] as const;

const BoardView: React.FC<BoardViewProps> = ({ items }) => {
  // Group items by status
  const itemsByStatus = statusColumns.reduce((acc, { id }) => {
    acc[id] = items.filter(item => item.status === id);
    return acc;
  }, {} as Record<typeof statusColumns[number]['id'], WorkspaceItem[]>);

  return (
    <div className="flex gap-4 p-4 h-[calc(100vh-300px)] overflow-x-auto">
      {statusColumns.map(({ id, label }) => (
        <div
          key={id}
          className="flex-shrink-0 w-80 bg-gray-50 rounded-lg border border-[#A7CEBC] overflow-hidden"
        >
          {/* Column Header */}
          <div className="p-3 bg-[#3A366E] bg-opacity-5 border-b border-[#A7CEBC]">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#3A366E]">{label}</span>
              <span className="text-sm text-[#4C5760]">
                {itemsByStatus[id].length} items
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-48px)]">
            {itemsByStatus[id].map(item => (
              <div
                key={item.id}
                className="bg-white p-3 rounded border border-[#A7CEBC] shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Item Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#3A366E] mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-[#4C5760] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Item Details */}
                <div className="space-y-2">
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

                  {/* Assignee and Due Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[#4C5760]">
                      {item.assignee || 'Unassigned'}
                    </div>
                    {item.dueDate && (
                      <div className="text-[#4C5760]">
                        {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-[#3A366E] bg-opacity-5 text-[#3A366E]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {itemsByStatus[id].length === 0 && (
              <div className="text-center py-4 text-[#4C5760] text-sm italic">
                No items
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView; 