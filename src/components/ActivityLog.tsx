import React, { useState, useEffect } from 'react';
import { UserActivity } from '../types';
import { getActivitiesByProject, getRecentActivities } from '../mock-data/user-activities';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  Users, 
  Clock,
  Filter,
  Search
} from 'lucide-react';
import ActivityDetailsModal from './ActivityDetailsModal';

// Debug helper
const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[ActivityLog]', ...args);
  }
};

interface ActivityLogProps {
  projectId?: string;
  limit?: number;
  showFilters?: boolean;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ 
  projectId, 
  limit = 50,
  showFilters = true
}) => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionTypes, setSelectedActionTypes] = useState<string[]>([]);
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(null);

  // Get all unique action types and entity types from activities
  const actionTypes = Array.from(new Set(activities.map(activity => activity.action)));
  const entityTypes = Array.from(new Set(activities.map(activity => activity.entityType)));

  useEffect(() => {
    debug('ActivityLog mounted');
    
    try {
      let fetchedActivities: UserActivity[] = [];
      
      if (projectId) {
        debug('Fetching activities for project:', projectId);
        fetchedActivities = getActivitiesByProject(projectId);
      } else {
        debug('Fetching recent activities');
        fetchedActivities = getRecentActivities(limit);
      }
      
      setActivities(fetchedActivities);
      setFilteredActivities(fetchedActivities);
      setIsLoading(false);
    } catch (err) {
      debug('Error fetching activities:', err);
      setError('Failed to load activity data');
      setIsLoading(false);
    }
  }, [projectId, limit]);

  // Apply filters when search term, action types, or entity types change
  useEffect(() => {
    debug('Applying filters');
    
    let filtered = [...activities];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply action type filter
    if (selectedActionTypes.length > 0) {
      filtered = filtered.filter(activity => 
        selectedActionTypes.includes(activity.action)
      );
    }
    
    // Apply entity type filter
    if (selectedEntityTypes.length > 0) {
      filtered = filtered.filter(activity => 
        selectedEntityTypes.includes(activity.entityType)
      );
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(activity => 
        activity.entityType === activeTab
      );
    }
    
    setFilteredActivities(filtered);
  }, [activities, searchTerm, selectedActionTypes, selectedEntityTypes, activeTab]);

  // Toggle action type filter
  const toggleActionType = (actionType: string) => {
    setSelectedActionTypes(prev => 
      prev.includes(actionType)
        ? prev.filter(type => type !== actionType)
        : [...prev, actionType]
    );
  };

  // Toggle entity type filter
  const toggleEntityType = (entityType: string) => {
    setSelectedEntityTypes(prev => 
      prev.includes(entityType)
        ? prev.filter(type => type !== entityType)
        : [...prev, entityType]
    );
  };

  // Get icon for activity type
  const getActivityIcon = (activity: UserActivity) => {
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
  };

  // Format date for display
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (err) {
      return timestamp;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center text-[#4C5760]">
        Loading activity data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-[#A7CEBC]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#3A366E] flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#D15F36]" />
          Activity Log
        </CardTitle>
        <CardDescription>Complete history of user actions</CardDescription>
      </CardHeader>
      
      {showFilters && (
        <div className="px-6 pb-2">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7CEBC]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-2 border border-gray-200 rounded-md flex items-center gap-2 text-sm text-[#4C5760] hover:bg-gray-50"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedActionTypes([]);
                  setSelectedEntityTypes([]);
                  setActiveTab('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="bg-[#F7F5F2]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
              <TabsTrigger value="task">Tasks</TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="issue">Issues</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#4C5760]" />
              <span className="text-sm text-[#4C5760]">Actions:</span>
            </div>
            {actionTypes.map(actionType => (
              <button
                key={actionType}
                className={`px-2 py-1 text-xs rounded-md ${
                  selectedActionTypes.includes(actionType)
                    ? 'bg-[#D15F36] text-white'
                    : 'bg-gray-100 text-[#4C5760] hover:bg-gray-200'
                }`}
                onClick={() => toggleActionType(actionType)}
              >
                {actionType}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#4C5760]" />
              <span className="text-sm text-[#4C5760]">Types:</span>
            </div>
            {entityTypes.map(entityType => (
              <button
                key={entityType}
                className={`px-2 py-1 text-xs rounded-md ${
                  selectedEntityTypes.includes(entityType)
                    ? 'bg-[#D15F36] text-white'
                    : 'bg-gray-100 text-[#4C5760] hover:bg-gray-200'
                }`}
                onClick={() => toggleEntityType(entityType)}
              >
                {entityType}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="p-4 text-center text-[#4C5760]">
              No activities found matching your filters.
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getActivityIcon(activity)}
                  <div>
                    <div className="text-sm font-medium text-[#3A366E]">{activity.userName}</div>
                    <div className="text-sm text-[#4C5760]">
                      {activity.action} {activity.entityName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-[#4C5760]">{formatDate(activity.timestamp)}</div>
                  <button
                    className="text-[#D15F36] hover:text-[#B14D2A] text-sm font-medium"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <button className="text-sm text-[#3A366E] flex items-center">
          Export activity log
        </button>
      </CardFooter>

      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </Card>
  );
};

export default ActivityLog; 