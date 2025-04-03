import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
import Button from '../ui/button';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string[];
    assignee: string[];
    status: string[];
    priority: string[];
  };
  onFilterChange: (filters: {
    category: string[];
    assignee: string[];
    status: string[];
    priority: string[];
  }) => void;
}

const categories = ['task', 'event', 'query', 'insight', 'issue'];
const statuses = ['open', 'in_progress', 'completed', 'overdue'];
const priorities = ['high', 'medium', 'low'];

const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const [tempFilters, setTempFilters] = React.useState(filters);

  const handleFilterToggle = (type: keyof typeof filters, value: string) => {
    setTempFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [type]: updated
      };
    });
  };

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      category: [],
      assignee: [],
      status: [],
      priority: []
    };
    setTempFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg border border-[#A7CEBC] p-6 w-[500px]">
        <div className="relative mb-6">
          <DialogTitle className="text-2xl font-bold text-[#3A366E]">
            Filter Items
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-[#4C5760] hover:text-[#D15F36]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-[#3A366E] mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterToggle('category', category)}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded
                    ${tempFilters.category.includes(category)
                      ? 'bg-[#3A366E] text-white'
                      : 'border border-[#A7CEBC] text-[#4C5760] hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="capitalize">{category}</span>
                  {tempFilters.category.includes(category) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-medium text-[#3A366E] mb-2">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => handleFilterToggle('status', status)}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded
                    ${tempFilters.status.includes(status)
                      ? 'bg-[#3A366E] text-white'
                      : 'border border-[#A7CEBC] text-[#4C5760] hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="capitalize">{status.replace('_', ' ')}</span>
                  {tempFilters.status.includes(status) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <h3 className="font-medium text-[#3A366E] mb-2">Priority</h3>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map(priority => (
                <button
                  key={priority}
                  onClick={() => handleFilterToggle('priority', priority)}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded
                    ${tempFilters.priority.includes(priority)
                      ? 'bg-[#3A366E] text-white'
                      : 'border border-[#A7CEBC] text-[#4C5760] hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="capitalize">{priority}</span>
                  {tempFilters.priority.includes(priority) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleClear}
            className="border-[#A7CEBC] text-[#4C5760]"
          >
            Clear All
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-[#A7CEBC] text-[#4C5760]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="bg-[#D15F36] text-white hover:bg-opacity-90"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog; 