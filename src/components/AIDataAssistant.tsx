import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui';
import { CheckCircle2 } from 'lucide-react';

export const AIDataAssistant = () => {
  return (
    <Card className="shadow-sm border-[#A7CEBC]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#3A366E] flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#D15F36]" />
          AI Data Assistant
        </CardTitle>
        <CardDescription>Let AI help organize and analyze your project data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-[#A7CEBC] rounded-lg text-left hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
            <h3 className="font-medium text-[#3A366E] mb-1">Find Missing Documents</h3>
            <p className="text-sm text-[#4C5760]">Identify required documents that are missing from your project</p>
          </button>
          <button className="p-4 border border-[#A7CEBC] rounded-lg text-left hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
            <h3 className="font-medium text-[#3A366E] mb-1">Organize by Discipline</h3>
            <p className="text-sm text-[#4C5760]">Automatically categorize documents by discipline and phase</p>
          </button>
          <button className="p-4 border border-[#A7CEBC] rounded-lg text-left hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
            <h3 className="font-medium text-[#3A366E] mb-1">Generate Submittal Log</h3>
            <p className="text-sm text-[#4C5760]">Create a complete submittal log based on project specifications</p>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};