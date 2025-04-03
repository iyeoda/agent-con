import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent } from '../ui/card';
import Button from '../ui/button';
import Input from '../ui/input';
import { Label } from '../ui/label';
import Dialog from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserPlus, Mail, Building, MoreHorizontal } from 'lucide-react';

interface ProjectTeamMember {
  id: string;
  name: string;
  email: string;
  projectRole: string;
  organizationRole: string;
  joinedAt: string;
}

interface ProjectTeamSettingsProps {
  projectId: string;
  onBack: () => void;
}

const ProjectTeamSettings: React.FC<ProjectTeamSettingsProps> = ({ projectId, onBack }) => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock project team members data - replace with actual data from your backend
  const projectMembers: ProjectTeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      projectRole: 'Project Lead',
      organizationRole: 'Project Manager',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      projectRole: 'Engineer',
      organizationRole: 'Member',
      joinedAt: '2024-02-01'
    }
  ];

  const filteredMembers = projectMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.projectRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Project Team Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Project Team</h2>
          <p className="text-[#4C5760]">
            Manage team members for this project
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-[#A7CEBC]"
          >
            Back to Project
          </Button>
          <Button 
            onClick={() => setIsAddMemberOpen(true)}
            className="bg-[#D15F36] text-white hover:bg-opacity-90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="pl-10 border-[#A7CEBC]"
        />
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      {/* Project Team Members List */}
      <Card className="border-[#A7CEBC]">
        <div className="divide-y divide-[#A7CEBC]">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#F7F5F2] p-4 text-[#3A366E] font-medium">
            <div className="col-span-3">Member</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Project Role</div>
            <div className="col-span-2">Organization Role</div>
            <div className="col-span-2">Actions</div>
          </div>
          
          {/* Team Member Rows */}
          {filteredMembers.map(member => (
            <div key={member.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center">
                    <Building className="h-4 w-4 text-[#4C5760]" />
                  </div>
                  <div className="font-medium text-[#3A366E]">{member.name}</div>
                </div>
              </div>
              <div className="col-span-3 text-[#4C5760]">{member.email}</div>
              <div className="col-span-2 text-[#4C5760]">{member.projectRole}</div>
              <div className="col-span-2 text-[#4C5760]">{member.organizationRole}</div>
              <div className="col-span-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      Change Project Role
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Remove from Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Member Modal */}
      <Dialog
        title="Add Project Member"
        content={
          <div className="space-y-4">
            <div>
              <Label>Select Organization Member</Label>
              <Select>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member1">Sarah Chen</SelectItem>
                  <SelectItem value="member2">Mike Johnson</SelectItem>
                  <SelectItem value="member3">Elena Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Project Role</Label>
              <Select>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-lead">Project Lead</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="architect">Architect</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#D15F36] text-white hover:bg-opacity-90">
                Add to Project
              </Button>
            </div>
          </div>
        }
      >
        <Button 
          onClick={() => setIsAddMemberOpen(true)}
          className="bg-[#D15F36] text-white hover:bg-opacity-90"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </Dialog>
    </div>
  );
};

export default ProjectTeamSettings; 