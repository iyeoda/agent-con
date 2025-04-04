import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "@clerk/clerk-react";
import Input from "./ui/input";
import { Settings, Folder, LayoutDashboard, Bot, Sparkles, Calendar, Briefcase, Users, LogOut, Menu, X, History, FileText } from "lucide-react";
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
import DrawingDetail from "./DrawingDetail";
import ProjectCalendarView from "./ProjectCalendarView";
import WorkspaceSection from "./WorkspaceSection";
import WorkspaceItemDetail from "./workspace/WorkspaceItemDetail";
import ActivityLogPage from "./ActivityLogPage";
import Reports from "./reports/Reports";

// Mock project data
const defaultProject: Project = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Woodside Tower Project",
  logo: "/viewpoint_logo.svg",
  agents: [],
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

// Create a new component for the main app content
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { currentUser } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(defaultProject);

  // Extract the current view from the URL path
  const currentView = location.pathname.split('/')[2] || 'dashboard';

  useEffect(() => {
    if (!projectId) return;
    
    const projectDataForId = projectData[projectId];
    debug('Project data for ID:', projectDataForId);
    
    if (projectDataForId) {
      // Create a minimal valid Project object
      setCurrentProject({
        id: projectId,
        name: 'Default Project', // This should come from somewhere else
        logo: '/default-logo.png', // This should come from somewhere else
        agents: projectDataForId.agents
      });
    } else {
      debug('WARNING: No project data found for ID:', projectId);
      // Redirect to default project if invalid project ID
      navigate(`/project/550e8400-e29b-41d4-a716-446655440000/dashboard`);
    }
  }, [projectId, navigate, projectData]);

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
      // Navigate to the new project's dashboard using the project UUID
      navigate(`/project/${project.id}/dashboard`);
    } else {
      debug('ERROR: No data found for project ID:', project.id);
      console.error('No data found for project ID:', project.id);
    }
  };

  const handleViewChange = (view: string) => {
    navigate(`/project/${currentProject.id}/${view}`);
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-[#F7F5F2]">
        {/* Sidebar */}
        <div className="w-16 group hover:w-48 transition-all duration-300 bg-white border-r border-[#A7CEBC] flex flex-col items-center py-6">
          <div className="space-y-6 w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'dashboard' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('dashboard')}
                >
                  <LayoutDashboard className={`min-w-[24px] w-6 h-6 ${currentView === 'dashboard' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'workspace' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('workspace')}
                >
                  <Briefcase className={`min-w-[24px] w-6 h-6 ${currentView === 'workspace' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Workspace</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'data' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('data')}
                >
                  <Folder className={`min-w-[24px] w-6 h-6 ${currentView === 'data' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Data</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'agents' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('agents')}
                >
                  <Bot className={`min-w-[24px] w-6 h-6 ${currentView === 'agents' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Agents</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'calendar' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('calendar')}
                >
                  <Calendar className={`min-w-[24px] w-6 h-6 ${currentView === 'calendar' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Calendar</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'reports' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('reports')}
                >
                  <FileText className={`min-w-[24px] w-6 h-6 ${currentView === 'reports' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Reports</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'activity' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('activity')}
                >
                  <History className={`min-w-[24px] w-6 h-6 ${currentView === 'activity' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
                  <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Activity</span>
                </div>
              </TooltipTrigger>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center gap-2 w-full px-4 cursor-pointer ${currentView === 'settings' ? 'text-[#D15F36]' : ''}`}
                  onClick={() => handleViewChange('settings')}
                >
                  <Settings className={`min-w-[24px] w-6 h-6 ${currentView === 'settings' ? 'text-[#D15F36]' : 'text-[#3A366E] hover:text-[#D15F36]'}`} />
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
            <Routes>
              <Route path="/dashboard" element={<DashboardSection selectedProject={currentProject} />} />
              <Route path="/workspace" element={<WorkspaceSection projectId={currentProject.id} />} />
              <Route path="/workspace/item/:itemId" element={<WorkspaceItemDetail />} />
              <Route path="/data" element={<ProjectDataSection />} />
              <Route path="/data/drawings/:drawingId" element={<DrawingDetail />} />
              <Route path="/reports/*" element={<Reports projectId={currentProject.id} />} />
              <Route path="/agents" element={<AgentsSection agents={currentProject.agents} />} />
              <Route path="/calendar" element={<ProjectCalendarView projectId={currentProject.id} />} />
              <Route path="/activity" element={<ActivityLogPage projectId={currentProject.id} />} />
              <Route path="/settings/*" element={<SettingsSection />} />
            </Routes>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

const AppFrame = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Handle the loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, redirect them to the sign-in page
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // User is signed in, show the protected content
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/project/550e8400-e29b-41d4-a716-446655440000/dashboard" replace />} />
      <Route path="/project/:projectId/*" element={<AppContent />} />
    </Routes>
  );
};

export default AppFrame;
