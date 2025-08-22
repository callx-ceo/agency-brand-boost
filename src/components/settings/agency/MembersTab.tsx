import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreVertical, Search, UserPlus, Crown, Shield, User, Eye, ArrowLeftRight, UserMinus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { InviteUserModal } from './InviteUserModal';
import { RoleChangeConfirmDialog } from './RoleChangeConfirmDialog';
import { TransferUserModal } from './TransferUserModal';

type UserRole = 'Owner' | 'Admin' | 'Agent';
type UserStatus = 'active' | 'suspended';

interface AgencyMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  canTakeCalls: boolean;
  lastSeen: string;
  presence?: 'available' | 'away' | 'in-call' | 'offline';
}

const mockMembers: AgencyMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@agency.com',
    role: 'Owner',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '2 minutes ago',
    presence: 'available'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@agency.com',
    role: 'Admin',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '15 minutes ago',
    presence: 'away'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@agency.com',
    role: 'Agent',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '1 hour ago',
    presence: 'available'
  },
  {
    id: '4',
    name: 'Lisa Brown',
    email: 'lisa@agency.com',
    role: 'Agent',
    status: 'suspended',
    canTakeCalls: false,
    lastSeen: '2 days ago',
    presence: 'offline'
  }
];

export const MembersTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleChangeDialog, setShowRoleChangeDialog] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<AgencyMember | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{ member: AgencyMember; newRole: UserRole } | null>(null);

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Owner': return <Crown className="h-4 w-4" />;
      case 'Admin': return <Shield className="h-4 w-4" />;
      case 'Agent': return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    const colors = {
      Owner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Admin: 'bg-blue-100 text-blue-800 border-blue-200',
      Agent: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[role]}>
        <span className="flex items-center space-x-1">
          {getRoleIcon(role)}
          <span>{role}</span>
        </span>
      </Badge>
    );
  };

  const getStatusBadge = (status: UserStatus) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'destructive'}>
        {status === 'active' ? 'Active' : 'Suspended'}
      </Badge>
    );
  };

  const getPresenceBadge = (presence?: string) => {
    if (!presence) return null;
    
    const colors = {
      available: 'bg-green-100 text-green-800',
      away: 'bg-yellow-100 text-yellow-800',
      'in-call': 'bg-blue-100 text-blue-800',
      offline: 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={colors[presence as keyof typeof colors] || colors.offline}>
        {presence.charAt(0).toUpperCase() + presence.slice(1)}
      </Badge>
    );
  };

  const handleRoleChange = (member: AgencyMember, newRole: UserRole) => {
    if (newRole === 'Owner') {
      setPendingRoleChange({ member, newRole });
      setShowRoleChangeDialog(true);
    } else {
      // Direct role change for non-owner roles
      console.log(`Changing ${member.name} role to ${newRole}`);
    }
  };

  const handleTransferUser = (member: AgencyMember) => {
    setSelectedMember(member);
    setShowTransferModal(true);
  };

  const handleCanTakeCallsToggle = (memberId: string, canTakeCalls: boolean) => {
    console.log(`Setting canTakeCalls to ${canTakeCalls} for member ${memberId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Members Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Presence</TableHead>
              <TableHead>Can Take Calls</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(member.role)}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>{getPresenceBadge(member.presence)}</TableCell>
                <TableCell>
                  <Switch
                    checked={member.canTakeCalls}
                    onCheckedChange={(checked) => handleCanTakeCallsToggle(member.id, checked)}
                    disabled={member.status === 'suspended'}
                  />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {member.lastSeen}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleTransferUser(member)}>
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Transfer
                      </DropdownMenuItem>
                      {member.role !== 'Owner' && (
                        <>
                          <DropdownMenuItem onClick={() => handleRoleChange(member, 'Owner')}>
                            <Crown className="h-4 w-4 mr-2" />
                            Promote to Owner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <UserMinus className="h-4 w-4 mr-2" />
                            {member.status === 'active' ? 'Suspend' : 'Activate'}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <InviteUserModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
      />

      <RoleChangeConfirmDialog
        open={showRoleChangeDialog}
        onOpenChange={setShowRoleChangeDialog}
        pendingChange={pendingRoleChange}
        onConfirm={() => {
          if (pendingRoleChange) {
            console.log(`Promoting ${pendingRoleChange.member.name} to ${pendingRoleChange.newRole}`);
          }
          setPendingRoleChange(null);
          setShowRoleChangeDialog(false);
        }}
      />

      <TransferUserModal
        open={showTransferModal}
        onOpenChange={setShowTransferModal}
        member={selectedMember}
      />
    </div>
  );
};