import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Crown, Shield, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type UserRole = 'Owner' | 'Admin' | 'Agent';

interface InviteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Agent');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Sending invite:', { email, role });
      
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email} as ${role}`,
      });
      
      // Reset form
      setEmail('');
      setRole('Agent');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error sending invitation",
        description: "There was a problem sending the invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Owner': return <Crown className="h-4 w-4" />;
      case 'Admin': return <Shield className="h-4 w-4" />;
      case 'Agent': return <User className="h-4 w-4" />;
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'Owner':
        return 'Full control over agency settings, members, and billing';
      case 'Admin':
        return 'Can manage members, invites, and take calls';
      case 'Agent':
        return 'Can take calls and view personal metrics';
    }
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite User</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={handleRoleChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role)}
                      <span>{role}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agent">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Agent</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Admin">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Owner">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Owner</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {getRoleDescription(role)}
              </p>
            </div>

            {/* Role Preview */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Selected Role:</span>
                <Badge variant="outline" className="flex items-center space-x-1">
                  {getRoleIcon(role)}
                  <span>{role}</span>
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {getRoleDescription(role)}
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !email}>
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};