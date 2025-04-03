
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarIcon, Clock, Filter, Grid, List, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with new design and functionality.',
      progress: 75,
      status: 'In Progress',
      dueDate: 'Oct 15, 2023',
      members: [
        { id: 1, name: 'Alex J', avatar: '' },
        { id: 2, name: 'Sarah M', avatar: '' },
        { id: 3, name: 'David L', avatar: '' },
      ],
      tasks: { completed: 18, total: 24 }
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Building a new mobile application for iOS and Android platforms.',
      progress: 45,
      status: 'In Progress',
      dueDate: 'Nov 30, 2023',
      members: [
        { id: 1, name: 'Alex J', avatar: '' },
        { id: 4, name: 'Emily C', avatar: '' },
      ],
      tasks: { completed: 12, total: 32 }
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q4 digital marketing campaign for new product launch.',
      progress: 100,
      status: 'Completed',
      dueDate: 'Sep 30, 2023',
      members: [
        { id: 2, name: 'Sarah M', avatar: '' },
        { id: 5, name: 'Michael B', avatar: '' },
      ],
      tasks: { completed: 15, total: 15 }
    },
    {
      id: 4,
      name: 'CRM Integration',
      description: 'Integrate the new CRM system with existing tools and migrate data.',
      progress: 20,
      status: 'In Progress',
      dueDate: 'Dec 15, 2023',
      members: [
        { id: 3, name: 'David L', avatar: '' },
        { id: 5, name: 'Michael B', avatar: '' },
      ],
      tasks: { completed: 5, total: 20 }
    },
    {
      id: 5,
      name: 'Product Launch',
      description: 'Preparation for the new product line launch event.',
      progress: 10,
      status: 'Just Started',
      dueDate: 'Jan 20, 2024',
      members: [
        { id: 1, name: 'Alex J', avatar: '' },
        { id: 2, name: 'Sarah M', avatar: '' },
        { id: 3, name: 'David L', avatar: '' },
        { id: 4, name: 'Emily C', avatar: '' },
      ],
      tasks: { completed: 2, total: 18 }
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Just Started':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">
              Manage and track all your ongoing projects.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new project. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Project name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Project description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <div className="col-span-3 flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="date"
                      id="dueDate"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">
                    Team Members
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Assign team members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Miller</SelectItem>
                      <SelectItem value="david">David Lee</SelectItem>
                      <SelectItem value="emily">Emily Chen</SelectItem>
                      <SelectItem value="michael">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-8"
            />
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Date Created (Newest)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Date Created (Oldest)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Due Date (Soonest)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Progress (High-Low)
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-none ${viewMode === 'grid' ? 'bg-muted' : ''}`} 
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-none ${viewMode === 'list' ? 'bg-muted' : ''}`} 
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {viewMode === 'grid' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge className={`${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {project.members.map((member) => (
                            <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {project.dueDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          Tasks: {project.tasks.completed}/{project.tasks.total}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Project</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Progress</th>
                          <th className="text-left py-3 px-4 font-medium">Due Date</th>
                          <th className="text-left py-3 px-4 font-medium">Team</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id} className="border-b">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{project.name}</p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(project.status)}`}>
                                {project.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1 w-32">
                                <Progress value={project.progress} />
                                <p className="text-xs text-right">{project.progress}%</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                {project.dueDate}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex -space-x-2">
                                {project.members.map((member) => (
                                  <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter(p => p.status !== 'Completed')
                .map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge className={`${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {project.members.map((member) => (
                            <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {project.dueDate}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter(p => p.status === 'Completed')
                .map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge className={`${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {project.members.map((member) => (
                            <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {project.dueDate}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="archived">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mx-auto rounded-full bg-primary/10 p-6 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary"></div>
              </div>
              <h3 className="text-xl font-semibold">No Archived Projects</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                When you archive projects, they will appear here. Archived projects are hidden from regular views but can be restored.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Management Toolkit</CardTitle>
            <CardDescription>
              Tools to help you manage projects more efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Gantt Chart</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize project timelines and dependencies
                </p>
                <Button variant="outline" className="w-full">Open Gantt</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Resource Allocation</h3>
                <p className="text-sm text-muted-foreground">
                  Manage team workload and resource distribution
                </p>
                <Button variant="outline" className="w-full">View Resources</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Project Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Use templates to quickly start new projects
                </p>
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Projects;
