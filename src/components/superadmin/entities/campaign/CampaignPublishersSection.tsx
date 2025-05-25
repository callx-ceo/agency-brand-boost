
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const mockPublishers = [
  { id: "01607", name: "HealthQuotes, LLC", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01594", name: "Palo Media Group", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01525", name: "PerformanceBuy LLC", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01509", name: "Scale Up Media Agency Inc", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01490", name: "Gold Mine Leads", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
];

const CampaignPublishersSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-gray-400">👥</span>
            Publishers
          </CardTitle>
          <Button size="sm" className="bg-gray-800 text-white">
            <Plus className="w-4 h-4 mr-2" />
            INVITE PUBLISHERS
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher Name</TableHead>
              <TableHead>Publisher ID</TableHead>
              <TableHead>Promo Number(s)</TableHead>
              <TableHead>Calls</TableHead>
              <TableHead>Paid Calls</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Conv. Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPublishers.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell className="font-medium">{publisher.name}</TableCell>
                <TableCell>{publisher.id}</TableCell>
                <TableCell>{publisher.promoNumbers}</TableCell>
                <TableCell>{publisher.calls}</TableCell>
                <TableCell>{publisher.paidCalls}</TableCell>
                <TableCell>${publisher.revenue.toFixed(2)}</TableCell>
                <TableCell>${publisher.cost.toFixed(2)}</TableCell>
                <TableCell>${publisher.profit.toFixed(2)}</TableCell>
                <TableCell>{publisher.convRate}%</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    {publisher.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignPublishersSection;
