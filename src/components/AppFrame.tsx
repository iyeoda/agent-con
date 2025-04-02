import React, { useState } from "react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Avatar from "../components/ui/avatar";
import { ChevronDown, HelpCircle, Settings, Folder, LayoutDashboard, Bot, ChevronDownIcon, Sparkles } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import SearchModal from "../components/SearchModal";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import Checkbox from "../components/ui/checkbox";
import Textarea from "../components/ui/textarea";
import ProjectSelector from "../components/ProjectSelector";

const searchFilters = [
  { label: "Projects", value: "projects" },
  { label: "Documents", value: "documents" },
  { label: "Schedules", value: "schedules" },
  { label: "AI Agents", value: "agents" },
  { label: "Tasks / Issues", value: "issues" },
  { label: "Data Tables", value: "data" },
];

export default function AppFrame() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({ id: "woodside", name: "Woodside" });
  
  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen bg-[#F7F5F2]">
        {/* Sidebar */}
        <div className="w-16 hover:w-40 bg-white border-r border-[#A7CEBC] flex flex-col items-start py-4 space-y-6 group relative transition-all duration-300 overflow-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <LayoutDashboard className="min-w-[24px] text-[#3A366E] w-6 h-6 hover:text-[#D15F36]" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
              </div>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Folder className="min-w-[24px] text-[#3A366E] w-6 h-6 hover:text-[#D15F36]" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Data</span>
              </div>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Bot className="min-w-[24px] text-[#D15F36] w-6 h-6 hover:scale-105 transition-transform" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Agents</span>
              </div>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Settings className="min-w-[24px] text-[#4C5760] w-6 h-6 hover:text-[#D15F36]" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
              </div>
            </TooltipTrigger>
          </Tooltip>
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
                  onProjectChange={(project) => setCurrentProject(project)} 
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <div className="relative w-[300px]">
                    <Input
                      placeholder="Search..."
                      className="border border-[#4C5760] text-[#4C5760] w-full pr-10"
                      readOnly
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#D15F36]" />
                    </div>
                  </div>
                </DialogTrigger>
                <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
              </Dialog>
              <HelpCircle className="text-[#4C5760] w-5 h-5 hover:text-[#D15F36] cursor-pointer" />
              <Avatar className="h-8 w-8 bg-[#3A366E] text-white text-sm font-bold">U</Avatar>
            </div>
          </div>

          {/* Main Content Area (Empty) */}
          <div className="flex-1 bg-gradient-to-b from-[#F7F5F2] to-[#F7F5F2]/80"></div>
        </div>
      </div>
    </TooltipProvider>
  );
}
