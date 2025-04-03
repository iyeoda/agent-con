import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { 
  UserCog, BarChart, FileSignature, Building2, 
  ShieldAlert, Database, FileStack, CheckCircle 
} from 'lucide-react';
import { AgentIconType } from '../types';

interface Task {
  id: string | number;
  name: string;
  description: string;
}

interface AgentCardProps {
  agent: {
    title: string;
    description: string;
    color: string;
    icon: AgentIconType;
    textColor?: string;
    tasks: Task[];
  };
  onClick: () => void;
}

export const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  // Map of icon names to Lucide icon components
  const iconMap: Record<AgentIconType, React.ComponentType<any>> = {
    [AgentIconType.UserCog]: UserCog,
    [AgentIconType.BarChart]: BarChart,
    [AgentIconType.FileSignature]: FileSignature,
    [AgentIconType.Building2]: Building2,
    [AgentIconType.ShieldAlert]: ShieldAlert,
    [AgentIconType.Database]: Database,
    [AgentIconType.FileStack]: FileStack,
    [AgentIconType.CheckCircle]: CheckCircle,
    [AgentIconType.Shield]: ShieldAlert,
    [AgentIconType.Leaf]: FileStack
  };

  // Get the icon component based on the agent's icon name
  const IconComponent = iconMap[agent.icon] || UserCog;
  
  // Determine text color - default to white unless specified
  const textColor = agent.textColor || 'white';

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          {/* Icon Header */}
          <div 
            className="p-6 flex items-center justify-center" 
            style={{ backgroundColor: agent.color }}
          >
            <IconComponent size={40} className="mr-2" style={{ color: textColor }} />
            <h3 className="font-bold text-xl" style={{ color: textColor }}>
              {agent.title}
            </h3>
          </div>
          
          {/* Description and Tasks */}
          <div className="p-4 border-t">
            <p className="text-[#4C5760] mb-4">{agent.description}</p>
            
            <h4 className="font-medium text-[#3A366E] mb-2">Specialized in:</h4>
            <ul className="text-sm space-y-1">
              {agent.tasks.slice(0, 3).map((task: Task) => (
                <li key={task.id} className="text-[#4C5760] flex items-start">
                  <span className="text-[#D15F36] mr-2">•</span>
                  <span>{task.name}</span>
                </li>
              ))}
              {agent.tasks.length > 3 && (
                <li className="text-[#3A366E] text-sm font-medium">+ {agent.tasks.length - 3} more tasks</li>
              )}
            </ul>
          </div>
          
          {/* Start Chat Button */}
          <div className="mt-auto p-4 pt-0">
            <button 
              className="w-full py-2 rounded-md bg-[#3A366E] text-white hover:bg-opacity-90 transition-colors"
            >
              Start Conversation
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};