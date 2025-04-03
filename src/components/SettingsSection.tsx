import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  UserCircle, Building, CreditCard, BellRing, Database, Shield, Users
} from 'lucide-react';

import { GeneralSettings } from './settings/GeneralSettings';
import { CDEConnectionSettings } from './settings/CDEConnectionSettings';
import ProjectSettings from './settings/ProjectSettings';
import TeamSettings from './settings/TeamSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { BillingSettings } from './settings/BillingSettings';

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

  // Navigation items for the settings sidebar
  const navItems = [
    { id: 'general', label: 'General', icon: UserCircle },
    { id: 'cde', label: 'CDE Connections', icon: Database },
    { id: 'projects', label: 'Projects', icon: Building },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: BellRing },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  return (
    <div className="p-6 bg-[#F7F5F2]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3A366E]">Settings</h1>
        <p className="text-[#4C5760]">Configure your account and application preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card className="border-[#A7CEBC]">
            <CardContent className="p-0">
              <nav>
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 border-t border-b border-[#E5E7EB] -mb-[1px] ${
                        isActive ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <IconComponent 
                        size={20} 
                        className={isActive ? 'text-[#D15F36]' : 'text-[#3A366E]'} 
                      />
                      <span className="font-medium text-[#4C5760]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content Area */}
        <div className="flex-grow">
          <Card className="border-[#A7CEBC]">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="hidden">
                  {navItems.map(item => (
                    <TabsTrigger key={item.id} value={item.id}>
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="mt-0">
                  <TabsContent value="general" className="m-0">
                    <GeneralSettings />
                  </TabsContent>
                  
                  <TabsContent value="cde" className="m-0">
                    <CDEConnectionSettings />
                  </TabsContent>
                  
                  <TabsContent value="projects" className="m-0">
                    <ProjectSettings 
                      projectId={selectedProject} 
                      onNavigate={(tab, projectId) => {
                        setActiveTab(tab);
                        setSelectedProject(projectId);
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="team" className="m-0">
                    <TeamSettings />
                  </TabsContent>
                  
                  <TabsContent value="security" className="m-0">
                    <SecuritySettings />
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="m-0">
                    <NotificationSettings />
                  </TabsContent>
                  
                  <TabsContent value="billing" className="m-0">
                    <BillingSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;