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
  "550e8400-e29b-41d4-a716-446655440000": {
    agents,
    drawings,
    tasks: [
      {
        id: "550e8400-e29b-41d4-a716-446655440008",
        name: "Review structural drawings",
        description: "Complete review of latest structural drawings from engineering team"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440009",
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
        id: "550e8400-e29b-41d4-a716-446655440010",
        type: "document",
        user: "Sarah Chen",
        action: "uploaded",
        item: "Foundation Details Rev.2",
        time: "2 hours ago"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        type: "comment",
        user: "James Wilson",
        action: "commented on",
        item: "RFI #123",
        time: "3 hours ago"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440012",
        type: "approval",
        user: "Maria Garcia",
        action: "approved",
        item: "Change Order #45",
        time: "5 hours ago"
      }
    ],
    upcomingDeadlines: [
      {
        id: "550e8400-e29b-41d4-a716-446655440013",
        task: "Submit revised drawings",
        dueDate: "2024-03-20",
        assignedTo: "Engineering Team",
        priority: "high"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440014",
        task: "Safety audit report",
        dueDate: "2024-03-22",
        assignedTo: "Safety Team",
        priority: "medium"
      }
    ],
    risks: [
      {
        id: "550e8400-e29b-41d4-a716-446655440015",
        issue: "Potential delay in steel delivery",
        impact: "May affect construction schedule by 2 weeks",
        severity: "high"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440016",
        issue: "Weather forecast shows heavy rain",
        impact: "Could delay concrete pour",
        severity: "medium"
      }
    ]
  },
  "550e8400-e29b-41d4-a716-446655440001": {
    agents,
    drawings,
    tasks: [
      {
        id: "550e8400-e29b-41d4-a716-446655440017",
        name: "Review foundation plans",
        description: "Review and approve foundation design plans"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440018",
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
        id: "550e8400-e29b-41d4-a716-446655440019",
        type: "document",
        user: "John Smith",
        action: "uploaded",
        item: "Environmental Report",
        time: "1 hour ago"
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440020",
        type: "comment",
        user: "Emma Wilson",
        action: "commented on",
        item: "Foundation Design",
        time: "2 hours ago"
      }
    ],
    upcomingDeadlines: [
      {
        id: "550e8400-e29b-41d4-a716-446655440021",
        task: "Submit environmental report",
        dueDate: "2024-03-25",
        assignedTo: "Environmental Team",
        priority: "high"
      }
    ],
    risks: [
      {
        id: "550e8400-e29b-41d4-a716-446655440022",
        issue: "Soil contamination risk",
        impact: "May require additional remediation",
        severity: "high"
      }
    ]
  }
}; 