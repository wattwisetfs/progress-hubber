
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Info, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingModal from '@/components/OnboardingModal';

const Index = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboardingComplete'));
  
  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  return (
    <Layout>
      {showOnboarding && <OnboardingModal onComplete={completeOnboarding} />}
      
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.email?.split('@')[0] || 'User'}</h2>
            <p className="text-muted-foreground">
              Access all your project tracking and management tools in one place.
            </p>
          </div>
          <Button className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Track and manage all your projects.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Active projects</p>
                </CardContent>
                <CardFooter>
                  <Link to="/projects" className="w-full">
                    <Button variant="secondary" className="w-full">
                      View All Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Team</CardTitle>
                  <CardDescription>Manage your team and collaborators.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Team members</p>
                </CardContent>
                <CardFooter>
                  <Link to="/team" className="w-full">
                    <Button variant="secondary" className="w-full">
                      View Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Manage and track project tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Open tasks</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    View All Tasks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-[24px_1fr] items-start pb-4 gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      1
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Invite your team members
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Start collaborating by inviting your team
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[24px_1fr] items-start pb-4 gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      2
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Create your first project
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Set up a project and define milestones
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[24px_1fr] items-start pb-4 gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      3
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Add and assign tasks
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Break down projects into actionable tasks
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setShowOnboarding(true)}>
                    <Info className="mr-2 h-4 w-4" />
                    Show Onboarding Guide
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-secondary w-2 h-2 mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New document added to Project Alpha</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-secondary w-2 h-2 mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Task completed by David Miller</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-secondary w-2 h-2 mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New team member joined</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  See what's been happening across your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        <div className="h-4 w-4 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Activity {i}</p>
                        <p className="text-sm text-muted-foreground">
                          This is a brief description of the activity
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i} hour{i !== 1 ? 's' : ''} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Analytics and performance metrics for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  Insights dashboard will be available in the next release
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
