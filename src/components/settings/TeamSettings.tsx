import React from 'react';
import { useState, FormEvent } from 'react';
import Button from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import Input from '../ui/input';
import Badge from '../ui/badge';
import Avatar, { AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Users, UserPlus, Search, MoreHorizontal, Mail, Building,
  Shield, Key, PlusCircle, Filter, RefreshCw
} from 'lucide-react';

export const TeamSettings = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  
  // Sample team members data
  const teamMembers = [
    { 
      id: 'user-1', 
      name: 'John Smith', 
      email: 'john.smith@acmeconstruction.com',
      role: 'Admin',
      department: 'Project Management',
      company: 'Acme Construction',
      avatar: null,
      status: 'active',
      lastActive: '2025-03-28T14:30:00Z'
    },
    { 
      id: 'user-2', 
      name: 'Sarah Chen', 
      email: 'sarah.chen@bluesky.com',
      role: 'Project Manager',
      department: 'Design',
      company: 'BlueSky Architects',
      avatar: null,
      status: 'active',
      lastActive: '2025-03-27T11:15:00Z'
    },
    { 
      id: 'user-3', 
      name: 'Mike Johnson', 
      email: 'mike.johnson@acmeconstruction.com',
      role: 'Team Member',
      department: 'Construction',
      company: 'Acme Construction',
      avatar: null,
      status: 'active',
      lastActive: '2025-03-26T16:45:00Z'
    },
    { 
      id: 'user-4', 
      name: 'Elena Rodriguez', 
      email: 'elena.rodriguez@powergrid.com',
      role: 'Specialist',
      department: 'Electrical',
      company: 'PowerGrid Systems',
      avatar: null,
      status: 'active',
      lastActive: '2025-03-25T09:30:00Z'
    },
    { 
      id: 'user-5', 
      name: 'David Kim', 
      email: 'david.kim@client.com',
      role: 'Observer',
      department: 'Management',
      company: 'Client Organization',
      avatar: null,
      status: 'pending',
      lastActive: null
    },
  ];
  
  // Sample roles
  const roles = [
    {
      id: 'role-1',
      name: 'Admin',
      description: 'Full access to all features and settings',
      members: 1,
      permissions: [
        'Manage team members',
        'Manage billing and subscription',
        'Configure system settings',
        'Full project access',
        'Manage all AI agents'
      ]
    },
    {
      id: 'role-2',
      name: 'Project Manager',
      description: 'Manage projects and team members',
      members: 1,
      permissions: [
        'Manage assigned projects',
        'Manage project team members',
        'Configure project settings',
        'Full access to project data',
        'Manage project AI agents'
      ]
    },
    {
      id: 'role-3',
      name: 'Team Member',
      description: 'Work on assigned projects',
      members: 1,
      permissions: [
        'View and edit assigned projects',
        'Use project AI agents',
        'Upload and download documents',
        'Communicate with team members'
      ]
    },
    {
      id: 'role-4',
      name: 'Specialist',
      description: 'Focused on specific disciplines',
      members: 1,
      permissions: [
        'View specific project areas',
        'Edit discipline-specific content',
        'Use specialized AI agents',
        'Limited project access'
      ]
    },
    {
      id: 'role-5',
      name: 'Observer',
      description: 'View-only access',
      members: 1,
      permissions: [
        'View project dashboards',
        'View project documents',
        'No editing permissions',
        'Limited AI agent access'
      ]
    }
  ];
  
  // Sample companies
  const companies = [
    { id: 'company-1', name: 'Acme Construction', role: 'Main Contractor', members: 2 },
    { id: 'company-2', name: 'BlueSky Architects', role: 'Architect', members: 1 },
    { id: 'company-3', name: 'PowerGrid Systems', role: 'Electrical Consultant', members: 1 },
    { id: 'company-4', name: 'Client Organization', role: 'Client', members: 1 }
  ];

  // Events handlers
  const handleInviteUser = () => {
    setShowInviteForm(!showInviteForm);
  };
  
  const handleCreateRole = () => {
    setShowRoleForm(!showRoleForm);
  };
  
  const handleSubmitInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Invite functionality would be implemented here');
    setShowInviteForm(false);
  };
  
  const handleSubmitRole = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Create role functionality would be implemented here');
    setShowRoleForm(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Team Management</h2>
        <p className="text-[#4C5760] mb-6">
          Manage your team members, roles, and permissions.
        </p>
      </div>

      <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList className="bg-[#F7F5F2]">
            <TabsTrigger value="members" className="data-[state=active]:bg-white">
              Team Members
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-white">
              Roles & Permissions
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-white">
              Companies
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {activeTab === 'members' && (
              <>
                <div className="relative flex-grow md:flex-grow-0 md:w-60">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search team members..." 
                    className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                  />
                </div>
                <Button 
                  onClick={handleInviteUser}
                  className="bg-[#3A366E] hover:bg-opacity-90 whitespace-nowrap"
                >
                  <UserPlus size={16} className="mr-1" />
                  Invite Member
                </Button>
              </>
            )}
            {activeTab === 'roles' && (
              <>
                <div className="relative flex-grow md:flex-grow-0 md:w-60">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search roles..." 
                    className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                  />
                </div>
                <Button 
                  onClick={handleCreateRole}
                  className="bg-[#3A366E] hover:bg-opacity-90 whitespace-nowrap"
                >
                  <Key size={16} className="mr-1" />
                  Create Role
                </Button>
              </>
            )}
            {activeTab === 'companies' && (
              <>
                <div className="relative flex-grow md:flex-grow-0 md:w-60">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search companies..." 
                    className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                  />
                </div>
                <Button 
                  className="bg-[#3A366E] hover:bg-opacity-90 whitespace-nowrap"
                >
                  <Building size={16} className="mr-1" />
                  Add Company
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Team Members Tab */}
        <TabsContent value="members" className="space-y-6">
          {showInviteForm && (
            <Card className="border-[#A7CEBC] mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3A366E]">Invite Team Member</CardTitle>
                <CardDescription>Send an invitation to join your team</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitInvite} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Email Address
                      </label>
                      <Input 
                        type="email"
                        placeholder="colleague@company.com" 
                        className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Role
                      </label>
                      <select className="w-full p-2 border border-[#A7CEBC] rounded-md">
                        {roles.map(role => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Company
                      </label>
                      <select className="w-full p-2 border border-[#A7CEBC] rounded-md">
                        {companies.map(company => (
                          <option key={company.id} value={company.name}>{company.name}</option>
                        ))}
                        <option value="new">+ Add New Company</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Department
                      </label>
                      <Input 
                        placeholder="e.g., Design, Construction, Management" 
                        className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-[#A7CEBC]"
                      onClick={() => setShowInviteForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#3A366E]">
                      Send Invitation
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          <Card className="border-[#A7CEBC]">
            <CardContent className="p-0">
              <div className="divide-y">
                {/* Table Header */}
                <div className="grid grid-cols-12 p-4 bg-[#F7F5F2] font-medium text-[#3A366E]">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Company</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {/* Table Rows */}
                {teamMembers.map(member => (
                  <div key={member.id} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#3A366E] text-white text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                          {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                        </Avatar>
                        <div>
                          <div className="font-medium text-[#3A366E]">{member.name}</div>
                          <div className="text-xs text-[#4C5760]">{member.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge 
                        className={
                          member.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800 border-purple-200' 
                            : member.role === 'Project Manager'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : member.role === 'Observer'
                                ? 'bg-gray-100 text-gray-800 border-gray-200'
                                : 'bg-[#A7CEBC] bg-opacity-30 text-[#3A366E]'
                        }
                      >
                        {member.role}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-[#4C5760]">{member.company}</div>
                    <div className="col-span-2 text-[#4C5760]">{member.department}</div>
                    <div className="col-span-2">
                      {member.status === 'active' ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>Project Access</DropdownMenuItem>
                          {member.status === 'pending' ? (
                            <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between items-center">
              <div className="text-sm text-[#4C5760]">
                Showing {teamMembers.length} team members
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#A7CEBC]" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="border-[#A7CEBC]" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-6">
          {showRoleForm && (
            <Card className="border-[#A7CEBC] mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3A366E]">Create New Role</CardTitle>
                <CardDescription>Define a new role with specific permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRole} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Role Name
                      </label>
                      <Input 
                        placeholder="e.g., Designer, Estimator, Coordinator" 
                        className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                        Description
                      </label>
                      <Input 
                        placeholder="Brief description of this role's responsibilities" 
                        className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-[#3A366E] mb-3">Permissions</h4>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h5 className="font-medium text-[#3A366E] mb-2">Project Access</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="access-all" />
                            <label htmlFor="access-all" className="text-[#4C5760]">Access all projects</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="access-assigned" defaultChecked />
                            <label htmlFor="access-assigned" className="text-[#4C5760]">Access assigned projects only</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="access-create" />
                            <label htmlFor="access-create" className="text-[#4C5760]">Create new projects</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h5 className="font-medium text-[#3A366E] mb-2">Team Management</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="team-invite" />
                            <label htmlFor="team-invite" className="text-[#4C5760]">Invite team members</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="team-manage" />
                            <label htmlFor="team-manage" className="text-[#4C5760]">Manage team permissions</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h5 className="font-medium text-[#3A366E] mb-2">Data & Documents</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="docs-view" defaultChecked />
                            <label htmlFor="docs-view" className="text-[#4C5760]">View documents</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="docs-edit" defaultChecked />
                            <label htmlFor="docs-edit" className="text-[#4C5760]">Edit documents</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="docs-delete" />
                            <label htmlFor="docs-delete" className="text-[#4C5760]">Delete documents</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h5 className="font-medium text-[#3A366E] mb-2">AI Agents</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="ai-use" defaultChecked />
                            <label htmlFor="ai-use" className="text-[#4C5760]">Use AI agents</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="ai-configure" />
                            <label htmlFor="ai-configure" className="text-[#4C5760]">Configure AI agents</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-[#A7CEBC]"
                      onClick={() => setShowRoleForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#3A366E]">
                      Create Role
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map(role => (
              <Card key={role.id} className="border-[#A7CEBC]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#3A366E]">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge className="bg-[#F7F5F2] text-[#4C5760]">
                      {role.members} {role.members === 1 ? 'member' : 'members'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium text-[#3A366E] mb-2">Permissions:</h4>
                  <ul className="space-y-1">
                    {role.permissions.map((permission, idx) => (
                      <li key={idx} className="text-sm text-[#4C5760] flex items-start">
                        <div className="h-5 flex items-center mr-2">•</div>
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="link" className="text-[#3A366E] p-0 h-auto">
                    View Members
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-[#A7CEBC]">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate Role</DropdownMenuItem>
                      {role.name !== 'Admin' && (
                        <DropdownMenuItem className="text-red-600">Delete Role</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <Card className="border-[#A7CEBC]">
            <CardContent className="p-0">
              <div className="divide-y">
                {/* Table Header */}
                <div className="grid grid-cols-12 p-4 bg-[#F7F5F2] font-medium text-[#3A366E]">
                  <div className="col-span-5">Company</div>
                  <div className="col-span-3">Role</div>
                  <div className="col-span-2">Team Members</div>
                  <div className="col-span-2">Actions</div>
                </div>
                
                {/* Table Rows */}
                {companies.map(company => (
                  <div key={company.id} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#D15F36] text-white text-xs">
                            {company.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-[#3A366E]">{company.name}</div>
                      </div>
                    </div>
                    <div className="col-span-3 text-[#4C5760]">{company.role}</div>
                    <div className="col-span-2 text-[#4C5760]">
                      {company.members} {company.members === 1 ? 'member' : 'members'}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-[#A7CEBC]">
                          <UserPlus size={14} className="mr-1" />
                          Add Member
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Company</DropdownMenuItem>
                            <DropdownMenuItem>View Members</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="border-[#A7CEBC]">
                <PlusCircle size={16} className="mr-1" />
                Add New Company
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};