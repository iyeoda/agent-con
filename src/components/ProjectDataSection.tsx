import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, CardContent, CardFooter, CardHeader,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Input, Button,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from './ui';
import { ChevronDown, FileText, FolderOpen, Plus, Search, Upload, Users } from 'lucide-react';
import { DrawingsTable } from './DrawingsTable';
import { CompaniesTable } from './CompaniesTable';
import { PeopleTable } from './PeopleTable';
import { AIDataAssistant } from './AIDataAssistant';

const ProjectDataSection = () => {
  const [activeTab, setActiveTab] = useState('drawings');
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleDrawingClick = (drawingId: string) => {
    navigate(`/project/${projectId}/data/drawings/${drawingId}`);
  };

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">Project Data</h1>
          <p className="text-[#4C5760]">Project ID: {projectId}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#D15F36] text-white rounded-md shadow-sm hover:bg-opacity-90 flex items-center gap-2">
            <Upload size={16} />
            Upload Files
          </button>
          <button className="px-4 py-2 border border-[#3A366E] text-[#3A366E] rounded-md shadow-sm hover:bg-opacity-5 hover:bg-[#3A366E] flex items-center gap-2">
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>
      
      {/* Main Content Area with Tabs */}
      <Card className="shadow-sm border-[#A7CEBC]">
        <CardHeader className="pb-0">
          <Tabs defaultValue="drawings" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-[#F7F5F2] border-b w-full justify-start rounded-none h-12 px-6">
              <TabsTrigger value="drawings" className="data-[state=active]:text-[#D15F36] data-[state=active]:border-b-2 data-[state=active]:border-[#D15F36] rounded-none">
                <FileText className="h-4 w-4 mr-2" />
                Drawings
              </TabsTrigger>
              <TabsTrigger value="companies" className="data-[state=active]:text-[#D15F36] data-[state=active]:border-b-2 data-[state=active]:border-[#D15F36] rounded-none">
                <FolderOpen className="h-4 w-4 mr-2" />
                Companies
              </TabsTrigger>
              <TabsTrigger value="people" className="data-[state=active]:text-[#D15F36] data-[state=active]:border-b-2 data-[state=active]:border-[#D15F36] rounded-none">
                <Users className="h-4 w-4 mr-2" />
                People
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="pt-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder={`Search ${activeTab}...`} 
                className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#A7CEBC]">
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Items</DropdownMenuItem>
                  <DropdownMenuItem>Recent Items</DropdownMenuItem>
                  <DropdownMenuItem>Favorites</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#A7CEBC]">
                    Sort By
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Tab Content */}
          <Tabs defaultValue="drawings" value={activeTab} className="w-full">
            <TabsContent value="drawings" className="m-0">
              <DrawingsTable onDrawingClick={handleDrawingClick} />
            </TabsContent>
            
            <TabsContent value="companies" className="m-0">
              <CompaniesTable />
            </TabsContent>
            
            <TabsContent value="people" className="m-0">
              <PeopleTable />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-[#4C5760]">
            Showing 5 of 24 items
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-[#A7CEBC]">Previous</Button>
            <Button variant="outline" className="border-[#A7CEBC]">Next</Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* AI Helper Section */}
      <AIDataAssistant />
    </div>
  );
};

export default ProjectDataSection;