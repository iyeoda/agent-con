import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';
import { Eye, MoreHorizontal } from 'lucide-react';

export const PeopleTable = () => {
  // Placeholder data
  const people = [
    { id: 'PER-001', name: 'James Wilson', company: 'Acme Construction', role: 'Project Manager', email: 'james@acme.com', phone: '555-987-6543' },
    { id: 'PER-002', name: 'Maria Garcia', company: 'BlueSky Architects', role: 'Lead Architect', email: 'maria@bluesky.com', phone: '555-876-5432' },
    { id: 'PER-003', name: 'Robert Johnson', company: 'Acme Construction', role: 'Site Foreman', email: 'robert@acme.com', phone: '555-765-4321' },
    { id: 'PER-004', name: 'Aisha Patel', company: 'Client Organization', role: 'Client Representative', email: 'aisha@client.com', phone: '555-654-3210' },
    { id: 'PER-005', name: 'Thomas Lee', company: 'PowerGrid Systems', role: 'Electrical Engineer', email: 'thomas@powergrid.com', phone: '555-543-2109' },
  ];

  return (
    <div className="border rounded-md overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-7 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
        <div>ID</div>
        <div>Name</div>
        <div>Company</div>
        <div>Role</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Actions</div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {people.map((person) => (
          <div key={person.id} className="grid grid-cols-7 p-3 items-center text-sm hover:bg-gray-50">
            <div className="font-medium text-[#3A366E]">{person.id}</div>
            <div>{person.name}</div>
            <div>{person.company}</div>
            <div>{person.role}</div>
            <div className="text-blue-600">{person.email}</div>
            <div>{person.phone}</div>
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Contact Details</DropdownMenuItem>
                    <DropdownMenuItem>View Assigned Tasks</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
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