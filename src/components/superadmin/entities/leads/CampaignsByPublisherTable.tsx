
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Megaphone, Eye } from "lucide-react";
import { CampaignPublisherData, CampaignTotals } from "@/types/leadsTypes";

interface CampaignsByPublisherTableProps {
  data: CampaignPublisherData[];
  totals: CampaignTotals;
}

const CampaignsByPublisherTable = ({ data, totals }: CampaignsByPublisherTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          Campaigns by Publisher
        </CardTitle>
        <div className="text-sm text-gray-600">
          Apr 1, 2025 - Apr 30, 2025
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Sms Conv</TableHead>
                <TableHead>Sms Conv. Rate</TableHead>
                <TableHead>Ivr Conv</TableHead>
                <TableHead>Ivr Conv. Rate</TableHead>
                <TableHead>Scheduled Calls</TableHead>
                <TableHead>Scheduled Call Rate</TableHead>
                <TableHead>Transferred</TableHead>
                <TableHead>Transfer Rate</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Avg. RPL</TableHead>
                <TableHead>Avg. CPL</TableHead>
                <TableHead>Opt Out</TableHead>
                <TableHead>Opt Out Rate</TableHead>
                <TableHead>Show Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.campaign}</TableCell>
                  <TableCell>{row.publisher}</TableCell>
                  <TableCell>{row.leads}</TableCell>
                  <TableCell>{row.smsConv}</TableCell>
                  <TableCell>{row.smsConvRate}</TableCell>
                  <TableCell>{row.ivrConv}</TableCell>
                  <TableCell>{row.ivrConvRate}</TableCell>
                  <TableCell>{row.scheduledCalls}</TableCell>
                  <TableCell>{row.scheduledCallsRate}</TableCell>
                  <TableCell>{row.transferred}</TableCell>
                  <TableCell>{row.transferRate}</TableCell>
                  <TableCell>{row.paid}</TableCell>
                  <TableCell>{row.convRate}</TableCell>
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.profit}</TableCell>
                  <TableCell>{row.avgRPL}</TableCell>
                  <TableCell>{row.avgCPL}</TableCell>
                  <TableCell>{row.optOut}</TableCell>
                  <TableCell>{row.optOutRate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-gray-50">
                <TableCell>TOTAL</TableCell>
                <TableCell></TableCell>
                <TableCell>{totals.leads}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{totals.transferred}</TableCell>
                <TableCell></TableCell>
                <TableCell>{totals.paid}</TableCell>
                <TableCell></TableCell>
                <TableCell>{totals.revenue}</TableCell>
                <TableCell>{totals.cost}</TableCell>
                <TableCell>{totals.profit}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignsByPublisherTable;
