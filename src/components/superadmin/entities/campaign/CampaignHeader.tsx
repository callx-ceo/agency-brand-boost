
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CampaignHeaderProps {
  onBackToDashboard: () => void;
}

const CampaignHeader = ({ onBackToDashboard }: CampaignHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <p className="text-gray-600">Manage campaigns across all agencies and publishers</p>
      </div>
      <div className="flex gap-2">
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CampaignHeader;
