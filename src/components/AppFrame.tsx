import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Input from "./ui/input";
import { HelpCircle, Settings, Folder, LayoutDashboard, Bot, Sparkles } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import SearchModal from "./SearchModal";
import ProjectSelector from "./ProjectSelector";
import ProjectDataSection from "./ProjectDataSection";
import AgentsSection from "./AgentsSection";
import SettingsSection from "./SettingsSection";
import { AvatarDropdown } from "./AvatarDropdown";
import { Project } from '../types';
import { projectData } from '../mock-data/project-data';
import DashboardSection from "./DashboardSection";

// Mock project data
const defaultProject: Project = {
  id: "woodside",
  name: "Woodside Tower Project",
  logo: "/viewpoint_logo.svg",
  agents: [], // Initialize with empty array
  location: "San Francisco, CA",
  phase: "Construction",
  cde: "Trimble Viewpoint",
  cdeColor: "#D15F36",
  members: 24,
  lastActivity: "2 hours ago",
  status: "active",
  description: "High-rise office building construction project",
  startDate: "2024-01-15",
  endDate: "2025-12-31",
  budget: 150000000,
  currency: "USD",
  tags: ["commercial", "high-rise", "office"],
  completionPercentage: 65
};

// Debug helper
const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[AppFrame]', ...args);
  }
};

export default function AppFrame() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(defaultProject);
  const [activeView, setActiveView] = useState('dashboard');

  // Debug initial render
  debug('Initial render with defaultProject:', defaultProject);

  useEffect(() => {
    debug('AppFrame mounted');
    debug('Current Project:', currentProject);
    debug('Project Data:', projectData);
    
    // Initialize project with data if available
    if (projectData["woodside"]) {
      debug('Found woodside project data, updating currentProject');
      setCurrentProject({
        ...defaultProject,
        agents: projectData["woodside"].agents
      });
    } else {
      debug('WARNING: No woodside project data found');
    }
  }, []);

  const handleProjectChange = (project: Project) => {
    debug('Project change requested:', project);
    const projectDataForId = projectData[project.id];
    debug('Project data for ID:', projectDataForId);
    
    if (projectDataForId) {
      debug('Updating project with data');
      setCurrentProject({
        ...project,
        agents: projectDataForId.agents
      });
    } else {
      debug('ERROR: No data found for project ID:', project.id);
      console.error('No data found for project ID:', project.id);
    }
  };

  // Debug render
  debug('Rendering AppFrame with:', {
    currentProject,
    activeView,
    isSearchOpen
  });

  return (
    <BrowserRouter>
      <TooltipProvider>
        <div className="flex h-screen bg-[#F7F5F2]">
          {/* Sidebar */}
          <div className="w-16 group hover:w-48 transition-all duration-300 bg-white border-r border-[#A7CEBC] flex flex-col items-center py-6">
            <div className="space-y-6 w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex items-center gap-2 w-full px-4 cursor-pointer ${activeView === 'dashboard' ? 'text-[#D15F36]' : ''}`}
                    onClick={() => setActiveView('dashboard')}
                  >
                    <LayoutDashboard className={`min-w-[24px] w-6 h-6 ${activeView === 'dashboard' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                    <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
                  </div>
                </TooltipTrigger>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex items-center gap-2 w-full px-4 cursor-pointer ${activeView === 'data' ? 'text-[#D15F36]' : ''}`}
                    onClick={() => setActiveView('data')}
                  >
                    <Folder className={`min-w-[24px] w-6 h-6 ${activeView === 'data' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                    <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Data</span>
                  </div>
                </TooltipTrigger>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex items-center gap-2 w-full px-4 cursor-pointer ${activeView === 'agents' ? 'text-[#D15F36]' : ''}`}
                    onClick={() => setActiveView('agents')}
                  >
                    <Bot className={`min-w-[24px] w-6 h-6 ${activeView === 'agents' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                    <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Agents</span>
                  </div>
                </TooltipTrigger>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex items-center gap-2 w-full px-4 cursor-pointer ${activeView === 'settings' ? 'text-[#D15F36]' : ''}`}
                    onClick={() => setActiveView('settings')}
                  >
                    <Settings className={`min-w-[24px] w-6 h-6 ${activeView === 'settings' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                    <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>

          {/* Main content wrapper */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="h-16 border-b border-[#A7CEBC] bg-[#F7F5F2] flex items-center px-6 justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Logo" className="h-11 w-11" />
                  <ProjectSelector 
                    initialProject={currentProject} 
                    onProjectChange={handleProjectChange} 
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-[300px] mr-4">
                  <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <DialogTrigger asChild>
                      <div className="relative w-full">
                        <Input
                          placeholder="Search..."
                          className="border border-[#4C5760] text-[#4C5760] w-full pr-10"
                          readOnly
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Sparkles className="h-4 w-4 text-[#D15F36]" />
                        </div>
                      </div>
                    </DialogTrigger>
                  </Dialog>
                </div>
                <AvatarDropdown />
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto">
              {(() => {
                debug('Rendering main content for view:', activeView);
                switch (activeView) {
                  case 'dashboard':
                    debug('Rendering DashboardSection with project:', currentProject);
                    return <DashboardSection selectedProject={currentProject} />;
                  case 'data':
                    debug('Rendering ProjectDataSection');
                    return <ProjectDataSection />;
                  case 'agents':
                    debug('Rendering AgentsSection with agents:', currentProject.agents);
                    return <AgentsSection agents={currentProject.agents} />;
                  case 'settings':
                    debug('Rendering SettingsSection');
                    return <SettingsSection />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  );
}
