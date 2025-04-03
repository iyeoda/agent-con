import React, { useState, FormEvent } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X, Search, User, Users } from 'lucide-react';
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { Label } from '../ui/label';
import Input from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Textarea from '../ui/textarea';
import Button from '../ui/button';
import Badge from '../ui/badge';
import { CalendarEvent, CalendarEventType, CalendarEventPriority, CalendarEventStatus } from '../../types';

interface AddEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventAdded: (event: CalendarEvent) => void;
  uniqueAssignees: string[];
  projectId: string;
}

export const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onOpenChange,
  onEventAdded,
  uniqueAssignees,
  projectId
}) => {
  const [formState, setFormState] = useState<{
    title: string;
    type: CalendarEventType;
    priority: CalendarEventPriority;
    date: string;
    time: string;
    duration: string;
    location: string;
    description: string;
    assignedTo: string[];
    tags: string[];
  }>({
    title: '',
    type: 'task',
    priority: 'medium',
    date: '',
    time: '',
    duration: '',
    location: '',
    description: '',
    assignedTo: [],
    tags: []
  });

  const [isAssigneeSearchOpen, setIsAssigneeSearchOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create a new event with a unique ID
    const event: CalendarEvent = {
      id: String(Date.now()),
      title: formState.title,
      type: formState.type,
      date: formState.date || new Date().toISOString().split('T')[0],
      status: 'upcoming' as CalendarEventStatus,
      priority: formState.priority,
      time: formState.time,
      assignedTo: formState.assignedTo,
      description: formState.description,
      location: formState.location,
      duration: formState.duration,
      tags: formState.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onEventAdded(event);

    // Reset form and close dialog
    setFormState({
      title: '',
      type: 'task',
      priority: 'medium',
      date: '',
      time: '',
      duration: '',
      location: '',
      description: '',
      assignedTo: [],
      tags: []
    });
    onOpenChange(false);
  };

  const removeAssignee = (assigneeToRemove: string) => {
    setFormState(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.filter(assignee => assignee !== assigneeToRemove)
    }));
  };

  // Define AssigneeSearchDialog within AddEventDialog to access its state
  const AssigneeSearchDialog = () => (
    <CommandDialog 
      open={isAssigneeSearchOpen} 
      onOpenChange={setIsAssigneeSearchOpen}
    >
      <Command>
        <CommandInput placeholder="Search team members..." />
        <CommandList>
          <CommandEmpty>No team members found.</CommandEmpty>
          <CommandGroup heading="Team Members">
            <CommandItem
              value="all-stakeholders"
              onSelect={() => {
                setFormState(prev => ({
                  ...prev,
                  assignedTo: [...prev.assignedTo, 'All Stakeholders']
                }));
                setIsAssigneeSearchOpen(false);
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>All Stakeholders</span>
            </CommandItem>
            {uniqueAssignees
              .filter(assignee => !formState.assignedTo.includes(assignee))
              .map(assignee => (
                <CommandItem
                  key={assignee}
                  value={assignee}
                  onSelect={() => {
                    setFormState(prev => ({
                      ...prev,
                      assignedTo: [...prev.assignedTo, assignee]
                    }));
                    setIsAssigneeSearchOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{assignee}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content 
            className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[#A7CEBC] bg-white p-4 shadow-lg focus:outline-none"
            aria-describedby="add-event-description"
          >
            <Dialog.Title className="text-xl font-medium text-[#3A366E] mb-4">
              Add New Event
            </Dialog.Title>
            <div id="add-event-description" className="sr-only">
              Create a new calendar event by filling out the form below
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formState.type}
                    onValueChange={(value) => setFormState(prev => ({ ...prev, type: value as CalendarEventType }))}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formState.priority}
                    onValueChange={(value) => setFormState(prev => ({ ...prev, priority: value as CalendarEventPriority }))}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formState.date}
                    onChange={(e) => setFormState(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formState.time}
                    onChange={(e) => setFormState(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 2 hours"
                  value={formState.duration}
                  onChange={(e) => setFormState(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={formState.location}
                  onChange={(e) => setFormState(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={formState.description}
                  onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formState.assignedTo.map((assignee) => (
                      <Badge 
                        key={assignee} 
                        className="bg-[#F7F5F2] text-[#4C5760] hover:bg-[#E5E3E0] flex items-center gap-1"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-[10px]">
                          {assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        {assignee}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-[#D15F36]" 
                          onClick={() => removeAssignee(assignee)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setIsAssigneeSearchOpen(true)}
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search assignees...
                    </span>
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags (comma-separated)"
                  value={formState.tags.join(', ')}
                  onChange={(e) => setFormState(prev => ({
                    ...prev,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  }))}
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#3A366E] hover:bg-opacity-90">
                  Create Event
                </Button>
              </div>
            </form>
            <Dialog.Close className="absolute top-4 right-4 text-[#4C5760] hover:text-[#3A366E]">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AssigneeSearchDialog />
    </>
  );
};

export default AddEventDialog; 