import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '@/components/ui/input';
import Switch from '../ui/switch';
import Badge from '../ui/badge';
import ConfirmDialog from '../ui/confirm-dialog';
import { 
  AlertCircle, CheckCircle, Database, PlusCircle, RefreshCw, 
  Trash, ExternalLink, ChevronDown, ChevronRight, Calendar
} from 'lucide-react';

export const CDEConnectionSettings = () => {
  // Sample connected CDEs
  const [connectedCDEs, setConnectedCDEs] = useState([
    { 
      id: 'trimble-1', 
      name: 'Trimble Viewpoint', 
      status: 'connected', 
      lastSync: '2025-03-15T14:30:00Z',
      icon: '/trimble-logo.png',
      projects: 3,
      color: '#D15F36'
    },
    { 
      id: 'autodesk-1', 
      name: 'Autodesk Construction Cloud', 
      status: 'connected', 
      lastSync: '2025-03-20T09:15:00Z',
      icon: '/autodesk-logo.png',
      projects: 2,
      color: '#3A366E'
    },
    { 
      id: 'procore-1', 
      name: 'Procore', 
      status: 'disconnected', 
      lastSync: null,
      icon: '/procore-logo.png',
      projects: 0,
      color: '#A7CEBC'
    }
  ]);

  // Available CDEs for connection
  const availableCDEs = [
    { id: 'trimble', name: 'Trimble Viewpoint', icon: '/trimble-logo.png', color: '#D15F36' },
    { id: 'autodesk', name: 'Autodesk Construction Cloud', icon: '/autodesk-logo.png', color: '#3A366E' },
    { id: 'procore', name: 'Procore', icon: '/procore-logo.png', color: '#A7CEBC' },
    { id: 'aconex', name: 'Oracle Aconex', icon: '/aconex-logo.png', color: '#F8C630' },
    { id: 'plangrid', name: 'PlanGrid', icon: '/plangrid-logo.png', color: '#9C7C9C' }
  ];

  const [expandedCDE, setExpandedCDE] = useState<string | null>(null);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [cdeToDisconnect, setCdeToDisconnect] = useState<string | null>(null);

  const handleConnect = (cdeId: string) => {
    // In a real implementation, this would initiate the OAuth2 flow
    alert(`Initiating OAuth2 flow for ${cdeId}`);
    
    // Simulate opening a popup for OAuth authentication
    window.open('#', 'oauth-window', 'width=600,height=700');
  };

  const handleSyncNow = (cdeId: string) => {
    // In a real implementation, this would trigger a sync with the CDE
    alert(`Syncing with ${cdeId}`);
  };

  const handleDisconnect = (cdeId: string) => {
    setCdeToDisconnect(cdeId);
    setDisconnectDialogOpen(true);
  };

  const confirmDisconnect = () => {
    if (cdeToDisconnect) {
      setConnectedCDEs(
        connectedCDEs.map(cde => 
          cde.id === cdeToDisconnect 
            ? { ...cde, status: 'disconnected', lastSync: null } 
            : cde
        )
      );
    }
  };

  const toggleExpandCDE = (cdeId: string) => {
    setExpandedCDE(expandedCDE === cdeId ? null : cdeId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Common Data Environment Connections</h2>
        <p className="text-[#4C5760] mb-6">
          Connect to your project CDEs to enable automatic data synchronization. This enables your AI team to work with the most up-to-date project information.
        </p>
      </div>

      {/* Connected CDEs */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Database size={20} className="mr-2" />
          Connected Environments
        </h3>

        <div className="space-y-4">
          {connectedCDEs.map(cde => (
            <div key={cde.id} className="border rounded-md overflow-hidden">
              {/* Main CDE row */}
              <div className="p-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  {/* CDE Icon/Logo placeholder */}
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: cde.color }}  
                  >
                    <Database size={20} />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-[#3A366E]">{cde.name}</h4>
                      {cde.status === 'connected' ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">Disconnected</Badge>
                      )}
                    </div>
                    
                    {cde.status === 'connected' && (
                      <p className="text-sm text-[#4C5760]">
                        Last synced: {new Date(cde.lastSync!).toLocaleString()} • {cde.projects} projects
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cde.status === 'connected' ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3A366E] border-[#A7CEBC]"
                        onClick={() => handleSyncNow(cde.id)}
                      >
                        <RefreshCw size={14} className="mr-1" />
                        Sync Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-none"
                        onClick={() => toggleExpandCDE(cde.id)}
                      >
                        {expandedCDE === cde.id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#D15F36] border-[#D15F36]"
                      onClick={() => handleConnect(cde.id)}
                    >
                      Reconnect
                    </Button>
                  )}
                </div>
              </div>

              {/* Expanded details section */}
              {expandedCDE === cde.id && cde.status === 'connected' && (
                <div className="p-4 border-t bg-[#F7F5F2] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-[#3A366E] mb-2">Sync Settings</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-[#4C5760]">Auto-sync documents</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-[#4C5760]">Sync schedule</label>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[#4C5760]" />
                            <span className="text-sm">Every 6 hours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-[#3A366E] mb-2">Connected Projects</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center text-[#4C5760]">
                          <CheckCircle size={14} className="mr-2 text-green-600" />
                          Woodside Tower Project
                        </li>
                        <li className="flex items-center text-[#4C5760]">
                          <CheckCircle size={14} className="mr-2 text-green-600" />
                          Harbor Heights Development
                        </li>
                        <li className="flex items-center text-[#4C5760]">
                          <CheckCircle size={14} className="mr-2 text-green-600" />
                          Metro Station Expansion
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t">
                    <Button variant="link" className="text-[#3A366E] p-0 h-auto">
                      View connection details
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDisconnect(cde.id)}
                    >
                      <Trash size={14} className="mr-1" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add New CDE Connection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add New Connection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableCDEs.map(cde => (
            <div 
              key={cde.id} 
              className="border rounded-md p-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => handleConnect(cde.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded flex items-center justify-center text-white"
                  style={{ backgroundColor: cde.color }}
                >
                  <Database size={20} />
                </div>
                <h4 className="font-medium text-[#3A366E]">{cde.name}</h4>
              </div>
              <Button className="w-full bg-[#3A366E] hover:bg-opacity-90">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-md border p-4 bg-[#3A366E] bg-opacity-5 mt-6">
        <h3 className="text-lg font-medium text-[#3A366E] mb-2 flex items-center">
          <AlertCircle size={18} className="mr-2" />
          How CDE Connections Work
        </h3>
        <p className="text-sm text-[#4C5760] mb-2">
          When you connect to a CDE, we use OAuth2 to securely access your project data without storing your credentials. 
          Your data is synchronized periodically and processed by our AI agents to provide insights and assistance.
        </p>
        <a 
          href="#" 
          className="text-sm font-medium text-[#D15F36] flex items-center hover:underline"
        >
          Learn more about security and privacy
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>

      {/* Disconnect Confirmation Dialog */}
      <ConfirmDialog
        open={disconnectDialogOpen}
        onOpenChange={setDisconnectDialogOpen}
        title="Disconnect CDE"
        description="Are you sure you want to disconnect this CDE? All synced projects will remain, but new changes won't be synced."
        onConfirm={confirmDisconnect}
        confirmText="Disconnect"
        cancelText="Cancel"
      />
    </div>
  );
};