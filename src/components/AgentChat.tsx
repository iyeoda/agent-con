import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import { 
  UserCog, BarChart, FileSignature, Building2, ShieldAlert, 
  Database, FileStack, CheckCircle, Send, PlusCircle,
  MessageSquare, ListChecks
} from 'lucide-react';
import { AgentTaskCard } from '../components/AgentTaskCard';
import { AgentChatMessage } from '../components/AgentChatMessage';
import { SmartActions } from '../components/SmartActions';

type AgentIconType = 'UserCog' | 'BarChart' | 'FileSignature' | 'Building2' | 'ShieldAlert' | 'Database' | 'FileStack' | 'CheckCircle';

interface Task {
  id: string | number;
  name: string;
  description: string;
}

interface AgentChatProps {
  agent: {
    title: string;
    description: string;
    color: string;
    icon: AgentIconType;
    tasks: Task[];
  };
  onBack?: () => void;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  isTaskRequest?: boolean;
  metadata?: Record<string, any>;
}

export const AgentChat = ({ agent, onBack }: AgentChatProps) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messageInput, setMessageInput] = useState('');
  const [chatMode, setChatMode] = useState<'structured' | 'unstructured'>('unstructured');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      role: 'agent', 
      content: `Hello, I'm your ${agent.title}. How can I help you with your project today?`,
      timestamp: new Date().toISOString()
    }
  ]);

  const iconMap = {
    'UserCog': UserCog,
    'BarChart': BarChart,
    'FileSignature': FileSignature,
    'Building2': Building2,
    'ShieldAlert': ShieldAlert,
    'Database': Database,
    'FileStack': FileStack,
    'CheckCircle': CheckCircle
  };

  const IconComponent = iconMap[agent.icon] || UserCog;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: messageInput,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setMessageInput('');

    // Simulate agent response with metadata
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: Date.now() + 1,
        role: 'agent',
        content: `As your ${agent.title}, I'll help address your question about "${messageInput}". In a real implementation, this would be processed by the AI.`,
        timestamp: new Date().toISOString(),
        metadata: {
          hasData: true,
          hasContent: true,
          hasFollowUp: true,
          hasProjectContext: true
        }
      };
      setChatMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleTaskSelection = (taskId: string | number) => {
    const selectedTask = agent.tasks.find(task => task.id === taskId);
    
    if (!selectedTask) return;
    
    // Add task selection message
    const taskMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: `I'd like help with: ${selectedTask.name}`,
      timestamp: new Date().toISOString(),
      isTaskRequest: true
    };
    
    setChatMessages([...chatMessages, taskMessage]);
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: Date.now() + 1,
        role: 'agent',
        content: `I'll help you with ${selectedTask.name}. ${selectedTask.description}. Let me gather the necessary information...`,
        timestamp: new Date().toISOString(),
        metadata: {
          hasData: true,
          hasContent: true,
          hasFollowUp: true,
          hasProjectContext: true
        }
      };
      setChatMessages(prev => [...prev, agentResponse]);
    }, 1000);
    
    // Switch to chat tab
    setActiveTab('chat');
  };

  return (
    <Card className="shadow-sm border-[#A7CEBC]">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: agent.color }}
          >
            <IconComponent size={20} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-[#3A366E]">{agent.title}</CardTitle>
            <p className="text-sm text-[#4C5760]">{agent.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start px-6 h-12 bg-[#F7F5F2] border-b rounded-none">
          <TabsTrigger value="chat" className="data-[state=active]:text-[#D15F36] data-[state=active]:border-b-2 data-[state=active]:border-[#D15F36] rounded-none">
            General Chat
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:text-[#D15F36] data-[state=active]:border-b-2 data-[state=active]:border-[#D15F36] rounded-none">
            Predefined Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="m-0">
          <CardContent className="p-0">
            <div className="flex flex-col h-[600px]">
              {/* Chat Mode Selection */}
              <div className="px-6 py-3 border-b bg-[#F7F5F2]">
                <div className="flex gap-2">
                  <button
                    onClick={() => setChatMode('unstructured')}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      chatMode === 'unstructured'
                        ? 'bg-[#D15F36] text-white'
                        : 'bg-white text-[#4C5760] border border-[#A7CEBC] hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Free Chat</span>
                  </button>
                  <button
                    onClick={() => setChatMode('structured')}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      chatMode === 'structured'
                        ? 'bg-[#D15F36] text-white'
                        : 'bg-white text-[#4C5760] border border-[#A7CEBC] hover:bg-gray-50'
                    }`}
                  >
                    <ListChecks className="w-4 h-4" />
                    <span>Structured</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {chatMessages.map(message => (
                  <div key={message.id}>
                    <AgentChatMessage 
                      message={message} 
                      agentColor={agent.color} 
                      agentIcon={agent.icon} 
                    />
                    {message.role === 'agent' && message.metadata && (
                      <SmartActions 
                        actions={[]} 
                        responseMetadata={message.metadata}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder={`Ask the ${agent.title} about your project...`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-grow border-[#A7CEBC] focus-visible:ring-[#D15F36]"
                  />
                  <Button 
                    type="submit" 
                    className="bg-[#3A366E] hover:bg-[#3A366E] hover:bg-opacity-90"
                  >
                    <Send size={18} />
                  </Button>
                </form>
                <div className="mt-2 flex items-center text-sm text-[#4C5760]">
                  <PlusCircle size={14} className="mr-1" />
                  <span>You can also attach files to your message</span>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="tasks" className="m-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-[#3A366E] mb-4">Select a predefined task:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agent.tasks.map((task: Task) => (
                <AgentTaskCard 
                  key={task.id} 
                  task={task} 
                  agentColor={agent.color}
                  onClick={() => handleTaskSelection(task.id)}
                />
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};