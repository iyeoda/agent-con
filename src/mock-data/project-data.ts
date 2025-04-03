import { Project, Drawing, Task, ProjectMetrics, RecentActivity, Deadline, Risk, Agent } from '../types';
import { agents } from './agents';
import { drawings } from './drawings';

interface ProjectData {
  agents: Agent[];
  drawings: Drawing[];
  tasks: Task[];
  metrics: ProjectMetrics;
  recentActivities: RecentActivity[];
  upcomingDeadlines: Deadline[];
  risks: Risk[];
}

export const projectData: Record<string, ProjectData> = {
  "woodside": {
    agents,
    drawings,
    tasks: [
      {
        id: "task-1",
        name: "Review structural drawings",
        description: "Complete review of latest structural drawings from engineering team"
      },
      {
        id: "task-2",
        name: "Update project schedule",
        description: "Incorporate latest changes and delays into master schedule"
      }
    ],
    metrics: {
      completion: 65,
      rfiCount: 12,
      openIssues: 8,
      documentsToReview: 15,
      upcomingDeadlines: 5,
      teamMembers: 24
    },
    recentActivities: [
      {
        id: "act-1",
        type: "document",
        user: "Sarah Chen",
        action: "uploaded",
        item: "Foundation Details Rev.2",
        time: "2 hours ago"
      },
      {
        id: "act-2",
        type: "comment",
        user: "James Wilson",
        action: "commented on",
        item: "RFI #123",
        time: "3 hours ago"
      },
      {
        id: "act-3",
        type: "approval",
        user: "Maria Garcia",
        action: "approved",
        item: "Change Order #45",
        time: "5 hours ago"
      }
    ],
    upcomingDeadlines: [
      {
        id: "dead-1",
        task: "Submit revised drawings",
        dueDate: "2024-03-20",
        assignedTo: "Engineering Team",
        priority: "high"
      },
      {
        id: "dead-2",
        task: "Safety audit report",
        dueDate: "2024-03-22",
        assignedTo: "Safety Team",
        priority: "medium"
      }
    ],
    risks: [
      {
        id: "risk-1",
        issue: "Potential delay in steel delivery",
        impact: "May affect construction schedule by 2 weeks",
        severity: "high"
      },
      {
        id: "risk-2",
        issue: "Weather forecast shows heavy rain",
        impact: "Could delay concrete pour",
        severity: "medium"
      }
    ]
  },
  "harbor": {
    agents,
    drawings,
    tasks: [
      {
        id: "task-1",
        name: "Review foundation plans",
        description: "Review and approve foundation design plans"
      },
      {
        id: "task-2",
        name: "Environmental assessment",
        description: "Complete environmental impact assessment"
      }
    ],
    metrics: {
      completion: 45,
      rfiCount: 8,
      openIssues: 5,
      documentsToReview: 10,
      upcomingDeadlines: 3,
      teamMembers: 18
    },
    recentActivities: [
      {
        id: "act-1",
        type: "document",
        user: "John Smith",
        action: "uploaded",
        item: "Environmental Report",
        time: "1 hour ago"
      },
      {
        id: "act-2",
        type: "comment",
        user: "Emma Wilson",
        action: "commented on",
        item: "Foundation Design",
        time: "2 hours ago"
      }
    ],
    upcomingDeadlines: [
      {
        id: "dead-1",
        task: "Submit environmental report",
        dueDate: "2024-03-25",
        assignedTo: "Environmental Team",
        priority: "high"
      }
    ],
    risks: [
      {
        id: "risk-1",
        issue: "Soil contamination risk",
        impact: "May require additional remediation",
        severity: "high"
      }
    ]
  }
}; 