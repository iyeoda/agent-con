import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Badge from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Building, Plus, MoreHorizontal, Database } from 'lucide-react';
import Dialog from '../ui/dialog';
import { mockProjects, mockAvailableProjects } from '../../mock-data/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import ProjectTeamSettings from './ProjectTeamSettings';

interface ProjectSettingsProps {
  projectId?: string;
  onNavigate?: (tab: string, projectId?: string) => void;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ projectId, onNavigate }) => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projectsView, setProjectsView] = useState('active');
  const [isManagingTeam, setIsManagingTeam] = useState(false);

  // Filter projects based on status
  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const archivedProjects = mockProjects.filter(p => p.status === 'archived');

  if (isManagingTeam && projectId) {
    return (
      <ProjectTeamSettings 
        projectId={projectId}
        onBack={() => setIsManagingTeam(false)}
      />
    );
  }

  const ProjectList = () => (
    <div className="space-y-6">
      {/* Project Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Project Management</h2>
          <p className="text-[#4C5760]">
            Add and manage your construction projects
          </p>
        </div>
        <Button 
          onClick={() => setIsAddProjectModalOpen(true)}
          className="bg-[#D15F36] text-white hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Project View Selector */}
      <Tabs value={projectsView} onValueChange={setProjectsView} className="w-full">
        <TabsList className="bg-[#F7F5F2] p-1 mb-6">
          <TabsTrigger 
            value="active"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#3A366E]"
          >
            Active Projects
          </TabsTrigger>
          <TabsTrigger 
            value="archived"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#3A366E]"
          >
            Archived Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="m-0">
          {/* Projects Table */}
          <Card className="border-[#A7CEBC]">
            <div className="divide-y divide-[#A7CEBC]">
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
                        <Building className="h-4 w-4 text-[#4C5760]" />
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
                    {project.lastActivity ? new Date(project.lastActivity).toLocaleDateString() : '-'}
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onNavigate?.('projects', project.id)}>
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          onNavigate?.('projects', project.id);
                          setIsManagingTeam(true);
                        }}>
                          Manage Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Archive Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="m-0">
          <Card className="border-[#A7CEBC]">
            <div className="divide-y divide-[#A7CEBC]">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#F7F5F2] p-4 text-[#3A366E] font-medium">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Phase</div>
                <div className="col-span-2">CDE</div>
                <div className="col-span-1">Members</div>
                <div className="col-span-1">Archived Date</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {/* Project Rows */}
              {archivedProjects.map(project => (
                <div key={project.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center">
                        <Building className="h-4 w-4 text-[#4C5760]" />
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
                    {project.archived ? new Date(project.archived).toLocaleDateString() : '-'}
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onNavigate?.('projects', project.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#D15F36]">
                          Restore Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Project Modal */}
      <Dialog
        title="Add New Project"
        content={
          <div className="space-y-6">
            <Tabs defaultValue="import">
              <TabsList>
                <TabsTrigger value="import">Import from CDE</TabsTrigger>
                <TabsTrigger value="manual">Create Manually</TabsTrigger>
              </TabsList>
              <TabsContent value="import">
                {/* Import from CDE form */}
                <div className="space-y-4">
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
              <TabsContent value="manual">
                {/* Manual project creation form */}
                <div className="space-y-4">
                  <div>
                    <Label>Project Name</Label>
                    <Input className="mt-1" placeholder="Enter project name" />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input className="mt-1" placeholder="Enter project location" />
                  </div>
                  <div>
                    <Label>Project Phase</Label>
                    <select className="w-full mt-1 p-2 border border-[#A7CEBC] rounded-md">
                      <option value="planning">Planning</option>
                      <option value="design">Design</option>
                      <option value="construction">Construction</option>
                      <option value="completion">Completion</option>
                    </select>
                  </div>
                  <div>
                    <Label>Connect to CDE (Optional)</Label>
                    <select className="w-full mt-1 p-2 border border-[#A7CEBC] rounded-md">
                      <option value="">None</option>
                      <option value="trimble">Trimble Viewpoint</option>
                      <option value="autodesk">Autodesk Construction Cloud</option>
                      <option value="procore">Procore</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddProjectModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#D15F36] text-white hover:bg-opacity-90">
                      Add Project
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        }
      >
        <Button 
          onClick={() => setIsAddProjectModalOpen(true)}
          className="bg-[#D15F36] text-white hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </Dialog>
    </div>
  );

  const ProjectDetails = () => {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      return (
        <div className="text-center py-8 text-[#4C5760]">
          Project not found
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#3A366E]">{project.name}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('projects')}
              className="border-[#A7CEBC] hover:bg-gray-50"
            >
              Back to Projects
            </Button>
            <Button
              onClick={() => setIsManagingTeam(true)}
              className="bg-[#D15F36] text-white hover:bg-opacity-90"
            >
              Manage Team
            </Button>
          </div>
        </div>

        <Card className="border-[#A7CEBC]">
          <CardContent className="space-y-4 p-6">
            <div>
              <Label>Project Name</Label>
              <Input defaultValue={project.name} className="mt-1" />
            </div>
            <div>
              <Label>Location</Label>
              <Input defaultValue={project.location} className="mt-1" />
            </div>
            <div>
              <Label>Project Phase</Label>
              <select 
                defaultValue={project.phase}
                className="w-full mt-1 p-2 border border-[#A7CEBC] rounded-md"
              >
                <option value="planning">Planning</option>
                <option value="design">Design</option>
                <option value="construction">Construction</option>
                <option value="completion">Completion</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return projectId ? <ProjectDetails /> : <ProjectList />;
};

export default ProjectSettings;