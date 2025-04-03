import React, { useState, FormEvent } from 'react';
import Button from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import Switch from '../ui/switch';
import Badge from '../ui/badge';
import Input from '../ui/input';
import { 
  Shield, Lock, Key, Smartphone, Eye, EyeOff, UserCheck, 
  AlertTriangle, Clock, RefreshCw, LogOut, Save, Info, Settings, CheckCircle 
} from 'lucide-react';

export const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  
  // Sample session data
  const activeSessions = [
    { 
      id: 'session-1', 
      device: 'Windows PC', 
      browser: 'Chrome', 
      location: 'New York, US', 
      ip: '192.168.1.1', 
      lastActive: '2025-03-28T14:30:00Z',
      current: true 
    },
    { 
      id: 'session-2', 
      device: 'iPhone 15', 
      browser: 'Safari Mobile', 
      location: 'New York, US', 
      ip: '192.168.2.4', 
      lastActive: '2025-03-27T10:15:00Z',
      current: false
    },
    { 
      id: 'session-3', 
      device: 'MacBook Pro', 
      browser: 'Firefox', 
      location: 'Boston, US', 
      ip: '192.168.3.45', 
      lastActive: '2025-03-25T08:45:00Z',
      current: false
    }
  ];
  
  const securityEvents = [
    { 
      id: 'event-1', 
      type: 'login', 
      description: 'Successful login', 
      device: 'Windows PC',
      location: 'New York, US',
      time: '2025-03-28T14:30:00Z' 
    },
    { 
      id: 'event-2', 
      type: 'password_change', 
      description: 'Password changed', 
      device: 'Windows PC',
      location: 'New York, US',
      time: '2025-03-20T11:25:00Z' 
    },
    { 
      id: 'event-3', 
      type: 'failed_login', 
      description: 'Failed login attempt', 
      device: 'Unknown',
      location: 'Chicago, US',
      time: '2025-03-15T07:15:00Z' 
    },
    { 
      id: 'event-4', 
      type: '2fa_enabled', 
      description: 'Two-factor authentication enabled', 
      device: 'Windows PC',
      location: 'New York, US',
      time: '2025-02-10T09:45:00Z' 
    },
  ];

  const handlePasswordChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implementation would handle password change
    alert('Password change functionality would be implemented here');
  };
  
  const handleEnableTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      setTwoFactorEnabled(false);
      setShowQRCode(false);
    }
  };
  
  const handleVerifyTwoFactor = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    // Here would be the verification logic
  };
  
  const handleEndSession = (sessionId: string) => {
    // Implementation would end the specified session
    alert(`Session ${sessionId} would be terminated`);
  };
  
  const handleEndAllSessions = () => {
    // Implementation would end all sessions except current
    alert('All other sessions would be terminated');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Security & Privacy</h2>
        <p className="text-[#4C5760] mb-6">
          Manage your account security settings and privacy preferences.
        </p>
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Lock size={20} className="mr-2" />
          Password
        </h3>
        
        <Card className="border-[#A7CEBC]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#3A366E]">Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  Current Password
                </label>
                <div className="relative">
                  <Input 
                    type={showCurrentPassword ? "text" : "password"} 
                    className="border-[#A7CEBC] focus-visible:ring-[#D15F36] pr-10" 
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  New Password
                </label>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"} 
                    className="border-[#A7CEBC] focus-visible:ring-[#D15F36] pr-10" 
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-[#4C5760] mb-1">Password strength:</p>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-xs text-[#4C5760] mt-1">
                    Strong passwords include a mix of letters, numbers, and symbols.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="border-[#A7CEBC] focus-visible:ring-[#D15F36] pr-10" 
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="bg-[#3A366E]">
                <Save size={16} className="mr-1" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Smartphone size={20} className="mr-2" />
          Two-Factor Authentication
        </h3>
        
        <Card className="border-[#A7CEBC]">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[#3A366E]">Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </div>
              <Switch 
                checked={twoFactorEnabled}
                onCheckedChange={handleEnableTwoFactor}
              />
            </div>
          </CardHeader>
          <CardContent>
            {twoFactorEnabled ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-md border border-green-200">
                <CheckCircle size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Two-factor authentication is enabled</p>
                  <p className="text-sm text-green-700">Your account is protected with an additional security layer.</p>
                </div>
              </div>
            ) : showQRCode ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#F7F5F2] rounded-md border border-[#A7CEBC]">
                  <h4 className="text-[#3A366E] font-medium mb-2">Set up two-factor authentication</h4>
                  <ol className="list-decimal list-inside text-[#4C5760] space-y-2">
                    <li>Download an authenticator app (like Google Authenticator, Authy)</li>
                    <li>Scan the QR code below with the app</li>
                    <li>Enter the 6-digit code from the app to verify</li>
                  </ol>
                </div>
                
                <div className="flex justify-center py-4">
                  {/* This would be a QR code in a real implementation */}
                  <div className="w-48 h-48 bg-[#3A366E] p-4 flex items-center justify-center text-white text-xs">
                    QR Code would appear here
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium text-[#3A366E] mb-1 block">
                    Verification Code
                  </label>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Enter 6-digit code" 
                      className="border-[#A7CEBC] focus-visible:ring-[#D15F36]" 
                    />
                    <Button 
                      onClick={handleVerifyTwoFactor}
                      className="bg-[#3A366E]"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-[#F7F5F2] rounded-md">
                  <Info size={20} className="text-[#3A366E]" />
                  <p className="text-sm text-[#4C5760]">
                    Save your backup codes in a secure location. You'll need them if you lose access to your authenticator app.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[#4C5760]">
                  Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification in addition to your password.
                </p>
                <div className="flex items-center gap-3 p-4 bg-[#3A366E] bg-opacity-5 rounded-md border border-[#A7CEBC]">
                  <Shield size={20} className="text-[#D15F36]" />
                  <div>
                    <p className="font-medium text-[#3A366E]">Recommended security measure</p>
                    <p className="text-sm text-[#4C5760]">Enable two-factor authentication to protect your account from unauthorized access.</p>
                  </div>
                </div>
                <Button 
                  onClick={handleEnableTwoFactor}
                  className="bg-[#3A366E]"
                >
                  Enable Two-Factor Authentication
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <UserCheck size={20} className="mr-2" />
          Active Sessions
        </h3>
        
        <Card className="border-[#A7CEBC]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#3A366E]">Manage Device Sessions</CardTitle>
            <CardDescription>View and manage your active account sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map(session => (
                <div 
                  key={session.id} 
                  className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-[#3A366E]">{session.device} • {session.browser}</h4>
                      {session.current && (
                        <Badge className="bg-green-100 text-green-800">Current</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#4C5760] mb-1">
                      {session.location} • IP: {session.ip}
                    </p>
                    <p className="text-xs text-[#4C5760] flex items-center">
                      <Clock size={12} className="mr-1" />
                      Last active: {new Date(session.lastActive).toLocaleString()}
                    </p>
                  </div>
                  {!session.current && (
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleEndSession(session.id)}
                    >
                      <LogOut size={16} className="mr-1" />
                      End Session
                    </Button>
                  )}
                </div>
              ))}
              
              <div className="pt-2 flex justify-end">
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleEndAllSessions}
                >
                  Log Out of All Other Devices
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Log Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Clock size={20} className="mr-2" />
          Security Log
        </h3>
        
        <Card className="border-[#A7CEBC]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#3A366E]">Recent Security Activity</CardTitle>
            <CardDescription>Track recent security-related activity on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {securityEvents.map(event => (
                <div key={event.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {event.type === 'login' && <UserCheck size={18} className="text-green-600" />}
                      {event.type === 'password_change' && <RefreshCw size={18} className="text-blue-600" />}
                      {event.type === 'failed_login' && <AlertTriangle size={18} className="text-amber-600" />}
                      {event.type === '2fa_enabled' && <Shield size={18} className="text-purple-600" />}
                    </div>
                    <div className="flex-grow">
                      <p className="text-[#3A366E] font-medium">{event.description}</p>
                      <p className="text-sm text-[#4C5760]">
                        {event.device} • {event.location}
                      </p>
                      <p className="text-xs text-[#4C5760] mt-1">
                        {new Date(event.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="link" className="text-[#3A366E] p-0 h-auto">
              View Full Security Log
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Data Privacy Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Settings size={20} className="mr-2" />
          Data Privacy
        </h3>
        
        <Card className="border-[#A7CEBC]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#3A366E]">Privacy Settings</CardTitle>
            <CardDescription>Manage how your data is used and accessed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-[#3A366E]">Metadata Collection</p>
                <p className="text-sm text-[#4C5760]">Allow collection of usage data to improve service</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-[#3A366E]">CDE Data Access</p>
                <p className="text-sm text-[#4C5760]">Allow AI access to your connected CDE data</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#3A366E]">Data Export</p>
                <p className="text-sm text-[#4C5760]">Request a copy of all your data</p>
              </div>
              <Button variant="outline" className="border-[#A7CEBC]">
                Request Export
              </Button>
            </div>

            <div className="pt-4 mt-2 border-t">
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};