
import { Calendar, FileText, MoreVertical, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { type Project, getUserById } from '@/data/mockData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ProjectCardProps {
  project: Project;
  onDelete?: () => void;
}

export const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Due {format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
            
            <div className="ml-auto flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              <span>{project.documentsCount} docs</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex -space-x-2 mr-auto">
          {project.teamMembers && project.teamMembers.length > 0 ? (
            <>
              {project.teamMembers.slice(0, 3).map((memberId) => {
                const user = getUserById(memberId);
                return (
                  <Avatar key={memberId} className="border-2 border-background h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-xs">{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                );
              })}
              {project.teamMembers.length > 3 && (
                <Avatar className="border-2 border-background bg-muted h-8 w-8">
                  <AvatarFallback className="text-xs">+{project.teamMembers.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">No team members</span>
          )}
        </div>
        <Button variant="outline" size="sm">View</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
