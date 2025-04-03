import React from 'react';
import { Card, CardContent } from './ui/card';
import { Drawing } from '../types';

interface DrawingsSectionProps {
  drawings: Drawing[];
}

const DrawingsSection: React.FC<DrawingsSectionProps> = ({ drawings }) => {
  return (
    <Card className="border-[#A7CEBC]">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Recent Drawings</h2>
        <div className="space-y-4">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#A7CEBC] hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-[#4C5760] text-lg">📄</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-[#3A366E]">{drawing.name}</h3>
                <p className="text-sm text-[#4C5760]">{drawing.type}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-[#4C5760]">v{drawing.version}</span>
                  <span className="text-xs text-[#4C5760]">•</span>
                  <span className="text-xs text-[#4C5760]">{drawing.status}</span>
                </div>
              </div>
            </div>
          ))}
          {drawings.length === 0 && (
            <p className="text-[#4C5760] text-center py-4">No drawings available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DrawingsSection; 