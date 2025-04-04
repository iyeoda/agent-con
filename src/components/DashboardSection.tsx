import React, { useState, useEffect } from 'react';
import { Project, Agent, Drawing, Task, ProjectMetrics, RecentActivity, Deadline, Risk } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Activity, AlertTriangle, BarChart3, Calendar, CheckCircle, FileText, MessageSquare, Users, UserPlus, History } from 'lucide-react';
import { projectData } from '../mock-data/project-data';
import { useNavigate } from 'react-router-dom';
import ActivityLog from './ActivityLog';
import ActivityDetailsModal from './ActivityDetailsModal';

// Debug helper
const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DashboardSection]', ...args);
  }
};

interface DashboardSectionProps {
  selectedProject: Project;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ selectedProject }) => {
  const navigate = useNavigate();
  debug('DashboardSection rendered with project:', selectedProject);

  const [projectAgents, setProjectAgents] = useState<Agent[]>([]);
  const [projectDrawings, setProjectDrawings] = useState<Drawing[]>([]);
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<Deadline[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedActivity, setSelectedActivity] = useState<RecentActivity | null>(null);

  useEffect(() => {
    debug('DashboardSection mounted');
    debug('Selected Project:', selectedProject);
    debug('Project Data:', projectData);
    
    if (selectedProject && selectedProject.id) {
      const data = projectData[selectedProject.id];
      debug('Project Data for ID:', data);
      
      if (data) {
        setProjectAgents(data.agents);
        setProjectDrawings(data.drawings);
        setProjectTasks(data.tasks);
        setMetrics(data.metrics);
        setRecentActivities(data.recentActivities);
        setUpcomingDeadlines(data.upcomingDeadlines);
        setRisks(data.risks);
        setIsLoading(false);
      } else {
        debug('ERROR: No data found for project ID:', selectedProject.id);
        setError(`No data found for project ${selectedProject.name}`);
        setIsLoading(false);
      }
    }
  }, [selectedProject]);

  if (isLoading) {
    debug('Rendering loading state');
    return (
      <div className="p-6">
        <div className="text-center text-[#4C5760]">Loading project data...</div>
      </div>
    );
  }

  if (error) {
    debug('Rendering error state:', error);
    return (
      <div className="p-6">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  debug('Rendering dashboard content with:', {
    tasksCount: projectTasks.length,
    metrics,
    activitiesCount: recentActivities.length,
    deadlinesCount: upcomingDeadlines.length,
    risksCount: risks.length,
    drawingsCount: projectDrawings.length
  });

  if (!selectedProject) {
    return <div>No project selected</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Project Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">{selectedProject.name}</h1>
          <p className="text-[#4C5760]">Phase: {selectedProject.phase} • Location: {selectedProject.location} • ID: {selectedProject.id}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#D15F36] text-white rounded-md shadow-sm hover:bg-opacity-90 flex items-center gap-2">
            <UserPlus size={16} />
            Invite User
          </button>
          <button className="px-4 py-2 bg-[#D15F36] text-white rounded-md shadow-sm hover:bg-opacity-90">
            Create Report
          </button>
          <button className="px-4 py-2 border border-[#3A366E] text-[#3A366E] rounded-md shadow-sm hover:bg-opacity-5 hover:bg-[#3A366E]">
            Share
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-[#A7CEBC]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#A7CEBC] data-[state=active]:text-[#3A366E]">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-[#A7CEBC] data-[state=active]:text-[#3A366E]">
            <History size={16} className="mr-2" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4">
          {/* Quick Metrics Row */}
          {metrics && (
            <div className="grid grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.completion}%</div>
                <div className="text-sm text-[#4C5760]">Completion</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.rfiCount}</div>
                <div className="text-sm text-[#4C5760]">Open RFIs</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.openIssues}</div>
                <div className="text-sm text-[#4C5760]">Open Issues</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.documentsToReview}</div>
                <div className="text-sm text-[#4C5760]">Docs to Review</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.upcomingDeadlines}</div>
                <div className="text-sm text-[#4C5760]">Deadlines</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#A7CEBC] flex flex-col items-center">
                <div className="text-2xl font-bold text-[#D15F36]">{metrics.teamMembers}</div>
                <div className="text-sm text-[#4C5760]">Team Members</div>
              </div>
            </div>
          )}

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Insights */}
              <Card className="shadow-sm border-[#A7CEBC]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#3A366E] flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#D15F36]" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>What your AI team has detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="risks">
                    <TabsList className="bg-[#F7F5F2]">
                      <TabsTrigger value="risks">Risks</TabsTrigger>
                      <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="risks" className="mt-4 space-y-4">
                      {risks.map(risk => (
                        <div key={risk.id} className="flex items-start gap-2 py-2 border-b border-gray-100">
                          <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                            risk.severity === 'high' ? 'text-[#D15F36]' : 'text-[#F8C630]'
                          }`} />
                          <div className="flex-grow">
                            <div className="font-medium text-[#3A366E]">{risk.issue}</div>
                            <div className="text-sm text-[#4C5760]">Impact: {risk.impact}</div>
                          </div>
                          <button className="text-xs px-2 py-1 bg-[#F7F5F2] text-[#3A366E] rounded">
                            Details
                          </button>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="opportunities">
                      <div className="p-4 text-center text-[#4C5760]">
                        No new opportunities detected in the last 24 hours.
                      </div>
                    </TabsContent>
                    <TabsContent value="questions">
                      <div className="p-4 text-center text-[#4C5760]">
                        All questions have been routed to the appropriate team members.
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <button className="text-sm text-[#3A366E] flex items-center">
                    View all insights
                  </button>
                </CardFooter>
              </Card>

              {/* Timeline & Activity */}
              <Card className="shadow-sm border-[#A7CEBC]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#3A366E] flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#D15F36]" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest updates across your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-[#9C7C9C]">
                            {activity.type === 'document' && <FileText className="h-5 w-5" />}
                            {activity.type === 'comment' && <MessageSquare className="h-5 w-5" />}
                            {activity.type === 'issue' && <AlertTriangle className="h-5 w-5" />}
                            {activity.type === 'approval' && <CheckCircle className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#3A366E]">{activity.user}</div>
                            <div className="text-sm text-[#4C5760]">
                              {activity.action} {activity.item}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#4C5760]">{activity.time}</div>
                          <button
                            className="text-[#D15F36] hover:text-[#B14D2A] text-sm font-medium"
                            onClick={() => setSelectedActivity(activity)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button 
                    className="text-sm text-[#3A366E] flex items-center"
                    onClick={() => navigate(`/project/${selectedProject.id}/activity`)}
                  >
                    View all activity
                  </button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <Card className="shadow-sm border-[#A7CEBC]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#3A366E] flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#D15F36]" />
                    Upcoming Deadlines
                  </CardTitle>
                  <CardDescription>Tasks due in the next 14 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map(deadline => (
                      <div key={deadline.id} className="flex items-start gap-3 py-2 border-b border-gray-100">
                        <div className={`px-2 py-1 rounded text-xs ${
                          deadline.priority === 'high' 
                            ? 'bg-[#D15F36] bg-opacity-10 text-[#D15F36]'
                            : 'bg-[#F8C630] bg-opacity-10 text-[#F8C630]'
                        }`}>
                          {deadline.dueDate}
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-medium text-[#3A366E]">{deadline.task}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button 
                    className="text-sm text-[#3A366E] flex items-center"
                    onClick={() => navigate(`/project/${selectedProject.id}/calendar`)}
                  >
                    View calendar
                  </button>
                </CardFooter>
              </Card>

              {/* Ask AI */}
              <Card className="shadow-sm border-[#A7CEBC]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#3A366E]">Ask Your AI Team</CardTitle>
                  <CardDescription>Quick access to your AI assistants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectAgents.slice(0, 3).map(agent => (
                      <button key={agent.id} className="w-full flex items-center gap-3 p-3 rounded-md border border-[#A7CEBC] hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: agent.color }}>
                          {agent.icon === 'UserCog' && <Users size={16} className="text-white" />}
                          {agent.icon === 'ShieldAlert' && <AlertTriangle size={16} className="text-white" />}
                          {agent.icon === 'BarChart' && <BarChart3 size={16} className="text-white" />}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-[#3A366E]">{agent.title}</div>
                          <div className="text-xs text-[#4C5760]">{agent.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-sm text-[#3A366E] flex items-center">
                    View all agents
                  </button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="mt-4">
          <ActivityLog projectId={selectedProject.id} limit={100} />
        </TabsContent>
      </Tabs>

      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </div>
  );
};

export default DashboardSection; 