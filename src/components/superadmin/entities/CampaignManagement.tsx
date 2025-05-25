
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Eye, Edit, Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import CampaignDetailView from "./CampaignDetailView";

interface Campaign {
  id: string;
  name: string;
  type: string;
  category: string;
  accepts: string;
  approvedPublishers: number;
  pendingPublishers: number;
  callsToday: number;
  callsMTD: number;
  revenueToday: number;
  revenueMTD: number;
  conversionRateMTD: number;
  status: "active" | "paused" | "pending";
}

interface CampaignManagementProps {
  onBackToDashboard: () => void;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Final Expense Bundle",
    type: "Bundle",
    category: "Final Expense Bundle",
    accepts: "Calls, Leads",
    approvedPublishers: 25,
    pendingPublishers: 0,
    callsToday: 3,
    callsMTD: 8101,
    revenueToday: 0,
    revenueMTD: 139480,
    conversionRateMTD: 27.56,
    status: "active"
  },
  {
    id: "2",
    name: "Final Expense - Social - No IVR",
    type: "Bundle",
    category: "Final Expense - Social - Now IVR",
    accepts: "Calls, Leads",
    approvedPublishers: 16,
    pendingPublishers: 0,
    callsToday: 0,
    callsMTD: 2367,
    revenueToday: 0,
    revenueMTD: 85470,
    conversionRateMTD: 49.38,
    status: "active"
  },
  {
    id: "3",
    name: "Medicare Bundled Campaign",
    type: "Bundle",
    category: "Medicare Bundle",
    accepts: "Calls",
    approvedPublishers: 9,
    pendingPublishers: 1,
    callsToday: 0,
    callsMTD: 2774,
    revenueToday: 0,
    revenueMTD: 82280,
    conversionRateMTD: 53.92,
    status: "active"
  },
  {
    id: "4",
    name: "Auto Bundle - Private",
    type: "Bundle",
    category: "Auto Bundle - Private",
    accepts: "Calls, Leads",
    approvedPublishers: 19,
    pendingPublishers: 0,
    callsToday: 0,
    callsMTD: 9695,
    revenueToday: 0,
    revenueMTD: 70866,
    conversionRateMTD: 30.89,
    status: "active"
  },
  {
    id: "5",
    name: "Home Insurance Bundle",
    type: "Bundle",
    category: "Home Insurance OS",
    accepts: "Calls",
    approvedPublishers: 1,
    pendingPublishers: 0,
    callsToday: 0,
    callsMTD: 1203,
    revenueToday: 0,
    revenueMTD: 16830,
    conversionRateMTD: 25.43,
    status: "active"
  }
];

const CampaignManagement = ({ onBackToDashboard }: CampaignManagementProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // If a campaign is selected, show the detail view
  if (selectedCampaign) {
    return (
      <CampaignDetailView
        campaign={selectedCampaign}
        onBack={() => setSelectedCampaign(null)}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" }
        : campaign
    ));
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="text-gray-600">Manage campaigns across all agencies and publishers</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{campaigns.length}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {campaigns.filter(c => c.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {campaigns.reduce((sum, c) => sum + c.callsMTD, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Calls MTD</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${campaigns.reduce((sum, c) => sum + c.revenueMTD, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue MTD</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Campaigns</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Accepts</TableHead>
                <TableHead>Approved Publishers</TableHead>
                <TableHead>Pending Publishers</TableHead>
                <TableHead>Calls Today</TableHead>
                <TableHead>Calls MTD</TableHead>
                <TableHead>Revenue Today</TableHead>
                <TableHead>Revenue MTD</TableHead>
                <TableHead>Conv. Rate MTD</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => handleCampaignClick(campaign)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      {campaign.name}
                    </button>
                  </TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell>{campaign.category}</TableCell>
                  <TableCell>{campaign.accepts}</TableCell>
                  <TableCell className="text-center">{campaign.approvedPublishers}</TableCell>
                  <TableCell className="text-center">
                    {campaign.pendingPublishers > 0 ? (
                      <Badge variant="secondary">{campaign.pendingPublishers}</Badge>
                    ) : (
                      campaign.pendingPublishers
                    )}
                  </TableCell>
                  <TableCell className="text-center">{campaign.callsToday}</TableCell>
                  <TableCell className="text-center">{campaign.callsMTD.toLocaleString()}</TableCell>
                  <TableCell className="text-center">${campaign.revenueToday.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${campaign.revenueMTD.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{campaign.conversionRateMTD}%</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCampaignClick(campaign)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCampaignStatus(campaign.id)}
                      >
                        {campaign.status === "active" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
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

export default CampaignManagement;
