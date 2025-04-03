import { Company } from '../types';

export const mockCompanies: Company[] = [
  { 
    id: 'COM-001', 
    name: 'Acme Construction', 
    type: 'Contractor',
    status: 'active',
    role: 'Main Contractor', 
    contactPerson: 'John Davis', 
    email: 'john@acme.com', 
    phone: '555-123-4567' 
  },
  { 
    id: 'COM-002', 
    name: 'BlueSky Architects', 
    type: 'Consultant',
    status: 'active',
    role: 'Architect', 
    contactPerson: 'Sarah Chen', 
    email: 'sarah@bluesky.com', 
    phone: '555-234-5678' 
  },
  { 
    id: 'COM-003', 
    name: 'Foundation Experts', 
    type: 'Contractor',
    status: 'active',
    role: 'Subcontractor', 
    contactPerson: 'Michael Brown', 
    email: 'michael@foundation.com', 
    phone: '555-345-6789' 
  },
  { 
    id: 'COM-004', 
    name: 'PowerGrid Systems', 
    type: 'Consultant',
    status: 'active',
    role: 'Electrical Consultant', 
    contactPerson: 'Elena Rodriguez', 
    email: 'elena@powergrid.com', 
    phone: '555-456-7890' 
  },
  { 
    id: 'COM-005', 
    name: 'GreenSpace Landscaping', 
    type: 'Contractor',
    status: 'active',
    role: 'Landscaping', 
    contactPerson: 'David Kim', 
    email: 'david@greenspace.com', 
    phone: '555-567-8901' 
  }
]; 