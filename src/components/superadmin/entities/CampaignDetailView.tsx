import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Campaign } from "@/types/campaignTypes";
import CampaignDetailHeader from "./campaign/CampaignDetailHeader";
import DateRangeSelector from "./campaign/DateRangeSelector";
import CampaignStatisticsTab from "./campaign/CampaignStatisticsTab";
import CampaignDetailsTab from "./campaign/CampaignDetailsTab";
import PromoNumbersTab from "./campaign/PromoNumbersTab";
import ManagePublishersTab from "./campaign/ManagePublishersTab";
import ManageAdvertisersTab from "./campaign/ManageAdvertisersTab";

interface CampaignDetailViewProps {
  campaign: Campaign;
  onBack: () => void;
}

const CampaignDetailView = ({ campaign, onBack }: CampaignDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("campaign-statistics");
  const [dateRange, setDateRange] = useState("Today");

  return (
    <div className="space-y-6">
      {/* Header */}
      <CampaignDetailHeader campaignName={campaign.name} onBack={onBack} />

      {/* Date Range Selector */}
      <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} />

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaign-statistics">
            Campaign Statistics
          </TabsTrigger>
          <TabsTrigger value="campaign-details">
            Campaign Details
          </TabsTrigger>
          <TabsTrigger value="promo-numbers">
            Promo Numbers
          </TabsTrigger>
          <TabsTrigger value="manage-publishers">
            Manage Publishers
          </TabsTrigger>
          <TabsTrigger value="manage-advertisers">
            Manage Advertisers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaign-statistics" className="space-y-6">
          <CampaignStatisticsTab campaign={campaign} />
        </TabsContent>

        <TabsContent value="campaign-details">
          <CampaignDetailsTab campaign={campaign} />
        </TabsContent>

        <TabsContent value="promo-numbers">
          <PromoNumbersTab />
        </TabsContent>

        <TabsContent value="manage-publishers">
          <ManagePublishersTab />
        </TabsContent>

        <TabsContent value="manage-advertisers">
          <ManageAdvertisersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetailView;
