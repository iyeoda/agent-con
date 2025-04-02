import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Activity, AlertTriangle, BarChart3, Calendar, CheckCircle, FileText, MessageSquare, Users } from 'lucide-react';

const ProjectDashboard: React.FC = () => {
  // Placeholder data
  const projectMetrics = {
    completion: 42,
    rfiCount: 23,
    openIssues: 7,
    documentsToReview: 15,
    upcomingDeadlines: 4,
    teamMembers: 28
  };

  const recentActivities = [
    { id: 1, type: 'document', user: 'Sarah Chen', action: 'uploaded', item: 'Revised Floor Plans', time: '2 hours ago' },
    { id: 2, type: 'comment', user: 'Mike Johnson', action: 'commented on', item: 'Steel Delivery Schedule', time: '3 hours ago' },
    { id: 3, type: 'issue', user: 'Elena Rodriguez', action: 'created issue', item: 'HVAC Conflicts in Section B', time: '5 hours ago' },
    { id: 4, type: 'approval', user: 'David Kim', action: 'approved', item: 'Change Order #42', time: 'Yesterday' }
  ];

  const upcomingDeadlines = [
    { id: 1, task: 'Submit Revised Building Permits', due: 'Apr 5', priority: 'high' },
    { id: 2, task: 'Complete Foundation Inspection', due: 'Apr 8', priority: 'high' },
    { id: 3, task: 'Finalize Material Orders', due: 'Apr 12', priority: 'medium' },
    { id: 4, task: 'Review Subcontractor Proposals', due: 'Apr 15', priority: 'medium' }
  ];

  const risks = [
    { id: 1, issue: 'Material Delivery Delays', impact: 'Schedule', severity: 'high' },
    { id: 2, issue: 'Design Conflicts in East Wing', impact: 'Quality', severity: 'medium' },
    { id: 3, issue: 'Weather Forecast for Next Week', impact: 'Schedule', severity: 'medium' }
  ];

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Project Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#3A366E]">Woodside Tower Project</h1>
          <p className="text-[#4C5760]">Phase: Construction • Location: Downtown • ID: WS-2025-104</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#D15F36] text-white rounded-md shadow-sm hover:bg-opacity-90">
            Create Report
          </button>
          <button className="px-4 py-2 border border-[#3A366E] text-[#3A366E] rounded-md shadow-sm hover:bg-opacity-5 hover:bg-[#3A366E]">
            Share
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.completion}%</div>
            <div className="text-[#4C5760] text-sm font-medium">Completion</div>
            <Progress className="mt-2 h-2 bg-gray-100" value={projectMetrics.completion} />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.rfiCount}</div>
            <div className="text-[#4C5760] text-sm font-medium">Open RFIs</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.openIssues}</div>
            <div className="text-[#4C5760] text-sm font-medium">Open Issues</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.documentsToReview}</div>
            <div className="text-[#4C5760] text-sm font-medium">Docs to Review</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.upcomingDeadlines}</div>
            <div className="text-[#4C5760] text-sm font-medium">Deadlines</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-[#A7CEBC]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-[#D15F36] font-bold text-2xl">{projectMetrics.teamMembers}</div>
            <div className="text-[#4C5760] text-sm font-medium">Team Members</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-gray-100">
                    {activity.type === 'document' && <FileText className="h-5 w-5 text-[#9C7C9C]" />}
                    {activity.type === 'comment' && <MessageSquare className="h-5 w-5 text-[#9C7C9C]" />}
                    {activity.type === 'issue' && <AlertTriangle className="h-5 w-5 text-[#9C7C9C]" />}
                    {activity.type === 'approval' && <CheckCircle className="h-5 w-5 text-[#9C7C9C]" />}
                    <div className="flex-grow">
                      <div className="text-[#3A366E]">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.item}</span>
                      </div>
                      <div className="text-xs text-[#4C5760]">{activity.time}</div>
                    </div>
                    <button className="text-xs px-2 py-1 bg-[#F7F5F2] text-[#3A366E] rounded">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <button className="text-sm text-[#3A366E] flex items-center">
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
                      {deadline.due}
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm font-medium text-[#3A366E]">{deadline.task}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <button className="text-sm text-[#3A366E] flex items-center">
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
                <button className="w-full flex items-center gap-3 p-3 rounded-md border border-[#A7CEBC] hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#3A366E] flex items-center justify-center text-white">
                    <Users size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-[#3A366E]">Project Manager</div>
                    <div className="text-xs text-[#4C5760]">Schedule & coordination assistance</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-md border border-[#A7CEBC] hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#3A366E] flex items-center justify-center text-white">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-[#3A366E]">Health & Safety</div>
                    <div className="text-xs text-[#4C5760]">Compliance & risk assessment</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-md border border-[#A7CEBC] hover:bg-[#A7CEBC] hover:bg-opacity-10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#3A366E] flex items-center justify-center text-white">
                    <BarChart3 size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-[#3A366E]">Commercial Manager</div>
                    <div className="text-xs text-[#4C5760]">Budget & cost tracking</div>
                  </div>
                </button>
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
    </div>
  );
};

export default ProjectDashboard;