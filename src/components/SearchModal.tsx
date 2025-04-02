import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import Textarea from './ui/textarea';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import Checkbox from './ui/checkbox';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchFilters = [
  { label: "Projects", value: "projects" },
  { label: "Documents", value: "documents" },
  { label: "Schedules", value: "schedules" },
  { label: "AI Agents", value: "agents" },
  { label: "Tasks / Issues", value: "issues" },
  { label: "Data Tables", value: "data" },
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="w-[500px] fixed top-0 right-[96px] border border-[#A7CEBC] shadow-lg bg-white z-50 p-4 rounded-b-lg mt-0">
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            autoFocus
            placeholder="Ask about documents, tasks, agents..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
            className="resize-none min-h-[60px] max-h-[200px] border border-[#D15F36] text-[#4C5760] focus:outline-none focus:ring-1 focus:ring-[#D15F36] rounded-md pl-10 pr-10"
          />
          <Popover>
            <PopoverTrigger asChild>
              <div className="absolute left-3 top-3 cursor-pointer">
                <ChevronDown className="w-5 h-5 text-[#3A366E] hover:text-[#D15F36]" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white shadow border border-[#A7CEBC] p-2 rounded-md">
              {searchFilters.map((filter) => (
                <div key={filter.value} className="flex items-center space-x-2 py-1">
                  <Checkbox id={filter.value} />
                  <label htmlFor={filter.value} className="text-sm text-[#4C5760]">
                    {filter.label}
                  </label>
                </div>
              ))}
            </PopoverContent>
          </Popover>
          <div className="absolute right-3 top-3 pointer-events-none">
            <Sparkles className="w-4 h-4 text-[#D15F36]" />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex items-center text-[#D15F36]">
            {/* <Sparkles className="w-5 h-5 mr-1" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
