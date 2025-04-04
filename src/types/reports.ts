export type ReportCategory = 'Financial' | 'Progress' | 'Risk' | 'Quality' | 'Safety' | 'Schedule';
export type ReportFormat = 'Narrative' | 'Tabular' | 'Combined';

export interface Report {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  content: string;
  category: ReportCategory;
  format: ReportFormat;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  sharing: ReportShare[];
  tags: string[];
}

export interface ReportShare {
  userId: string;
  userName: string;
  role: 'Owner' | 'Editor' | 'Viewer';
}

export interface ReportFilters {
  search?: string;
  categories?: ReportCategory[];
  formats?: ReportFormat[];
} 