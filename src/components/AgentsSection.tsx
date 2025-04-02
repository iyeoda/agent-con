import React, { useState } from 'react';
import Input from '../components/ui/input';
import { Search } from 'lucide-react';
import { AgentCard } from '../components/AgentCard';
import { AgentChat } from '../components/AgentChat';

type AgentIconType = 'UserCog' | 'BarChart' | 'FileSignature' | 'Building2' | 'ShieldAlert' | 'Database' | 'FileStack' | 'CheckCircle';

interface Task {
  id: string | number;
  name: string;
  description: string;
}

interface Agent {
  id: string;
  title: string;
  icon: AgentIconType;
  color: string;
  textColor?: string;
  description: string;
  tasks: Task[];
}

const AgentsSection = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Agent definitions with icons, descriptions, and predefined tasks
  const agents: Agent[] = [
    {
      id: 'project-manager',
      title: 'Project Manager',
      icon: 'UserCog',
      color: '#3A366E',
      description: 'Coordinates project activities, schedules, and resources',
      tasks: [
        { id: 'schedule-review', name: 'Review Project Schedule', description: 'Analyze the current project schedule and identify critical path items' },
        { id: 'resource-allocation', name: 'Resource Allocation', description: 'Optimize resource allocation across project activities' },
        { id: 'risk-assessment', name: 'Risk Assessment', description: 'Identify and evaluate potential project risks and mitigation strategies' },
        { id: 'progress-report', name: 'Generate Progress Report', description: 'Create a detailed project progress report for stakeholders' }
      ]
    },
    {
      id: 'commercial-manager',
      title: 'Commercial Manager',
      icon: 'BarChart',
      color: '#D15F36',
      description: 'Manages project finances, contracts, and procurement',
      tasks: [
        { id: 'cost-analysis', name: 'Cost Analysis', description: 'Analyze project costs and identify potential cost savings' },
        { id: 'budget-forecast', name: 'Budget Forecast', description: 'Generate a budget forecast based on current project data' },
        { id: 'procurement-strategy', name: 'Procurement Strategy', description: 'Develop or refine procurement strategy for upcoming work' },
        { id: 'cash-flow', name: 'Cash Flow Analysis', description: 'Analyze and optimize project cash flow' }
      ]
    },
    {
      id: 'contract-expert',
      title: 'Contract Expert',
      icon: 'FileSignature',
      color: '#9C7C9C',
      description: 'Provides expertise on contract management and compliance',
      tasks: [
        { id: 'contract-review', name: 'Contract Review', description: 'Review contract documents and identify potential issues' },
        { id: 'variation-assessment', name: 'Variation Assessment', description: 'Assess potential contract variations and implications' },
        { id: 'claim-evaluation', name: 'Claim Evaluation', description: 'Evaluate claims and provide recommendation for resolution' },
        { id: 'contract-summary', name: 'Generate Contract Summary', description: 'Create a simplified summary of contract terms and conditions' }
      ]
    },
    {
      id: 'building-control',
      title: 'Building Control Specialist',
      icon: 'Building2',
      color: '#F8C630',
      description: 'Ensures compliance with building regulations and standards',
      tasks: [
        { id: 'compliance-check', name: 'Compliance Check', description: 'Check project documentation for building regulation compliance' },
        { id: 'approval-strategy', name: 'Approval Strategy', description: 'Develop strategy for obtaining necessary building approvals' },
        { id: 'regulation-updates', name: 'Regulation Updates', description: 'Provide updates on relevant building regulation changes' },
        { id: 'inspection-preparation', name: 'Inspection Preparation', description: 'Prepare for upcoming building control inspections' }
      ]
    },
    {
      id: 'health-safety',
      title: 'Health & Safety Manager',
      icon: 'ShieldAlert',
      color: '#A7CEBC',
      description: 'Oversees health and safety compliance and risk management',
      tasks: [
        { id: 'risk-assessment', name: 'Risk Assessment', description: 'Conduct a health and safety risk assessment for the project' },
        { id: 'safety-plan', name: 'Safety Plan Development', description: 'Develop or update project safety management plan' },
        { id: 'incident-analysis', name: 'Incident Analysis', description: 'Analyze safety incidents and recommend preventive measures' },
        { id: 'compliance-check', name: 'Compliance Check', description: 'Check compliance with health and safety regulations' }
      ]
    },
    {
      id: 'information-manager',
      title: 'Information Manager',
      icon: 'Database',
      color: '#4C5760',
      description: 'Manages project information and BIM coordination',
      tasks: [
        { id: 'bim-coordination', name: 'BIM Coordination', description: 'Coordinate BIM model integration and clash detection' },
        { id: 'data-quality', name: 'Data Quality Check', description: 'Check the quality and completeness of project data' },
        { id: 'standards-compliance', name: 'Standards Compliance', description: 'Verify compliance with information management standards' },
        { id: 'model-review', name: 'Model Review', description: 'Review and validate BIM models for quality and completeness' }
      ]
    },
    {
      id: 'document-controller',
      title: 'Document Controller',
      icon: 'FileStack',
      color: '#F7F5F2',
      textColor: '#3A366E',
      description: 'Manages document control, versioning, and distribution',
      tasks: [
        { id: 'doc-audit', name: 'Document Audit', description: 'Audit project documentation for completeness and compliance' },
        { id: 'naming-convention', name: 'Naming Convention Check', description: 'Verify document naming conventions are being followed' },
        { id: 'transmittal-prep', name: 'Transmittal Preparation', description: 'Prepare document transmittals for distribution' },
        { id: 'version-control', name: 'Version Control Review', description: 'Review version control system and identify improvements' }
      ]
    },
    {
      id: 'quality-manager',
      title: 'Quality Manager',
      icon: 'CheckCircle',
      color: '#D15F36',
      description: 'Ensures quality standards are met throughout the project',
      tasks: [
        { id: 'quality-audit', name: 'Quality Audit', description: 'Conduct audit of quality management processes' },
        { id: 'inspection-plan', name: 'Inspection Plan', description: 'Develop inspection and test plan for upcoming works' },
        { id: 'non-conformance', name: 'Non-Conformance Review', description: 'Review non-conformance reports and recommend resolutions' },
        { id: 'quality-metrics', name: 'Quality Metrics Report', description: 'Generate report on key quality metrics for the project' }
      ]
    }
  ];

  const filteredAgents = agents.filter(agent => 
    agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-[#F7F5F2]">
      {/* Section Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#3A366E]">AI Project Team</h1>
        <p className="text-[#4C5760]">Specialized AI agents to assist with your construction project</p>
      </div>

      {selectedAgent ? (
        // Agent Chat Interface
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedAgent(null)}
            className="px-4 py-2 border border-[#3A366E] text-[#3A366E] rounded-md hover:bg-[#3A366E] hover:bg-opacity-5 transition-colors"
          >
            ← Back to All Agents
          </button>
          
          <AgentChat 
            agent={agents.find(a => a.id === selectedAgent)!} 
            onBack={() => setSelectedAgent(null)} 
          />
        </div>
      ) : (
        // Agent Selection Grid
        <>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search agents..." 
              className="pl-10 border-[#A7CEBC] focus-visible:ring-[#D15F36]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAgents.map(agent => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onClick={() => setSelectedAgent(agent.id)} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AgentsSection;