import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, Search, UserPlus, Crown, Shield, User, Eye, ArrowLeftRight, UserMinus, CheckCircle2, DollarSign, MapPin, UserCog, Pencil, X, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { InviteUserModal } from './InviteUserModal';
import { RoleChangeConfirmDialog } from './RoleChangeConfirmDialog';
import { TransferUserModal } from './TransferUserModal';
import { AgencyMemberDetailView } from './AgencyMemberDetailView';
import { useImpersonation } from '@/contexts/ImpersonationContext';

type UserRole = 'Owner' | 'Admin' | 'Agent';
type UserStatus = 'active' | 'suspended';

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
}

interface AgencyMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  canTakeCalls: boolean;
  lastSeen: string;
  presence?: 'available' | 'away' | 'in-call' | 'offline';
  verticals?: string[];
  bids?: VerticalBid[];
  targetStates?: Record<string, string[]>;
  referredBy?: string;
}

const AVAILABLE_VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];

const MINIMUM_BIDS: Record<string, number> = {
  "Final Expense": 8.00,
  "Medicare": 12.00,
  "Auto Insurance": 6.00,
  "Home Insurance": 7.00,
  "Health Insurance": 10.00,
  "Life Insurance": 9.00,
  "Debt Settlement": 15.00,
  "Home Services": 5.00,
  "Legal": 20.00
};

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

// Generate 200 agents with dummy data
const generateMockMembers = (): AgencyMember[] => {
  const firstNames = ['John', 'Sarah', 'Mike', 'Lisa', 'David', 'Emily', 'James', 'Maria', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Patricia', 'Richard', 'Elizabeth', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
  
  const roles: UserRole[] = ['Agent', 'Agent', 'Agent', 'Agent', 'Agent', 'Agent', 'Agent', 'Admin', 'Agent', 'Agent'];
  const statuses: UserStatus[] = ['active', 'active', 'active', 'active', 'active', 'active', 'suspended', 'active'];
  const presences: AgencyMember['presence'][] = ['available', 'away', 'in-call', 'offline', 'available', 'available'];
  const verticalsOptions = [
    ['Medicare'],
    ['Final Expense'],
    ['Auto Insurance'],
    ['Medicare', 'Final Expense'],
    ['Medicare', 'ACA'],
    ['Final Expense', 'Life Insurance'],
    ['Auto Insurance', 'Home Insurance'],
    ['ACA'],
    ['Life Insurance'],
    ['Medicare', 'Final Expense', 'ACA']
  ];
  
  const timeAgo = ['Just now', '2 min ago', '5 min ago', '15 min ago', '30 min ago', '1 hour ago', '2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '1 week ago'];
  
  const members: AgencyMember[] = [];
  
  const referrerNames = ['John Smith', 'Sarah Johnson', 'Michael Davis', 'Lisa Brown', 'David Wilson'];

  // Add owner
  members.push({
    id: '1',
    name: 'John Smith',
    email: 'john.smith@agency.com',
    role: 'Owner',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '2 minutes ago',
    presence: 'available',
    verticals: ['Medicare', 'Final Expense', 'ACA']
  });
  
  // Add 2 admins
  members.push({
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@agency.com',
    role: 'Admin',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '5 minutes ago',
    presence: 'in-call',
    verticals: ['Medicare', 'Auto Insurance'],
    referredBy: 'John Smith'
  });
  
  members.push({
    id: '3',
    name: 'Michael Davis',
    email: 'michael.davis@agency.com',
    role: 'Admin',
    status: 'active',
    canTakeCalls: true,
    lastSeen: '10 minutes ago',
    presence: 'available',
    verticals: ['Final Expense', 'Life Insurance'],
    referredBy: 'John Smith'
  });
  
  // Generate 97 agents (total 100 with owner and 2 admins)
  for (let i = 4; i <= 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@agency.com`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const presence = presences[Math.floor(Math.random() * presences.length)];
    const verticals = verticalsOptions[Math.floor(Math.random() * verticalsOptions.length)];
    const lastSeen = timeAgo[Math.floor(Math.random() * timeAgo.length)];
    const canTakeCalls = status === 'active' && Math.random() > 0.1;
    const referredBy = Math.random() > 0.6 ? referrerNames[Math.floor(Math.random() * referrerNames.length)] : undefined;
    
    members.push({
      id: i.toString(),
      name,
      email,
      role,
      status,
      canTakeCalls,
      lastSeen,
      presence: status === 'suspended' ? 'offline' : presence,
      verticals,
      referredBy
    });
  }
  
  return members;
};

const mockMembers: AgencyMember[] = generateMockMembers();

export const MembersTab: React.FC = () => {
  const { startImpersonation } = useImpersonation();
  const [members, setMembers] = useState<AgencyMember[]>(mockMembers);
  
  // Log member count for debugging
  console.log(`MembersTab loaded with ${members.length} members`);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'away' | 'in-call' | 'offline' | 'active' | 'suspended'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleChangeDialog, setShowRoleChangeDialog] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<AgencyMember | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{ member: AgencyMember; newRole: UserRole } | null>(null);

  // Modals for verticals and bids
  const [verticalsDialogOpen, setVerticalsDialogOpen] = useState(false);
  const [bidsDialogOpen, setBidsDialogOpen] = useState(false);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [bidSettings, setBidSettings] = useState<VerticalBid[]>([]);
  const [viewDetailsMode, setViewDetailsMode] = useState(false);
  const [detailMember, setDetailMember] = useState<any>(null);
  const [editingReferredBy, setEditingReferredBy] = useState<string | null>(null);

  // Only show active agents as potential referrers
  const activeAgentNames = members
    .filter(m => m.status === 'active')
    .map(m => m.name)
    .sort();

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active' || statusFilter === 'suspended') {
      return matchesSearch && member.status === statusFilter;
    }
    return matchesSearch && member.presence === statusFilter;
  });

  const getFilterCount = (filter: string) => {
    return mockMembers.filter(member => {
      if (filter === 'all') return true;
      if (filter === 'active' || filter === 'suspended') {
        return member.status === filter;
      }
      return member.presence === filter;
    }).length;
  };

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

  const handleImpersonate = (member: AgencyMember) => {
    startImpersonation({
      id: member.id,
      name: member.name,
      email: member.email
    });
    toast.success(`Now impersonating ${member.name}`);
  };

  const handleViewDetails = (member: AgencyMember) => {
    // Add mock performance data for detail view
    const enhancedMember: any = {
      id: member.id,
      name: member.name,
      email: member.email,
      agency: "Elite Insurance Group",
      status: member.status,
      performance: "94%",
      onlineTime: "6h 32m",
      callTime: "4h 18m",
      lastLogin: member.lastSeen,
      verticals: member.verticals || [],
      bids: member.bids || [],
      targetStates: member.targetStates || {}
    };
    setDetailMember(enhancedMember);
    setViewDetailsMode(true);
  };

  const handleUpdateMember = (updatedMember: any) => {
    setMembers(prev => prev.map(m =>
      m.id === updatedMember.id ? { 
        ...m, 
        verticals: updatedMember.verticals,
        bids: updatedMember.bids,
        targetStates: updatedMember.targetStates
      } : m
    ));
  };

  // Verticals management
  const handleOpenVerticals = (member: AgencyMember) => {
    setSelectedMember(member);
    setSelectedVerticals(member.verticals || []);
    setVerticalsDialogOpen(true);
  };

  const handleVerticalToggle = (vertical: string) => {
    setSelectedVerticals(prev =>
      prev.includes(vertical)
        ? prev.filter(v => v !== vertical)
        : [...prev, vertical]
    );
  };

  const handleSaveVerticals = () => {
    if (!selectedMember) return;
    
    setMembers(prev => prev.map(m =>
      m.id === selectedMember.id
        ? { ...m, verticals: selectedVerticals }
        : m
    ));
    
    toast.success(`Verticals updated for ${selectedMember.name}`);
    setVerticalsDialogOpen(false);
  };

  // Bids management
  const handleOpenBids = (member: AgencyMember) => {
    setSelectedMember(member);
    setBidSettings(member.bids || []);
    setSelectedVerticals(member.verticals || []);
    setBidsDialogOpen(true);
  };

  const handleBidChange = (vertical: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const minBid = MINIMUM_BIDS[vertical] || 0;
    
    setBidSettings(prev => {
      const existing = prev.find(b => b.vertical === vertical);
      if (existing) {
        return prev.map(b =>
          b.vertical === vertical
            ? { ...b, bidAmount: numValue, isValid: numValue >= minBid }
            : b
        );
      } else {
        return [...prev, { vertical, bidAmount: numValue, isValid: numValue >= minBid }];
      }
    });
  };

  const handleSaveBids = () => {
    if (!selectedMember) return;

    const invalidBids = bidSettings.filter(b => !b.isValid);
    if (invalidBids.length > 0) {
      toast.error("Please ensure all bids meet minimum requirements");
      return;
    }
    
    setMembers(prev => prev.map(m =>
      m.id === selectedMember.id
        ? { ...m, bids: bidSettings }
        : m
    ));
    
    toast.success(`Bids updated for ${selectedMember.name}`);
    setBidsDialogOpen(false);
  };

  // States management - removed as it's now handled in detail view
  const handleOpenStates = (member: AgencyMember) => {
    handleViewDetails(member);
  };

  const handleCanTakeCallsToggle = (memberId: string, canTakeCalls: boolean) => {
    console.log(`Setting canTakeCalls to ${canTakeCalls} for member ${memberId}`);
  };

  if (viewDetailsMode && detailMember) {
    return (
      <AgencyMemberDetailView
        member={detailMember}
        onBack={() => {
          setViewDetailsMode(false);
          setDetailMember(null);
        }}
        onUpdate={handleUpdateMember}
      />
    );
  }

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

      {/* Quick Status Filters */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Filter by Status</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="flex items-center gap-2"
          >
            All ({getFilterCount("all")})
          </Button>
          <Button
            variant={statusFilter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("available")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Available ({getFilterCount("available")})
          </Button>
          <Button
            variant={statusFilter === "in-call" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("in-call")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            In Call ({getFilterCount("in-call")})
          </Button>
          <Button
            variant={statusFilter === "away" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("away")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            Away ({getFilterCount("away")})
          </Button>
          <Button
            variant={statusFilter === "offline" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("offline")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            Offline ({getFilterCount("offline")})
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            Active ({getFilterCount("active")})
          </Button>
          <Button
            variant={statusFilter === "suspended" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("suspended")}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Suspended ({getFilterCount("suspended")})
          </Button>
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Referred By</TableHead>
              <TableHead>Verticals</TableHead>
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
                <TableCell>
                  <Popover
                    open={editingReferredBy === member.id}
                    onOpenChange={(open) => {
                      if (!open) setEditingReferredBy(null);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className="text-sm hover:underline cursor-pointer text-left"
                        onClick={() => {
                          setEditingReferredBy(member.id);
                          setReferredByInput("");
                        }}
                      >
                        {member.referredBy ? (
                          <span className="font-medium">{member.referredBy}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Click to assign</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search agents..." />
                        <CommandList>
                          <CommandEmpty>No matching agents found</CommandEmpty>
                          <CommandGroup heading="Active Agents">
                            <ScrollArea className="h-48">
                              {activeAgentNames
                                .filter(name => name !== member.name)
                                .map((name) => (
                                  <CommandItem
                                    key={name}
                                    value={name}
                                    onSelect={() => {
                                      setMembers(prev => prev.map(m => m.id === member.id ? { ...m, referredBy: name } : m));
                                      toast.success(`${member.name} referred by set to ${name}`);
                                      setEditingReferredBy(null);
                                    }}
                                  >
                                    <User className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                    <span>{name}</span>
                                    {member.referredBy === name && <Check className="h-3.5 w-3.5 ml-auto" />}
                                  </CommandItem>
                                ))}
                            </ScrollArea>
                          </CommandGroup>
                          {member.referredBy && (
                            <CommandGroup>
                              <CommandItem
                                onSelect={() => {
                                  setMembers(prev => prev.map(m => m.id === member.id ? { ...m, referredBy: undefined } : m));
                                  toast.success(`Referred by cleared for ${member.name}`);
                                  setEditingReferredBy(null);
                                }}
                                className="text-destructive"
                              >
                                <X className="h-3.5 w-3.5 mr-2" />
                                Clear referrer
                              </CommandItem>
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.verticals && member.verticals.length > 0 ? (
                      member.verticals.map((vertical) => (
                        <Badge key={vertical} variant="outline" className="text-xs">
                          {vertical}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No verticals assigned</span>
                    )}
                  </div>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleImpersonate(member)}>
                        <UserCog className="h-4 w-4 mr-2" />
                        Impersonate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {(member.role === 'Agent' || member.role === 'Admin') && (
                        <>
                          <DropdownMenuItem onClick={() => handleOpenVerticals(member)}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Manage Verticals
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenBids(member)}>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Manage Bids
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenStates(member)}>
                            <MapPin className="h-4 w-4 mr-2" />
                            Manage States
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setEditingReferredBy(member.id);
                            setReferredByInput(member.referredBy || "");
                          }}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Referred By
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem onClick={() => handleTransferUser(member)}>
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Transfer
                      </DropdownMenuItem>
                      {member.role !== 'Owner' && (
                        <>
                          {member.role === 'Agent' && (
                            <DropdownMenuItem onClick={() => handleRoleChange(member, 'Admin' as UserRole)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Promote to Admin
                            </DropdownMenuItem>
                          )}
                          {member.role === 'Admin' && (
                            <DropdownMenuItem onClick={() => {
                              setMembers(prev => prev.map(m => m.id === member.id ? { ...m, role: 'Agent' as UserRole } : m));
                              toast.success(`${member.name} demoted to Agent`);
                            }}>
                              <User className="h-4 w-4 mr-2" />
                              Demote to Agent
                            </DropdownMenuItem>
                          )}
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

      {/* Verticals Management Modal */}
      <Dialog open={verticalsDialogOpen} onOpenChange={setVerticalsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Manage Verticals - {selectedMember?.name}
            </DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardDescription>
                Select which verticals this agent can handle calls for. They'll only receive calls from campaigns matching their selected verticals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Available Verticals</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_VERTICALS.map((vertical) => (
                    <div key={vertical} className="flex items-center space-x-3">
                      <Checkbox
                        id={`vertical-${vertical}`}
                        checked={selectedVerticals.includes(vertical)}
                        onCheckedChange={() => handleVerticalToggle(vertical)}
                      />
                      <Label 
                        htmlFor={`vertical-${vertical}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {vertical}
                      </Label>
                      {selectedVerticals.includes(vertical) && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Selected Verticals</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedVerticals.length === 0 
                        ? "No verticals selected - agent won't receive any calls"
                        : `${selectedVerticals.length} vertical(s) selected`
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selectedVerticals.slice(0, 3).map((vertical) => (
                      <Badge key={vertical} variant="default" className="text-xs">
                        {vertical}
                      </Badge>
                    ))}
                    {selectedVerticals.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedVerticals.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setVerticalsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveVerticals} className="flex-1">
                  Save Vertical Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Bids Management Modal */}
      <Dialog open={bidsDialogOpen} onOpenChange={setBidsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Manage Bid Prices - {selectedMember?.name}
            </DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardDescription>
                Set bid amounts for each vertical. Higher bids increase call priority but also cost more per call.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedVerticals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No verticals assigned to this agent.</p>
                  <p className="text-xs mt-1">Assign verticals first to set bid prices.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedVerticals.map((vertical) => {
                    const currentBid = bidSettings.find(b => b.vertical === vertical);
                    const minBid = MINIMUM_BIDS[vertical] || 0;
                    const isValid = currentBid ? currentBid.bidAmount >= minBid : false;
                    const suggestedBid = minBid * 1.2;

                    return (
                      <Card key={vertical}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">{vertical}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              Min: ${minBid.toFixed(2)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label htmlFor={`bid-${vertical}`} className="text-xs">
                              Your Bid Amount
                            </Label>
                            <div className="flex gap-2 items-center">
                              <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`bid-${vertical}`}
                                  type="number"
                                  step="0.01"
                                  min={minBid}
                                  value={currentBid?.bidAmount || minBid}
                                  onChange={(e) => handleBidChange(vertical, e.target.value)}
                                  className={`pl-7 ${!isValid ? 'border-destructive' : ''}`}
                                />
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBidChange(vertical, minBid.toString())}
                              >
                                Set Min
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBidChange(vertical, suggestedBid.toFixed(2))}
                              >
                                Suggested
                              </Button>
                            </div>
                            {!isValid && currentBid && (
                              <p className="text-xs text-destructive">
                                Must be at least ${minBid.toFixed(2)}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Suggested bid: ${suggestedBid.toFixed(2)} (20% above minimum)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {selectedVerticals.length > 0 && (
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Estimated Weekly Spend</span>
                    <span className="text-lg font-semibold">
                      ${bidSettings.reduce((sum, bid) => sum + (bid.bidAmount * 50), 0).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on ~50 calls per vertical per week
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setBidsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveBids} className="flex-1" disabled={selectedVerticals.length === 0}>
                  Save Bid Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <TransferUserModal
        open={showTransferModal}
        onOpenChange={setShowTransferModal}
        member={selectedMember}
      />
    </div>
  );
};