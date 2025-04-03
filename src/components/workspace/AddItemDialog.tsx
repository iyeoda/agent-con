import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Button from '../ui/button';
import Input from '../ui/input';
import { WorkspaceItem } from '../../types';

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<WorkspaceItem, 'id' | 'createdAt' | 'createdBy'>) => void;
  projectId: string;
}

const categories = ['task', 'event', 'query', 'insight', 'issue'] as const;
const priorities = ['high', 'medium', 'low'] as const;

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  projectId,
}) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: 'task' as typeof categories[number],
    priority: 'medium' as typeof priorities[number],
    assignee: '',
    dueDate: '',
    tags: [] as string[],
    relatedDocuments: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formState,
      status: 'open',
      projectId,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg border border-[#A7CEBC] p-6 w-[600px]">
        <div className="relative mb-6">
          <DialogTitle className="text-2xl font-bold text-[#3A366E]">
            Add New Item
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-[#4C5760] hover:text-[#D15F36]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-1">
              Title
            </label>
            <Input
              value={formState.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full"
              placeholder="Enter item title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-1">
              Description
            </label>
            <textarea
              value={formState.description}
              onChange={(e) =>
                setFormState(prev => ({ ...prev, description: e.target.value }))
              }
              className="w-full rounded-md border border-[#A7CEBC] p-2 text-[#4C5760]"
              placeholder="Enter item description"
              rows={3}
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3A366E] mb-1">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) =>
                  setFormState(prev => ({
                    ...prev,
                    category: e.target.value as typeof categories[number]
                  }))
                }
                className="w-full rounded-md border border-[#A7CEBC] p-2 text-[#4C5760]"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3A366E] mb-1">
                Priority
              </label>
              <select
                value={formState.priority}
                onChange={(e) =>
                  setFormState(prev => ({
                    ...prev,
                    priority: e.target.value as typeof priorities[number]
                  }))
                }
                className="w-full rounded-md border border-[#A7CEBC] p-2 text-[#4C5760]"
                required
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3A366E] mb-1">
                Assignee
              </label>
              <Input
                value={formState.assignee}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState(prev => ({ ...prev, assignee: e.target.value }))
                }
                className="w-full"
                placeholder="Enter assignee name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3A366E] mb-1">
                Due Date
              </label>
              <Input
                type="date"
                value={formState.dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState(prev => ({ ...prev, dueDate: e.target.value }))
                }
                className="w-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-1">
              Tags
            </label>
            <Input
              value={formState.tags.join(', ')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState(prev => ({
                  ...prev,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))
              }
              className="w-full"
              placeholder="Enter tags, separated by commas"
            />
          </div>

          {/* Related Documents */}
          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-1">
              Related Documents
            </label>
            <Input
              value={formState.relatedDocuments.join(', ')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState(prev => ({
                  ...prev,
                  relatedDocuments: e.target.value.split(',').map(doc => doc.trim()).filter(Boolean)
                }))
              }
              className="w-full"
              placeholder="Enter document references, separated by commas"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#A7CEBC] text-[#4C5760]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#D15F36] text-white hover:bg-opacity-90"
            >
              Create Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog; 