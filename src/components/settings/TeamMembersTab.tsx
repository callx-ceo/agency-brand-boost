import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Mail, User, Shield, Users, ChevronDown, Search, Copy, Link, CheckCircle2, DollarSign, MapPin } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "agent";
  status: "active" | "pending" | "inactive" | "paused";
  callStatus: "on-call" | "offline";
  loggedIn: boolean;
  joinDate: string;
  lastActive: string;
  verticals?: string[];
  bids?: VerticalBid[];
  targetStates?: string[];
  presence?: "available" | "away" | "offline";
  canTakeCalls?: boolean;
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

const TeamMembersTab = () => {
  const { startImpersonation } = useImpersonation();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@sampleagency.com",
      role: "admin",
      status: "active",
      callStatus: "offline",
      loggedIn: true,
      joinDate: "2024-01-15",
      lastActive: "2024-05-24",
      verticals: [],
      bids: [],
      targetStates: [],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@sampleagency.com",
      role: "manager",
      status: "active",
      callStatus: "on-call",
      loggedIn: true,
      joinDate: "2024-02-20",
      lastActive: "2024-05-23",
      verticals: ["Medicare", "Final Expense"],
      bids: [
        { vertical: "Medicare", bidAmount: 15.00, isValid: true },
        { vertical: "Final Expense", bidAmount: 10.00, isValid: true }
      ],
      targetStates: ["California", "Texas", "Florida"],
      presence: "away",
      canTakeCalls: true
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@sampleagency.com",
      role: "agent",
      status: "active",
      callStatus: "on-call",
      loggedIn: true,
      joinDate: "2024-03-10",
      lastActive: "2024-05-24",
      verticals: ["Auto Insurance", "Home Insurance"],
      bids: [
        { vertical: "Auto Insurance", bidAmount: 8.00, isValid: true },
        { vertical: "Home Insurance", bidAmount: 9.00, isValid: true }
      ],
      targetStates: ["New York", "New Jersey"],
      presence: "available",
      canTakeCalls: true
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@sampleagency.com",
      role: "agent",
      status: "pending",
      callStatus: "offline",
      loggedIn: false,
      joinDate: "2024-05-20",
      lastActive: "-",
      verticals: [],
      bids: [],
      targetStates: [],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "5",
      name: "Alex Thompson",
      email: "alex@sampleagency.com",
      role: "agent",
      status: "active",
      callStatus: "offline",
      loggedIn: true,
      joinDate: "2024-04-05",
      lastActive: "2024-05-24",
      verticals: ["Health Insurance"],
      bids: [
        { vertical: "Health Insurance", bidAmount: 12.00, isValid: true }
      ],
      targetStates: ["Illinois", "Michigan"],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "6",
      name: "Jessica Brown",
      email: "jessica@sampleagency.com",
      role: "manager",
      status: "active",
      callStatus: "offline",
      loggedIn: false,
      joinDate: "2024-03-25",
      lastActive: "2024-05-23",
      verticals: ["Life Insurance"],
      bids: [
        { vertical: "Life Insurance", bidAmount: 11.00, isValid: true }
      ],
      targetStates: ["Washington", "Oregon"],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "7",
      name: "David Wilson",
      email: "david@sampleagency.com",
      role: "agent",
      status: "paused",
      callStatus: "offline",
      loggedIn: true,
      joinDate: "2024-02-14",
      lastActive: "2024-05-20",
      verticals: [],
      bids: [],
      targetStates: [],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "8",
      name: "Lisa Garcia",
      email: "lisa@sampleagency.com",
      role: "agent",
      status: "active",
      callStatus: "on-call",
      loggedIn: true,
      joinDate: "2024-04-18",
      lastActive: "2024-05-24",
      verticals: ["Debt Settlement"],
      bids: [
        { vertical: "Debt Settlement", bidAmount: 18.00, isValid: true }
      ],
      targetStates: ["Arizona", "Nevada"],
      presence: "available",
      canTakeCalls: true
    },
    {
      id: "9",
      name: "Robert Martinez",
      email: "robert@sampleagency.com",
      role: "agent",
      status: "inactive",
      callStatus: "offline",
      loggedIn: false,
      joinDate: "2024-01-30",
      lastActive: "2024-05-15",
      verticals: [],
      bids: [],
      targetStates: [],
      presence: "offline",
      canTakeCalls: false
    },
    {
      id: "10",
      name: "Amanda Lee",
      email: "amanda@sampleagency.com",
      role: "agent",
      status: "pending",
      callStatus: "offline",
      loggedIn: false,
      joinDate: "2024-05-22",
      lastActive: "-",
      verticals: [],
      bids: [],
      targetStates: [],
      presence: "offline",
      canTakeCalls: false
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState("all");
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "agent" as "admin" | "manager" | "agent"
  });

  // Modals for verticals, bids, and states
  const [verticalsDialogOpen, setVerticalsDialogOpen] = useState(false);
  const [bidsDialogOpen, setBidsDialogOpen] = useState(false);
  const [statesDialogOpen, setStatesDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [bidSettings, setBidSettings] = useState<VerticalBid[]>([]);
  const [targetStates, setTargetStates] = useState<string[]>([]);

  // Get count for each filter
  const getFilterCount = useCallback((filter: string) => {
    return teamMembers.filter(member => {
      switch (filter) {
        case "all": return true;
        case "on-call": return member.callStatus === "on-call";
        case "offline": return member.callStatus === "offline";
        case "paused": return member.status === "paused";
        case "active": return member.status === "active";
        case "not-active": return member.status !== "active";
        case "pending": return member.status === "pending";
        case "logged-in": return member.loggedIn === true;
        case "not-logged-in": return member.loggedIn === false;
        default: return false;
      }
    }).length;
  }, [teamMembers]);

  // Filter members based on search query and active filter
  const filteredMembers = useMemo(() => {
    let filtered = teamMembers;

    // Apply status filter
    switch (activeFilter) {
      case "on-call":
        filtered = filtered.filter(member => member.callStatus === "on-call");
        break;
      case "offline":
        filtered = filtered.filter(member => member.callStatus === "offline");
        break;
      case "paused":
        filtered = filtered.filter(member => member.status === "paused");
        break;
      case "active":
        filtered = filtered.filter(member => member.status === "active");
        break;
      case "not-active":
        filtered = filtered.filter(member => member.status !== "active");
        break;
      case "pending":
        filtered = filtered.filter(member => member.status === "pending");
        break;
      case "logged-in":
        filtered = filtered.filter(member => member.loggedIn === true);
        break;
      case "not-logged-in":
        filtered = filtered.filter(member => member.loggedIn === false);
        break;
      case "all":
      default:
        // No filter applied
        break;
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [teamMembers, searchQuery, activeFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleImpersonate = (member: TeamMember) => {
    if (member.role === "admin") {
      toast.error("Cannot impersonate admin users");
      return;
    }
    
    if (member.status !== "active") {
      toast.error("Can only impersonate active agents");
      return;
    }

    startImpersonation({
      id: member.id,
      name: member.name,
      email: member.email
    });
    
    toast.success(`Now impersonating ${member.name}`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "manager":
        return <Users className="w-4 h-4" />;
      case "agent":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "manager":
        return "bg-blue-100 text-blue-700";
      case "agent":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "paused":
        return "bg-orange-100 text-orange-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (memberId: string, newStatus: "active" | "pending" | "inactive" | "paused") => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId 
        ? { ...member, status: newStatus }
        : member
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleRoleChange = (memberId: string, newRole: "admin" | "manager" | "agent") => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId 
        ? { ...member, role: newRole }
        : member
    ));
    toast.success(`Role updated to ${newRole}`);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: "pending",
      callStatus: "offline",
      loggedIn: false,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: "-"
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: "", email: "", role: "agent" });
    setIsAddDialogOpen(false);
    toast.success("Team member invited successfully");
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast.success("Team member removed");
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const copySignupLink = () => {
    const signupLink = "https://app.yourplatform.com/signup/agency/sampleagency";
    navigator.clipboard.writeText(signupLink);
    toast.success("Signup link copied to clipboard!");
  };

  // Verticals management
  const handleOpenVerticals = (member: TeamMember) => {
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
    
    setTeamMembers(prev => prev.map(m =>
      m.id === selectedMember.id
        ? { ...m, verticals: selectedVerticals }
        : m
    ));
    
    toast.success(`Verticals updated for ${selectedMember.name}`);
    setVerticalsDialogOpen(false);
  };

  // Bids management
  const handleOpenBids = (member: TeamMember) => {
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
    
    setTeamMembers(prev => prev.map(m =>
      m.id === selectedMember.id
        ? { ...m, bids: bidSettings }
        : m
    ));
    
    toast.success(`Bids updated for ${selectedMember.name}`);
    setBidsDialogOpen(false);
  };

  // States management
  const handleOpenStates = (member: TeamMember) => {
    setSelectedMember(member);
    setTargetStates(member.targetStates || []);
    setStatesDialogOpen(true);
  };

  const handleStateToggle = (state: string) => {
    setTargetStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleSaveStates = () => {
    if (!selectedMember) return;
    
    setTeamMembers(prev => prev.map(m =>
      m.id === selectedMember.id
        ? { ...m, targetStates: targetStates }
        : m
    ));
    
    toast.success(`States updated for ${selectedMember.name}`);
    setStatesDialogOpen(false);
  };

  const handleToggleCanTakeCalls = (memberId: string) => {
    setTeamMembers(prev => prev.map(m =>
      m.id === memberId
        ? { ...m, canTakeCalls: !m.canTakeCalls }
        : m
    ));
  };

  const getPresenceBadge = (presence?: string) => {
    switch (presence) {
      case "available":
        return <Badge className="bg-green-100 text-green-700">Available</Badge>;
      case "away":
        return <Badge className="bg-yellow-100 text-yellow-700">Away</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-700">Offline</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const showEllipsis = totalPages > 7;
    
    if (showEllipsis) {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 4) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => setCurrentPage(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-6">
      {/* Agent Signup Link Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Agent Signup Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share this link with potential agents to let them signup directly for your agency.
            </p>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <code className="flex-1 text-sm font-mono">
                https://app.yourplatform.com/signup/agency/sampleagency
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copySignupLink}
                className="shrink-0"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-gray-600">Manage your agency team and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(value) => 
                    setNewMember({ ...newMember, role: value as "admin" | "manager" | "agent" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <User className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.status === "active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Mail className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.role === "admin").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Team Members Table with Tabs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Team Members</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              {filteredMembers.length > 0 && (
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length} members
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Status Filters */}
          <div className="mb-6">
            <p className="text-sm font-medium text-muted-foreground mb-3">Quick Filter by Status</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                All ({getFilterCount("all")})
              </Button>
              <Button
                variant={activeFilter === "on-call" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("on-call")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                On Call ({getFilterCount("on-call")})
              </Button>
              <Button
                variant={activeFilter === "logged-in" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("logged-in")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Logged In ({getFilterCount("logged-in")})
              </Button>
              <Button
                variant={activeFilter === "offline" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("offline")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                Offline ({getFilterCount("offline")})
              </Button>
              <Button
                variant={activeFilter === "paused" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("paused")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Paused ({getFilterCount("paused")})
              </Button>
              <Button
                variant={activeFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("pending")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                Pending ({getFilterCount("pending")})
              </Button>
              <Button
                variant={activeFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("active")}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Active ({getFilterCount("active")})
              </Button>
            </div>
          </div>

          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <div className="hidden">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="on-call">On Call</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="not-active">Not Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="logged-in">Logged In</TabsTrigger>
                <TabsTrigger value="not-logged-in">Not Logged In</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeFilter} className="mt-0">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No team members found matching your search and filter criteria.</p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Verticals</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Presence</TableHead>
                        <TableHead>Can Take Calls</TableHead>
                        <TableHead>Last Seen</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getRoleBadgeColor(member.role)} flex items-center gap-1 w-fit`}>
                                {getRoleIcon(member.role)}
                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ChevronDown className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="bg-white">
                                  <DropdownMenuItem 
                                    onClick={() => handleRoleChange(member.id, "admin")}
                                    className="cursor-pointer flex items-center gap-2"
                                  >
                                    <Shield className="w-4 h-4 text-red-600" />
                                    Admin
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleRoleChange(member.id, "manager")}
                                    className="cursor-pointer flex items-center gap-2"
                                  >
                                    <Users className="w-4 h-4 text-blue-600" />
                                    Manager
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleRoleChange(member.id, "agent")}
                                    className="cursor-pointer flex items-center gap-2"
                                  >
                                    <User className="w-4 h-4 text-green-600" />
                                    Agent
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                          <TableCell>
                            {member.verticals && member.verticals.length > 0 ? (
                              <div className="flex gap-1 flex-wrap">
                                {member.verticals.slice(0, 2).map((vertical) => (
                                  <Badge key={vertical} variant="secondary" className="text-xs">
                                    {vertical}
                                  </Badge>
                                ))}
                                {member.verticals.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{member.verticals.length - 2}
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">No verticals assigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusBadgeColor(member.status)} w-fit`}>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ChevronDown className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="bg-white">
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(member.id, "active")}
                                    className="cursor-pointer"
                                  >
                                    Active
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(member.id, "pending")}
                                    className="cursor-pointer"
                                  >
                                    Pending
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(member.id, "paused")}
                                    className="cursor-pointer"
                                  >
                                    Paused
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(member.id, "inactive")}
                                    className="cursor-pointer"
                                  >
                                    Inactive
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPresenceBadge(member.presence)}
                          </TableCell>
                          <TableCell>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={member.canTakeCalls || false}
                                onChange={() => handleToggleCanTakeCalls(member.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{member.lastActive}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 flex-wrap">
                              {member.status === "pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleResendInvite(member.email)}
                                >
                                  <Mail className="w-4 h-4" />
                                </Button>
                              )}
                              {(member.role === "agent" || member.role === "manager") && member.status === "active" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleImpersonate(member)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <User className="w-4 h-4" />
                                </Button>
                              )}
                              {(member.role === "agent" || member.role === "manager") && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleOpenVerticals(member)}
                                    title="Manage Verticals"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleOpenBids(member)}
                                    title="Manage Bids"
                                  >
                                    <DollarSign className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleOpenStates(member)}
                                    title="Manage States"
                                  >
                                    <MapPin className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveMember(member.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          
                          {renderPaginationItems()}
                          
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold">Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• Manage team members</li>
                <li>• Billing and settings</li>
                <li>• View all reports</li>
                <li>• Cannot be impersonated</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">Manager</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage agents</li>
                <li>• View team reports</li>
                <li>• Agent performance</li>
                <li>• Receive calls</li>
                <li>• Can be impersonated</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Agent</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Receive calls</li>
                <li>• View own reports</li>
                <li>• Update profile</li>
                <li>• Basic access</li>
                <li>• Can be impersonated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* States Management Modal */}
      <Dialog open={statesDialogOpen} onOpenChange={setStatesDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Manage Target States - {selectedMember?.name}
            </DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardDescription>
                Select which US states this agent is licensed to handle. They'll only receive calls from contacts in their selected states.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Available States</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTargetStates(US_STATES)}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTargetStates([])}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto border rounded-md p-4">
                  {US_STATES.map((state) => (
                    <div key={state} className="flex items-center space-x-3">
                      <Checkbox
                        id={`state-${state}`}
                        checked={targetStates.includes(state)}
                        onCheckedChange={() => handleStateToggle(state)}
                      />
                      <Label 
                        htmlFor={`state-${state}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {state}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Selected States</p>
                    <p className="text-xs text-muted-foreground">
                      {targetStates.length === 0 
                        ? "No states selected - agent won't receive any calls"
                        : `${targetStates.length} state(s) selected`
                      }
                    </p>
                  </div>
                  {targetStates.length > 0 && (
                    <div className="flex gap-2">
                      {targetStates.slice(0, 3).map((state) => (
                        <Badge key={state} variant="default" className="text-xs">
                          {state}
                        </Badge>
                      ))}
                      {targetStates.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{targetStates.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStatesDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveStates} className="flex-1">
                  Save Target States
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMembersTab;
