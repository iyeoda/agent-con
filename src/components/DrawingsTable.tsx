import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';
import { Eye, MoreHorizontal, FileText } from 'lucide-react';

interface DrawingsTableProps {
  onDrawingClick: (drawingId: string) => void;
}

export const DrawingsTable: React.FC<DrawingsTableProps> = ({ onDrawingClick }) => {
  // Placeholder data with UUIDs
  const drawings = [
    { 
      id: '550e8400-e29b-41d4-a716-446655440003', // Using UUID format
      title: 'Floor Plan A-101', 
      version: '2.1',
      status: 'For Review',
      lastModified: '2024-03-28T10:30:00Z',
      modifiedBy: 'John Smith',
      category: 'Architectural'
    },
    { 
      id: '550e8400-e29b-41d4-a716-446655440004', // Using UUID format
      title: 'Elevation North', 
      version: '1.0',
      status: 'Approved',
      lastModified: '2024-03-27T15:45:00Z',
      modifiedBy: 'Sarah Chen',
      category: 'Architectural'
    },
    { 
      id: '550e8400-e29b-41d4-a716-446655440005', // Using UUID format
      title: 'Structural Foundation', 
      version: '3.2',
      status: 'In Progress',
      lastModified: '2024-03-26T09:15:00Z',
      modifiedBy: 'Michael Brown',
      category: 'Structural'
    },
    { 
      id: '550e8400-e29b-41d4-a716-446655440006', // Using UUID format
      title: 'MEP Layout', 
      version: '1.5',
      status: 'For Review',
      lastModified: '2024-03-25T14:20:00Z',
      modifiedBy: 'Elena Rodriguez',
      category: 'MEP'
    },
    { 
      id: '550e8400-e29b-41d4-a716-446655440007', // Using UUID format
      title: 'Interior Finishes', 
      version: '1.0',
      status: 'Draft',
      lastModified: '2024-03-24T11:30:00Z',
      modifiedBy: 'David Kim',
      category: 'Interior'
    }
  ];

  return (
    <div className="space-y-4">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#A7CEBC]">
            <th className="text-left py-3 px-4 text-sm font-medium text-[#4C5760]">Title</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#4C5760]">Version</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#4C5760]">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#4C5760]">Last Modified</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#4C5760]">Category</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {drawings.map((drawing) => (
            <tr 
              key={drawing.id}
              className="border-b border-[#A7CEBC] hover:bg-gray-50 cursor-pointer"
              onClick={() => onDrawingClick(drawing.id)}
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#4C5760]" />
                  <span className="text-[#3A366E]">{drawing.title}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-[#4C5760]">{drawing.version}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  drawing.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  drawing.status === 'For Review' ? 'bg-yellow-100 text-yellow-800' :
                  drawing.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {drawing.status}
                </span>
              </td>
              <td className="py-3 px-4 text-[#4C5760]">
                {new Date(drawing.lastModified).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-[#4C5760]">{drawing.category}</td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onDrawingClick(drawing.id);
                    }}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};