import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { ArrowLeft, Calendar, User, Tag, FileText, Clock, MapPin } from 'lucide-react';
import Badge from '../ui/badge';
import CommentsSection from '../CommentsSection';
import { mockWorkspaceItems } from '../../mock-data/workspace-data';
import { WorkspaceItem } from '../../types';

const WorkspaceItemDetail = () => {
  const { projectId, itemId } = useParams();
  const navigate = useNavigate();

  // Find the item from mock data
  const projectItems = mockWorkspaceItems[projectId || ''];
  const item = projectItems?.find(i => i.id === itemId);

  if (!item) {
    return (
      <div className="p-6 text-center text-red-500">
        Item not found
      </div>
    );
  }

  const handleBack = () => {
    navigate(`/project/${projectId}/workspace`);
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
          <h1 className="text-3xl font-bold text-[#3A366E]">{item.title}</h1>
          <p className="text-[#4C5760]">Item ID: {item.id}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Item Details */}
        <div className="lg:col-span-2">
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              {item.description && (
                <div>
                  <h3 className="text-lg font-medium text-[#3A366E] mb-2">Description</h3>
                  <p className="text-[#4C5760] whitespace-pre-wrap">{item.description}</p>
                </div>
              )}

              {/* Status and Priority */}
              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-medium text-[#3A366E] mb-2">Status</h3>
                  <Badge className={`
                    ${item.status === 'open' ? 'bg-blue-100 text-blue-800' : ''}
                    ${item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${item.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${item.status === 'overdue' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#3A366E] mb-2">Priority</h3>
                  <Badge className={`
                    ${item.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                    ${item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${item.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                  `}>
                    {item.priority}
                  </Badge>
                </div>
              </div>

              {/* Progress */}
              {item.progress !== undefined && (
                <div>
                  <h3 className="text-lg font-medium text-[#3A366E] mb-2">Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-[#D15F36] h-2.5 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-[#4C5760] mt-1">{item.progress}% complete</p>
                </div>
              )}

              {/* Time Tracking */}
              {(item.estimatedHours || item.actualHours) && (
                <div>
                  <h3 className="text-lg font-medium text-[#3A366E] mb-2">Time Tracking</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {item.estimatedHours && (
                      <div className="flex items-center gap-2 text-[#4C5760]">
                        <Clock className="h-4 w-4" />
                        <span>Estimated: {item.estimatedHours} hours</span>
                      </div>
                    )}
                    {item.actualHours && (
                      <div className="flex items-center gap-2 text-[#4C5760]">
                        <Clock className="h-4 w-4" />
                        <span>Actual: {item.actualHours} hours</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <Card className="border-[#A7CEBC]">
            <CardHeader>
              <CardTitle className="text-[#3A366E]">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-[#4C5760]">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4C5760]">
                <User className="h-4 w-4" />
                <span>By {item.createdBy}</span>
              </div>
              {item.dueDate && (
                <div className="flex items-center gap-2 text-[#4C5760]">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                </div>
              )}
              {item.time && (
                <div className="flex items-center gap-2 text-[#4C5760]">
                  <Clock className="h-4 w-4" />
                  <span>Time: {item.time}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-2 text-[#4C5760]">
                  <MapPin className="h-4 w-4" />
                  <span>Location: {item.location}</span>
                </div>
              )}
              {item.duration && (
                <div className="flex items-center gap-2 text-[#4C5760]">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {item.duration}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags Card */}
          {item.tags.length > 0 && (
            <Card className="border-[#A7CEBC]">
              <CardHeader>
                <CardTitle className="text-[#3A366E]">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      className="bg-[#A7CEBC] bg-opacity-20 text-[#3A366E]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Documents Card */}
          {item.relatedDocuments && item.relatedDocuments.length > 0 && (
            <Card className="border-[#A7CEBC]">
              <CardHeader>
                <CardTitle className="text-[#3A366E]">Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {item.relatedDocuments.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 text-[#4C5760]"
                    >
                      <FileText className="h-4 w-4" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection 
        entityType="workspace_item" 
        entityId={item.id} 
        projectId={projectId || ''} 
      />
    </div>
  );
};

export default WorkspaceItemDetail; 