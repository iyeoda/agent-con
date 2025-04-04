import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { ContactPerson, Person } from '../../types/users';
import { Button, Input } from '../ui';
import Avatar, { AvatarImage, AvatarFallback } from '../ui/avatar';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import Switch from '../ui/switch';

const defaultUser: ContactPerson = {
  id: 'default',
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'Guest',
  company: 'Unknown',
  isSignedUp: false,
  isOrganizationMember: false,
  phone: '',
  avatar: undefined,
  department: '',
  location: '',
  bio: '',
  socialLinks: {}
};

export const GeneralSettings: React.FC = () => {
  const { currentUser } = useUser();
  const user = currentUser || defaultUser;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const canEditProfile = user.isSignedUp;
  const canEditCompany = user.isOrganizationMember && 
    'organizationRoles' in user && 
    user.organizationRoles.includes('org_admin');

  const handleInputChange = (field: keyof Person, value: string) => {
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
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, field: keyof Person) => {
    return (
      <div>
        <Label className="text-[#3A366E] font-medium">{label}</Label>
        {isEditing ? (
          <Input
            value={editedUser[field]?.toString() || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="mt-1 border-[#A7CEBC] text-[#4C5760] placeholder-[#4C5760]"
          />
        ) : (
          <p className="mt-1 text-[#4C5760]">{value || '-'}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Account Settings</h2>
        <p className="text-[#4C5760] mb-6">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <section className="bg-white rounded-lg border border-[#A7CEBC] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#3A366E]">Profile Information</h2>
          {canEditProfile && !isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-[#A7CEBC] text-[#4C5760] hover:bg-gray-50"
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Avatar className="w-24 h-24">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-[#3A366E] text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex-grow space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {renderField('Full Name', user.name, 'name')}
              {renderField('Email', user.email, 'email')}
              {renderField('Phone', user.phone || '', 'phone')}
              {renderField('Role', user.role, 'role')}
              {renderField('Department', user.department || '', 'department')}
              {renderField('Location', user.location || '', 'location')}
            </div>
            <div>
              <Label className="text-[#3A366E] font-medium">Bio</Label>
              {isEditing ? (
                <textarea
                  value={editedUser.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-md border border-[#A7CEBC] bg-white px-3 py-2 text-[#4C5760] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D15F36] focus-visible:ring-offset-2"
                />
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.bio || '-'}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      {user.isOrganizationMember && (
        <section className="bg-white rounded-lg border border-[#A7CEBC] p-6">
          <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Company Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-[#3A366E] font-medium">Company Name</Label>
              {isEditing && canEditCompany ? (
                <Input
                  value={editedUser.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="mt-1 border-[#A7CEBC] text-[#4C5760] placeholder-[#4C5760]"
                />
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.company}</p>
              )}
            </div>
            {'organizationId' in user && (
              <div>
                <Label className="text-[#3A366E] font-medium">Organization ID</Label>
                <p className="mt-1 text-[#4C5760]">{user.organizationId}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Social Links */}
      {user.isSignedUp && (
        <section className="bg-white rounded-lg border border-[#A7CEBC] p-6">
          <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Social Links</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-[#3A366E] font-medium">LinkedIn</Label>
              {isEditing ? (
                <Input
                  value={editedUser.socialLinks?.linkedin || ''}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  className="mt-1 border-[#A7CEBC] text-[#4C5760] placeholder-[#4C5760]"
                />
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.socialLinks?.linkedin || '-'}</p>
              )}
            </div>
            <div>
              <Label className="text-[#3A366E] font-medium">Twitter</Label>
              {isEditing ? (
                <Input
                  value={editedUser.socialLinks?.twitter || ''}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  className="mt-1 border-[#A7CEBC] text-[#4C5760] placeholder-[#4C5760]"
                />
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.socialLinks?.twitter || '-'}</p>
              )}
            </div>
            <div>
              <Label className="text-[#3A366E] font-medium">Website</Label>
              {isEditing ? (
                <Input
                  value={editedUser.socialLinks?.website || ''}
                  onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                  className="mt-1 border-[#A7CEBC] text-[#4C5760] placeholder-[#4C5760]"
                />
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.socialLinks?.website || '-'}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Preferences */}
      {user.isSignedUp && 'profileSettings' in user && user.profileSettings && (
        <section className="bg-white rounded-lg border border-[#A7CEBC] p-6">
          <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-[#3A366E] font-medium">Language</Label>
              {isEditing ? (
                <Select disabled={!canEditProfile}>
                  <SelectTrigger className="mt-1 border-[#A7CEBC] text-[#4C5760]">
                    <SelectValue placeholder={user.profileSettings.language} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 text-[#4C5760]">
                  {user.profileSettings.language === 'en' ? 'English' :
                   user.profileSettings.language === 'es' ? 'Spanish' :
                   user.profileSettings.language === 'fr' ? 'French' : '-'}
                </p>
              )}
            </div>
            <div>
              <Label className="text-[#3A366E] font-medium">Timezone</Label>
              {isEditing ? (
                <Select disabled={!canEditProfile}>
                  <SelectTrigger className="mt-1 border-[#A7CEBC] text-[#4C5760]">
                    <SelectValue placeholder={user.profileSettings.timezone} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 text-[#4C5760]">{user.profileSettings.timezone}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-[#3A366E] font-medium">Dark Mode</Label>
              <Switch
                checked={user.profileSettings.theme === 'dark'}
                disabled={!isEditing || !canEditProfile}
              />
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      {canEditProfile && isEditing && (
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setEditedUser(user);
            }}
            className="border-[#A7CEBC] text-[#4C5760] hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            className="bg-[#3A366E] text-white hover:bg-[#3A366E]/90"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};