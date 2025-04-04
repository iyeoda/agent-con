import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const InfoRow: React.FC<{ label: string; value: string | null | undefined }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <div className="text-sm text-[#4C5760]">{label}</div>
    <div className="text-sm text-[#3A366E] font-medium">{value || 'Not set'}</div>
  </div>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-lg font-semibold text-[#3A366E] mb-4">{title}</h3>
);

export const GeneralSettings: React.FC = () => {
  const { user } = useUser();

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
            {user?.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
            ) : (
              <AvatarFallback className="text-xl bg-[#3A366E] text-white">
                {user?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-x-8">
              <InfoRow label="Full Name" value={user?.fullName} />
              <InfoRow label="Email" value={user?.primaryEmailAddress?.emailAddress} />
              <InfoRow label="Phone" value={user?.primaryPhoneNumber?.phoneNumber} />
              <InfoRow label="Username" value={user?.username} />
              <InfoRow label="Created At" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : undefined} />
              <InfoRow label="Last Updated" value={user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : undefined} />
            </div>

            <div>
              <div className="text-sm text-[#4C5760] mb-1">Account Status</div>
              <div className="text-sm text-[#3A366E]">
                {(user?.unsafeMetadata as { status?: string })?.status || 'Active'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#A7CEBC]">
          <SectionTitle title="Organization Information" />
          <div className="grid grid-cols-2 gap-x-8">
            {user?.organizationMemberships?.map((membership) => (
              <React.Fragment key={membership.organization.id}>
                <InfoRow 
                  label="Organization Name" 
                  value={membership.organization.name} 
                />
                <InfoRow 
                  label="Organization ID" 
                  value={membership.organization.id} 
                />
                <InfoRow 
                  label="Role" 
                  value={membership.role} 
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#A7CEBC]">
          <SectionTitle title="External Accounts" />
          <div className="grid grid-cols-2 gap-x-8">
            {user?.externalAccounts?.map((account) => (
              <InfoRow 
                key={account.id}
                label={`${account.provider.charAt(0).toUpperCase() + account.provider.slice(1)} Account`} 
                value={account.username || account.emailAddress} 
              />
            ))}
            {(!user?.externalAccounts || user.externalAccounts.length === 0) && (
              <div className="text-sm text-[#4C5760]">No external accounts linked</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;