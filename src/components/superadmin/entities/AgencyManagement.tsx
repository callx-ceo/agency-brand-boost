
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Search, Plus, Edit, Eye, Pause } from "lucide-react";

interface AgencyManagementProps {
  onBackToDashboard: () => void;
}

const mockAgencies = [
  { id: 1, name: "Elite Insurance Group", status: "active", agents: 28, revenue: 234567, lastActivity: "2 hours ago" },
  { id: 2, name: "Premier Coverage Solutions", status: "active", agents: 22, revenue: 218934, lastActivity: "1 hour ago" },
  { id: 3, name: "Guardian Life Services", status: "suspended", agents: 24, revenue: 176543, lastActivity: "2 days ago" },
  { id: 4, name: "ProTech Insurance Solutions", status: "pending", agents: 17, revenue: 165432, lastActivity: "5 hours ago" },
  { id: 5, name: "Dynasty Coverage Group", status: "active", agents: 20, revenue: 154321, lastActivity: "30 min ago" },
];

const AgencyManagement = ({ onBackToDashboard }: AgencyManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAgencies = mockAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agency Management</h1>
          <p className="text-gray-600">Manage and oversee all agencies on the platform</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Agencies ({filteredAgencies.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Agency
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agents</TableHead>
                <TableHead>Revenue MTD</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgencies.map((agency) => (
                <TableRow key={agency.id}>
                  <TableCell className="font-medium">{agency.name}</TableCell>
                  <TableCell>{getStatusBadge(agency.status)}</TableCell>
                  <TableCell>{agency.agents}</TableCell>
                  <TableCell>${agency.revenue.toLocaleString()}</TableCell>
                  <TableCell>{agency.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4" />
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

export default AgencyManagement;
