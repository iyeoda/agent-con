import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { BasePerson } from '../../types/users';
import { Button } from '../ui';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <div className="text-sm text-[#4C5760]">{label}</div>
    <div className="text-sm text-[#3A366E] font-medium">{value}</div>
  </div>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-lg font-semibold text-[#3A366E] mb-4">{title}</h3>
);

export const GeneralSettings: React.FC = () => {
  const { currentUser } = useUser();

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#3A366E]">Account Settings</h2>
          <p className="text-[#4C5760]">Manage your account information and preferences.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#A7CEBC] p-6 space-y-8">
        <div className="flex justify-between items-start">
          <SectionTitle title="Profile Information" />
          <Button 
            onClick={handleEditProfile}
            variant="outline"
            className="text-[#3A366E] border-[#A7CEBC]"
          >
            Edit Profile
          </Button>
        </div>

        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24">
            {currentUser?.avatar ? (
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            ) : (
              <AvatarFallback className="text-xl bg-[#3A366E] text-white">
                {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'SC'}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-x-8">
              <InfoRow label="Full Name" value={currentUser?.name || 'Sarah Chen'} />
              <InfoRow label="Email" value={currentUser?.email || 'sarah.chen@acme.com'} />
              <InfoRow label="Phone" value={currentUser?.phone || '555-987-6543'} />
              <InfoRow label="Role" value={currentUser?.role || 'Project Manager'} />
              <InfoRow label="Department" value={currentUser?.department || 'Project Management'} />
              <InfoRow label="Location" value={currentUser?.location || 'San Francisco, CA'} />
            </div>

            <div>
              <div className="text-sm text-[#4C5760] mb-1">Bio</div>
              <div className="text-sm text-[#3A366E]">
                {currentUser?.bio || 'Experienced project manager with a focus on sustainable construction practices.'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#A7CEBC]">
          <SectionTitle title="Company Information" />
          <div className="grid grid-cols-2 gap-x-8">
            <InfoRow 
              label="Company Name" 
              value={currentUser?.company || 'Acme Construction'} 
            />
            <InfoRow 
              label="Organization ID" 
              value={currentUser?.organizationId || 'ACME-001'} 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#A7CEBC]">
          <SectionTitle title="Social Links" />
          <div className="grid grid-cols-2 gap-x-8">
            <InfoRow 
              label="LinkedIn" 
              value={currentUser?.socialLinks?.linkedin || 'https://linkedin.com/in/sarahchen'} 
            />
            <InfoRow 
              label="Twitter" 
              value={currentUser?.socialLinks?.twitter || 'https://twitter.com/sarahchen'} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;