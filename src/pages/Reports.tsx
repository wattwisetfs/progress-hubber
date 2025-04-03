
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Calendar, Download, FileText, Filter, PlusCircle, Share } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

const Reports = () => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  // Project Completion Stats
  const projectStats = [
    { name: 'Website Redesign', completed: 75, remaining: 25 },
    { name: 'Mobile App', completed: 45, remaining: 55 },
    { name: 'CRM Integration', completed: 20, remaining: 80 },
    { name: 'Marketing Campaign', completed: 100, remaining: 0 },
    { name: 'Product Launch', completed: 10, remaining: 90 },
  ];
  
  // Project Timeline Data
  const timelineData = [
    { name: 'Week 1', 'Tasks Completed': 5, 'New Tasks': 8 },
    { name: 'Week 2', 'Tasks Completed': 8, 'New Tasks': 6 },
    { name: 'Week 3', 'Tasks Completed': 12, 'New Tasks': 4 },
    { name: 'Week 4', 'Tasks Completed': 10, 'New Tasks': 9 },
    { name: 'Week 5', 'Tasks Completed': 15, 'New Tasks': 7 },
    { name: 'Week 6', 'Tasks Completed': 18, 'New Tasks': 5 },
  ];
  
  // Team Workload Data
  const workloadData = [
    { name: 'Alex J', tasks: 12, hours: 38 },
    { name: 'Sarah M', tasks: 8, hours: 32 },
    { name: 'David L', tasks: 15, hours: 42 },
    { name: 'Emily C', tasks: 6, hours: 28 },
    { name: 'Michael B', tasks: 10, hours: 35 },
  ];
  
  // Category Distribution Data
  const categoryData = [
    { name: 'Development', value: 35 },
    { name: 'Design', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Research', value: 10 },
    { name: 'Planning', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];
  
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
            <p className="text-muted-foreground">
              View performance metrics and insights for your projects.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={dateRange}
              onValueChange={(value: any) => setDateRange(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
            
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Projects</CardTitle>
              <CardDescription>Active projects in progress</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+3</span> since last month
              </p>
              <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Target: 16</span>
                <span>75% Complete</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tasks Completed</CardTitle>
              <CardDescription>Tasks completed this {dateRange}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12</span> compared to previous {dateRange}
              </p>
              <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Target: 80</span>
                <span>85% Complete</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team Productivity</CardTitle>
              <CardDescription>Average tasks per team member</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">10.2</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">-0.8</span> compared to previous {dateRange}
              </p>
              <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Target: 15</span>
                <span>68% of Target</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="project" className="space-y-4">
          <TabsList>
            <TabsTrigger value="project">Project Status</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="project">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Project Completion Status</CardTitle>
                  <CardDescription>
                    Progress status for active projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={projectStats}
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Completed']}
                          labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#0088FE" name="Completed %" />
                        <Bar dataKey="remaining" stackId="a" fill="#EEEEEE" name="Remaining %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Task Category Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of tasks by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {categoryData.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center mr-4">
                        <div 
                          className="w-3 h-3 rounded-full mr-1" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Task Completion Timeline</CardTitle>
                    <CardDescription>
                      Weekly task completion trends
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Tasks Completed" 
                        stroke="#0088FE" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="New Tasks" 
                        stroke="#00C49F" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Average Completion</div>
                    <div className="text-2xl font-bold mt-1">11.3</div>
                    <div className="text-xs text-green-500 mt-1">+22% from last period</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                    <div className="text-2xl font-bold mt-1">78%</div>
                    <div className="text-xs text-green-500 mt-1">+5% from last period</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Backlog Growth</div>
                    <div className="text-2xl font-bold mt-1">-3.2%</div>
                    <div className="text-xs text-green-500 mt-1">Decreased by 7% since last period</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Projected Completion</div>
                    <div className="text-2xl font-bold mt-1">Oct 15</div>
                    <div className="text-xs text-amber-500 mt-1">2 days behind schedule</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Team Workload Analysis</CardTitle>
                    <CardDescription>
                      Task distribution and hours per team member
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={workloadData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
                      <YAxis yAxisId="right" orientation="right" stroke="#00C49F" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="tasks" fill="#0088FE" name="Tasks Assigned" />
                      <Bar yAxisId="right" dataKey="hours" fill="#00C49F" name="Hours Worked" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="border rounded-md p-4 space-y-2">
                    <h3 className="font-medium">Team Efficiency</h3>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-sm text-muted-foreground">
                      Average task completion efficiency
                    </p>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-2">
                    <h3 className="font-medium">Avg Time Per Task</h3>
                    <div className="text-2xl font-bold">3.2 Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Average time spent on each task
                    </p>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-2">
                    <h3 className="font-medium">Resource Utilization</h3>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-sm text-muted-foreground">
                      Team capacity utilization rate
                    </p>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mx-auto rounded-full bg-primary/10 p-6 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary"></div>
              </div>
              <h3 className="text-xl font-semibold">Resource Allocation Report</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                This feature will be available in the upcoming release. You'll be able to view detailed resource allocation across projects and teams.
              </p>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Early Access
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Reporting Toolkit</CardTitle>
            <CardDescription>
              Tools to help you generate and analyze reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Custom Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Create custom reports using your own metrics
                </p>
                <Button variant="outline" className="w-full">Create Report</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Scheduled Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Set up automatic report delivery to stakeholders
                </p>
                <Button variant="outline" className="w-full">Schedule</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Data Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export data in various formats for further analysis
                </p>
                <Button variant="outline" className="w-full">Export Data</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
