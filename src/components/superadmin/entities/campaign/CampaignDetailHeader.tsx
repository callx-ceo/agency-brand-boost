
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CampaignDetailHeaderProps {
  campaignName: string;
  onBack: () => void;
}

const CampaignDetailHeader = ({ campaignName, onBack }: CampaignDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO LIST
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Campaign: {campaignName}</h1>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailHeader;
