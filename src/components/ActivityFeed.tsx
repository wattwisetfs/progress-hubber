
import { Circle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Activity, getUserById, getDocumentById, getProjectById } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const user = getUserById(activity.userId);
  
  const getResourceName = () => {
    if (activity.resourceType === 'document') {
      const document = getDocumentById(activity.resourceId);
      return document?.title || 'Unknown document';
    } else if (activity.resourceType === 'project') {
      const project = getProjectById(activity.resourceId);
      return project?.name || 'Unknown project';
    }
    return 'Unknown resource';
  };

  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="flex items-start space-x-4 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback className="text-xs">{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{user?.name}</span>
          {' '}
          <span className="text-muted-foreground">{activity.action}</span>
          {' '}
          <span className="font-medium">{getResourceName()}</span>
        </p>
        <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
      </div>
    </div>
  );
};

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center text-sm font-medium text-muted-foreground mb-2">
        <Circle className="h-2 w-2 fill-green-500 mr-2" />
        Recent Activity
      </div>
      
      <div>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
