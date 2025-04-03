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

export const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Sample projects data
  const projects = {
    active: [
      { 
        id: 'PRJ-001', 
        name: 'Woodside Tower Project', 
        location: 'Downtown', 
        phase: 'Construction', 
        cde: 'Trimble Viewpoint',
        cdeColor: '#D15F36',
        members: 28,
        lastActivity: '2025-03-28T14:30:00Z' 
      },
      { 
        id: 'PRJ-002', 
        name: 'Harbor Heights Development', 
        location: 'Waterfront District', 
        phase: 'Planning', 
        cde: 'Autodesk Construction Cloud',
        cdeColor: '#3A366E',
        members: 15,
        lastActivity: '2025-03-27T10:15:00Z' 
      },
      { 
        id: 'PRJ-003', 
        name: 'Metro Station Expansion', 
        location: 'Central City', 
        phase: 'Design', 
        cde: 'Trimble Viewpoint',
        cdeColor: '#D15F36',
        members: 22,
        lastActivity: '2025-03-25T16:45:00Z' 
      }
    ],
    archived: [
      { 
        id: 'PRJ-004', 
        name: 'City Hall Renovation', 
        location: 'Downtown', 
        phase: 'Completed', 
        cde: 'Autodesk Construction Cloud',
        cdeColor: '#3A366E',
        members: 0,
        lastActivity: '2024-11-15T09:30:00Z',
        archived: '2024-12-01T00:00:00Z'
      },
      { 
        id: 'PRJ-005', 
        name: 'South Bridge Repairs', 
        location: 'River District', 
        phase: 'Completed', 
        cde: 'Procore',
        cdeColor: '#A7CEBC',
        members: 0,
        lastActivity: '2024-10-22T11:45:00Z',
        archived: '2024-11-01T00:00:00Z'
      }
    ]
  };

  // Available projects from connected CDEs
  const availableProjects = [
    { 
      id: 'CDE-PRJ-001', 
      name: 'Eastside Office Complex', 
      cde: 'Trimble Viewpoint',
      cdeColor: '#D15F36',
      location: 'Eastside'
    },
    { 
      id: 'CDE-PRJ-002', 
      name: 'University Medical Center', 
      cde: 'Autodesk Construction Cloud',
      cdeColor: '#3A366E',
      location: 'North Campus'
    },
    { 
      id: 'CDE-PRJ-003', 
      name: 'Riverside Apartments', 
      cde: 'Trimble Viewpoint',
      cdeColor: '#D15F36',
      location: 'Riverside District'
    }
  ];

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Project Management</h2>
        <p className="text-[#4C5760] mb-6">
          Add and manage your construction projects. Connect projects to your CDEs to enable AI assistance.
        </p>
      </div>

      {/* Project Tabs and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#F7F5F2]">
            <TabsTrigger value="active" className="data-[state=active]:bg-white">
              Active Projects
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-white">
              Archived Projects
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
            />
          </div>
          <Button 
            onClick={() => setShowAddProjectModal(true)}
            className="bg-[#3A366E] hover:bg-opacity-90"
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <TabsContent value="active" className="m-0">
          {projects.active.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Phase</div>
                <div className="col-span-2">CDE</div>
                <div className="col-span-1">Members</div>
                <div className="col-span-1">Last Activity</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {/* Project Rows */}
              <div className="divide-y">
                {projects.active.map(project => (
                  <div key={project.id} className="grid grid-cols-12 p-3 items-center text-sm hover:bg-gray-50">
                    <div className="col-span-3 font-medium text-[#3A366E]">{project.name}</div>
                    <div className="col-span-2">{project.location}</div>
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
                        <span>{project.cde}</span>
                      </div>
                    </div>
                    <div className="col-span-1">{project.members}</div>
                    <div className="col-span-1">
                      {new Date(project.lastActivity).toLocaleDateString()}
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
            <div className="text-center p-8 border rounded-md bg-gray-50">
              <Building size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-[#3A366E] mb-1">No active projects</h3>
              <p className="text-[#4C5760] mb-4">You don't have any active projects yet.</p>
              <Button onClick={() => setShowAddProjectModal(true)}>
                Add Your First Project
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="m-0">
          {projects.archived.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Phase</div>
                <div className="col-span-2">CDE</div>
                <div className="col-span-2">Archived Date</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {/* Archived Project Rows */}
              <div className="divide-y">
                {projects.archived.map(project => (
                  <div key={project.id} className="grid grid-cols-12 p-3 items-center text-sm hover:bg-gray-50">
                    <div className="col-span-3 font-medium text-[#3A366E]">{project.name}</div>
                    <div className="col-span-2">{project.location}</div>
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
                        <span>{project.cde}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      {new Date(project.archived).toLocaleDateString()}
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
            <div className="text-center p-8 border rounded-md bg-gray-50">
              <Building size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-[#3A366E] mb-1">No archived projects</h3>
              <p className="text-[#4C5760]">Any projects you archive will appear here.</p>
            </div>
          )}
        </TabsContent>
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
                  {availableProjects.map(project => (
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
              <Button variant="outline" onClick={() => setShowAddProjectModal(false)}>
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
          onClick={() => setShowAddProjectModal(true)}
          className="bg-[#3A366E] hover:bg-opacity-90"
        >
          <Plus size={16} className="mr-1" />
          Add Project
        </Button>
      </Dialog>
    </div>
  );
};