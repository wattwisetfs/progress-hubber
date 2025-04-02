
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Send, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  person: {
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    sender: string;
  };
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isRead: boolean;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    person: {
      name: 'Alex Johnson',
      avatar: undefined,
      isOnline: true,
    },
    lastMessage: {
      text: 'Sure, I can help with that. Let me know when you want to discuss.',
      timestamp: '09:42 AM',
      isRead: false,
      sender: 'Alex Johnson',
    },
    messages: [
      {
        id: '101',
        text: 'Hey, can you help me with the project requirements?',
        timestamp: '09:40 AM',
        sender: 'me',
        isRead: true,
      },
      {
        id: '102',
        text: 'Sure, I can help with that. Let me know when you want to discuss.',
        timestamp: '09:42 AM',
        sender: 'Alex Johnson',
        isRead: false,
      },
    ],
  },
  {
    id: '2',
    person: {
      name: 'Sarah Miller',
      avatar: undefined,
      isOnline: true,
    },
    lastMessage: {
      text: 'The marketing strategy is ready for review.',
      timestamp: 'Yesterday',
      isRead: true,
      sender: 'Sarah Miller',
    },
    messages: [
      {
        id: '201',
        text: 'Hi Sarah, how is the marketing strategy coming along?',
        timestamp: 'Yesterday',
        sender: 'me',
        isRead: true,
      },
      {
        id: '202',
        text: 'The marketing strategy is ready for review.',
        timestamp: 'Yesterday',
        sender: 'Sarah Miller',
        isRead: true,
      },
    ],
  },
  {
    id: '3',
    person: {
      name: 'John Doe',
      avatar: undefined,
      isOnline: false,
    },
    lastMessage: {
      text: 'I finished the API documentation, check it out when you have time.',
      timestamp: 'Jul 25',
      isRead: true,
      sender: 'John Doe',
    },
    messages: [
      {
        id: '301',
        text: 'How is the API documentation going?',
        timestamp: 'Jul 25',
        sender: 'me',
        isRead: true,
      },
      {
        id: '302',
        text: 'I finished the API documentation, check it out when you have time.',
        timestamp: 'Jul 25',
        sender: 'John Doe',
        isRead: true,
      },
    ],
  },
  {
    id: '4',
    person: {
      name: 'Emma Wilson',
      avatar: undefined,
      isOnline: false,
    },
    lastMessage: {
      text: 'The wireframes are ready for the client meeting tomorrow.',
      timestamp: 'Jul 23',
      isRead: true,
      sender: 'Emma Wilson',
    },
    messages: [
      {
        id: '401',
        text: 'When will the wireframes be ready?',
        timestamp: 'Jul 23',
        sender: 'me',
        isRead: true,
      },
      {
        id: '402',
        text: 'The wireframes are ready for the client meeting tomorrow.',
        timestamp: 'Jul 23',
        sender: 'Emma Wilson',
        isRead: true,
      },
    ],
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const filteredConversations = conversations.filter((conv) =>
    conv.person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all messages as read when conversation is selected
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversation.id) {
        const updatedMessages = conv.messages.map((msg) => ({
          ...msg,
          isRead: true,
        }));
        
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: {
            ...conv.lastMessage,
            isRead: true,
          },
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find((c) => c.id === conversation.id) || null);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMessageObj: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      isRead: false,
    };
    
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessageObj],
          lastMessage: {
            text: newMessage,
            timestamp: newMessageObj.timestamp,
            isRead: false,
            sender: 'me',
          },
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find((c) => c.id === selectedConversation.id) || null);
    setNewMessage('');
    
    toast({
      title: "Message sent",
      description: "Your message was sent successfully.",
    });
  };

  const startNewConversation = () => {
    toast({
      title: "Start a new conversation",
      description: "This feature is not implemented in this demo.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
              <p className="text-muted-foreground">
                Communicate with your team members
              </p>
            </div>
            <Button onClick={startNewConversation}>
              <UserPlus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
          
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-230px)]">
            {/* Conversations List */}
            <Card className="col-span-12 md:col-span-4 flex flex-col overflow-hidden">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-3 cursor-pointer hover:bg-muted flex items-start gap-3 ${
                        selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {conversation.person.name.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium truncate">
                            {conversation.person.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {conversation.lastMessage.timestamp}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.sender === 'me' && 'You: '}
                            {conversation.lastMessage.text}
                          </p>
                          {!conversation.lastMessage.isRead && 
                            conversation.lastMessage.sender !== 'me' && (
                            <Badge variant="default" className="h-2 w-2 rounded-full p-0">
                              <span className="sr-only">Unread message</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
            
            {/* Conversation Detail */}
            <Card className="col-span-12 md:col-span-8 flex flex-col overflow-hidden">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {selectedConversation.person.name.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedConversation.person.name}</div>
                        <div className="text-xs flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            selectedConversation.person.isOnline ? 'bg-green-500' : 'bg-muted-foreground'
                          }`} />
                          {selectedConversation.person.isOnline ? 'Online' : 'Offline'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => {
                        const isMe = message.sender === 'me';
                        return (
                          <div 
                            key={message.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                              <p className="mb-1">{message.text}</p>
                              <p className="text-xs opacity-70 text-right">{message.timestamp}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="min-h-[60px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        size="icon" 
                        className="h-[60px]"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <div className="text-center">
                    <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No conversation selected</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose a conversation from the list or start a new one.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={startNewConversation}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
