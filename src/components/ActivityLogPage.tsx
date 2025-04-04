import React from 'react';
import { useParams } from 'react-router-dom';
import ActivityLog from './ActivityLog';

interface ActivityLogPageProps {
  projectId?: string;
}

const ActivityLogPage: React.FC<ActivityLogPageProps> = ({ projectId: propProjectId }) => {
  const { projectId: urlProjectId } = useParams();
  const projectId = propProjectId || urlProjectId;

  if (!projectId) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: No project ID provided</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#3A366E]">Activity Log</h1>
        <p className="text-[#4C5760] mt-1">View and filter all activities for this project</p>
      </div>
      <ActivityLog projectId={projectId} limit={1000} showFilters={true} />
    </div>
  );
};

export default ActivityLogPage; 