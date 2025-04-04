import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';
import { Eye, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import { Person, isContactPerson, isProjectUser, isOrganizationUser } from '../types/users';
import { mockPeople } from '../mock-data/people';

interface PeopleTableProps {
  projectId?: string;
  showOrganizationOnly?: boolean;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ projectId, showOrganizationOnly = false }) => {
  const people = mockPeople;

  const getUserTypeLabel = (person: Person) => {
    if (isOrganizationUser(person)) {
      return <span className="px-2 py-1 rounded-full text-xs bg-[#D15F36] bg-opacity-20 text-[#D15F36]">Organization Member</span>;
    }
    if (isProjectUser(person)) {
      return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Project User</span>;
    }
    return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Contact</span>;
  };

  const getUserStatus = (person: Person) => {
    if (isContactPerson(person)) {
      return <span className="flex items-center gap-1 text-gray-500"><UserX className="h-4 w-4" /> Not Signed Up</span>;
    }
    if (isProjectUser(person) || isOrganizationUser(person)) {
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          person.status === 'active' ? 'bg-green-100 text-green-800' :
          person.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {person.status}
        </span>
      );
    }
    return null;
  };

  const getActionMenuItems = (person: Person) => {
    const commonItems = [
      <DropdownMenuItem key="view">View Profile</DropdownMenuItem>,
      <DropdownMenuItem key="edit">Edit Contact Details</DropdownMenuItem>
    ];

    if (isContactPerson(person)) {
      return [
        ...commonItems,
        <DropdownMenuItem key="invite" className="text-[#D15F36]">
          <UserCheck className="h-4 w-4 mr-2" />
          Send App Invitation
        </DropdownMenuItem>
      ];
    }

    if (isProjectUser(person)) {
      return [
        ...commonItems,
        <DropdownMenuItem key="tasks">View Assigned Tasks</DropdownMenuItem>,
        <DropdownMenuItem key="message">Message</DropdownMenuItem>
      ];
    }

    if (isOrganizationUser(person)) {
      return [
        ...commonItems,
        <DropdownMenuItem key="tasks">View Assigned Tasks</DropdownMenuItem>,
        <DropdownMenuItem key="message">Message</DropdownMenuItem>,
        <DropdownMenuItem key="projects">Manage Project Access</DropdownMenuItem>
      ];
    }

    return commonItems;
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-8 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
        <div>ID</div>
        <div>Name</div>
        <div>Company</div>
        <div>Role</div>
        <div>Email</div>
        <div>Type</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {people.map((person) => (
          <div key={person.id} className="grid grid-cols-8 p-3 items-center text-sm hover:bg-gray-50">
            <div className="font-medium text-[#3A366E]">{person.id}</div>
            <div>{person.name}</div>
            <div>{person.company}</div>
            <div>{person.role}</div>
            <div className="text-blue-600">{person.email}</div>
            <div>{getUserTypeLabel(person)}</div>
            <div>{getUserStatus(person)}</div>
            <div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#3A366E]">
                  <Eye size={16} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {getActionMenuItems(person)}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};