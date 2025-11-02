import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Play, Pause, Users, Phone } from "lucide-react";
import CampaignDetailModal from "./CampaignDetailModal";
import CreateCampaignWizard from "../superadmin/entities/CreateCampaignWizard";
import { CampaignFormData } from "../superadmin/entities/types/campaignTypes";

interface Campaign {
  id: string;
  name: string;
  vertical: string;
  status: "active" | "paused" | "no_agents";
  callsReceived: number;
  connectedToAgent: number;
  fallbacksTriggered: number;
  createdAt: string;
  publishersCount?: number;
}

const CampaignsTab = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Holiday Sale Campaign",
      vertical: "Final Expense",
      status: "active",
      callsReceived: 156,
      connectedToAgent: 134,
      fallbacksTriggered: 22,
      createdAt: "2024-01-15",
      publishersCount: 3
    },
    {
      id: "2",
      name: "Spring Promotion",
      vertical: "Medicare",
      status: "paused",
      callsReceived: 89,
      connectedToAgent: 78,
      fallbacksTriggered: 11,
      createdAt: "2024-03-01",
      publishersCount: 2
    },
    {
      id: "3",
      name: "Summer Lead Gen",
      vertical: "Auto Insurance",
      status: "no_agents",
      callsReceived: 203,
      connectedToAgent: 145,
      fallbacksTriggered: 58,
      createdAt: "2024-05-20",
      publishersCount: 5
    }
  ]);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "no_agents":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "no_agents":
        return "No Agents Available";
      default:
        return "Unknown";
    }
  };

  const getVerticalColor = (vertical: string) => {
    switch (vertical) {
      case "Final Expense":
        return "bg-purple-100 text-purple-800";
      case "Medicare":
        return "bg-blue-100 text-blue-800";
      case "Auto Insurance":
        return "bg-green-100 text-green-800";
      case "Debt Settlement":
        return "bg-orange-100 text-orange-800";
      case "Home Services":
        return "bg-cyan-100 text-cyan-800";
      case "Legal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setIsDetailModalOpen(true);
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" }
        : campaign
    ));
  };

  const handleCampaignCreated = (newCampaign: CampaignFormData) => {
    const campaign: Campaign = {
      id: newCampaign.id || Date.now().toString(),
      name: newCampaign.name,
      vertical: newCampaign.vertical,
      status: newCampaign.status || "active",
      callsReceived: newCampaign.callsReceived || 0,
      connectedToAgent: newCampaign.connectedToAgent || 0,
      fallbacksTriggered: newCampaign.fallbacksTriggered || 0,
      createdAt: newCampaign.createdAt || new Date().toISOString().split('T')[0],
      publishersCount: 0
    };
    setCampaigns([...campaigns, campaign]);
  };

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Call Campaigns</h2>
          <p className="text-gray-600">Manage your promo number campaigns and call routing</p>
        </div>
        <Button onClick={() => setIsWizardOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold">{campaigns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.callsReceived, 0)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Connected Calls</p>
              <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.connectedToAgent, 0)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Vertical</TableHead>
                <TableHead>Publishers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Calls Received</TableHead>
                <TableHead>Connected to Agent</TableHead>
                <TableHead>Fallbacks Triggered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getVerticalColor(campaign.vertical)}>
                      {campaign.vertical}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{campaign.publishersCount || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusText(campaign.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.callsReceived}</TableCell>
                  <TableCell>{campaign.connectedToAgent}</TableCell>
                  <TableCell>{campaign.fallbacksTriggered}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCampaign(campaign.id)}
                      >
                        <Eye className="w-4 h-4" />
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

      {isWizardOpen && (
        <CreateCampaignWizard 
          onClose={() => setIsWizardOpen(false)}
          onCampaignCreated={handleCampaignCreated}
          userRole="agency_admin"
        />
      )}

      {selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedCampaignId(null);
          }}
        />
      )}
    </div>
  );
};

export default CampaignsTab;
