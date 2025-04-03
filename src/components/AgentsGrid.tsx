import React, { useState } from 'react';
import { AgentCard } from './AgentCard';
import { AgentChat } from './AgentChat';
import { Agent } from '../types';

interface AgentsGridProps {
  agents: Agent[];
}

export const AgentsGrid: React.FC<AgentsGridProps> = ({ agents }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#3A366E] mb-2">AI Project Team</h1>
        <p className="text-[#4C5760]">Specialized AI agents to assist with your construction project</p>
      </div>

      {selectedAgent ? (
        <div>
          <button
            onClick={() => setSelectedAgent(null)}
            className="mb-4 text-[#4C5760] hover:text-[#3A366E] flex items-center gap-2"
          >
            ← Back to All Agents
          </button>
          <AgentChat agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
        </div>
      ) : (
        <>
          <div className="relative">
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full px-4 py-2 border border-[#A7CEBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D15F36] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}; 