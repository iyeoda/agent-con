import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui';
import { ArrowLeft, FileText, Calendar, User, MessageSquare, Download } from 'lucide-react';
import CommentsSection from './CommentsSection';
import { drawings } from '../mock-data/drawings';

const DrawingDetail = () => {
  const { projectId, drawingId } = useParams();
  const navigate = useNavigate();

  // Find the drawing from mock data
  const drawing = drawings.find(d => d.id === drawingId);

  if (!drawing) {
    return (
      <div className="p-6 text-center text-red-500">
        Drawing not found
      </div>
    );
  }

  const handleBack = () => {
    navigate(`/project/${projectId}/data`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[#4C5760]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">{drawing.name}</h1>
          <p className="text-[#4C5760]">Drawing ID: {drawing.id}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Drawing Preview */}
        <div className="lg:col-span-2">
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Drawing Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                {drawing.preview ? (
                  <img 
                    src={drawing.preview} 
                    alt={drawing.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <FileText className="h-12 w-12 text-[#4C5760]" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  drawing.status === 'current' ? 'bg-green-500' : 
                  drawing.status === 'pending' ? 'bg-yellow-500' : 
                  drawing.status === 'draft' ? 'bg-gray-500' : 'bg-red-500'
                }`} />
                <span className="text-[#4C5760] capitalize">{drawing.status}</span>
              </div>
            </CardContent>
          </Card>

          {/* Metadata Card */}
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-[#4C5760]">
                <Calendar className="h-4 w-4" />
                <span>Uploaded: {new Date(drawing.uploadedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <User className="h-4 w-4" />
                <span>By {drawing.uploadedBy}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <FileText className="h-4 w-4" />
                <span>Type: {drawing.type}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <span>Version: {drawing.version}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <span>Size: {(drawing.fileSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-[#4C5760] hover:bg-gray-50 rounded-md transition-colors">
                <Download className="h-4 w-4" />
                Download
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-[#4C5760] hover:bg-gray-50 rounded-md transition-colors">
                <MessageSquare className="h-4 w-4" />
                Add Comment
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection 
        entityType="drawing" 
        entityId={drawing.id} 
        projectId={projectId || ''} 
      />
    </div>
  );
};

export default DrawingDetail; 