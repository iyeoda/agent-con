import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui';
import { ArrowLeft, FileText, Calendar, User, Tag, MessageSquare, Download } from 'lucide-react';

const DrawingDetail = () => {
  const { projectId, drawingId } = useParams();
  const navigate = useNavigate();

  // Mock drawing data - replace with actual API call
  const drawing = {
    id: drawingId,
    title: 'Floor Plan A-101',
    version: '2.1',
    status: 'For Review',
    lastModified: '2024-03-28T10:30:00Z',
    modifiedBy: 'John Smith',
    tags: ['Architectural', 'Floor Plan', 'Level 1'],
    comments: [
      { 
        id: '550e8400-e29b-41d4-a716-446655440001',
        user: 'Sarah Chen', 
        text: 'Please update the window dimensions', 
        timestamp: '2024-03-28T09:15:00Z' 
      },
      { 
        id: '550e8400-e29b-41d4-a716-446655440002',
        user: 'John Smith', 
        text: 'Updated as requested', 
        timestamp: '2024-03-28T10:30:00Z' 
      }
    ]
  };

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
          <h1 className="text-3xl font-bold text-[#3A366E]">{drawing.title}</h1>
          <p className="text-[#4C5760]">Drawing ID: {drawingId}</p>
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
                <FileText className="h-12 w-12 text-[#4C5760]" />
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
                  drawing.status === 'For Review' ? 'bg-[#F8C630]' : 'bg-green-500'
                }`} />
                <span className="text-[#4C5760]">{drawing.status}</span>
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
                <span>Last modified: {new Date(drawing.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <User className="h-4 w-4" />
                <span>By {drawing.modifiedBy}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {drawing.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#F7F5F2] text-[#3A366E] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
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
      <Card className="border-[#A7CEBC]">
        <CardHeader>
          <CardTitle className="text-[#3A366E]">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drawing.comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#3A366E] text-white flex items-center justify-center">
                  {comment.user[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#3A366E]">{comment.user}</span>
                    <span className="text-sm text-[#4C5760]">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[#4C5760] mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingDetail; 