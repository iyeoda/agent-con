import React, { useState } from 'react';
import Button from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import Switch from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, Mail, MessageSquare, Calendar, AlertTriangle, 
  CheckCircle, FileText, UserPlus, Clock, Save, Info, RefreshCw
} from 'lucide-react';

export const NotificationSettings = () => {
  const [activeTab, setActiveTab] = useState('email');
  
  // Notification categories with channels
  const notificationGroups = [
    {
      id: 'project',
      title: 'Project Updates',
      description: 'Notifications about general project activity',
      notifications: [
        { id: 'project-docs', name: 'Document Updates', email: true, browser: true, mobile: true },
        { id: 'project-milestone', name: 'Milestone Changes', email: true, browser: true, mobile: true },
        { id: 'project-schedule', name: 'Schedule Updates', email: true, browser: true, mobile: false }
      ]
    },
    {
      id: 'tasks',
      title: 'Tasks & Assignments',
      description: 'Notifications about tasks assigned to you or your team',
      notifications: [
        { id: 'task-assigned', name: 'Task Assigned', email: true, browser: true, mobile: true },
        { id: 'task-due', name: 'Task Due Soon', email: true, browser: true, mobile: true },
        { id: 'task-overdue', name: 'Task Overdue', email: true, browser: true, mobile: true },
        { id: 'task-status', name: 'Task Status Changes', email: false, browser: true, mobile: false }
      ]
    },
    {
      id: 'risks',
      title: 'Risks & Issues',
      description: 'Important alerts about project risks and issues',
      notifications: [
        { id: 'risk-new', name: 'New Risk Identified', email: true, browser: true, mobile: true },
        { id: 'risk-high', name: 'High Priority Risks', email: true, browser: true, mobile: true },
        { id: 'risk-escalated', name: 'Risk Escalated', email: true, browser: true, mobile: true }
      ]
    },
    {
      id: 'ai',
      title: 'AI Team Activity',
      description: 'Updates from your AI project team',
      notifications: [
        { id: 'ai-insight', name: 'New AI Insights', email: true, browser: true, mobile: false },
        { id: 'ai-suggestion', name: 'Action Suggestions', email: false, browser: true, mobile: false },
        { id: 'ai-completion', name: 'Task Completion', email: true, browser: true, mobile: false }
      ]
    },
    {
      id: 'team',
      title: 'Team & Collaboration',
      description: 'Updates about team members and communication',
      notifications: [
        { id: 'team-member', name: 'New Team Member', email: true, browser: true, mobile: false },
        { id: 'team-message', name: 'Direct Messages', email: true, browser: true, mobile: true },
        { id: 'team-mention', name: 'Mentions & Tags', email: true, browser: true, mobile: true }
      ]
    }
  ];
  
  // Digest options
  const digestOptions = [
    { value: 'off', label: 'Off' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' }
  ];

  const [digest, setDigest] = useState('daily');
  const [quietHours, setQuietHours] = useState(true);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

  // State to hold notification preferences
  const [notificationState, setNotificationState] = useState(notificationGroups);

  // Toggle notification for a specific channel
  const toggleNotification = (groupId: string, notificationId: string, channel: 'email' | 'browser' | 'mobile') => {
    setNotificationState(prevState =>
      prevState.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            notifications: group.notifications.map(notification => {
              if (notification.id === notificationId) {
                return {
                  ...notification,
                  [channel]: !notification[channel]
                };
              }
              return notification;
            })
          };
        }
        return group;
      })
    );
  };

  // Toggle all notifications in a group for a specific channel
  const toggleGroupNotifications = (groupId: string, channel: 'email' | 'browser' | 'mobile', value?: boolean) => {
    setNotificationState(prevState =>
      prevState.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            notifications: group.notifications.map(notification => ({
              ...notification,
              [channel]: value !== undefined ? value : !notification[channel]
            }))
          };
        }
        return group;
      })
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Notification Preferences</h2>
        <p className="text-[#4C5760] mb-6">
          Control how and when you receive notifications about your projects.
        </p>
      </div>

      <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#F7F5F2] mb-6">
          <TabsTrigger value="email" className="flex items-center gap-1">
            <Mail size={14} />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="browser" className="flex items-center gap-1">
            <Bell size={14} />
            <span>Browser</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>Mobile</span>
          </TabsTrigger>
          <TabsTrigger value="digest" className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Digests</span>
          </TabsTrigger>
        </TabsList>

        {/* Email Notifications Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#3A366E]">Email Notification Settings</CardTitle>
                  <CardDescription>Configure which email notifications you receive</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#4C5760]">All Email Notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {notificationState.map(group => (
                <div key={group.id} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-md font-medium text-[#3A366E]">{group.title}</h4>
                      <p className="text-sm text-[#4C5760]">{group.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#4C5760]">Toggle all</span>
                      <Switch 
                        checked={group.notifications.every(n => n.email)}
                        onCheckedChange={(checked) => toggleGroupNotifications(group.id, 'email', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pl-2">
                    {group.notifications.map(notification => (
                      <div key={notification.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-[#4C5760]">{notification.name}</span>
                        <Switch 
                          checked={notification.email}
                          onCheckedChange={() => toggleNotification(group.id, notification.id, 'email')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="bg-[#3A366E]">
              <Save size={16} className="mr-1" />
              Save Email Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Browser Notifications Tab */}
        <TabsContent value="browser" className="space-y-6">
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#3A366E]">Browser Notification Settings</CardTitle>
                  <CardDescription>Configure in-browser notifications and alerts</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#4C5760]">All Browser Notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {notificationState.map(group => (
                <div key={group.id} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-md font-medium text-[#3A366E]">{group.title}</h4>
                      <p className="text-sm text-[#4C5760]">{group.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#4C5760]">Toggle all</span>
                      <Switch 
                        checked={group.notifications.every(n => n.browser)}
                        onCheckedChange={(checked) => toggleGroupNotifications(group.id, 'browser', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pl-2">
                    {group.notifications.map(notification => (
                      <div key={notification.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-[#4C5760]">{notification.name}</span>
                        <Switch 
                          checked={notification.browser}
                          onCheckedChange={() => toggleNotification(group.id, notification.id, 'browser')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#3A366E]">Browser Permission</CardTitle>
              <CardDescription>Allow browser notifications from this site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-[#3A366E] bg-opacity-5 rounded-md">
                <Info size={20} className="text-[#3A366E]" />
                <div className="flex-grow">
                  <p className="text-[#4C5760]">
                    You need to give permission for this site to send notifications in your browser.
                  </p>
                </div>
                <Button className="bg-[#3A366E]">
                  Allow Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="bg-[#3A366E]">
              <Save size={16} className="mr-1" />
              Save Browser Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Mobile Notifications Tab */}
        <TabsContent value="mobile" className="space-y-6">
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#3A366E]">Mobile Notification Settings</CardTitle>
                  <CardDescription>Configure notifications for the mobile app</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#4C5760]">All Mobile Notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {notificationState.map(group => (
                <div key={group.id} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-md font-medium text-[#3A366E]">{group.title}</h4>
                      <p className="text-sm text-[#4C5760]">{group.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#4C5760]">Toggle all</span>
                      <Switch 
                        checked={group.notifications.every(n => n.mobile)}
                        onCheckedChange={(checked) => toggleGroupNotifications(group.id, 'mobile', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pl-2">
                    {group.notifications.map(notification => (
                      <div key={notification.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-[#4C5760]">{notification.name}</span>
                        <Switch 
                          checked={notification.mobile}
                          onCheckedChange={() => toggleNotification(group.id, notification.id, 'mobile')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#3A366E]">Quiet Hours</CardTitle>
              <CardDescription>Set times when mobile notifications will be muted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#3A366E]">Enable Quiet Hours</p>
                    <p className="text-sm text-[#4C5760]">Mute notifications during specific times</p>
                  </div>
                  <Switch 
                    checked={quietHours}
                    onCheckedChange={setQuietHours}
                  />
                </div>
                
                {quietHours && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">Start Time</label>
                      <input 
                        type="time" 
                        value={quietHoursStart}
                        onChange={(e) => setQuietHoursStart(e.target.value)}
                        className="w-full p-2 border border-[#A7CEBC] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#3A366E] mb-1 block">End Time</label>
                      <input 
                        type="time"
                        value={quietHoursEnd}
                        onChange={(e) => setQuietHoursEnd(e.target.value)}
                        className="w-full p-2 border border-[#A7CEBC] rounded-md"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 p-4 bg-[#3A366E] bg-opacity-5 rounded-md mt-4">
                  <Info size={20} className="text-[#3A366E]" />
                  <p className="text-sm text-[#4C5760]">
                    Critical notifications about high-priority risks and urgent issues will still be delivered during quiet hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="bg-[#3A366E]">
              <Save size={16} className="mr-1" />
              Save Mobile Preferences
            </Button>
          </div>
        </TabsContent>
        
        {/* Digest Settings Tab */}
        <TabsContent value="digest" className="space-y-6">
          <Card className="border-[#A7CEBC]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#3A366E]">Notification Digests</CardTitle>
              <CardDescription>Configure summary emails of project activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-[#3A366E] mb-3">Digest Frequency</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {digestOptions.map(option => (
                    <div 
                      key={option.value}
                      className={`border rounded-md p-4 cursor-pointer ${
                        digest === option.value 
                          ? 'border-[#D15F36] bg-[#D15F36] bg-opacity-5' 
                          : 'border-[#A7CEBC] hover:border-[#D15F36]'
                      }`}
                      onClick={() => setDigest(option.value)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#3A366E]">{option.label}</span>
                        {digest === option.value && (
                          <CheckCircle size={16} className="text-[#D15F36]" />
                        )}
                      </div>
                      <p className="text-sm text-[#4C5760]">
                        {option.value === 'off' && 'No digest emails will be sent.'}
                        {option.value === 'daily' && 'Receive a summary email once per day.'}
                        {option.value === 'weekly' && 'Receive a weekly summary every Monday.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {digest !== 'off' && (
                <div>
                  <h4 className="text-md font-medium text-[#3A366E] mb-3">Digest Content</h4>
                  <div className="space-y-3">
                    {notificationState.map(group => (
                      <div key={group.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-[#3A366E]">{group.title}</p>
                          <p className="text-sm text-[#4C5760]">Include in digest</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {digest !== 'off' && (
                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <p className="font-medium text-[#3A366E]">Preview Digest</p>
                    <p className="text-sm text-[#4C5760]">See an example of how your digest will look</p>
                  </div>
                  <Button variant="outline" className="border-[#A7CEBC]">
                    <Mail size={16} className="mr-1" />
                    Send Test Digest
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="bg-[#3A366E]">
              <Save size={16} className="mr-1" />
              Save Digest Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Global Notification Settings */}
      <Card className="border-[#A7CEBC]">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#3A366E]">Global Notification Settings</CardTitle>
          <CardDescription>Settings that apply to all notification types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium text-[#3A366E]">Notification Sounds</p>
              <p className="text-sm text-[#4C5760]">Play sounds for important notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium text-[#3A366E]">Real-time Updates</p>
              <p className="text-sm text-[#4C5760]">Receive notifications immediately when events occur</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-[#3A366E]">Priority Only Mode</p>
              <p className="text-sm text-[#4C5760]">Only receive high-priority notifications</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};