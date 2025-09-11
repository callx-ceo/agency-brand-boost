
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Campaign } from "@/types/campaignTypes";
import { mockCampaigns } from "@/data/mockCampaigns";
import CampaignDetailView from "./CampaignDetailView";
import CampaignHeader from "./campaign/CampaignHeader";
import CampaignSummaryCards from "./campaign/CampaignSummaryCards";
import CampaignSearchFilter from "./campaign/CampaignSearchFilter";
import CampaignsTable from "./campaign/CampaignsTable";
import CreateCampaignWizard from "./CreateCampaignWizard";
import { CampaignFormData } from "./types/campaignTypes";

interface CampaignManagementProps {
  onBackToDashboard: () => void;
}

const CampaignManagement = ({ onBackToDashboard }: CampaignManagementProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // If a campaign is selected, show the detail view
  if (selectedCampaign) {
    return (
      <CampaignDetailView
        campaign={selectedCampaign}
        onBack={() => setSelectedCampaign(null)}
      />
    );
  }

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

  const handleCampaignCreated = (newCampaign: CampaignFormData) => {
    const campaign: Campaign = {
      id: newCampaign.id || Date.now().toString(),
      name: newCampaign.name,
      type: "Call Campaign",
      category: newCampaign.vertical,
      vertical: newCampaign.vertical,
      accepts: "Calls",
      approvedPublishers: 0,
      pendingPublishers: 0,
      callsToday: 0,
      callsMTD: 0,
      revenueToday: 0,
      revenueMTD: 0,
      conversionRateMTD: 0,
      status: newCampaign.status === "active" ? "active" : "paused"
    };
    setCampaigns([...campaigns, campaign]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CampaignHeader onBackToDashboard={onBackToDashboard} />
        <Button onClick={() => setIsWizardOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      <CampaignSummaryCards campaigns={campaigns} />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Campaigns</CardTitle>
            <CampaignSearchFilter 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </CardHeader>
        <CardContent>
          <CampaignsTable
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            onToggleStatus={toggleCampaignStatus}
          />
        </CardContent>
      </Card>

      {isWizardOpen && (
        <CreateCampaignWizard 
          onClose={() => setIsWizardOpen(false)}
          onCampaignCreated={handleCampaignCreated}
          userRole="super_admin"
        />
      )}
    </div>
  );
};

export default CampaignManagement;
