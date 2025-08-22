import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Mail, RefreshCw, X, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { InviteUserModal } from './InviteUserModal';

type InviteStatus = 'pending' | 'accepted' | 'expired' | 'revoked';
type UserRole = 'Owner' | 'Admin' | 'Agent';

interface Invite {
  id: string;
  email: string;
  role: UserRole;
  invitedBy: string;
  sentAt: string;
  expiresAt: string;
  status: InviteStatus;
}

const mockInvites: Invite[] = [
  {
    id: '1',
    email: 'newuser@example.com',
    role: 'Agent',
    invitedBy: 'John Smith',
    sentAt: '2024-01-15 10:30 AM',
    expiresAt: '2024-01-22 10:30 AM',
    status: 'pending'
  },
  {
    id: '2',
    email: 'admin@example.com',
    role: 'Admin',
    invitedBy: 'John Smith',
    sentAt: '2024-01-14 2:15 PM',
    expiresAt: '2024-01-21 2:15 PM',
    status: 'pending'
  },
  {
    id: '3',
    email: 'agent@example.com',
    role: 'Agent',
    invitedBy: 'Sarah Johnson',
    sentAt: '2024-01-13 9:00 AM',
    expiresAt: '2024-01-20 9:00 AM',
    status: 'pending'
  },
  {
    id: '4',
    email: 'accepted@example.com',
    role: 'Agent',
    invitedBy: 'John Smith',
    sentAt: '2024-01-10 11:45 AM',
    expiresAt: '2024-01-17 11:45 AM',
    status: 'accepted'
  },
  {
    id: '5',
    email: 'expired@example.com',
    role: 'Admin',
    invitedBy: 'Sarah Johnson',
    sentAt: '2024-01-05 3:20 PM',
    expiresAt: '2024-01-12 3:20 PM',
    status: 'expired'
  }
];

export const InvitesTab: React.FC = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeInviteTab, setActiveInviteTab] = useState('pending');

  const getFilteredInvites = (status?: InviteStatus) => {
    if (!status) return mockInvites;
    return mockInvites.filter(invite => invite.status === status);
  };

  const getStatusBadge = (status: InviteStatus) => {
    const variants = {
      pending: { variant: 'outline' as const, icon: Clock, color: 'text-yellow-600' },
      accepted: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      expired: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      revoked: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' }
    };

    const { variant, icon: Icon, color } = variants[status];
    
    return (
      <Badge variant={variant}>
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: UserRole) => {
    const colors = {
      Owner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Admin: 'bg-blue-100 text-blue-800 border-blue-200',
      Agent: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[role]}>
        {role}
      </Badge>
    );
  };

  const handleResendInvite = (inviteId: string) => {
    console.log(`Resending invite ${inviteId}`);
  };

  const handleRevokeInvite = (inviteId: string) => {
    console.log(`Revoking invite ${inviteId}`);
  };

  const getTabCounts = () => {
    return {
      pending: getFilteredInvites('pending').length,
      all: mockInvites.length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Manage Invitations</h3>
          <p className="text-sm text-muted-foreground">
            Send invites to new team members and manage pending invitations
          </p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Invites Tabs */}
      <Tabs value={activeInviteTab} onValueChange={setActiveInviteTab}>
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <span>Pending</span>
            {tabCounts.pending > 0 && (
              <Badge variant="default" className="ml-1">
                {tabCounts.pending}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>All Invites</span>
            <Badge variant="secondary" className="ml-1">
              {tabCounts.all}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <PendingInvitesTable 
            invites={getFilteredInvites('pending')}
            onResend={handleResendInvite}
            onRevoke={handleRevokeInvite}
          />
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <AllInvitesTable 
            invites={mockInvites}
            onResend={handleResendInvite}
            onRevoke={handleRevokeInvite}
          />
        </TabsContent>
      </Tabs>

      {/* Invite Modal */}
      <InviteUserModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
      />
    </div>
  );
};

interface InvitesTableProps {
  invites: Invite[];
  onResend: (inviteId: string) => void;
  onRevoke: (inviteId: string) => void;
}

const PendingInvitesTable: React.FC<InvitesTableProps> = ({ invites, onResend, onRevoke }) => {
  const getRoleBadge = (role: UserRole) => {
    const colors = {
      Owner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Admin: 'bg-blue-100 text-blue-800 border-blue-200',
      Agent: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[role]}>
        {role}
      </Badge>
    );
  };

  if (invites.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No pending invites</h3>
        <p className="text-muted-foreground mb-4">
          All invitations have been responded to or expired.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead>Sent At</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">{invite.email}</TableCell>
              <TableCell>{getRoleBadge(invite.role)}</TableCell>
              <TableCell>{invite.invitedBy}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{invite.sentAt}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{invite.expiresAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onResend(invite.id)}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Resend
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevoke(invite.id)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Revoke
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const AllInvitesTable: React.FC<InvitesTableProps> = ({ invites, onResend, onRevoke }) => {
  const getStatusBadge = (status: InviteStatus) => {
    const variants = {
      pending: { variant: 'outline' as const, icon: Clock, color: 'text-yellow-600' },
      accepted: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      expired: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      revoked: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' }
    };

    const { variant, icon: Icon, color } = variants[status];
    
    return (
      <Badge variant={variant}>
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: UserRole) => {
    const colors = {
      Owner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Admin: 'bg-blue-100 text-blue-800 border-blue-200',
      Agent: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[role]}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead>Sent At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">{invite.email}</TableCell>
              <TableCell>{getRoleBadge(invite.role)}</TableCell>
              <TableCell>{getStatusBadge(invite.status)}</TableCell>
              <TableCell>{invite.invitedBy}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{invite.sentAt}</TableCell>
              <TableCell className="text-right">
                {invite.status === 'pending' && (
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResend(invite.id)}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Resend
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRevoke(invite.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Revoke
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};