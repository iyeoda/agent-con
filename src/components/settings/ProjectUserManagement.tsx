import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { UserPlus, Mail, Shield, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface ProjectUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending';
  joinedAt: string;
}

const ProjectUserManagement: React.FC = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  
  // Mock data - replace with actual data from your backend
  const users: ProjectUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'editor',
      status: 'active',
      joinedAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'viewer',
      status: 'pending',
      joinedAt: '2024-02-15'
    }
  ];

  const handleInvite = () => {
    // TODO: Implement invite logic
    console.log('Inviting user:', inviteEmail, 'with role:', selectedRole);
    setInviteEmail('');
  };

  const handleRemoveUser = (userId: string) => {
    // TODO: Implement remove user logic
    console.log('Removing user:', userId);
  };

  const handleUpdateRole = (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    // TODO: Implement role update logic
    console.log('Updating role for user:', userId, 'to:', newRole);
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#A7CEBC]">
        <CardHeader>
          <CardTitle className="text-[#3A366E] flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[#D15F36]" />
            Invite New User
          </CardTitle>
          <CardDescription>Add new team members to your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedRole} onValueChange={(value: 'admin' | 'editor' | 'viewer') => setSelectedRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleInvite}
              className="bg-[#D15F36] text-white hover:bg-opacity-90"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A7CEBC]">
        <CardHeader>
          <CardTitle className="text-[#3A366E] flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#D15F36]" />
            User Management
          </CardTitle>
          <CardDescription>Manage team member roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select 
                      value={user.role} 
                      onValueChange={(value: 'admin' | 'editor' | 'viewer') => handleUpdateRole(user.id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectUserManagement; 