import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';

interface AgentTaskCardProps {
  task: {
    name: string;
    description: string;
  };
  agentColor: string;
  onClick: () => void;
}

export const AgentTaskCard = ({ task, agentColor, onClick }: AgentTaskCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-sm transition-shadow border-[#A7CEBC]"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-[#3A366E] mb-1">{task.name}</h4>
            <p className="text-sm text-[#4C5760]">{task.description}</p>
          </div>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: agentColor }}
          >
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};