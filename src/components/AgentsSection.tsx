import React from 'react';
import { Card, CardContent } from './ui/card';
import { Agent } from '../types';

interface AgentsSectionProps {
  agents: Agent[];
}

const AgentsSection: React.FC<AgentsSectionProps> = ({ agents }) => {
  return (
    <Card className="border-[#A7CEBC]">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-[#3A366E] mb-4">AI Agents</h2>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#A7CEBC] hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: agent.color }}
                >
                  <span className="text-white text-lg">{agent.icon}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-[#3A366E]">{agent.title}</h3>
                <p className="text-sm text-[#4C5760]">{agent.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-[#4C5760]">{agent.tasks.length} tasks</span>
                  <span className="text-xs text-[#4C5760]">•</span>
                  <span className="text-xs text-[#4C5760]">{agent.status || 'active'}</span>
                </div>
              </div>
            </div>
          ))}
          {agents.length === 0 && (
            <p className="text-[#4C5760] text-center py-4">No agents available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentsSection;