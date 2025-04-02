
import { File, FileImage, FileSpreadsheet, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { type Document, getUserById, getProjectById } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DocumentItemProps {
  document: Document;
}

export const DocumentItem = ({ document }: DocumentItemProps) => {
  const user = getUserById(document.createdBy);
  const project = getProjectById(document.projectId);
  
  const getDocumentIcon = () => {
    switch (document.type) {
      case 'doc':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'sheet':
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
      case 'image':
        return <FileImage className="h-6 w-6 text-purple-500" />;
      case 'pdf':
        return <File className="h-6 w-6 text-red-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div className={cn(
      "flex items-center p-3 rounded-md hover:bg-muted/50 transition-colors",
      "border border-border"
    )}>
      <div className="mr-3">
        {getDocumentIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{document.title}</h4>
        <div className="flex text-xs text-muted-foreground">
          <span className="truncate">
            {project?.name} • Updated {formatDate(document.updatedAt)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <Avatar className="h-6 w-6 mr-4">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-xs">{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;
