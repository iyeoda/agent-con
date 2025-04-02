// src/components/ui/tooltip.tsx
import React, { ReactNode } from 'react';
import { Tooltip as RadixTooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => (
  <RadixTooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent className="text-[#F7F5F2] bg-[#3A366E] rounded-md px-2 py-1 text-xs">{content}</TooltipContent>
  </RadixTooltip>
);

export default Tooltip;
