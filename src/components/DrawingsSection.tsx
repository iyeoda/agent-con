import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Drawing } from '../types';

interface DrawingsSectionProps {
  drawings?: Drawing[];
}

const DrawingsSection: React.FC<DrawingsSectionProps> = ({ drawings = [] }) => {
  return (
    <div className="p-6">
      <Card className="shadow-sm border-[#A7CEBC]">
        <CardHeader>
          <CardTitle className="text-[#3A366E]">Project Drawings</CardTitle>
        </CardHeader>
        <CardContent>
          {drawings.length === 0 ? (
            <div className="text-center text-[#4C5760] py-8">
              No drawings available for this project.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drawings.map((drawing) => (
                <Card key={drawing.id} className="shadow-sm border-[#A7CEBC]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[#3A366E] mb-1">{drawing.name}</h4>
                        <p className="text-sm text-[#4C5760]">Type: {drawing.type}</p>
                        <p className="text-sm text-[#4C5760]">Status: {drawing.status}</p>
                        <p className="text-sm text-[#4C5760]">Version: {drawing.version}</p>
                      </div>
                      <div className="text-xs text-[#4C5760]">
                        {new Date(drawing.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingsSection; 