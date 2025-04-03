import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Switch from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Avatar, { AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Camera, Globe, Bell, Moon, Sun, Save, User, Building, Mail, Phone
} from 'lucide-react';

export const GeneralSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Sample user data
  const user = {
    name: 'John Smith',
    title: 'Project Manager',
    company: 'Acme Construction',
    email: 'john.smith@acmeconstruction.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    timezone: 'America/New_York',
    language: 'English (US)'
  };
  
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  const languages = [
    'English (US)',
    'English (UK)',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Chinese (Simplified)'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Account Settings</h2>
        <p className="text-[#4C5760] mb-6">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Profile Information</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-[#3A366E] text-white text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                </Avatar>
                <Button variant="outline" size="sm" className="border-[#A7CEBC]">
                  <Camera size={14} className="mr-1" />
                  Change Photo
                </Button>
              </div>
              
              {/* Profile Form */}
              <div className="flex-grow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                      Full Name
                    </label>
                    <Input 
                      defaultValue={user.name} 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                      Job Title
                    </label>
                    <Input 
                      defaultValue={user.title} 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                      Email
                    </label>
                    <Input 
                      type="email"
                      defaultValue={user.email} 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                      Phone
                    </label>
                    <Input 
                      type="tel"
                      defaultValue={user.phone} 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                      Company
                    </label>
                    <Input 
                      defaultValue={user.company} 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button className="bg-[#3A366E]">
                    <Save size={16} className="mr-1" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Preferences</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6 space-y-6">
            {/* Region Settings */}
            <div>
              <h4 className="text-lg font-medium text-[#3A366E] mb-4">Region</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                    Timezone
                  </label>
                  <select className="w-full p-2 border border-[#A7CEBC] rounded-md">
                    {timezones.map(tz => (
                      <option key={tz} selected={tz === user.timezone}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#4C5760] mt-1">
                    Current time: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                    Language
                  </label>
                  <select className="w-full p-2 border border-[#A7CEBC] rounded-md">
                    {languages.map(lang => (
                      <option key={lang} selected={lang === user.language}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Display Settings */}
            <div>
              <h4 className="text-lg font-medium text-[#3A366E] mb-4">Display</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#3A366E] bg-opacity-10 p-2 rounded-md">
                    {darkMode ? <Moon size={20} className="text-[#3A366E]" /> : <Sun size={20} className="text-[#3A366E]" />}
                  </div>
                  <div>
                    <p className="font-medium text-[#3A366E]">Dark Mode</p>
                    <p className="text-sm text-[#4C5760]">Toggle between light and dark themes</p>
                  </div>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
            
            {/* Notification Settings */}
            <div>
              <h4 className="text-lg font-medium text-[#3A366E] mb-4">Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#3A366E] bg-opacity-10 p-2 rounded-md">
                      <Bell size={20} className="text-[#3A366E]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#3A366E]">Email Notifications</p>
                      <p className="text-sm text-[#4C5760]">Receive email updates about your projects</p>
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#3A366E] bg-opacity-10 p-2 rounded-md">
                      <Bell size={20} className="text-[#3A366E]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#3A366E]">Browser Notifications</p>
                      <p className="text-sm text-[#4C5760]">Get real-time alerts in your browser</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button className="bg-[#3A366E]">
                <Save size={16} className="mr-1" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Password</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="max-w-md space-y-4">
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  Current Password
                </label>
                <Input 
                  type="password"
                  className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  New Password
                </label>
                <Input 
                  type="password"
                  className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  Confirm New Password
                </label>
                <Input 
                  type="password"
                  className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                />
              </div>
              <div className="pt-2">
                <Button className="bg-[#3A366E]">
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};