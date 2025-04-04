import React from 'react';
import { UserActivity, RecentActivity } from '../types';
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  Users, 
  Clock,
  X
} from 'lucide-react';

interface ActivityDetailsModalProps {
  activity: UserActivity | RecentActivity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, onClose }) => {
  // Format date for detailed view
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (err) {
      return timestamp;
    }
  };

  // Get icon for activity type
  const getActivityIcon = (activity: UserActivity | RecentActivity) => {
    if ('entityType' in activity) {
      // UserActivity
      switch (activity.entityType) {
        case 'document':
          return <FileText className="h-5 w-5 text-[#9C7C9C]" />;
        case 'comment':
          return <MessageSquare className="h-5 w-5 text-[#9C7C9C]" />;
        case 'issue':
          return <AlertTriangle className="h-5 w-5 text-[#9C7C9C]" />;
        case 'task':
          return <CheckCircle className="h-5 w-5 text-[#9C7C9C]" />;
        case 'project':
          return <Activity className="h-5 w-5 text-[#9C7C9C]" />;
        case 'user':
          return <Users className="h-5 w-5 text-[#9C7C9C]" />;
        case 'calendar_event':
          return <Calendar className="h-5 w-5 text-[#9C7C9C]" />;
        case 'system':
          return <Clock className="h-5 w-5 text-[#9C7C9C]" />;
        default:
          return <Activity className="h-5 w-5 text-[#9C7C9C]" />;
      }
    } else {
      // RecentActivity
      switch (activity.type) {
        case 'document':
          return <FileText className="h-5 w-5 text-[#9C7C9C]" />;
        case 'comment':
          return <MessageSquare className="h-5 w-5 text-[#9C7C9C]" />;
        case 'issue':
          return <AlertTriangle className="h-5 w-5 text-[#9C7C9C]" />;
        case 'approval':
          return <CheckCircle className="h-5 w-5 text-[#9C7C9C]" />;
        default:
          return <Activity className="h-5 w-5 text-[#9C7C9C]" />;
      }
    }
  };

  // Check if activity is UserActivity
  const isUserActivity = (activity: UserActivity | RecentActivity): activity is UserActivity => {
    return 'entityType' in activity;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-[#3A366E]">Activity Details</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {getActivityIcon(activity)}
              <div>
                <div className="text-lg font-medium text-[#3A366E]">
                  {isUserActivity(activity) 
                    ? `${activity.userName} ${activity.action} ${activity.entityName}`
                    : `${activity.user} ${activity.action} ${activity.item}`
                  }
                </div>
                <div className="text-sm text-[#4C5760]">
                  {isUserActivity(activity) 
                    ? formatDate(activity.timestamp)
                    : activity.time
                  }
                </div>
              </div>
            </div>
            
            {isUserActivity(activity) ? (
              <>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">User</div>
                    <div className="text-[#3A366E]">{activity.userName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">User ID</div>
                    <div className="text-[#3A366E]">{activity.userId}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">Action</div>
                    <div className="text-[#3A366E]">{activity.action}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">Entity Type</div>
                    <div className="text-[#3A366E]">{activity.entityType}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">Entity Name</div>
                    <div className="text-[#3A366E]">{activity.entityName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#4C5760]">Entity ID</div>
                    <div className="text-[#3A366E]">{activity.entityId}</div>
                  </div>
                  {activity.projectId && (
                    <div>
                      <div className="text-sm font-medium text-[#4C5760]">Project</div>
                      <div className="text-[#3A366E]">{activity.projectName}</div>
                    </div>
                  )}
                  {activity.projectId && (
                    <div>
                      <div className="text-sm font-medium text-[#4C5760]">Project ID</div>
                      <div className="text-[#3A366E]">{activity.projectId}</div>
                    </div>
                  )}
                  {activity.ipAddress && (
                    <div>
                      <div className="text-sm font-medium text-[#4C5760]">IP Address</div>
                      <div className="text-[#3A366E]">{activity.ipAddress}</div>
                    </div>
                  )}
                  {activity.userAgent && (
                    <div>
                      <div className="text-sm font-medium text-[#4C5760]">User Agent</div>
                      <div className="text-[#3A366E]">{activity.userAgent}</div>
                    </div>
                  )}
                </div>
                
                {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-[#4C5760] mb-2">Additional Information</div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <div className="text-sm font-medium text-[#4C5760]">{key}</div>
                          <div className="text-[#3A366E]">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-sm font-medium text-[#4C5760]">User</div>
                  <div className="text-[#3A366E]">{activity.user}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#4C5760]">Action</div>
                  <div className="text-[#3A366E]">{activity.action}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#4C5760]">Item</div>
                  <div className="text-[#3A366E]">{activity.item}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#4C5760]">Type</div>
                  <div className="text-[#3A366E]">{activity.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#4C5760]">Time</div>
                  <div className="text-[#3A366E]">{activity.time}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              className="px-4 py-2 bg-[#D15F36] text-white rounded-md hover:bg-opacity-90"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal; 