
import { useState } from 'react';
import { Check, MoreHorizontal, Trash2 } from 'lucide-react';
import { TaskType } from '@/types/Task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskListProps {
  tasks: TaskType[];
  onUpdateStatus: (taskId: string, newStatus: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }: TaskListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done'),
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">To Do</h3>
        {tasksByStatus.todo.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            statusColor={getStatusColor(task.status)}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasksByStatus.todo.length === 0 && (
          <div className="text-sm text-muted-foreground p-2">No tasks to do</div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">In Progress</h3>
        {tasksByStatus.inProgress.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            statusColor={getStatusColor(task.status)}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasksByStatus.inProgress.length === 0 && (
          <div className="text-sm text-muted-foreground p-2">No tasks in progress</div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Done</h3>
        {tasksByStatus.done.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            statusColor={getStatusColor(task.status)}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasksByStatus.done.length === 0 && (
          <div className="text-sm text-muted-foreground p-2">No completed tasks</div>
        )}
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: TaskType;
  statusColor: string;
  onUpdateStatus: (taskId: string, newStatus: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskItem = ({ task, statusColor, onUpdateStatus, onDeleteTask }: TaskItemProps) => {
  return (
    <div className="border rounded-md p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
      <div>
        <div className="font-medium">{task.title}</div>
        <div className="text-sm text-muted-foreground">{task.description}</div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{task.assignee}</Badge>
          <Badge className={statusColor}>
            {task.status}
          </Badge>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(task.id, 'todo')}
            disabled={task.status === 'todo'}
          >
            Move to To Do
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(task.id, 'in-progress')}
            disabled={task.status === 'in-progress'}
          >
            Move to In Progress
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(task.id, 'done')}
            disabled={task.status === 'done'}
          >
            <Check className="h-4 w-4 mr-2" /> Mark as Done
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => onDeleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskList;
