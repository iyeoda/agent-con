// src/components/ui/popover.tsx
import React, { ReactNode } from 'react';
import { Popover as RadixPopover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
}

const Popover = ({ children, content }: PopoverProps) => (
  <RadixPopover>
    <PopoverTrigger asChild>{children}</PopoverTrigger>
    <PopoverContent className="w-48 bg-white shadow border border-[#A7CEBC] p-4 rounded-md">
      {content}
    </PopoverContent>
  </RadixPopover>
);

export default Popover;
