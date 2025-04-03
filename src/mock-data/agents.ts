import { Agent, AgentIconType } from '../types';

export const agents: Agent[] = [
  {
    id: 'pm-001',
    title: 'Project Manager',
    description: 'Coordinates project activities, schedules, and resources',
    color: '#3A366E',
    icon: 'UserCog',
    tasks: [
      {
        id: 'pm-task-1',
        name: 'Review Project Schedule',
        description: 'Review and update project timeline and milestones'
      },
      {
        id: 'pm-task-2',
        name: 'Resource Allocation',
        description: 'Manage and optimize resource distribution'
      },
      {
        id: 'pm-task-3',
        name: 'Risk Assessment',
        description: 'Identify and evaluate project risks'
      },
      {
        id: 'pm-task-4',
        name: 'Progress Tracking',
        description: 'Monitor and report project progress'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['schedule_management', 'resource_planning', 'risk_assessment'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'cm-001',
    title: 'Commercial Manager',
    description: 'Manages project finances, contracts, and procurement',
    color: '#D15F36',
    icon: 'BarChart',
    tasks: [
      {
        id: 'cm-task-1',
        name: 'Cost Analysis',
        description: 'Analyze project costs and financial performance'
      },
      {
        id: 'cm-task-2',
        name: 'Budget Forecast',
        description: 'Prepare and update budget forecasts'
      },
      {
        id: 'cm-task-3',
        name: 'Procurement Strategy',
        description: 'Develop and implement procurement plans'
      },
      {
        id: 'cm-task-4',
        name: 'Contract Review',
        description: 'Review and manage project contracts'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['financial_analysis', 'contract_management', 'procurement'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'ce-001',
    title: 'Contract Expert',
    description: 'Provides expertise on contract management and compliance',
    color: '#A7CEBC',
    icon: 'FileSignature',
    tasks: [
      {
        id: 'ce-task-1',
        name: 'Contract Review',
        description: 'Review and analyze contract documents'
      },
      {
        id: 'ce-task-2',
        name: 'Variation Assessment',
        description: 'Evaluate contract variations and changes'
      },
      {
        id: 'ce-task-3',
        name: 'Claim Evaluation',
        description: 'Assess and process contract claims'
      },
      {
        id: 'ce-task-4',
        name: 'Compliance Check',
        description: 'Ensure contract compliance'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['contract_review', 'claim_management', 'compliance_check'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'bcs-001',
    title: 'Building Control Specialist',
    description: 'Ensures compliance with building regulations and standards',
    color: '#FFD700',
    icon: 'Building2',
    tasks: [
      {
        id: 'bcs-task-1',
        name: 'Compliance Check',
        description: 'Verify compliance with building regulations'
      },
      {
        id: 'bcs-task-2',
        name: 'Approval Strategy',
        description: 'Develop strategy for regulatory approvals'
      },
      {
        id: 'bcs-task-3',
        name: 'Regulation Updates',
        description: 'Track and implement regulation changes'
      },
      {
        id: 'bcs-task-4',
        name: 'Standards Review',
        description: 'Review building standards compliance'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['compliance_verification', 'regulatory_approval', 'standards_review'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'hs-001',
    title: 'Health & Safety Manager',
    description: 'Oversees health and safety compliance and risk management',
    color: '#A7CEBC',
    icon: 'ShieldAlert',
    tasks: [
      {
        id: 'hs-task-1',
        name: 'Risk Assessment',
        description: 'Conduct health and safety risk assessments'
      },
      {
        id: 'hs-task-2',
        name: 'Safety Plan Development',
        description: 'Create and update safety management plans'
      },
      {
        id: 'hs-task-3',
        name: 'Incident Analysis',
        description: 'Analyze and report safety incidents'
      },
      {
        id: 'hs-task-4',
        name: 'Compliance Audit',
        description: 'Audit safety compliance and procedures'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['risk_assessment', 'safety_planning', 'incident_management'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'im-001',
    title: 'Information Manager',
    description: 'Manages project information and BIM coordination',
    color: '#4A4A4A',
    icon: 'Database',
    tasks: [
      {
        id: 'im-task-1',
        name: 'BIM Coordination',
        description: 'Coordinate BIM processes and standards'
      },
      {
        id: 'im-task-2',
        name: 'Data Quality Check',
        description: 'Verify data quality and consistency'
      },
      {
        id: 'im-task-3',
        name: 'Standards Compliance',
        description: 'Ensure compliance with information standards'
      },
      {
        id: 'im-task-4',
        name: 'System Integration',
        description: 'Manage system integrations and data flow'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['bim_management', 'data_quality', 'standards_compliance'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'dc-001',
    title: 'Document Controller',
    description: 'Manages document control, versioning, and distribution',
    color: '#3A366E',
    icon: 'FileStack',
    tasks: [
      {
        id: 'dc-task-1',
        name: 'Document Audit',
        description: 'Audit document control processes'
      },
      {
        id: 'dc-task-2',
        name: 'Naming Convention Check',
        description: 'Verify document naming conventions'
      },
      {
        id: 'dc-task-3',
        name: 'Transmittal Preparation',
        description: 'Prepare document transmittals'
      },
      {
        id: 'dc-task-4',
        name: 'Version Control',
        description: 'Manage document versions and revisions'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['document_control', 'version_management', 'distribution_control'],
    version: '1.0',
    status: 'active'
  },
  {
    id: 'qm-001',
    title: 'Quality Manager',
    description: 'Ensures quality standards are met throughout the project',
    color: '#D15F36',
    icon: 'CheckCircle',
    tasks: [
      {
        id: 'qm-task-1',
        name: 'Quality Audit',
        description: 'Conduct quality assurance audits'
      },
      {
        id: 'qm-task-2',
        name: 'Inspection Plan',
        description: 'Develop quality inspection plans'
      },
      {
        id: 'qm-task-3',
        name: 'Non-Conformance Review',
        description: 'Review and manage non-conformances'
      },
      {
        id: 'qm-task-4',
        name: 'Standards Implementation',
        description: 'Implement quality standards and procedures'
      }
    ],
    type: 'STRUCTURED',
    capabilities: ['quality_assurance', 'inspection_management', 'standards_implementation'],
    version: '1.0',
    status: 'active'
  }
]; 