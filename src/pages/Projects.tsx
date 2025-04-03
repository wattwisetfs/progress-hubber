
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
import { CalendarIcon, Clock, Filter, Grid, List, Plus, Search, SlidersHorizontal, Folder } from 'lucide-react';
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
import { useToast } from "@/components/ui/use-toast";
import { projects } from '@/data/mockData';

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projectDueDate, setProjectDueDate] = useState('');
  const [projectTeam, setProjectTeam] = useState('');
  const { toast } = useToast();
  
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

  const handleCreateProject = () => {
    if (!projectName) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project.",
        variant: "destructive"
      });
      return;
    }

    if (!projectStatus) {
      toast({
        title: "Status required",
        description: "Please select a status for your project.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Project created!",
      description: `${projectName} has been created successfully.`,
    });

    // Reset form
    setProjectName('');
    setProjectDescription('');
    setProjectStatus('');
    setProjectDueDate('');
    setProjectTeam('');
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
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
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
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={projectStatus} onValueChange={setProjectStatus}>
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
                      value={projectDueDate}
                      onChange={(e) => setProjectDueDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">
                    Team Members
                  </Label>
                  <Select value={projectTeam} onValueChange={setProjectTeam}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Assign team members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No team members yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
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
            {projects.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle>{project.name}</CardTitle>
                          <Badge className={`${getStatusColor(project.progress === 100 ? 'Completed' : 'In Progress')}`}>
                            {project.progress === 100 ? 'Completed' : 'In Progress'}
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
                            {project.teamMembers.map((memberId, index) => (
                              <Avatar key={index} className="border-2 border-background h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  TM
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
                            Documents: {project.documentsCount}
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
                                <Badge className={`${getStatusColor(project.progress === 100 ? 'Completed' : 'In Progress')}`}>
                                  {project.progress === 100 ? 'Completed' : 'In Progress'}
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
                                  {project.teamMembers.map((memberId, index) => (
                                    <Avatar key={index} className="border-2 border-background h-8 w-8">
                                      <AvatarFallback className="text-xs">
                                        TM
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
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Folder className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Projects Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
                  Get started by creating your first project. Projects help you organize your work and track progress.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Project
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
                        <Label htmlFor="name-empty" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name-empty"
                          placeholder="Project name"
                          className="col-span-3"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description-empty" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description-empty"
                          placeholder="Project description"
                          className="col-span-3"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status-empty" className="text-right">
                          Status
                        </Label>
                        <Select value={projectStatus} onValueChange={setProjectStatus}>
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
                        <Label htmlFor="dueDate-empty" className="text-right">
                          Due Date
                        </Label>
                        <div className="col-span-3 flex w-full max-w-sm items-center space-x-2">
                          <Input
                            type="date"
                            id="dueDate-empty"
                            value={projectDueDate}
                            onChange={(e) => setProjectDueDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active">
            {projects.filter(p => p.progress < 100).length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter(p => p.progress < 100)
                  .map((project) => (
                    // Project card content would go here...
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Folder className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Active Projects</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  Active projects will appear here once you create them.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {projects.filter(p => p.progress === 100).length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter(p => p.progress === 100)
                  .map((project) => (
                    // Project card content would go here...
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Folder className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Completed Projects</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  Completed projects will appear here after you finish them.
                </p>
              </div>
            )}
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
