
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ListTodo, LayoutGrid } from 'lucide-react';
import { BoardView } from '@/components/BoardView';
import { TaskList } from '@/components/TaskList';
import { TaskType } from '@/types/Task';

const initialTasks: TaskType[] = [
  { id: '1', title: 'Design new dashboard', description: 'Create wireframes and mockups', status: 'todo', assignee: 'Alex Johnson' },
  { id: '2', title: 'Frontend implementation', description: 'Convert designs to code', status: 'in-progress', assignee: 'Sarah Miller' },
  { id: '3', title: 'Backend API', description: 'Create endpoints for dashboard data', status: 'in-progress', assignee: 'John Doe' },
  { id: '4', title: 'Write documentation', description: 'Document the dashboard features', status: 'todo', assignee: 'Emma Wilson' },
  { id: '5', title: 'Bug fixes', description: 'Fix reported bugs in the navigation', status: 'done', assignee: 'Alex Johnson' },
  { id: '6', title: 'Unit testing', description: 'Write tests for core features', status: 'todo', assignee: 'Sarah Miller' },
];

const Team = () => {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [viewType, setViewType] = useState<'list' | 'board'>('list');

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      status: 'todo',
      assignee: 'Unassigned'
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Team Tasks</h1>
              <p className="text-muted-foreground">
                Manage and track your team's tasks and progress
              </p>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Tasks</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewType === "list" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setViewType("list")}
                  className="flex items-center gap-2"
                >
                  <ListTodo className="h-4 w-4" />
                  List
                </Button>
                <Button 
                  variant={viewType === "board" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setViewType("board")}
                  className="flex items-center gap-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Board
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Input 
                  placeholder="Add a new task..." 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1"
                />
                <Button onClick={addTask}>
                  <Plus className="h-4 w-4 mr-2" /> Add Task
                </Button>
              </div>
              
              {viewType === 'list' ? (
                <TaskList 
                  tasks={tasks} 
                  onUpdateStatus={updateTaskStatus} 
                  onDeleteTask={deleteTask} 
                />
              ) : (
                <BoardView 
                  tasks={tasks} 
                  onUpdateStatus={updateTaskStatus} 
                  onDeleteTask={deleteTask} 
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Team;
