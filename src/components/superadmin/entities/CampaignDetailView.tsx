import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Campaign } from "@/types/campaignTypes";
import CampaignDetailHeader from "./campaign/CampaignDetailHeader";
import DateRangeSelector from "./campaign/DateRangeSelector";
import CampaignStatisticsTab from "./campaign/CampaignStatisticsTab";
import CampaignDetailsTab from "./campaign/CampaignDetailsTab";
import PromoNumbersTab from "./campaign/PromoNumbersTab";
import ManagePublishersTab from "./campaign/ManagePublishersTab";
import ManageAdvertisersTab from "./campaign/ManageAdvertisersTab";
import PublisherInviteModal from "@/components/publisher/PublisherInviteModal";

interface CampaignDetailViewProps {
  campaign: Campaign;
  onBack: () => void;
  onCampaignUpdate?: (updatedCampaign: Campaign) => void;
}

const CampaignDetailView = ({ campaign, onBack, onCampaignUpdate }: CampaignDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("campaign-statistics");
  const [dateRange, setDateRange] = useState("Today");
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <CampaignDetailHeader campaignName={campaign.name} onBack={onBack} />

      {/* Date Range Selector and Invite Button */}
      <div className="flex items-center justify-between">
        <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} />
        <Button onClick={() => setShowInviteModal(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Publisher
        </Button>
      </div>

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
          <CampaignDetailsTab campaign={campaign} onCampaignUpdate={onCampaignUpdate} />
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

      <PublisherInviteModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        campaignId={campaign.id}
        campaignName={campaign.name}
      />
    </div>
  );
};

export default CampaignDetailView;
