import { Drawing, DrawingType, DrawingStatus } from '../types';

export const drawings: Drawing[] = [
  {
    id: "DWG-001",
    name: "Foundation Plan",
    type: "structural",
    status: "current",
    version: "2.0",
    uploadedBy: "James Wilson",
    uploadedAt: "2024-03-15T10:30:00Z",
    fileSize: 2500000,
    preview: "/drawings/foundation-plan.png"
  },
  {
    id: "DWG-002",
    name: "Electrical Layout",
    type: "electrical",
    status: "current",
    version: "1.5",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2024-03-14T15:45:00Z",
    fileSize: 1800000,
    preview: "/drawings/electrical-layout.png"
  },
  {
    id: "DWG-003",
    name: "HVAC System",
    type: "mechanical",
    status: "pending",
    version: "1.0",
    uploadedBy: "Maria Garcia",
    uploadedAt: "2024-03-13T09:15:00Z",
    fileSize: 3200000,
    preview: "/drawings/hvac-system.png"
  }
]; 