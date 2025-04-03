import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Badge from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Building, Search, Plus, MoreHorizontal, Database, Calendar, 
  Users, Filter, ArrowUpDown, CheckCircle, AlertCircle
} from 'lucide-react';
import Dialog from '../ui/dialog';
import DialogContent from '../ui/dialog';
import DialogHeader from '../ui/dialog';
import DialogTitle from '../ui/dialog';
import DialogDescription from '../ui/dialog';
import DialogTrigger from '../ui/dialog';
import { mockProjects, mockAvailableProjects } from '../../mock-data/projects';
import { Project } from '../../types';

export const ProjectSettings = () => {
  const [projectView, setProjectView] = useState<'active' | 'archived'>('active');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Filter projects based on status
  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const archivedProjects = mockProjects.filter(p => p.status === 'archived');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Project Management</h2>
        <p className="text-[#4C5760] mb-6">
          Add and manage your construction projects. Connect projects to your CDEs to enable AI assistance.
        </p>
      </div>

      {/* Project View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex rounded-md overflow-hidden border border-[#A7CEBC]">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              projectView === 'active'
                ? 'bg-white text-[#3A366E]'
                : 'bg-[#F7F5F2] text-[#4C5760] hover:bg-gray-50'
            }`}
            onClick={() => setProjectView('active')}
          >
            Active Projects
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-l border-[#A7CEBC] ${
              projectView === 'archived'
                ? 'bg-white text-[#3A366E]'
                : 'bg-[#F7F5F2] text-[#4C5760] hover:bg-gray-50'
            }`}
            onClick={() => setProjectView('archived')}
          >
            Archived Projects
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
            />
          </div>
          <Button 
            onClick={() => setIsAddProjectModalOpen(true)}
            className="bg-[#3A366E] hover:bg-opacity-90"
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projectView === 'active' && (
          activeProjects.length > 0 ? (
            <div className="border border-[#A7CEBC] rounded-lg overflow-hidden">
              <div className="divide-y divide-[#A7CEBC] rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-[#F7F5F2] p-4 text-[#3A366E] font-medium">
                  <div className="col-span-3">Project</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Phase</div>
                  <div className="col-span-2">CDE</div>
                  <div className="col-span-1">Members</div>
                  <div className="col-span-1">Last Activity</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {/* Project Rows */}
                {activeProjects.map(project => (
                  <div key={project.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center">
                          {project.logo ? (
                            <img 
                              src={project.logo} 
                              alt={`${project.name} logo`} 
                              className="h-4 w-auto" 
                            />
                          ) : (
                            <Building className="h-4 w-4 text-[#4C5760]" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#3A366E]">{project.name}</div>
                          <div className="text-xs text-[#4C5760]">{project.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-[#4C5760]">{project.location}</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#A7CEBC] bg-opacity-20 text-[#3A366E]">
                        {project.phase}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: project.cdeColor }}
                        />
                        <span className="text-[#4C5760]">{project.cde}</span>
                      </div>
                    </div>
                    <div className="col-span-1 text-[#4C5760]">{project.members}</div>
                    <div className="col-span-1 text-[#4C5760]">
                      {project.lastActivity && new Date(project.lastActivity).toLocaleDateString()}
                    </div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Manage Team</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-[#A7CEBC] rounded-md bg-gray-50">
              <Building size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-[#3A366E] mb-1">No active projects</h3>
              <p className="text-[#4C5760] mb-4">You don't have any active projects yet.</p>
              <Button onClick={() => setIsAddProjectModalOpen(true)}>
                Add Your First Project
              </Button>
            </div>
          )
        )}

        {projectView === 'archived' && (
          archivedProjects.length > 0 ? (
            <div className="border border-[#A7CEBC] rounded-lg overflow-hidden">
              <div className="divide-y divide-[#A7CEBC] rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-[#F7F5F2] p-4 text-[#3A366E] font-medium">
                  <div className="col-span-3">Project</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Phase</div>
                  <div className="col-span-2">CDE</div>
                  <div className="col-span-2">Archived Date</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {/* Archived Project Rows */}
                {archivedProjects.map(project => (
                  <div key={project.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center">
                          {project.logo ? (
                            <img 
                              src={project.logo} 
                              alt={`${project.name} logo`} 
                              className="h-4 w-auto" 
                            />
                          ) : (
                            <Building className="h-4 w-4 text-[#4C5760]" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#3A366E]">{project.name}</div>
                          <div className="text-xs text-[#4C5760]">{project.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-[#4C5760]">{project.location}</div>
                    <div className="col-span-2">
                      <Badge className="bg-gray-100 text-gray-600">
                        {project.phase}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: project.cdeColor }}
                        />
                        <span className="text-[#4C5760]">{project.cde}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-[#4C5760]">
                      {project.archived && new Date(project.archived).toLocaleDateString()}
                    </div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Restore Project</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Permanently</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-[#A7CEBC] rounded-md bg-gray-50">
              <Building size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-[#3A366E] mb-1">No archived projects</h3>
              <p className="text-[#4C5760]">Any projects you archive will appear here.</p>
            </div>
          )
        )}
      </div>

      {/* Add Project Modal */}
      <Dialog 
        title="Add New Project"
        content={
          <div className="space-y-4">
            <p className="text-[#4C5760] mb-4">
              Add a project from your connected CDEs or create a new one manually.
            </p>
            <Tabs defaultValue="import" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="import">Import from CDE</TabsTrigger>
                <TabsTrigger value="manual">Create Manually</TabsTrigger>
              </TabsList>
              
              <TabsContent value="import" className="space-y-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#3A366E] mb-2">Select a project from your connected CDEs:</h4>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {mockAvailableProjects.map(project => (
                    <div 
                      key={project.id}
                      className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: project.cdeColor }}
                        >
                          <Database size={12} className="text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-[#3A366E]">{project.name}</div>
                          <div className="text-xs text-[#4C5760]">
                            {project.location} • {project.cde}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="border border-[#A7CEBC]">
                        Import
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#3A366E]">Project Name</label>
                    <Input className="mt-1 border-[#A7CEBC]" placeholder="Enter project name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E]">Location</label>
                    <Input className="mt-1 border-[#A7CEBC]" placeholder="Enter project location" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E]">Project Phase</label>
                    <select className="w-full mt-1 p-2 border border-[#A7CEBC] rounded-md">
                      <option value="planning">Planning</option>
                      <option value="design">Design</option>
                      <option value="preconstruction">Preconstruction</option>
                      <option value="construction">Construction</option>
                      <option value="handover">Handover</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E]">Connect to CDE (Optional)</label>
                    <select className="w-full mt-1 p-2 border border-[#A7CEBC] rounded-md">
                      <option value="">None</option>
                      <option value="trimble">Trimble Viewpoint</option>
                      <option value="autodesk">Autodesk Construction Cloud</option>
                      <option value="procore">Procore</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddProjectModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#3A366E]">
                Add Project
              </Button>
            </div>
          </div>
        }
      >
        <Button 
          onClick={() => setIsAddProjectModalOpen(true)}
          className="bg-[#3A366E] hover:bg-opacity-90"
        >
          <Plus size={16} className="mr-1" />
          Add Project
        </Button>
      </Dialog>
    </div>
  );
};