import React from 'react';
import { Card } from './ui/card';
import { 
  FileSpreadsheet, 
  FileText, 
  Bell, 
  Folders,
  Download,
  FileCheck,
  CalendarClock,
  Save
} from 'lucide-react';

interface SmartAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  metadata?: Record<string, any>;
}

interface SmartActionsProps {
  actions: SmartAction[];
  responseMetadata?: Record<string, any>;
}

export const SmartActions: React.FC<SmartActionsProps> = ({ actions, responseMetadata }) => {
  // Default actions that can be shown based on metadata
  const defaultActions: SmartAction[] = [
    {
      id: 'export-excel',
      label: 'Export to Excel',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      action: () => console.log('Export to Excel'),
    },
    {
      id: 'generate-pdf',
      label: 'Generate PDF Summary',
      icon: <FileText className="w-4 h-4" />,
      action: () => console.log('Generate PDF'),
    },
    {
      id: 'set-reminder',
      label: 'Create Follow-up Reminder',
      icon: <Bell className="w-4 h-4" />,
      action: () => console.log('Set Reminder'),
    },
    {
      id: 'save-project',
      label: 'Save to Project Directory',
      icon: <Folders className="w-4 h-4" />,
      action: () => console.log('Save to Project'),
    },
  ];

  // Filter and combine actions based on metadata
  const availableActions = [
    ...actions,
    ...defaultActions.filter(action => {
      // Show all actions if no metadata
      if (!responseMetadata) return true;
      
      // Filter based on metadata
      switch (action.id) {
        case 'export-excel':
          return responseMetadata.hasData;
        case 'generate-pdf':
          return responseMetadata.hasContent;
        case 'set-reminder':
          return responseMetadata.hasFollowUp;
        case 'save-project':
          return responseMetadata.hasProjectContext;
        default:
          return true;
      }
    })
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {availableActions.map((action) => (
        <button
          key={action.id}
          onClick={action.action}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#4C5760] bg-white border border-[#A7CEBC] rounded-md hover:bg-gray-50 hover:border-[#D15F36] transition-colors"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}; 