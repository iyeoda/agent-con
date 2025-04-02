import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';
import { Eye, MoreHorizontal } from 'lucide-react';

export const CompaniesTable = () => {
  // Placeholder data
  const companies = [
    { id: 'COM-001', name: 'Acme Construction', role: 'Main Contractor', contactPerson: 'John Davis', email: 'john@acme.com', phone: '555-123-4567' },
    { id: 'COM-002', name: 'BlueSky Architects', role: 'Architect', contactPerson: 'Sarah Chen', email: 'sarah@bluesky.com', phone: '555-234-5678' },
    { id: 'COM-003', name: 'Foundation Experts', role: 'Subcontractor', contactPerson: 'Michael Brown', email: 'michael@foundation.com', phone: '555-345-6789' },
    { id: 'COM-004', name: 'PowerGrid Systems', role: 'Electrical Consultant', contactPerson: 'Elena Rodriguez', email: 'elena@powergrid.com', phone: '555-456-7890' },
    { id: 'COM-005', name: 'GreenSpace Landscaping', role: 'Landscaping', contactPerson: 'David Kim', email: 'david@greenspace.com', phone: '555-567-8901' },
  ];

  return (
    <div className="border rounded-md overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-7 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
        <div>Company ID</div>
        <div>Name</div>
        <div>Role</div>
        <div>Contact Person</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Actions</div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {companies.map((company) => (
          <div key={company.id} className="grid grid-cols-7 p-3 items-center text-sm hover:bg-gray-50">
            <div className="font-medium text-[#3A366E]">{company.id}</div>
            <div>{company.name}</div>
            <div>{company.role}</div>
            <div>{company.contactPerson}</div>
            <div className="text-blue-600">{company.email}</div>
            <div>{company.phone}</div>
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Information</DropdownMenuItem>
                    <DropdownMenuItem>View Documents</DropdownMenuItem>
                    <DropdownMenuItem>Contact History</DropdownMenuItem>
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