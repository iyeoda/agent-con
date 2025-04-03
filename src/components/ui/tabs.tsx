import React, { HTMLAttributes, forwardRef, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

// Create a context for the tabs state
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

// Tabs root
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(value || defaultValue || '');
    
    React.useEffect(() => {
      if (value !== undefined && value !== activeTab) {
        setActiveTab(value);
      }
    }, [value, activeTab]);
    
    const handleValueChange = (newValue: string) => {
      setActiveTab(newValue);
      onValueChange?.(newValue);
    };
    
    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab: handleValueChange }}>
        <div
          ref={ref}
          className={cn('data-[state=active]:bg-muted', className)}
          data-state={activeTab ? 'active' : 'inactive'}
          data-value={activeTab}
          {...props}
        />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

// Tabs list
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

// Tabs trigger
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className
        )}
        data-state={activeTab === value ? 'active' : 'inactive'}
        onClick={() => setActiveTab(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

// Tabs content
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab } = useContext(TabsContext);
    
    if (activeTab !== value) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        data-state={activeTab === value ? 'active' : 'inactive'}
        {...props}
      />
    );
  }
);
TabsContent.displayName = 'TabsContent';