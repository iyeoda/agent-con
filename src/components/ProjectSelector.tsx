import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Project } from "../types";
import { mockProjects } from "../mock-data/projects";

interface ProjectSelectorProps {
  initialProject?: Project;
  onProjectChange?: (project: Project) => void;
}

export default function ProjectSelector({ 
  initialProject = mockProjects[0],
  onProjectChange
}: ProjectSelectorProps) {
  const [selectedProject, setSelectedProject] = useState<Project>(initialProject);
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter only active projects for the selector
  const availableProjects = mockProjects.filter(p => p.status === 'active');
  
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(false);
    if (onProjectChange) {
      onProjectChange(project);
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="text-[#3A366E] font-medium text-lg flex items-center cursor-pointer">
          <div className="flex items-center gap-2">
            {selectedProject.name} 
            {selectedProject.logo && (
              <img 
                src={selectedProject.logo} 
                alt={`${selectedProject.name} logo`} 
                className="h-4 w-auto ml-1" 
              />
            )}
            <ChevronDown className="ml-1 w-4 h-4 text-[#4C5760]" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 rounded-md shadow-md bg-white border border-[#A7CEBC]">
        <div className="flex flex-col">
          {availableProjects.map((project) => (
            <div 
              key={project.id}
              className={`py-2 px-3 rounded cursor-pointer hover:bg-[#F7F5F2] ${
                selectedProject.id === project.id ? "bg-[#F7F5F2] text-[#D15F36]" : "text-[#4C5760]"
              } flex justify-between items-center`}
              onClick={() => handleProjectSelect(project)}
            >
              <span className="text-left">{project.name}</span>
              {project.logo && (
                <img 
                  src={project.logo} 
                  alt={`${project.name} logo`} 
                  className="h-4 w-auto ml-auto" 
                />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 