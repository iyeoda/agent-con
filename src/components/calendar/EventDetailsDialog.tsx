import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X, Calendar, MapPin } from 'lucide-react';
import Badge from '../ui/badge';
import { CalendarEvent } from '../../types';

interface EventDetailsDialogProps {
  event: CalendarEvent;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  isOpen,
  onOpenChange
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[#A7CEBC] bg-white p-4 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-medium text-[#3A366E] mb-4">
            {event.title}
          </Dialog.Title>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge 
                className={`
                  ${event.type === 'deadline' 
                    ? 'bg-red-100 text-red-800' 
                    : event.type === 'milestone'
                      ? 'bg-[#D15F36] bg-opacity-20 text-[#D15F36]'
                      : event.type === 'meeting'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                  }
                `}
              >
                {event.type}
              </Badge>
              <Badge 
                className={`
                  ${event.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'}
                `}
              >
                {event.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-[#4C5760]">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(event.date).toLocaleDateString()}
                {event.time && ` at ${event.time}`}
                {event.duration && ` (${event.duration})`}
              </div>
              {event.location && (
                <div className="flex items-center text-sm text-[#4C5760]">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
              )}
            </div>
            
            {event.description && (
              <div className="text-sm text-[#4C5760]">
                <h4 className="font-medium mb-1">Description</h4>
                <p>{event.description}</p>
              </div>
            )}
            
            {event.assignedTo.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Assigned to</h4>
                <div className="flex flex-wrap gap-2">
                  {event.assignedTo.map((person, idx) => (
                    <div key={idx} className="flex items-center bg-[#F7F5F2] rounded-full px-3 py-1">
                      <div className="w-6 h-6 rounded-full bg-[#3A366E] text-white flex items-center justify-center text-xs mr-2">
                        {person.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-[#4C5760]">{person}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {event.tags && event.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Dialog.Close className="absolute top-4 right-4 text-[#4C5760] hover:text-[#3A366E]">
            <X className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EventDetailsDialog; 