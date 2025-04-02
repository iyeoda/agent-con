import React, { useState } from "react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Avatar from "../components/ui/avatar";
import { ChevronDown, HelpCircle, Settings, Folder, LayoutDashboard, Bot, ChevronDownIcon, Sparkles } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import Checkbox from "../components/ui/checkbox";
import Textarea from "../components/ui/textarea";

const searchFilters = [
  { label: "Projects", value: "projects" },
  { label: "Documents", value: "documents" },
  { label: "Schedules", value: "schedules" },
  { label: "AI Agents", value: "agents" },
  { label: "Tasks / Issues", value: "issues" },
  { label: "Data Tables", value: "data" },
];

export default function AppFrame() {
  const [query, setQuery] = useState("");
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
            <TooltipContent>Dashboard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Folder className="min-w-[24px] text-[#3A366E] w-6 h-6 hover:text-[#D15F36]" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Data</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Data</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Bot className="min-w-[24px] text-[#D15F36] w-6 h-6 hover:scale-105 transition-transform" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Agents</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Agents</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full px-4 cursor-pointer">
                <Settings className="min-w-[24px] text-[#4C5760] w-6 h-6 hover:text-[#D15F36]" />
                <span className="text-[#4C5760] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>

        {/* Main content wrapper */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="h-16 border-b border-[#A7CEBC] bg-[#F7F5F2] flex items-center px-6 justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <div className="text-[#3A366E] font-medium text-lg flex items-center">
                  Woodside <ChevronDown className="ml-1 w-4 h-4 text-[#4C5760]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative w-[300px]">
                    <Input
                      placeholder="Search..."
                      className="border border-[#4C5760] text-[#4C5760] pr-10"
                      readOnly
                    />
                    <Sparkles className="absolute right-2 top-2 w-5 h-5 text-[#D15F36] pointer-events-none" />
                  </div>
                </DialogTrigger>
                <DialogContent className="w-full max-w-2xl">
                  <DialogTitle className="sr-only">Semantic AI Search</DialogTitle>
                  <div className="space-y-4">
                    <Textarea
                      autoFocus
                      placeholder="Ask about documents, tasks, agents..."
                      value={query}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
                      className="resize-none min-h-[60px] max-h-[200px] border border-[#4C5760] text-[#4C5760]"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="text-[#4C5760] border-[#4C5760] px-2 py-1 h-auto">
                          Filter <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 bg-white shadow border border-[#A7CEBC]">
                        {searchFilters.map((filter) => (
                          <div key={filter.value} className="flex items-center space-x-2 py-1">
                            <Checkbox id={filter.value} />
                            <label htmlFor={filter.value} className="text-sm text-[#4C5760]">
                              {filter.label}
                            </label>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </DialogContent>
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
