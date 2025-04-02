import React, { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

// Dropdown Menu Root
interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="relative">{children}</div>;
}

// Dropdown Menu Trigger
interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// Dropdown Menu Content
interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
  align?: 'start' | 'end' | 'center';
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = 'center', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

// Dropdown Menu Item
interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          inset && 'pl-8',
          className
        )}
        {...props}
      />
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

export { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
}; 