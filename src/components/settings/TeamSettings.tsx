import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card } from '../ui/card';
import Button from '../ui/button';
import Input from '../ui/input';
import { Label } from '../ui/label';
import Dialog from '../ui/dialog';
import ConfirmationDialog from '../ui/confirmation-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserPlus, Mail, Building, MoreHorizontal, CreditCard, Users, User } from 'lucide-react';
import { Person, isOrganizationUser, OrganizationRole } from '../../types/users';
import { getOrganizationUsers } from '../../mock-data/people';
import { userManagementService } from '../../services/user-management';
import { toast } from 'react-hot-toast';
import { useUser } from '../../contexts/UserContext';

const TeamSettings: React.FC = () => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState<string | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<OrganizationRole[]>(['standard']);
  const [isLoading, setIsLoading] = useState(false);
  const [organizationMembers, setOrganizationMembers] = useState<Person[]>([]);

  // Organization ID - in a real app, this would come from context or props
  const organizationId = 'ACME-001';

  // Fetch organization members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const members = await userManagementService.getOrganizationMembers(organizationId);
        setOrganizationMembers(members);
      } catch (error) {
        console.error('Error fetching organization members:', error);
        toast.error('Failed to load organization members');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [organizationId]);

  const filteredMembers = organizationMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = async () => {
    if (!name || !email || !role) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.addOrganizationMember(organizationId, name, email, role, selectedRoles);
      
      // Refresh the organization members list
      const updatedMembers = await userManagementService.getOrganizationMembers(organizationId);
      setOrganizationMembers(updatedMembers);
      
      // Reset form and close modal
      setName('');
      setEmail('');
      setRole('');
      setSelectedRoles(['standard']);
      setIsAddMemberOpen(false);
      
      toast.success('Invitation sent successfully');
    } catch (error) {
      console.error('Error adding organization member:', error);
      toast.error('Failed to send invitation');
    } finally {
      setIsLoading(false);
    }
  };

  const openRemoveConfirmation = (memberId: string) => {
    setMemberToRemove(memberId);
    setIsConfirmRemoveOpen(true);
  };

  const openChangeRoleDialog = (memberId: string) => {
    setMemberToUpdate(memberId);
    setIsChangeRoleOpen(true);
  };

  const handleChangeRoles = async (newRoles: OrganizationRole[]) => {
    if (!memberToUpdate) return;

    try {
      setIsLoading(true);
      await userManagementService.updateOrganizationMemberRoles(organizationId, memberToUpdate, newRoles);
      
      // Refresh the organization members list
      const updatedMembers = await userManagementService.getOrganizationMembers(organizationId);
      setOrganizationMembers(updatedMembers);
      
      toast.success('Roles updated successfully');
    } catch (error) {
      console.error('Error updating member roles:', error);
      toast.error('Failed to update roles');
    } finally {
      setIsLoading(false);
      setMemberToUpdate(null);
      setIsChangeRoleOpen(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;

    try {
      setIsLoading(true);
      await userManagementService.removeOrganizationMember(organizationId, memberToRemove);
      
      // Refresh the organization members list
      const updatedMembers = await userManagementService.getOrganizationMembers(organizationId);
      setOrganizationMembers(updatedMembers);
      
      toast.success('Member removed successfully');
    } catch (error) {
      console.error('Error removing organization member:', error);
      toast.error('Failed to remove member');
    } finally {
      setIsLoading(false);
      setMemberToRemove(null);
    }
  };

  // Helper function to get role icon
  const getRoleIcon = (role: OrganizationRole) => {
    switch (role) {
      case 'billing_admin':
        return <CreditCard className="h-4 w-4 mr-2" />;
      case 'org_admin':
        return <Users className="h-4 w-4 mr-2" />;
      case 'standard':
        return <User className="h-4 w-4 mr-2" />;
      default:
        return <User className="h-4 w-4 mr-2" />;
    }
  };

  // Helper function to get role label
  const getRoleLabel = (role: OrganizationRole) => {
    switch (role) {
      case 'billing_admin':
        return 'Billing Admin';
      case 'org_admin':
        return 'Organization Admin';
      case 'standard':
        return 'Standard User';
      default:
        return 'Standard User';
    }
  };

  // Helper function to toggle a role in the selected roles array
  const toggleRole = (role: OrganizationRole) => {
    if (selectedRoles.includes(role)) {
      // Don't allow removing the last role
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter(r => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Organization Team Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Organization Team</h2>
          <p className="text-[#4C5760]">
            Manage your organization's team members
          </p>
        </div>
        <Button 
          onClick={() => setIsAddMemberOpen(true)}
          className="bg-[#D15F36] text-white hover:bg-opacity-90"
          disabled={isLoading}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
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

      {/* Organization Team Members List */}
      <Card className="border-[#A7CEBC]">
        <div className="divide-y divide-[#A7CEBC]">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#F7F5F2] p-4 text-[#3A366E] font-medium">
            <div className="col-span-3">Member</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Org. Roles</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          {/* Team Member Rows */}
          {isLoading && organizationMembers.length === 0 ? (
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
                <div className="col-span-2">
                  {isOrganizationUser(member) && (
                    <div className="flex flex-wrap gap-1">
                      {member.organizationRoles.map(role => (
                        <span key={role} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-[#4C5760]">
                          {getRoleIcon(role as OrganizationRole)}
                          {getRoleLabel(role as OrganizationRole)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  {isOrganizationUser(member) && (
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
                      <DropdownMenuItem onClick={() => openChangeRoleDialog(member.id)}>
                        Change Organization Roles
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => openRemoveConfirmation(member.id)}
                      >
                        Remove from Organization
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
        title="Add Organization Member"
        content={
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Organization Roles</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="billing_admin"
                    checked={selectedRoles.includes('billing_admin')}
                    onChange={() => toggleRole('billing_admin')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="billing_admin" className="ml-2 flex items-center text-[#4C5760]">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Billing Admin</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="org_admin"
                    checked={selectedRoles.includes('org_admin')}
                    onChange={() => toggleRole('org_admin')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="org_admin" className="ml-2 flex items-center text-[#4C5760]">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Organization Admin</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="standard"
                    checked={selectedRoles.includes('standard')}
                    onChange={() => toggleRole('standard')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="standard" className="ml-2 flex items-center text-[#4C5760]">
                    <User className="h-4 w-4 mr-2" />
                    <span>Standard User</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setName('');
                  setEmail('');
                  setRole('');
                  setSelectedRoles(['standard']);
                  setIsAddMemberOpen(false);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#D15F36] text-white hover:bg-opacity-90"
                onClick={handleAddMember}
                disabled={isLoading || !name || !email || !role}
              >
                {isLoading ? 'Sending...' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        }
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
      />

      {/* Change Role Dialog */}
      <Dialog
        title="Change Organization Roles"
        content={
          <div className="space-y-4">
            <div>
              <Label>Organization Roles</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="change_billing_admin"
                    checked={selectedRoles.includes('billing_admin')}
                    onChange={() => toggleRole('billing_admin')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="change_billing_admin" className="ml-2 flex items-center text-[#4C5760]">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Billing Admin</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="change_org_admin"
                    checked={selectedRoles.includes('org_admin')}
                    onChange={() => toggleRole('org_admin')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="change_org_admin" className="ml-2 flex items-center text-[#4C5760]">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Organization Admin</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="change_standard"
                    checked={selectedRoles.includes('standard')}
                    onChange={() => toggleRole('standard')}
                    className="h-4 w-4 text-[#D15F36] border-gray-300 rounded focus:ring-[#D15F36]"
                  />
                  <label htmlFor="change_standard" className="ml-2 flex items-center text-[#4C5760]">
                    <User className="h-4 w-4 mr-2" />
                    <span>Standard User</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setMemberToUpdate(null);
                  setIsChangeRoleOpen(false);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#D15F36] text-white hover:bg-opacity-90"
                onClick={() => handleChangeRoles(selectedRoles)}
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        }
        open={isChangeRoleOpen}
        onOpenChange={setIsChangeRoleOpen}
      />

      {/* Confirmation Dialog for Removing Member */}
      <ConfirmationDialog
        isOpen={isConfirmRemoveOpen}
        onClose={() => setIsConfirmRemoveOpen(false)}
        onConfirm={handleRemoveMember}
        title="Remove Member"
        message="Are you sure you want to remove this member from the organization?"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};

export default TeamSettings;