
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Campaign } from "@/types/campaignTypes";
import CampaignDetailHeader from "./campaign/CampaignDetailHeader";
import DateRangeSelector from "./campaign/DateRangeSelector";
import CampaignStatisticsTab from "./campaign/CampaignStatisticsTab";
import CampaignDetailsTab from "./campaign/CampaignDetailsTab";
import CampaignPlaceholderTab from "./campaign/CampaignPlaceholderTab";

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
        <div className="border-b">
          <TabsList className="h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="campaign-statistics" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              CAMPAIGN STATISTICS
            </TabsTrigger>
            <TabsTrigger 
              value="campaign-details"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              CAMPAIGN DETAILS
            </TabsTrigger>
            <TabsTrigger 
              value="promo-numbers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              PROMO NUMBERS
            </TabsTrigger>
            <TabsTrigger 
              value="manage-publishers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              MANAGE PUBLISHERS
            </TabsTrigger>
            <TabsTrigger 
              value="manage-advertisers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              MANAGE ADVERTISERS
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="campaign-statistics" className="space-y-6">
          <CampaignStatisticsTab campaign={campaign} />
        </TabsContent>

        <TabsContent value="campaign-details">
          <CampaignDetailsTab campaign={campaign} />
        </TabsContent>

        <TabsContent value="promo-numbers">
          <CampaignPlaceholderTab 
            title="Promo Numbers" 
            message="Promo numbers management coming soon..." 
          />
        </TabsContent>

        <TabsContent value="manage-publishers">
          <CampaignPlaceholderTab 
            title="Manage Publishers" 
            message="Publisher management coming soon..." 
          />
        </TabsContent>

        <TabsContent value="manage-advertisers">
          <CampaignPlaceholderTab 
            title="Manage Advertisers" 
            message="Advertiser management coming soon..." 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetailView;
