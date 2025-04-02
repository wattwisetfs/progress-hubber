
import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };
  
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {isSearching ? (
        <div className="flex flex-1 items-center">
          <Input
            autoFocus
            className="w-full max-w-md"
            placeholder="Search..."
            onBlur={() => setIsSearching(false)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsSearching(true)}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => navigate('/settings')}
            >
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
