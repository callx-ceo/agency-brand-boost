
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Pause, Play } from "lucide-react";
import { Campaign } from "@/types/campaignTypes";

interface CampaignsTableProps {
  campaigns: Campaign[];
  onCampaignClick: (campaign: Campaign) => void;
  onToggleStatus: (campaignId: string) => void;
}

const CampaignsTable = ({ campaigns, onCampaignClick, onToggleStatus }: CampaignsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Accepts</TableHead>
          <TableHead>Approved Publishers</TableHead>
          <TableHead>Pending Publishers</TableHead>
          <TableHead>Calls Today</TableHead>
          <TableHead>Calls MTD</TableHead>
          <TableHead>Revenue Today</TableHead>
          <TableHead>Revenue MTD</TableHead>
          <TableHead>Conv. Rate MTD</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">
              <button
                onClick={() => onCampaignClick(campaign)}
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                {campaign.name}
              </button>
            </TableCell>
            <TableCell>{campaign.type}</TableCell>
            <TableCell>{campaign.category}</TableCell>
            <TableCell>{campaign.accepts}</TableCell>
            <TableCell className="text-center">{campaign.approvedPublishers}</TableCell>
            <TableCell className="text-center">
              {campaign.pendingPublishers > 0 ? (
                <Badge variant="secondary">{campaign.pendingPublishers}</Badge>
              ) : (
                campaign.pendingPublishers
              )}
            </TableCell>
            <TableCell className="text-center">{campaign.callsToday}</TableCell>
            <TableCell className="text-center">{campaign.callsMTD.toLocaleString()}</TableCell>
            <TableCell className="text-center">${campaign.revenueToday.toFixed(2)}</TableCell>
            <TableCell className="text-center">${campaign.revenueMTD.toLocaleString()}</TableCell>
            <TableCell className="text-center">{campaign.conversionRateMTD}%</TableCell>
            <TableCell>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCampaignClick(campaign)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleStatus(campaign.id)}
                >
                  {campaign.status === "active" ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CampaignsTable;
