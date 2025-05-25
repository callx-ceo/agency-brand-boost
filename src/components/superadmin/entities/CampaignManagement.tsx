
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaignTypes";
import { mockCampaigns } from "@/data/mockCampaigns";
import CampaignDetailView from "./CampaignDetailView";
import CampaignHeader from "./campaign/CampaignHeader";
import CampaignSummaryCards from "./campaign/CampaignSummaryCards";
import CampaignSearchFilter from "./campaign/CampaignSearchFilter";
import CampaignsTable from "./campaign/CampaignsTable";

interface CampaignManagementProps {
  onBackToDashboard: () => void;
}

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
      <CampaignHeader onBackToDashboard={onBackToDashboard} />

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
    </div>
  );
};

export default CampaignManagement;
