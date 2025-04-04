
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Mail, MoreHorizontal, Plus, UserPlus, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from '@/integrations/supabase/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TeamInvitation = Database['public']['Tables']['team_invitations']['Row'];
type TeamMember = Database['public']['Tables']['team_members']['Row'];

const Team = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('https://progresshub.app/invite/team123');
  const [teamMembers, setTeamMembers] = useState<Array<{ id: number; name: string; role: string; email: string; avatar: string; }>>([]);
  const [pendingInvites, setPendingInvites] = useState<Array<{ id: number; email: string; role: string; sent: string; }>>([]);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [newInviteRole, setNewInviteRole] = useState('');
  const [newInviteMessage, setNewInviteMessage] = useState('');
  const [pendingInvitations, setPendingInvitations] = useState<TeamInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPendingInvitations();
    }
  }, [user]);

  const fetchPendingInvitations = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      console.log("Fetching invitations for email:", user.email);
      const { data, error } = await supabase
        .from('team_invitations')
        .select('*')
        .eq('email', user.email)
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching invitations:', error);
        toast({
          title: "Error",
          description: "Could not fetch invitations: " + error.message,
          variant: "destructive"
        });
        return;
      }

      console.log("Invitations data:", data);
      setPendingInvitations(data || []);
    } catch (error) {
      console.error('Unexpected error fetching invitations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      // First update the invitation status
      const { error } = await supabase
        .from('team_invitations')
        .update({ 
          status: 'accepted', 
          invited_user_id: user?.id,
          updated_at: new Date().toISOString() 
        })
        .eq('id', invitationId);

      if (error) {
        toast({
          title: "Error",
          description: "Could not accept invitation: " + error.message,
          variant: "destructive"
        });
        return;
      }

      // Get the invitation details to add the user as a team member
      const { data: invitation, error: fetchError } = await supabase
        .from('team_invitations')
        .select('*')
        .eq('id', invitationId)
        .single();

      if (fetchError || !invitation) {
        toast({
          title: "Error",
          description: "Could not fetch invitation details",
          variant: "destructive"
        });
        return;
      }

      // Add the user to the team_members table
      if (user) {
        const { error: memberError } = await supabase
          .from('team_members')
          .insert({
            team_id: invitation.team_id,
            user_id: user.id,
            email: user.email || '',
            role: invitation.role
          });

        if (memberError) {
          toast({
            title: "Error",
            description: "Could not add you to the team: " + memberError.message,
            variant: "destructive"
          });
          return;
        }
      }

      toast({
        title: "Invitation Accepted",
        description: "You have joined the team!"
      });

      fetchPendingInvitations();
    } catch (error) {
      console.error('Error accepting invitation:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied!",
      description: "Invitation link has been copied to your clipboard.",
    });
  };

  const handleSendInvitation = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to send invitations",
        variant: "destructive"
      });
      return;
    }

    if (!newInviteEmail || !newInviteRole) {
      toast({
        title: "Missing Information",
        description: "Please provide an email and role",
        variant: "destructive"
      });
      return;
    }

    try {
      // First, check if we already have a team or need to create one
      let teamId: string;
      
      // Check if user owns a team
      const { data: existingTeams, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('owner_id', user.id);
        
      if (teamError) {
        throw new Error(`Error checking teams: ${teamError.message}`);
      }
      
      if (!existingTeams || existingTeams.length === 0) {
        // Create a team for this user
        const { data: newTeam, error: createTeamError } = await supabase
          .from('teams')
          .insert({
            name: `${user.email}'s Team`,
            owner_id: user.id
          })
          .select()
          .single();
          
        if (createTeamError || !newTeam) {
          throw new Error(`Could not create team: ${createTeamError?.message}`);
        }
        
        teamId = newTeam.id;
        
        // Add user as a team member with admin role
        await supabase
          .from('team_members')
          .insert({
            team_id: teamId,
            user_id: user.id,
            email: user.email || '',
            role: 'admin'
          });
      } else {
        teamId = existingTeams[0].id;
      }
      
      // Now create the invitation
      const { error } = await supabase
        .from('team_invitations')
        .insert({
          email: newInviteEmail,
          inviter_id: user.id,
          team_id: teamId,
          role: newInviteRole,
          status: 'pending',
          message: newInviteMessage || null
        });

      if (error) {
        console.error('Error sending invitation:', error);
        toast({
          title: "Error",
          description: "Could not send invitation: " + error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${newInviteEmail}`
      });

      setNewInviteEmail('');
      setNewInviteRole('');
      setNewInviteMessage('');
    } catch (error) {
      console.error('Error in send invitation flow:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleCancelInvite = (id: number) => {
    setPendingInvites(pendingInvites.filter(invite => invite.id !== id));
    toast({
      title: "Invitation cancelled",
      description: "The invitation has been cancelled successfully.",
    });
  };

  const handleResendInvite = (id: number) => {
    toast({
      title: "Invitation resent",
      description: "The invitation has been resent successfully.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
            <p className="text-muted-foreground">
              Manage your team members and their access to different projects.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team. They'll receive an email with instructions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="colleague@example.com"
                      className="col-span-3"
                      value={newInviteEmail}
                      onChange={(e) => setNewInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select value={newInviteRole} onValueChange={setNewInviteRole}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <Input
                      id="message"
                      placeholder="Optional message"
                      className="col-span-3"
                      value={newInviteMessage}
                      onChange={(e) => setNewInviteMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSendInvitation}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Invite Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Team Invitation Link</DialogTitle>
                  <DialogDescription>
                    Share this link with people you want to invite to your team.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 py-4">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost" onClick={copyInviteLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label>Expires in:</Label>
                    <Select defaultValue="7days">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24hours">24 hours</SelectItem>
                        <SelectItem value="7days">7 days</SelectItem>
                        <SelectItem value="30days">30 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label>Max uses:</Label>
                    <Select defaultValue="unlimited">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 use</SelectItem>
                        <SelectItem value="5">5 uses</SelectItem>
                        <SelectItem value="10">10 uses</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="pending">Pending Invites</TabsTrigger>
            <TabsTrigger value="invitations">Invitations for You</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team members and their roles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teamMembers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Role</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member) => (
                          <tr key={member.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant={member.role === 'admin' ? 'default' : 'outline'}>
                                {member.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{member.email}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Assign to Projects</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Remove from Team
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No Team Members Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
                      Get started by inviting people to join your team. Team members will appear here once they accept the invitation.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Invite Your First Team Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite Team Member</DialogTitle>
                          <DialogDescription>
                            Send an invitation to join your team. They'll receive an email with instructions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email-empty" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email-empty"
                              placeholder="colleague@example.com"
                              className="col-span-3"
                              value={newInviteEmail}
                              onChange={(e) => setNewInviteEmail(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role-empty" className="text-right">
                              Role
                            </Label>
                            <Select value={newInviteRole} onValueChange={setNewInviteRole}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="message-empty" className="text-right">
                              Message
                            </Label>
                            <Input
                              id="message-empty"
                              placeholder="Optional message"
                              className="col-span-3"
                              value={newInviteMessage}
                              onChange={(e) => setNewInviteMessage(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleSendInvitation}>Send Invitation</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>
                  Manage outstanding invitations to your team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingInvites.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Role</th>
                          <th className="text-left py-3 px-4 font-medium">Sent</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingInvites.map((invite) => (
                          <tr key={invite.id} className="border-b">
                            <td className="py-3 px-4">{invite.email}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{invite.role}</Badge>
                            </td>
                            <td className="py-3 px-4">{invite.sent}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleResendInvite(invite.id)}
                                >
                                  Resend
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleCancelInvite(invite.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Mail className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No Pending Invitations</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      When you invite team members, pending invitations will appear here until they are accepted.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="invitations">
            <Card>
              <CardHeader>
                <CardTitle>Invitations for You</CardTitle>
                <CardDescription>
                  Team invitations waiting for your response
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <p>Loading invitations...</p>
                  </div>
                ) : pendingInvitations.length > 0 ? (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingInvitations.map((invitation) => (
                          <TableRow key={invitation.id}>
                            <TableCell>{invitation.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{invitation.role}</Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(invitation.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button 
                                onClick={() => handleAcceptInvitation(invitation.id)}
                              >
                                Accept
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Mail className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No Pending Invitations</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      You currently have no team invitations waiting for your response.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="groups">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Team Groups</CardTitle>
                  <CardDescription>
                    Create and manage groups for better team organization.
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </CardHeader>
              <CardContent>
                {teamMembers.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Group cards would go here */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No Groups Created</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
                      Groups help you organize your team members for different projects and responsibilities. Add team members first before creating groups.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Management Toolkit</CardTitle>
            <CardDescription>
              Tools to help you manage your team effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Access Control</h3>
                <p className="text-sm text-muted-foreground">
                  Manage permissions and access levels for team members
                </p>
                <Button variant="outline" className="w-full">Manage Access</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Activity Logs</h3>
                <p className="text-sm text-muted-foreground">
                  View actions performed by team members
                </p>
                <Button variant="outline" className="w-full">View Logs</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Bulk Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Perform actions on multiple team members at once
                </p>
                <Button variant="outline" className="w-full">Bulk Actions</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Team;
