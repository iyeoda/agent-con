import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { BasePerson } from '../../types/users';
import { Button, Input } from '../ui';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import Switch from '../ui/switch';

const defaultUser: BasePerson = {
  id: 'default',
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'Guest',
  company: 'Unknown',
  isOrganizationMember: false,
  projectIds: [],
  status: 'active',
  organizationRoles: [],
  organizationId: null,
  phone: '',
  avatar: null,
  department: '',
  location: '',
  bio: '',
  socialLinks: {}
};

export const GeneralSettings: React.FC = () => {
  const { currentUser: authUser } = useUser();
  const [editedUser, setEditedUser] = useState<BasePerson>({
    ...defaultUser,
    ...authUser,
    isOrganizationMember: false,
    projectIds: [],
    status: 'active',
    organizationRoles: [],
    company: '',
    phone: '',
    department: '',
    location: ''
  });

  // Check if user can edit company info
  const canEditCompany = editedUser.isOrganizationMember && 
    editedUser.organizationRoles?.includes('org_admin');

  const handleInputChange = (field: keyof BasePerson, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
  };

  const renderField = (label: string, value: string | undefined, field: keyof BasePerson) => (
    <div className="space-y-1">
      <Label className="text-[#3A366E] font-medium">{label}</Label>
      <Input
        value={value || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="border-[#A7CEBC]"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          {editedUser.avatar ? (
            <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
          ) : (
            <AvatarFallback>
              {editedUser.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h3 className="text-lg font-medium text-[#3A366E]">{editedUser.name}</h3>
          <p className="text-sm text-[#4C5760]">{editedUser.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[#3A366E]">Personal Information</h4>
          {renderField('Name', editedUser.name, 'name')}
          {renderField('Email', editedUser.email, 'email')}
          {renderField('Phone', editedUser.phone || '', 'phone')}
          {renderField('Role', editedUser.role || '', 'role')}
          {renderField('Department', editedUser.department || '', 'department')}
          {renderField('Location', editedUser.location || '', 'location')}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[#3A366E]">Organization Information</h4>
          {canEditCompany ? (
            renderField('Company', editedUser.company || '', 'company')
          ) : (
            <div>
              <Label className="text-[#3A366E] font-medium">Company</Label>
              <p className="mt-1 text-[#4C5760]">{editedUser.company || 'N/A'}</p>
            </div>
          )}
          <div>
            <Label className="text-[#3A366E] font-medium">Organization ID</Label>
            <p className="mt-1 text-[#4C5760]">{editedUser.organizationId || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default GeneralSettings;