import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";
import { Plus, Edit, Trash2, Mail, User, Shield, Users, ChevronDown, Search, Copy, Link } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";

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
}

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
      lastActive: "2024-05-24"
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
      lastActive: "2024-05-23"
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
      lastActive: "2024-05-24"
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
      lastActive: "-"
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
      lastActive: "2024-05-24"
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
      lastActive: "2024-05-23"
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
      lastActive: "2024-05-20"
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
      lastActive: "2024-05-24"
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
      lastActive: "2024-05-15"
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
      lastActive: "-"
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
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Call Status</TableHead>
                        <TableHead>Logged In</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
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
                            <Badge className={member.callStatus === "on-call" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {member.callStatus === "on-call" ? "On Call" : "Offline"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={member.loggedIn ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                              {member.loggedIn ? "Logged In" : "Not Logged In"}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                          <TableCell>{member.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
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
    </div>
  );
};

export default TeamMembersTab;
