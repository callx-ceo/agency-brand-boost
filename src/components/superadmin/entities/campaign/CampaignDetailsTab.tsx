import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Campaign } from "@/types/campaignTypes";
import BidFloorSettings from "./BidFloorSettings";

interface CampaignDetailsTabProps {
  campaign: Campaign;
}

const CampaignDetailsTab = ({ campaign }: CampaignDetailsTabProps) => {
  const handleBidFloorSave = (settings: any) => {
    console.log("Saving bid floor settings:", settings);
    // Here you would typically make an API call to save the settings
  };

  // Mock bid floor settings - in a real app, this would come from the campaign data
  const bidFloorSettings = {
    bidFloorEnabled: true,
    minimumBidFloor: 45.0,
    bidFloorCurrency: "USD" as const
  };

  return (
    <div className="space-y-6">
      {/* Bid Floor Settings */}
      <BidFloorSettings
        campaignName={campaign.name}
        vertical={campaign.category}
        initialSettings={bidFloorSettings}
        onSave={handleBidFloorSave}
      />

      {/* Campaign Basic Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {campaign.name}
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </CardTitle>
            <Button variant="outline" size="sm">EDIT</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Campaign Name</label>
              <p className="text-lg">{campaign.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <p className="text-sm text-gray-700">This is a bundle for consumers looking for Final Expense Insurance. Target is age 50+</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Campaign Type</label>
              <p className="text-lg">Bundle</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Bundle Category</label>
              <p className="text-lg">{campaign.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <p className="text-lg">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destination Offers */}
      <Card>
        <CardHeader>
          <CardTitle>Destination Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer Name</TableHead>
                <TableHead>Advertiser Name</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>IVR Type</TableHead>
                <TableHead>IVR (On/Off)</TableHead>
                <TableHead>IVR Filter(s)</TableHead>
                <TableHead>Destination Payout</TableHead>
                <TableHead>Connect Duration</TableHead>
                <TableHead>Publisher Payout</TableHead>
                <TableHead>EPC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-blue-600">Final Expense</TableCell>
                <TableCell>24 Hour Insurance</TableCell>
                <TableCell>0</TableCell>
                <TableCell>Robo</TableCell>
                <TableCell>On</TableCell>
                <TableCell>Free Quote</TableCell>
                <TableCell>$70.00</TableCell>
                <TableCell>120 seconds</TableCell>
                <TableCell>$65.00</TableCell>
                <TableCell>$41.51</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-blue-600">Indiana - Search</TableCell>
                <TableCell>Insurance Insurance Services</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Robo</TableCell>
                <TableCell>On</TableCell>
                <TableCell>Free Quote</TableCell>
                <TableCell>$50.00</TableCell>
                <TableCell>30 seconds</TableCell>
                <TableCell>$42.00</TableCell>
                <TableCell>$40.84</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Call Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Call Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Weighted Distribution</label>
                <p className="text-sm text-gray-600 mb-2">80 % of calls</p>
                <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Choose Best</label>
                <p className="text-sm text-gray-600 mb-2">20 % of calls</p>
                <Slider defaultValue={[20]} max={100} step={1} className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Yield</label>
                <p className="text-sm text-gray-600 mb-2">5 % of calls</p>
                <Slider defaultValue={[5]} max={100} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Round Robin</label>
                <p className="text-sm text-gray-600 mb-2">100 % of calls</p>
                <Slider defaultValue={[100]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Start Date</label>
              <p className="text-lg">March 9, 2023</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Expiration Date</label>
              <p className="text-lg">-</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Repeat Call Settings</label>
              <p className="text-lg">Disabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">RPHC</label>
              <p className="text-lg">$0.00</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Payout</label>
              <p className="text-lg">70.00%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Recording Calls</label>
              <p className="text-lg">Enabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Greeting Recording</label>
              <p className="text-lg">Enabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Lead Settings</label>
              <p className="text-lg">Enabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Off Hours Message</label>
              <p className="text-lg">Disabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Visibility Settings</label>
              <p className="text-lg">All publishers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Script Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Script Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Script Name</label>
              <p className="text-lg text-blue-600">{campaign.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Inbound IVR Tree</label>
              <p className="text-lg text-blue-600">🔊 Listen to IVR</p>
              <p className="text-sm text-gray-600">At the Start of the Call</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Script Content</label>
              <div className="border rounded p-3 bg-gray-50">
                <p className="text-sm text-gray-700">
                  If you're calling for a new life insurance quote or a final expense insurance quote, please press one now. 
                  If you're looking for customer service for questions on your existing policy, please press 2 now.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetailsTab;
