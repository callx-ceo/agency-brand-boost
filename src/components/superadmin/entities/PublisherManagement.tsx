
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Search, Plus, Edit, Eye, Star } from "lucide-react";

interface PublisherManagementProps {
  onBackToDashboard: () => void;
}

const mockPublishers = [
  { id: 1, name: "LeadGen Pro Network", type: "network", status: "active", qualityScore: 4.8, revenueMTD: 23450, callsDelivered: 1230 },
  { id: 2, name: "Digital Marketing Hub", type: "platform", status: "active", qualityScore: 4.6, revenueMTD: 19890, callsDelivered: 987 },
  { id: 3, name: "Traffic Solutions Inc", type: "individual", status: "under-review", qualityScore: 4.4, revenueMTD: 17650, callsDelivered: 856 },
  { id: 4, name: "Conversion Masters LLC", type: "network", status: "active", qualityScore: 4.7, revenueMTD: 15320, callsDelivered: 743 },
  { id: 5, name: "Premium Lead Sources", type: "platform", status: "suspended", qualityScore: 3.2, revenueMTD: 8940, callsDelivered: 234 },
];

const PublisherManagement = ({ onBackToDashboard }: PublisherManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "under-review": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "individual": return <Badge variant="outline">Individual</Badge>;
      case "network": return <Badge variant="secondary">Network</Badge>;
      case "platform": return <Badge variant="default">Platform</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredPublishers = mockPublishers.filter(publisher =>
    publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publisher.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Publisher Management</h1>
          <p className="text-gray-600">Manage publisher network and performance tracking</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Publishers ({filteredPublishers.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search publishers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Publisher
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Publisher Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Revenue MTD</TableHead>
                <TableHead>Calls Delivered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPublishers.map((publisher) => (
                <TableRow key={publisher.id}>
                  <TableCell className="font-medium">{publisher.name}</TableCell>
                  <TableCell>{getTypeBadge(publisher.type)}</TableCell>
                  <TableCell>{getStatusBadge(publisher.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{publisher.qualityScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>${publisher.revenueMTD.toLocaleString()}</TableCell>
                  <TableCell>{publisher.callsDelivered.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
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

export default PublisherManagement;
