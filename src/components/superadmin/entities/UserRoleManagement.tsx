
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, Search, Plus, Edit, Shield } from "lucide-react";

interface UserRoleManagementProps {
  onBackToDashboard: () => void;
}

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@platform.com", role: "super-admin", lastLogin: "1 hour ago", status: "active" },
  { id: 2, name: "Agency Manager", email: "manager@elite.com", role: "agency-admin", lastLogin: "30 min ago", status: "active" },
  { id: 3, name: "Agent Smith", email: "smith@elite.com", role: "agent", lastLogin: "2 hours ago", status: "active" },
  { id: 4, name: "Publisher Rep", email: "rep@leadgen.com", role: "publisher", lastLogin: "1 day ago", status: "inactive" },
  { id: 5, name: "Advertiser Contact", email: "contact@healthfirst.com", role: "advertiser", lastLogin: "3 hours ago", status: "active" },
];

const UserRoleManagement = ({ onBackToDashboard }: UserRoleManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super-admin": return <Badge variant="destructive">Super Admin</Badge>;
      case "agency-admin": return <Badge variant="default">Agency Admin</Badge>;
      case "agent": return <Badge variant="secondary">Agent</Badge>;
      case "advertiser": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Advertiser</Badge>;
      case "publisher": return <Badge variant="outline" className="bg-purple-100 text-purple-800">Publisher</Badge>;
      default: return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User & Role Management</h1>
          <p className="text-gray-600">Platform-wide user permissions and role assignments</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Platform Users ({filteredUsers.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleManagement;
