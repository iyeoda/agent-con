import React from 'react';
import { AgentsGrid } from './AgentsGrid';
import { Agent } from '../types';

interface AgentsSectionProps {
  agents: Agent[];
}

const AgentsSection: React.FC<AgentsSectionProps> = ({ agents }) => {
  return (
    <div className="p-6">
      <AgentsGrid agents={agents} />
    </div>
  );
};

export default AgentsSection;