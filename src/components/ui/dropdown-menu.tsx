import React, { forwardRef, ReactNode } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../lib/utils';

// Dropdown Menu Root
interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

// Dropdown Menu Trigger
type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Trigger> & {
  asChild?: boolean;
};

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild = true, className, children, ...props }, ref) => {
    return (
      <RadixDropdownMenu.Trigger
        ref={ref}
        className={cn(
          'flex items-center rounded-md transition-colors hover:bg-gray-50 hover:border hover:border-gray-200',
          className
        )}
        {...props}
      >
        {children}
      </RadixDropdownMenu.Trigger>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// Dropdown Menu Content
type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>;

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = 'end', sideOffset = 5, ...props }, ref) => {
    return (
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[12rem] overflow-hidden rounded-lg border border-[#A7CEBC] bg-white p-1 text-[#4C5760] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        />
      </RadixDropdownMenu.Portal>
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

// Dropdown Menu Item
type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> & {
  inset?: boolean;
};

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <RadixDropdownMenu.Item
        ref={ref}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-all border border-transparent hover:bg-gray-50 hover:text-[#4C5760] hover:border-gray-200 focus:bg-gray-50 focus:text-[#4C5760] focus:border-gray-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 whitespace-normal break-words',
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