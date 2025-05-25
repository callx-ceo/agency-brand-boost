
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@/types/campaignTypes";
import CampaignKPICards from "./CampaignKPICards";
import CampaignOverviewChart from "./CampaignOverviewChart";
import CampaignPublishersSection from "./CampaignPublishersSection";

interface CampaignStatisticsTabProps {
  campaign: Campaign;
}

const CampaignStatisticsTab = ({ campaign }: CampaignStatisticsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Campaign Status */}
      <div className="flex items-center gap-4">
        <Badge className="bg-green-100 text-green-800 px-3 py-1">
          {campaign.name} Active
        </Badge>
      </div>

      {/* KPI Cards */}
      <CampaignKPICards campaign={campaign} />

      {/* Overview Chart */}
      <CampaignOverviewChart />

      {/* Publishers Section */}
      <CampaignPublishersSection />
    </div>
  );
};

export default CampaignStatisticsTab;
