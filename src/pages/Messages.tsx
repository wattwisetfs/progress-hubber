
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronDown, 
  Edit, 
  Info, 
  MessageSquarePlus, 
  MoreHorizontal, 
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  VideoIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Messages = () => {
  const [activeChat, setActiveChat] = useState('1');
  
  const contacts = [
    { id: '1', name: 'Alex Johnson', status: 'online', avatar: '', unread: 3, lastMessage: 'Can you review the latest designs?', lastActive: '10:32 AM' },
    { id: '2', name: 'Sarah Miller', status: 'offline', avatar: '', unread: 0, lastMessage: 'The meeting is scheduled for tomorrow', lastActive: 'Yesterday' },
    { id: '3', name: 'Development Team', status: 'group', avatar: '', unread: 5, lastMessage: 'David: I\'ve pushed the latest changes', lastActive: 'Yesterday' },
    { id: '4', name: 'Emily Chen', status: 'online', avatar: '', unread: 0, lastMessage: 'Sounds good!', lastActive: '2 days ago' },
    { id: '5', name: 'David Lee', status: 'away', avatar: '', unread: 0, lastMessage: 'I\'ll check and get back to you', lastActive: '3 days ago' },
    { id: '6', name: 'Marketing Team', status: 'group', avatar: '', unread: 0, lastMessage: 'Sarah: Let\'s discuss the campaign next week', lastActive: 'Last week' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      case 'group':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const messageHistory = [
    { id: 1, sender: 'other', content: 'Hi there! How's the project coming along?', time: '10:12 AM' },
    { id: 2, sender: 'me', content: 'Hey! Going well. Just finalizing the design mockups.', time: '10:15 AM' },
    { id: 3, sender: 'other', content: 'Great! When do you think you can share them with the team?', time: '10:17 AM' },
    { id: 4, sender: 'me', content: 'I should have them ready by EOD. There are a few minor adjustments I want to make first.', time: '10:20 AM' },
    { id: 5, sender: 'other', content: 'Perfect. The client is eager to see progress, so that timing works well.', time: '10:22 AM' },
    { id: 6, sender: 'other', content: 'Also, can you review the latest requirements doc? I've made some updates based on our last client call.', time: '10:23 AM' },
    { id: 7, sender: 'me', content: 'Sure, I'll take a look right after lunch.', time: '10:25 AM' },
    { id: 8, sender: 'other', content: 'Thanks! Appreciate it.', time: '10:26 AM' },
    { id: 9, sender: 'me', content: 'No problem. By the way, should we schedule a team check-in before the client demo?', time: '10:30 AM' },
    { id: 10, sender: 'other', content: 'Definitely. How about tomorrow morning? Around 9:30?', time: '10:32 AM' },
  ];

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar - Contact List */}
        <div className="w-full max-w-xs border-r flex flex-col bg-background">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Messages</h2>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                      <DialogDescription>
                        Start a new conversation or create a group chat.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="recipients" className="text-sm font-medium">
                          Recipients
                        </label>
                        <Input id="recipients" placeholder="Type a name or email" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Type your message" rows={3} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className={`p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer border-b ${activeChat === contact.id ? 'bg-muted' : ''}`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{contact.name}</p>
                    <span className="text-xs text-muted-foreground">{contact.lastActive}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <Badge variant="default" className="rounded-full h-5 min-w-5 px-1.5">
                    {contact.unread}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {contacts.find(c => c.id === activeChat)?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{contacts.find(c => c.id === activeChat)?.name}</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(contacts.find(c => c.id === activeChat)?.status || 'offline')}`}></span>
                      {contacts.find(c => c.id === activeChat)?.status === 'online' ? 'Online' : 
                       contacts.find(c => c.id === activeChat)?.status === 'away' ? 'Away' : 
                       contacts.find(c => c.id === activeChat)?.status === 'group' ? '5 members' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <VideoIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem>View Shared Files</DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Archive Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messageHistory.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'me' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback>
                          {contacts.find(c => c.id === activeChat)?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[70%] ${
                        message.sender === 'me' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      } p-3 rounded-lg`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="relative flex-1">
                    <Textarea
                      placeholder="Type a message..."
                      className="min-h-10 resize-none pl-3 pr-10 py-2"
                      rows={1}
                    />
                    <Button className="absolute right-1 bottom-1" size="icon" variant="ghost">
                      <Send className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="mb-4 p-4 rounded-full bg-muted">
                <MessageSquarePlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Select a conversation from the sidebar or start a new one.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                      Start a new conversation or create a group chat.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="recipients-empty" className="text-sm font-medium">
                        Recipients
                      </label>
                      <Input id="recipients-empty" placeholder="Type a name or email" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message-empty" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message-empty" placeholder="Type your message" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
