
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Megaphone, Search, Plus, Edit, Eye } from "lucide-react";

interface AdvertiserManagementProps {
  onBackToDashboard: () => void;
}

const mockAdvertisers = [
  { id: 1, companyName: "HealthFirst Insurance Co.", industry: "Health Insurance", status: "active", spendMTD: 45670, roi: 340, accountManager: "John Smith" },
  { id: 2, companyName: "AutoGuard Solutions LLC", industry: "Auto Insurance", status: "active", spendMTD: 38920, roi: 285, accountManager: "Sarah Wilson" },
  { id: 3, companyName: "LifeCover Partners Inc.", industry: "Life Insurance", status: "under-review", spendMTD: 32145, roi: 410, accountManager: "Mike Johnson" },
  { id: 4, companyName: "HomeShield Corporation", industry: "Home Insurance", status: "paused", spendMTD: 28930, roi: 195, accountManager: "Emily Davis" },
  { id: 5, companyName: "BusinessGuard Enterprise", industry: "Commercial Insurance", status: "active", spendMTD: 52340, roi: 375, accountManager: "David Chen" },
];

const AdvertiserManagement = ({ onBackToDashboard }: AdvertiserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "under-review": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "paused": return <Badge variant="outline" className="bg-gray-100 text-gray-800">Paused</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAdvertisers = mockAdvertisers.filter(advertiser =>
    advertiser.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advertiser.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advertiser Management</h1>
          <p className="text-gray-600">Manage advertiser relationships and campaign performance</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Advertisers ({filteredAdvertisers.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search advertisers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Advertiser
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Spend MTD</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Account Manager</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdvertisers.map((advertiser) => (
                <TableRow key={advertiser.id}>
                  <TableCell className="font-medium">{advertiser.companyName}</TableCell>
                  <TableCell>{advertiser.industry}</TableCell>
                  <TableCell>{getStatusBadge(advertiser.status)}</TableCell>
                  <TableCell>${advertiser.spendMTD.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={advertiser.roi >= 300 ? "default" : "secondary"}>
                      {advertiser.roi}%
                    </Badge>
                  </TableCell>
                  <TableCell>{advertiser.accountManager}</TableCell>
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

export default AdvertiserManagement;
