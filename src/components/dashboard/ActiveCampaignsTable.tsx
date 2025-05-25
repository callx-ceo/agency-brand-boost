
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    name: "Final Expense FL",
    promoNumber: "888-123-4567",
    vertical: "Final Expense",
    callsToday: 34,
    capPercentage: 85,
    fallbacks: 2
  },
  {
    id: 2,
    name: "Medicare Advantage Q4",
    promoNumber: "888-234-5678",
    vertical: "Medicare",
    callsToday: 28,
    capPercentage: 92,
    fallbacks: 1
  },
  {
    id: 3,
    name: "Life Insurance TX",
    promoNumber: "888-345-6789",
    vertical: "Life Insurance",
    callsToday: 17,
    capPercentage: 45,
    fallbacks: 0
  }
];

const ActiveCampaignsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Active Campaigns
          <Badge variant="secondary">{mockCampaigns.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Vertical</TableHead>
              <TableHead>Calls Today</TableHead>
              <TableHead>Cap %</TableHead>
              <TableHead>Fallbacks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.promoNumber}</div>
                  </div>
                </TableCell>
                <TableCell>{campaign.vertical}</TableCell>
                <TableCell>{campaign.callsToday}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={campaign.capPercentage > 90 ? "destructive" : campaign.capPercentage > 75 ? "secondary" : "outline"}
                    >
                      {campaign.capPercentage}%
                    </Badge>
                    {campaign.capPercentage > 90 && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {campaign.fallbacks > 0 ? (
                    <Badge variant="destructive">{campaign.fallbacks}</Badge>
                  ) : (
                    <span className="text-gray-500">0</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActiveCampaignsTable;
