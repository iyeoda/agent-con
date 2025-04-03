import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Badge from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Building, Search, Plus, MoreHorizontal, Database, Calendar, 
  Users, Filter, ArrowUpDown, CheckCircle, AlertCircle, MoreVertical, Trash2
} from 'lucide-react';
import Dialog from '../ui/dialog';
import DialogContent from '../ui/dialog';
import DialogHeader from '../ui/dialog';
import DialogTitle from '../ui/dialog';
import DialogDescription from '../ui/dialog';
import DialogTrigger from '../ui/dialog';
import { mockProjects, mockAvailableProjects } from '../../mock-data/projects';
import { Project } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import Textarea from '../../components/ui/textarea';
import ProjectUserManagement from './ProjectUserManagement';

interface ProjectSettingsProps {
  projectId?: string;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ projectId }) => {
  const [projectView, setProjectView] = useState<'active' | 'archived'>('active');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    location: '',
    phase: 'planning'
  });

  // Filter projects based on status
  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const archivedProjects = mockProjects.filter(p => p.status === 'archived');

  const handleAddProject = () => {
    // TODO: Implement add project functionality
    console.log('Adding project:', newProject);
    setIsAddProjectModalOpen(false);
    setNewProject({ name: '', description: '', location: '', phase: 'planning' });
  };

  const handleDeleteProject = (projectId: string) => {
    // TODO: Implement delete project functionality
    console.log('Deleting project:', projectId);
  };

  const ProjectList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#3A366E]">Projects</h2>
        <Button 
          onClick={() => setIsAddProjectModalOpen(true)}
          className="bg-[#D15F36] text-white hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="border-[#A7CEBC] hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-[#3A366E]">{project.name}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.location.href = `/settings/projects/${project.id}`}>
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[#4C5760] mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#4C5760]" />
                  <span className="text-[#4C5760]">{project.phase}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#4C5760]" />
                  <span className="text-[#4C5760]">{project.members} members</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ProjectDetails = () => {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#3A366E]">Project Details</h2>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/settings/projects'}
            className="border-[#A7CEBC] hover:bg-gray-50"
          >
            Back to Projects
          </Button>
        </div>

        <Card className="border-[#A7CEBC]">
          <CardHeader>
            <CardTitle className="text-[#3A366E]">Project Information</CardTitle>
            <CardDescription>Update your project information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={project.name}
                className="w-full p-2 border border-[#A7CEBC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D15F36]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={project.description}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                defaultValue={project.location}
                className="w-full p-2 border border-[#A7CEBC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D15F36]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phase">Project Phase</Label>
              <select
                id="phase"
                defaultValue={project.phase}
                className="w-full p-2 border border-[#A7CEBC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D15F36]"
              >
                <option value="planning">Planning</option>
                <option value="design">Design</option>
                <option value="construction">Construction</option>
                <option value="completion">Completion</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#D15F36] text-white hover:bg-opacity-90">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#A7CEBC]">
          <CardHeader>
            <CardTitle className="text-[#3A366E] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#D15F36]" />
              Project Team
            </CardTitle>
            <CardDescription>Manage team members and their roles for this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-[#4C5760]">Manage team members and their access levels for this project</p>
              <Button 
                variant="outline" 
                className="border-[#A7CEBC] hover:bg-gray-50"
                onClick={() => window.location.href = `/settings/team?projectId=${projectId}`}
              >
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return projectId ? <ProjectDetails /> : <ProjectList />;
};

export default ProjectSettings;