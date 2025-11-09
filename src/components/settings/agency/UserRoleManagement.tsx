import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crown, Shield, User, Search, Filter, ArrowLeft } from 'lucide-react';
import { RoleChangeConfirmDialog } from './RoleChangeConfirmDialog';

type UserRole = 'Owner' | 'Admin' | 'Agent';

interface AgencyUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  canTakeCalls: boolean;
  lastSeen: string;
  presence?: 'available' | 'away' | 'in-call' | 'offline';
}

// Generate 200 mock agency members
const generateAgencyMembers = (): AgencyUser[] => {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "David", "Barbara", "William", "Elizabeth", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Andrew", "Emily", "Paul", "Donna", "Joshua", "Michelle", "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Melissa", "George", "Deborah", "Timothy", "Stephanie"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
  const presenceOptions: Array<'available' | 'away' | 'in-call' | 'offline'> = ['available', 'away', 'in-call', 'offline'];
  const timeUnits = ["min", "minutes", "hour", "hours", "day", "days"];
  
  const members: AgencyUser[] = [];
  let ownerCount = 0;
  let adminCount = 0;
  let agentCount = 0;
  
  for (let i = 1; i <= 200; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Role distribution: 5 owners, 25 admins, 170 agents
    let role: UserRole;
    if (ownerCount < 5) {
      role = 'Owner';
      ownerCount++;
    } else if (adminCount < 25) {
      role = 'Admin';
      adminCount++;
    } else {
      role = 'Agent';
      agentCount++;
    }
    
    // Most users are active, few suspended
    const status: 'active' | 'suspended' = Math.random() > 0.95 ? 'suspended' : 'active';
    
    // Most active users can take calls
    const canTakeCalls = status === 'active' && Math.random() > 0.2;
    
    // Generate presence status (only for active users)
    const presence = status === 'active' 
      ? presenceOptions[Math.floor(Math.random() * presenceOptions.length)]
      : 'offline';
    
    // Generate last seen time
    const timeValue = Math.floor(Math.random() * 30) + 1;
    const timeUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
    const lastSeen = `${timeValue} ${timeUnit} ago`;
    
    members.push({
      id: i.toString(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@agency.com`,
      role,
      status,
      canTakeCalls,
      lastSeen,
      presence
    });
  }
  
  return members;
};

const mockUsers: AgencyUser[] = generateAgencyMembers();

interface UserRoleManagementProps {
  onBack?: () => void;
}

export const UserRoleManagement: React.FC<UserRoleManagementProps> = ({ onBack }) => {
  const [users, setUsers] = useState<AgencyUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [pendingChange, setPendingChange] = useState<{ member: AgencyUser; newRole: UserRole } | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
        <span className="flex items-center gap-1">
          {getRoleIcon(role)}
          <span>{role}</span>
        </span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    );
  };

  const handleRoleChange = (user: AgencyUser, newRole: UserRole) => {
    if (newRole === user.role) return;
    
    setPendingChange({ member: user, newRole });
    setShowConfirmDialog(true);
  };

  const confirmRoleChange = () => {
    if (!pendingChange) return;

    setUsers(users.map(u => 
      u.id === pendingChange.member.id 
        ? { ...u, role: pendingChange.newRole }
        : u
    ));
    
    setShowConfirmDialog(false);
    setPendingChange(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    Owner: users.filter(u => u.role === 'Owner').length,
    Admin: users.filter(u => u.role === 'Admin').length,
    Agent: users.filter(u => u.role === 'Agent').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <h2 className="text-2xl font-bold">User Role Management</h2>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage user roles and permissions across your agency
          </p>
        </div>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-600" />
              Owners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.Owner}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.Admin}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.Agent}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as typeof roleFilter)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Change Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastSeen}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user, value as UserRole)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">
                          <span className="flex items-center gap-2">
                            <Crown className="h-4 w-4" />
                            Owner
                          </span>
                        </SelectItem>
                        <SelectItem value="Admin">
                          <span className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Admin
                          </span>
                        </SelectItem>
                        <SelectItem value="Agent">
                          <span className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Agent
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Capabilities</CardTitle>
          <CardDescription>Understanding the permissions for each role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Crown className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <div className="font-semibold">Owner</div>
              <div className="text-sm text-muted-foreground">
                Full control over agency settings, members, billing, and transfers. Can promote/demote all users.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-semibold">Admin</div>
              <div className="text-sm text-muted-foreground">
                Can manage members, invites, take calls, and view reports. Cannot transfer ownership or manage billing.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <User className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-semibold">Agent</div>
              <div className="text-sm text-muted-foreground">
                Can take calls and view personal metrics only. Limited access to agency-wide settings.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoleChangeConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        pendingChange={pendingChange}
        onConfirm={confirmRoleChange}
      />
    </div>
  );
};
