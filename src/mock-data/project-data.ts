import { Project, Agent, Drawing, Task } from '../types';
import { ProjectData, AgentIconType, DrawingType, DrawingStatus, AgentResponseType, AgentActionType } from '../types';

// Project-specific data mapping
export const projectData: Record<string, ProjectData> = {
  "woodside": {
    agents: [
      {
        id: "agent-1",
        title: "Project Manager",
        icon: AgentIconType.UserCog,
        tasks: [],
        color: "#D15F36",
        description: "Schedule & coordination assistance",
        status: "active",
        type: AgentResponseType.STRUCTURED,
        capabilities: [
          AgentActionType.ADD_TO_DIRECTORY,
          AgentActionType.CREATE_REMINDER,
          AgentActionType.GENERATE_REPORT
        ],
        version: "1.0"
      },
      {
        id: "agent-2",
        title: "Health & Safety",
        icon: AgentIconType.Shield,
        tasks: [],
        color: "#3A366E",
        description: "Compliance & risk assessment",
        status: "active",
        type: AgentResponseType.STRUCTURED,
        capabilities: [
          AgentActionType.GENERATE_REPORT,
          AgentActionType.EXPORT_PDF,
          AgentActionType.CREATE_REMINDER
        ],
        version: "1.0"
      }
    ],
    drawings: [
      {
        id: "drawing-1",
        name: "Floor Plans",
        type: DrawingType.Architectural,
        version: "2.0",
        status: DrawingStatus.InReview,
        assignedTo: "Sarah Chen"
      },
      {
        id: "drawing-2",
        name: "Structural Details",
        type: DrawingType.Structural,
        version: "1.5",
        status: DrawingStatus.Approved,
        assignedTo: "Mike Johnson"
      }
    ],
    tasks: [
      {
        id: "task-1",
        name: "Review Floor Plans",
        status: "in_progress",
        assignedTo: "Sarah Chen"
      },
      {
        id: "task-2",
        name: "Update Safety Protocol",
        status: "pending",
        assignedTo: "Mike Johnson"
      }
    ],
    metrics: {
      completion: 42,
      rfiCount: 23,
      openIssues: 7,
      documentsToReview: 15,
      upcomingDeadlines: 4,
      teamMembers: 28
    },
    recentActivities: [
      { id: 1, type: 'document', user: 'Sarah Chen', action: 'uploaded', item: 'Revised Floor Plans', time: '2 hours ago' },
      { id: 2, type: 'comment', user: 'Mike Johnson', action: 'commented on', item: 'Steel Delivery Schedule', time: '3 hours ago' },
      { id: 3, type: 'issue', user: 'Elena Rodriguez', action: 'created issue', item: 'HVAC Conflicts in Section B', time: '5 hours ago' },
      { id: 4, type: 'approval', user: 'David Kim', action: 'approved', item: 'Change Order #42', time: 'Yesterday' }
    ],
    upcomingDeadlines: [
      { id: 1, task: 'Submit Revised Building Permits', due: 'Apr 5', priority: 'high' },
      { id: 2, task: 'Complete Foundation Inspection', due: 'Apr 8', priority: 'high' },
      { id: 3, task: 'Finalize Material Orders', due: 'Apr 12', priority: 'medium' },
      { id: 4, task: 'Review Subcontractor Proposals', due: 'Apr 15', priority: 'medium' }
    ],
    risks: [
      { id: 1, issue: 'Material Delivery Delays', impact: 'Schedule', severity: 'high' },
      { id: 2, issue: 'Design Conflicts in East Wing', impact: 'Quality', severity: 'medium' },
      { id: 3, issue: 'Weather Forecast for Next Week', impact: 'Schedule', severity: 'medium' }
    ]
  },
  "harbor": {
    agents: [
      {
        id: "agent-3",
        title: "Site Manager",
        icon: AgentIconType.Building2,
        tasks: [],
        color: "#3A366E",
        description: "Site management & coordination",
        status: "active",
        type: AgentResponseType.STRUCTURED,
        capabilities: [
          AgentActionType.ADD_TO_DIRECTORY,
          AgentActionType.GENERATE_REPORT,
          AgentActionType.EXPORT_EXCEL
        ],
        version: "1.0"
      },
      {
        id: "agent-4",
        title: "Environmental Specialist",
        icon: AgentIconType.Leaf,
        tasks: [],
        color: "#A7CEBC",
        description: "Environmental compliance & assessment",
        status: "active",
        type: AgentResponseType.UNSTRUCTURED,
        capabilities: [
          AgentActionType.EXPORT_PDF,
          AgentActionType.CREATE_REMINDER,
          AgentActionType.GENERATE_REPORT
        ],
        version: "1.0"
      }
    ],
    drawings: [
      {
        id: "drawing-3",
        name: "Site Survey",
        type: DrawingType.Survey,
        version: "1.0",
        status: DrawingStatus.InProgress,
        assignedTo: "John Smith"
      },
      {
        id: "drawing-4",
        name: "Environmental Impact",
        type: DrawingType.Environmental,
        version: "1.0",
        status: DrawingStatus.Draft,
        assignedTo: "Lisa Wong"
      }
    ],
    tasks: [
      {
        id: "task-3",
        name: "Complete Site Survey",
        status: "in_progress",
        assignedTo: "John Smith"
      },
      {
        id: "task-4",
        name: "Environmental Assessment",
        status: "pending",
        assignedTo: "Lisa Wong"
      }
    ],
    metrics: {
      completion: 15,
      rfiCount: 31,
      openIssues: 12,
      documentsToReview: 24,
      upcomingDeadlines: 7,
      teamMembers: 22
    },
    recentActivities: [
      { id: 1, type: 'document', user: 'John Smith', action: 'uploaded', item: 'Site Survey Report', time: '1 hour ago' },
      { id: 2, type: 'comment', user: 'Lisa Wong', action: 'commented on', item: 'Foundation Plan', time: '4 hours ago' },
      { id: 3, type: 'issue', user: 'Mark Davis', action: 'created issue', item: 'Soil Condition Assessment', time: '6 hours ago' },
      { id: 4, type: 'approval', user: 'Anna Lee', action: 'approved', item: 'Permit Application', time: 'Yesterday' }
    ],
    upcomingDeadlines: [
      { id: 1, task: 'Submit Environmental Impact Report', due: 'Apr 10', priority: 'high' },
      { id: 2, task: 'Complete Site Survey', due: 'Apr 14', priority: 'high' },
      { id: 3, task: 'Review Contractor Bids', due: 'Apr 18', priority: 'medium' },
      { id: 4, task: 'Finalize Design Documents', due: 'Apr 22', priority: 'medium' }
    ],
    risks: [
      { id: 1, issue: 'Environmental Permit Delays', impact: 'Schedule', severity: 'high' },
      { id: 2, issue: 'Soil Stability Concerns', impact: 'Quality', severity: 'high' },
      { id: 3, issue: 'Local Community Feedback', impact: 'Scope', severity: 'medium' }
    ]
  }
  // Add more projects as needed
}; 