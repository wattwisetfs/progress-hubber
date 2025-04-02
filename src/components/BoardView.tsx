
import { useState } from 'react';
import { TaskType } from '@/types/Task';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BoardViewProps {
  tasks: TaskType[];
  onUpdateStatus: (taskId: string, newStatus: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const BoardView = ({ tasks, onUpdateStatus, onDeleteTask }: BoardViewProps) => {
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    onUpdateStatus(taskId, columnId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(column => (
        <div 
          key={column.id}
          className="bg-muted/30 rounded-md p-3"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h3 className="font-medium mb-3">{column.title}</h3>
          
          <div className="space-y-2">
            {tasks
              .filter(task => task.status === column.id)
              .map(task => (
                <Card 
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{task.title}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mt-1 -mr-1">
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
                            Move to Done
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
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    )}
                    
                    <Badge variant="outline" className="mt-2">{task.assignee}</Badge>
                  </CardContent>
                </Card>
              ))}
              
            {tasks.filter(task => task.status === column.id).length === 0 && (
              <div className="text-sm text-muted-foreground p-2 text-center">
                No tasks
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;
