import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Building, Mail, Crown, Shield, User, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type UserRole = 'Owner' | 'Admin' | 'Agent';

interface InviteData {
  email: string;
  role: UserRole;
  agencyName: string;
  invitedBy: string;
  expiresAt: string;
  valid: boolean;
}

export const AcceptInvite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    const fetchInviteData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Mock invite data - replace with actual API call
        const mockData: InviteData = {
          email: 'newuser@example.com',
          role: 'Agent',
          agencyName: 'CallX Agency',
          invitedBy: 'John Smith',
          expiresAt: '2024-01-22 10:30 AM',
          valid: true
        };
        
        setInviteData(mockData);
      } catch (error) {
        console.error('Error fetching invite:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInviteData();
  }, [token]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !password || !confirmPassword) {
      toast({
        title: "All fields required",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    setAccepting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created successfully",
        description: `Welcome to ${inviteData?.agencyName}!`,
      });
      
      navigate('/agent-dashboard');
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAccepting(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Owner': return <Crown className="h-4 w-4" />;
      case 'Admin': return <Shield className="h-4 w-4" />;
      case 'Agent': return <User className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (!token || !inviteData?.valid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Invalid Invitation</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              This invitation link is invalid or has expired.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Complete Your Account</CardTitle>
          <p className="text-muted-foreground">
            You've been invited to join an agency on CallX
          </p>
        </CardHeader>

        <CardContent>
          {/* Invitation Details */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">{inviteData.agencyName}</p>
                <p className="text-sm text-muted-foreground">Agency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{inviteData.email}</p>
                <p className="text-sm text-muted-foreground">Your email</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {getRoleIcon(inviteData.role)}
              <div>
                <Badge variant="outline" className="font-medium">
                  {inviteData.role}
                </Badge>
                <p className="text-sm text-muted-foreground">Your role</p>
              </div>
            </div>
          </div>

          {/* Account Creation Form */}
          <form onSubmit={handleAccept} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={accepting}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={accepting}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={accepting}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={accepting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={accepting}>
              {accepting ? 'Creating Account...' : 'Accept Invitation'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};