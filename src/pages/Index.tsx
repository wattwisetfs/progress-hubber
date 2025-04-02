
import { useState } from 'react';
import { Calendar, ChevronRight, Clock, Folder, LayoutGrid, List, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { DocumentItem } from '@/components/DocumentItem';
import { ActivityFeed } from '@/components/ActivityFeed';
import { documents, getRecentActivities, projects } from '@/data/mockData';

const Dashboard = () => {
  const recentActivities = getRecentActivities(5);
  const [view, setView] = useState<"grid" | "list">("grid");
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your team's progress.
              </p>
            </div>
            
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 since last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documents.length}</div>
                <p className="text-xs text-muted-foreground">
                  +8 added this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Nov 30</div>
                <p className="text-xs text-muted-foreground">
                  Content Strategy project
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hours Tracked</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248h</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={view === "grid" ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setView("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === "list" ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setView("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {view === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {projects.slice(0, 4).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <Tabs defaultValue="in-progress">
                      <div className="border-b px-3">
                        <TabsList className="justify-start h-12">
                          <TabsTrigger value="in-progress" className="text-sm">In Progress</TabsTrigger>
                          <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
                          <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="in-progress" className="m-0">
                        <div className="divide-y">
                          {projects.filter(p => p.progress < 100).map((project) => (
                            <div key={project.id} className="p-4">
                              <h3 className="font-semibold">{project.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 mb-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${project.progress}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="completed" className="m-0">
                        <div className="py-6 text-center">
                          <p className="text-muted-foreground">No completed projects yet.</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="all" className="m-0">
                        <div className="divide-y">
                          {projects.map((project) => (
                            <div key={project.id} className="p-4">
                              <h3 className="font-semibold">{project.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 mb-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${project.progress}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold tracking-tight">Recent Documents</h2>
                  <Button variant="outline" size="sm" className="gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {documents.slice(0, 3).map((doc) => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))}
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={recentActivities} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
