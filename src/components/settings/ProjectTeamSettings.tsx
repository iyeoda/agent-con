import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card } from '../ui/card';
import Button from '../ui/button';
import Input from '../ui/input';
import { Label } from '../ui/label';
import Dialog from '../ui/dialog';
import ConfirmationDialog from '../ui/confirmation-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserPlus, Mail, Building, MoreHorizontal } from 'lucide-react';
import { Person, isOrganizationUser, isProjectUser } from '../../types/users';
import { getUsersByProject, getOrganizationUsers } from '../../mock-data/people';
import { userManagementService } from '../../services/user-management';
import { toast } from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ProjectTeamSettingsProps {
  projectId: string;
  onBack: () => void;
}

const ProjectTeamSettings: React.FC<ProjectTeamSettingsProps> = ({ projectId, onBack }) => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projectMembers, setProjectMembers] = useState<Person[]>([]);
  const [availableOrgMembers, setAvailableOrgMembers] = useState<Person[]>([]);

  // Fetch project members and available organization members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const members = await userManagementService.getProjectMembers(projectId);
        setProjectMembers(members);
        
        // Get available organization members that can be added to the project
        const orgMembers = getOrganizationUsers().filter(
          user => !user.projectIds.includes(projectId)
        );
        setAvailableOrgMembers(orgMembers);
      } catch (error) {
        console.error('Error fetching project members:', error);
        toast.error('Failed to load project members');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  const filteredMembers = projectMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserTypeLabel = (person: Person) => {
    if (isOrganizationUser(person)) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#D15F36] bg-opacity-20 text-[#D15F36]">Organization Member</span>;
    }
    if (isProjectUser(person)) {
      return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Project User</span>;
    }
    return null;
  };

  const handleAddExistingMember = async () => {
    if (!selectedMemberId || !selectedRole) {
      toast.error('Please select a member and role');
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.addProjectMember(projectId, selectedMemberId, selectedRole);
      
      // Refresh the project members list
      const updatedMembers = await userManagementService.getProjectMembers(projectId);
      setProjectMembers(updatedMembers);
      
      // Update available org members
      const updatedOrgMembers = getOrganizationUsers().filter(
        user => !user.projectIds.includes(projectId)
      );
      setAvailableOrgMembers(updatedOrgMembers);
      
      // Reset form and close modal
      setSelectedMemberId('');
      setSelectedRole('');
      setIsAddMemberOpen(false);
      
      toast.success('Member added to project successfully');
    } catch (error) {
      console.error('Error adding member to project:', error);
      toast.error('Failed to add member to project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewMember = async () => {
    if (!newMemberName || !newMemberEmail || !selectedRole) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.addNewProjectMember(
        projectId,
        newMemberName,
        newMemberEmail,
        selectedRole
      );
      
      // Refresh the project members list
      const updatedMembers = await userManagementService.getProjectMembers(projectId);
      setProjectMembers(updatedMembers);
      
      // Reset form and close modal
      setNewMemberName('');
      setNewMemberEmail('');
      setSelectedRole('');
      setIsAddMemberOpen(false);
      
      toast.success('Invitation sent successfully');
    } catch (error) {
      console.error('Error adding new member to project:', error);
      toast.error('Failed to send invitation');
    } finally {
      setIsLoading(false);
    }
  };

  const openRemoveConfirmation = (memberId: string) => {
    setMemberToRemove(memberId);
    setIsConfirmRemoveOpen(true);
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;

    try {
      setIsLoading(true);
      await userManagementService.removeProjectMember(projectId, memberToRemove);
      
      // Refresh the project members list
      const updatedMembers = await userManagementService.getProjectMembers(projectId);
      setProjectMembers(updatedMembers);
      
      toast.success('Member removed from project successfully');
    } catch (error) {
      console.error('Error removing member from project:', error);
      toast.error('Failed to remove member from project');
    } finally {
      setIsLoading(false);
      setMemberToRemove(null);
    }
  };

  const resetForm = () => {
    setSelectedMemberId('');
    setNewMemberName('');
    setNewMemberEmail('');
    setSelectedRole('');
    setIsAddMemberOpen(false);
  };

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
            disabled={isLoading}
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
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          {/* Team Member Rows */}
          {isLoading && projectMembers.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Loading members...</div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No members found</div>
          ) : (
            filteredMembers.map(member => (
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
                <div className="col-span-2 text-[#4C5760]">{member.role}</div>
                <div className="col-span-2">{getUserTypeLabel(member)}</div>
                <div className="col-span-1">
                  {(isProjectUser(member) || isOrganizationUser(member)) && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : member.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  )}
                </div>
                <div className="col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Project Role</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => openRemoveConfirmation(member.id)}
                      >
                        Remove from Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Member Modal */}
      <Dialog
        title="Add Project Member"
        content={
          <div className="space-y-4">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">New Member</TabsTrigger>
                <TabsTrigger value="existing">Organization Member</TabsTrigger>
              </TabsList>
              
              <TabsContent value="new" className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    value={newMemberName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMemberName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newMemberEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMemberEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Project Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
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
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#D15F36] text-white hover:bg-opacity-90"
                    onClick={handleAddNewMember}
                    disabled={isLoading || !newMemberName || !newMemberEmail || !selectedRole}
                  >
                    {isLoading ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="existing" className="space-y-4">
                <div>
                  <Label>Select Organization Member</Label>
                  <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableOrgMembers.length === 0 ? (
                        <SelectItem value="no-members" disabled>
                          No available members
                        </SelectItem>
                      ) : (
                        availableOrgMembers.map(member => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.role}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-[#4C5760] mt-1">
                    Only organization members not already in the project are shown.
                  </p>
                </div>
                <div>
                  <Label>Project Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
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
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#D15F36] text-white hover:bg-opacity-90"
                    onClick={handleAddExistingMember}
                    disabled={isLoading || !selectedMemberId || !selectedRole || selectedMemberId === 'no-members'}
                  >
                    {isLoading ? 'Adding...' : 'Add to Project'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        }
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
      />

      {/* Confirmation Dialog for Removing Member */}
      <ConfirmationDialog
        isOpen={isConfirmRemoveOpen}
        onClose={() => setIsConfirmRemoveOpen(false)}
        onConfirm={handleRemoveMember}
        title="Remove Member"
        message="Are you sure you want to remove this member from the project?"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ProjectTeamSettings; 