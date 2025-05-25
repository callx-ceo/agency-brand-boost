
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, PhoneCall, RotateCcw } from "lucide-react";
import { Campaign } from "@/types/campaignTypes";

interface CampaignKPICardsProps {
  campaign: Campaign;
}

const CampaignKPICards = ({ campaign }: CampaignKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-green-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">$ {campaign.revenueToday}</div>
              <div className="text-sm opacity-90">Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{campaign.callsToday}</div>
              <div className="text-sm opacity-90">Calls</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-90">Paid Calls</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{campaign.conversionRateMTD}%</div>
              <div className="text-sm opacity-90">Conv. Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignKPICards;
