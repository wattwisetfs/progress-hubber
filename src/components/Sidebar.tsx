
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  FileText, 
  Home, 
  LayoutGrid, 
  Menu, 
  MessageSquare, 
  Plus, 
  Settings, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarLink = ({ icon: Icon, label, href, active }: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={cn(
      "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between h-16 px-4">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-sidebar-foreground">Progress<span className="text-sidebar-primary">Hub</span></h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-3 py-2">
        <Button 
          className={cn(
            "w-full justify-start gap-2",
            collapsed ? "px-0 justify-center" : ""
          )}
        >
          <Plus className="h-5 w-5" />
          {!collapsed && <span>New Project</span>}
        </Button>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1">
        <SidebarLink icon={Home} label="Dashboard" href="/" active={currentPath === "/"} />
        <SidebarLink icon={LayoutGrid} label="Projects" href="/projects" active={currentPath === "/projects"} />
        <SidebarLink icon={FileText} label="Documents" href="/documents" active={currentPath === "/documents"} />
        <SidebarLink icon={MessageSquare} label="Messages" href="/messages" active={currentPath === "/messages"} />
        <SidebarLink icon={Users} label="Team" href="/team" active={currentPath === "/team"} />
        <SidebarLink icon={BarChart} label="Reports" href="/reports" active={currentPath === "/reports"} />
      </div>

      <div className="px-3 py-2 mt-auto border-t border-sidebar-border">
        <SidebarLink icon={Settings} label="Settings" href="/settings" active={currentPath === "/settings"} />
      </div>
    </div>
  );
};

export default Sidebar;
