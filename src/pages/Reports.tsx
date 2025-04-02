
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Calendar, Download, Filter, Printer, ChevronDown } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const projectCompletionData = [
  { name: 'Jan', completed: 5, inProgress: 8 },
  { name: 'Feb', completed: 7, inProgress: 10 },
  { name: 'Mar', completed: 8, inProgress: 7 },
  { name: 'Apr', completed: 10, inProgress: 6 },
  { name: 'May', completed: 12, inProgress: 8 },
  { name: 'Jun', completed: 9, inProgress: 9 },
  { name: 'Jul', completed: 11, inProgress: 12 },
];

const taskStatusData = [
  { name: 'Completed', value: 63, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#3B82F6' },
  { name: 'Todo', value: 12, color: '#6B7280' },
];

const teamPerformanceData = [
  { name: 'Alex', tasks: 24, completion: 92 },
  { name: 'Sarah', tasks: 18, completion: 87 },
  { name: 'John', tasks: 15, completion: 95 },
  { name: 'Emma', tasks: 21, completion: 89 },
  { name: 'Mike', tasks: 17, completion: 78 },
];

const Reports = () => {
  const [timeframe, setTimeframe] = useState('last7Days');
  const [reportType, setReportType] = useState('progress');
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Report exported",
      description: "The report has been exported successfully.",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print request sent",
      description: "The report is being prepared for printing.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">
                Analyze your team's performance and progress
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">132</div>
                <p className="text-xs text-muted-foreground">+23% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="progress" onValueChange={setReportType}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="progress">Progress Report</TabsTrigger>
                  <TabsTrigger value="team">Team Performance</TabsTrigger>
                  <TabsTrigger value="tasks">Task Analysis</TabsTrigger>
                </TabsList>
                
                <Select defaultValue={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7Days">Last 7 days</SelectItem>
                    <SelectItem value="lastMonth">Last month</SelectItem>
                    <SelectItem value="last3Months">Last 3 months</SelectItem>
                    <SelectItem value="lastYear">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Completion Rate</CardTitle>
                    <CardDescription>
                      Number of completed vs in-progress projects over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={projectCompletionData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" name="Completed" fill="#10B981" />
                        <Bar dataKey="inProgress" name="In Progress" fill="#3B82F6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>
                      Team member productivity and task completion rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={teamPerformanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="tasks" name="Tasks Completed" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="completion" name="Completion Rate (%)" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tasks">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Task Status Distribution</CardTitle>
                      <CardDescription>
                        Overview of tasks by their current status
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Task Efficiency Metrics</CardTitle>
                      <CardDescription>
                        Key metrics related to task completion
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Average Completion Time</div>
                            <div className="text-sm font-medium">2.4 days</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[75%]" />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <div>Target: 3 days</div>
                            <div>25% faster than target</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Task Completion Rate</div>
                            <div className="text-sm font-medium">87%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[87%]" />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <div>Target: 85%</div>
                            <div>2% above target</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Tasks Per Week</div>
                            <div className="text-sm font-medium">24</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[80%]" />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <div>Target: 30</div>
                            <div>20% below target</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Quality Score</div>
                            <div className="text-sm font-medium">92%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[92%]" />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <div>Target: 90%</div>
                            <div>2% above target</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
