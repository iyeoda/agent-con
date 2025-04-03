import { WorkspaceItem } from '../types';

// Debug check to ensure data is properly structured
console.log('Workspace Data: Initializing workspace items');

// Define the mock data with proper typing
export const mockWorkspaceItems: Record<string, WorkspaceItem[]> = {
  "550e8400-e29b-41d4-a716-446655440000": [
    {
      id: "1",
      title: "Review structural drawings for Level 3",
      description: "Complete detailed review of structural drawings for Level 3, focusing on beam connections and column placement",
      category: "task",
      assignee: "John Smith",
      status: "in_progress",
      priority: "high",
      dueDate: "2025-04-05",
      time: "14:00",
      duration: "2 hours",
      location: "Office",
      createdAt: "2024-03-15T10:00:00Z",
      createdBy: "Sarah Chen",
      tags: ["structural", "review", "level-3"],
      relatedDocuments: ["L3-STR-001", "L3-STR-002"],
      projectId: "550e8400-e29b-41d4-a716-446655440000",
      progress: 60,
      estimatedHours: 4,
      actualHours: 2.5
    },
    {
      id: "2",
      title: "MEP clash detection query from AI Assistant",
      description: "AI system identified potential clashes between HVAC ducts and fire sprinkler system in the east wing",
      category: "query",
      assignee: "Mike Johnson",
      status: "open",
      priority: "medium",
      dueDate: "2025-04-07",
      time: "10:00",
      duration: "1 hour",
      location: "Site A",
      createdAt: "2024-03-16T09:30:00Z",
      createdBy: "AI System",
      tags: ["mep", "clash-detection", "ai-generated"],
      projectId: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      id: "3",
      title: "Prepare for subcontractor coordination meeting",
      description: "Organize meeting with MEP and structural subcontractors to discuss Level 3 coordination",
      category: "event",
      assignee: "Sarah Chen",
      status: "open",
      priority: "medium",
      dueDate: "2025-04-10",
      time: "13:00",
      duration: "2 hours",
      location: "Conference Room B",
      createdAt: "2024-03-16T11:00:00Z",
      createdBy: "Sarah Chen",
      tags: ["meeting", "coordination", "subcontractors"],
      projectId: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      id: "4",
      title: "Review procurement schedule for Q2",
      description: "Review and update procurement schedule for Q2 2025, focusing on long-lead items",
      category: "task",
      assignee: "John Smith",
      status: "overdue",
      priority: "high",
      dueDate: "2025-04-01",
      time: "15:00",
      duration: "3 hours",
      location: "Office",
      createdAt: "2024-03-10T14:00:00Z",
      createdBy: "Elena Rodriguez",
      tags: ["procurement", "schedule", "q2"],
      projectId: "550e8400-e29b-41d4-a716-446655440000",
      progress: 0,
      estimatedHours: 3,
      actualHours: 0
    },
    {
      id: "5",
      title: "AI insight: Design changes impacting schedule",
      description: "AI analysis suggests recent design changes may impact project timeline by 2-3 weeks",
      category: "insight",
      assignee: "Project Team",
      status: "open",
      priority: "high",
      createdAt: "2024-03-17T08:00:00Z",
      createdBy: "AI System",
      tags: ["ai-insight", "schedule-impact", "design-change"],
      projectId: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      id: "6",
      title: "Update BIM model with latest architectural changes",
      description: "Incorporate recent architectural revisions into the master BIM model",
      category: "task",
      assignee: "Mike Johnson",
      status: "completed",
      priority: "medium",
      dueDate: "2025-03-20",
      time: "11:00",
      duration: "4 hours",
      location: "Office",
      createdAt: "2024-03-15T13:00:00Z",
      createdBy: "Sarah Chen",
      tags: ["bim", "architecture", "model-update"],
      projectId: "550e8400-e29b-41d4-a716-446655440000",
      progress: 100,
      estimatedHours: 4,
      actualHours: 3.5
    },
    {
      id: "7",
      title: "Site safety inspection report review",
      description: "Review monthly safety inspection report and address identified issues",
      category: "task",
      assignee: "Elena Rodriguez",
      status: "in_progress",
      priority: "high",
      dueDate: "2025-04-15",
      time: "09:00",
      duration: "2 hours",
      location: "Site A",
      createdAt: "2024-03-16T15:00:00Z",
      createdBy: "John Smith",
      tags: ["safety", "inspection", "monthly-review"],
      projectId: "550e8400-e29b-41d4-a716-446655440000",
      progress: 30,
      estimatedHours: 2,
      actualHours: 0.5
    },
    {
      id: "8",
      title: "Quality control checklist for concrete pour",
      description: "Prepare and review quality control checklist for upcoming Level 4 concrete pour",
      category: "task",
      assignee: "Sarah Chen",
      status: "open",
      priority: "medium",
      dueDate: "2025-04-12",
      time: "10:00",
      duration: "1 hour",
      location: "Site A",
      createdAt: "2024-03-17T09:00:00Z",
      createdBy: "Elena Rodriguez",
      tags: ["quality-control", "concrete", "checklist"],
      projectId: "550e8400-e29b-41d4-a716-446655440000",
      progress: 0,
      estimatedHours: 1,
      actualHours: 0
    }
  ]
};

// Debug check to ensure data is properly structured
console.log('Mock data initialized:', {
  hasData: !!mockWorkspaceItems,
  projectIds: Object.keys(mockWorkspaceItems),
  itemCount: mockWorkspaceItems["550e8400-e29b-41d4-a716-446655440000"]?.length || 0
});

// Type check helper
const isWorkspaceItem = (item: any): item is WorkspaceItem => {
  return (
    typeof item === 'object' &&
    'id' in item &&
    'title' in item &&
    'category' in item &&
    'status' in item &&
    'priority' in item
  );
};

// Validate mock data structure
const validateMockData = () => {
  const projectItems = mockWorkspaceItems["550e8400-e29b-41d4-a716-446655440000"];
  if (!Array.isArray(projectItems)) {
    console.error('Project items is not an array');
    return false;
  }
  
  const validItems = projectItems.every(isWorkspaceItem);
  if (!validItems) {
    console.error('Some items do not match WorkspaceItem type');
    return false;
  }
  
  return true;
};

// Run validation
console.log('Mock data validation:', validateMockData()); 