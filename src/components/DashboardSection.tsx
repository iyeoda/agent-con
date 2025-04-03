import React, { useState, useEffect } from 'react';
import { Project, Agent, Drawing, Task } from '../types';
import AgentsSection from './AgentsSection';
import DrawingsSection from './DrawingsSection';
import { projectData } from '../mock-data/project-data';

interface DashboardSectionProps {
  selectedProject: Project;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ selectedProject }) => {
  const [projectAgents, setProjectAgents] = useState<Agent[]>([]);
  const [projectDrawings, setProjectDrawings] = useState<Drawing[]>([]);
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (selectedProject) {
      const data = projectData[selectedProject.id];
      if (data) {
        setProjectAgents(data.agents);
        setProjectDrawings(data.drawings);
        setProjectTasks(data.tasks);
      }
    }
  }, [selectedProject]);

  return (
    <div className="space-y-6">
      {selectedProject && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-[#A7CEBC]">
                <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Project Details</h2>
                <div className="space-y-2">
                  <p className="text-[#4C5760]"><span className="font-medium">Location:</span> {selectedProject.location}</p>
                  <p className="text-[#4C5760]"><span className="font-medium">Phase:</span> {selectedProject.phase}</p>
                  <p className="text-[#4C5760]"><span className="font-medium">Budget:</span> {selectedProject.budget?.toLocaleString()} {selectedProject.currency}</p>
                  {selectedProject.tags && (
                    <div className="flex gap-2 mt-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#A7CEBC] text-[#3A366E] rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <AgentsSection agents={projectAgents} />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-[#A7CEBC]">
                <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Timeline</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4C5760]">Start Date</span>
                    <span className="font-medium text-[#3A366E]">{selectedProject.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4C5760]">End Date</span>
                    <span className="font-medium text-[#3A366E]">{selectedProject.endDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#A7CEBC] h-2 rounded-full" 
                      style={{ width: `${selectedProject.completionPercentage || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-[#4C5760]">
                    <span>Progress</span>
                    <span>{selectedProject.completionPercentage || 0}%</span>
                  </div>
                </div>
              </div>

              <DrawingsSection drawings={projectDrawings} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSection; 