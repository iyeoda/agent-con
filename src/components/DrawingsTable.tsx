import React from 'react';
import { Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';
import { Download, Eye, MoreHorizontal } from 'lucide-react';

export const DrawingsTable = () => {
  // Placeholder data
  const drawings = [
    { id: 'DWG-001', title: 'Site Plan', revision: 'P03', discipline: 'Architecture', status: 'Approved', date: '2025-03-15', author: 'J. Smith' },
    { id: 'DWG-002', title: 'Foundation Layout', revision: 'P02', discipline: 'Structural', status: 'For Review', date: '2025-03-20', author: 'T. Johnson' },
    { id: 'DWG-003', title: 'Electrical Layout - Ground Floor', revision: 'P01', discipline: 'Electrical', status: 'Draft', date: '2025-03-22', author: 'M. Garcia' },
    { id: 'DWG-004', title: 'Plumbing Schematic', revision: 'P02', discipline: 'MEP', status: 'Approved', date: '2025-03-10', author: 'A. Williams' },
    { id: 'DWG-005', title: 'Elevation - North Facade', revision: 'P04', discipline: 'Architecture', status: 'For Review', date: '2025-03-25', author: 'J. Smith' },
  ];
  
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'For Review':
        return <Badge className="bg-[#F8C630] bg-opacity-20 text-[#D15F36] border-[#F8C630]">For Review</Badge>;
      case 'Draft':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-8 bg-[#F7F5F2] p-3 border-b text-[#3A366E] font-medium text-sm">
        <div>Drawing ID</div>
        <div>Title</div>
        <div>Revision</div>
        <div>Discipline</div>
        <div>Status</div>
        <div>Date</div>
        <div>Author</div>
        <div>Actions</div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {drawings.map((drawing) => (
          <div key={drawing.id} className="grid grid-cols-8 p-3 items-center text-sm hover:bg-gray-50">
            <div className="font-medium text-[#3A366E]">{drawing.id}</div>
            <div>{drawing.title}</div>
            <div>{drawing.revision}</div>
            <div>{drawing.discipline}</div>
            <div>{renderStatusBadge(drawing.status)}</div>
            <div>{new Date(drawing.date).toLocaleDateString()}</div>
            <div>{drawing.author}</div>
            <div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#3A366E]">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#3A366E]">
                  <Download size={16} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
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