
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Campaign } from "@/types/campaignTypes";

interface CampaignSummaryCardsProps {
  campaigns: Campaign[];
}

const CampaignSummaryCards = ({ campaigns }: CampaignSummaryCardsProps) => {
  return (
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
  );
};

export default CampaignSummaryCards;
