import React from 'react';
import { 
  UserCog, BarChart, FileSignature, Building2, ShieldAlert, 
  Database, FileStack, CheckCircle, User 
} from 'lucide-react';

type AgentIconType = 'UserCog' | 'BarChart' | 'FileSignature' | 'Building2' | 'ShieldAlert' | 'Database' | 'FileStack' | 'CheckCircle';

interface AgentChatMessageProps {
  message: {
    role: string;
    content: string;
    timestamp: string | number | Date;
    isTaskRequest?: boolean;
  };
  agentColor: string;
  agentIcon: AgentIconType;
}

export const AgentChatMessage = ({ message, agentColor, agentIcon }: AgentChatMessageProps) => {
  const iconMap = {
    'UserCog': UserCog,
    'BarChart': BarChart,
    'FileSignature': FileSignature,
    'Building2': Building2,
    'ShieldAlert': ShieldAlert,
    'Database': Database,
    'FileStack': FileStack,
    'CheckCircle': CheckCircle
  };

  const IconComponent = message.role === 'agent' 
    ? (iconMap[agentIcon] || UserCog)
    : User;

  const isAgent = message.role === 'agent';
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-3/4 ${isAgent ? 'order-1' : 'order-2'}`}>
        {/* Message Container */}
        <div className={`flex items-start gap-3 ${isAgent ? '' : 'flex-row-reverse'}`}>
          {/* Avatar */}
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isAgent 
                ? 'bg-opacity-100' 
                : 'bg-[#3A366E] bg-opacity-10'
            }`}
            style={{ backgroundColor: isAgent ? agentColor : undefined }}
          >
            <IconComponent size={16} className={isAgent ? 'text-white' : 'text-[#3A366E]'} />
          </div>
          
          {/* Message Bubble */}
          <div 
            className={`p-3 rounded-lg ${
              isAgent 
                ? 'bg-white border border-gray-200' 
                : message.isTaskRequest
                  ? 'bg-[#3A366E] bg-opacity-10 border border-[#3A366E] border-opacity-20'
                  : 'bg-[#3A366E] text-white'
            }`}
          >
            <div className={`text-sm ${isAgent ? 'text-[#4C5760]' : message.isTaskRequest ? 'text-[#3A366E]' : 'text-white'}`}>
              {message.content}
            </div>
            <div className={`text-xs mt-1 ${isAgent ? 'text-gray-400' : 'text-gray-300'}`}>
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};