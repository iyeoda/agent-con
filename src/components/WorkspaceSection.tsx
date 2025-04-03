import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Filter, List, LayoutGrid, GanttChart, Plus, Search } from 'lucide-react';
import Input from './ui/input';
import Button from './ui/button';
import Badge from './ui/badge';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import FilterDialog from './workspace/FilterDialog';
import AddItemDialog from './workspace/AddItemDialog';
import BoardView from './workspace/BoardView';
import TimelineView from './workspace/TimelineView';
import { mockWorkspaceItems } from '../mock-data/workspace-data';
import { WorkspaceItem } from '../types';

interface WorkspaceSectionProps {
  projectId: string;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({ projectId }) => {
  // Debug logging for mock data
  console.log('Component mounted');
  console.log('Mock data import:', mockWorkspaceItems);
  console.log('Project ID:', projectId);

  const [viewType, setViewType] = useState<'list' | 'board' | 'timeline'>('list');
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [filters, setFilters] = useState({
    category: [] as string[],
    assignee: [] as string[],
    status: [] as string[],
    priority: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load mock data with enhanced debugging
  useEffect(() => {
    console.log('Effect running with projectId:', projectId);
    console.log('Mock data available:', mockWorkspaceItems);
    console.log('Project data:', mockWorkspaceItems[projectId]);
    
    if (mockWorkspaceItems && mockWorkspaceItems[projectId]) {
      const projectItems = mockWorkspaceItems[projectId];
      console.log('Setting items:', projectItems);
      setItems(projectItems);
    } else {
      console.warn('No items found for project:', projectId);
    }
  }, [projectId]);

  // Debug current items state
  useEffect(() => {
    console.log('Items state updated:', items);
  }, [items]);

  // Filter items based on current filters and search query
  const filteredItems = items.filter(item => {
    console.log('Filtering item:', item);
    // Search query filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false;
    }

    // Priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(item.priority)) {
      return false;
    }

    // Assignee filter
    if (filters.assignee.length > 0 && !filters.assignee.includes(item.assignee || '')) {
      return false;
    }

    return true;
  });

  const handleAddItem = (newItem: Omit<WorkspaceItem, 'id' | 'createdAt' | 'createdBy'>) => {
    const item: WorkspaceItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // Replace with actual user info
    };
    setItems(prev => [...prev, item]);
  };

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">Workspace</h1>
          <p className="text-[#4C5760]">Manage and track all project items</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="w-[300px]">
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="border border-[#4C5760] text-[#4C5760]"
            />
          </div>
          
          {/* Add Item Button */}
          <Button 
            onClick={() => setIsAddItemOpen(true)}
            className="bg-[#D15F36] text-white hover:bg-opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* View Type Toggle */}
          <div className="bg-white rounded-md border border-[#A7CEBC] p-1 flex items-center">
            <button
              onClick={() => setViewType('list')}
              className={`p-2 rounded ${
                viewType === 'list' 
                  ? 'bg-[#3A366E] text-white' 
                  : 'text-[#4C5760] hover:bg-gray-50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewType('board')}
              className={`p-2 rounded ${
                viewType === 'board' 
                  ? 'bg-[#3A366E] text-white' 
                  : 'text-[#4C5760] hover:bg-gray-50'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewType('timeline')}
              className={`p-2 rounded ${
                viewType === 'timeline' 
                  ? 'bg-[#3A366E] text-white' 
                  : 'text-[#4C5760] hover:bg-gray-50'
              }`}
            >
              <GanttChart className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            className="border-[#A7CEBC] text-[#4C5760]"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          {/* Active Filters */}
          <div className="flex gap-2">
            {Object.entries(filters).map(([key, values]) => 
              values.map(value => (
                <Badge
                  key={`${key}-${value}`}
                  className="bg-[#3A366E] bg-opacity-10 text-[#3A366E]"
                >
                  {key}: {value}
                  <button
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        [key]: prev[key as keyof typeof filters].filter(v => v !== value)
                      }));
                    }}
                    className="ml-2 hover:text-[#D15F36]"
                  >
                    ×
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border border-[#A7CEBC] min-h-[500px]">
        {/* List View */}
        {viewType === 'list' && (
          <div className="divide-y divide-[#A7CEBC]">
            {/* Table Header */}
            <div className="grid grid-cols-12 p-4 text-[#3A366E] font-medium">
              <div className="col-span-4">Item</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Assignee</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-1">Status</div>
            </div>

            {/* Items */}
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
                  <div className="col-span-4">
                    <div className="font-medium text-[#3A366E]">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-[#4C5760]">{item.description}</div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Badge className="bg-[#A7CEBC] bg-opacity-20 text-[#3A366E]">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-[#4C5760]">
                    {item.assignee || '-'}
                  </div>
                  <div className="col-span-2 text-[#4C5760]">
                    {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}
                  </div>
                  <div className="col-span-1">
                    <Badge className={`
                      ${item.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                      ${item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${item.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    <Badge className={`
                      ${item.status === 'open' ? 'bg-blue-100 text-blue-800' : ''}
                      ${item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${item.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${item.status === 'overdue' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#4C5760]">
                No items found. Try adjusting your filters or create a new item.
              </div>
            )}
          </div>
        )}

        {/* Board View */}
        {viewType === 'board' && <BoardView items={filteredItems} />}

        {/* Timeline View */}
        {viewType === 'timeline' && <TimelineView items={filteredItems} />}
      </div>

      {/* Dialogs */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />

      <AddItemDialog
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAdd={handleAddItem}
        projectId={projectId}
      />
    </div>
  );
};

export default WorkspaceSection; 