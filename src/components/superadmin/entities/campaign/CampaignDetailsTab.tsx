
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaignTypes";

interface CampaignDetailsTabProps {
  campaign: Campaign;
}

const CampaignDetailsTab = ({ campaign }: CampaignDetailsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Campaign Name</label>
            <p className="text-lg">{campaign.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Category</label>
            <p className="text-lg">{campaign.category}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Type</label>
            <p className="text-lg">{campaign.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Accepts</label>
            <p className="text-lg">{campaign.accepts}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignDetailsTab;
