import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Settings } from "lucide-react";

const PublisherCampaignsTable = () => {
  const campaignData = [
    {
      campaign: "Home Insurance Bundle",
      calls: 2,
      repeatCalls: "1 (50%)",
      uniqueCalls: 1,
      paidCalls: 0,
      sale: 0,
      convRate: "0%",
      uniqueConvRate: "0%",
      earnings: "$0.00",
      avgEPC: "$0.00",
      avgConnectDuration: "00:00"
    },
    {
      campaign: "Life Insurance Bundle",
      calls: 29,
      repeatCalls: "14 (48.28%)",
      uniqueCalls: 15,
      paidCalls: 7,
      sale: 1,
      convRate: "24%",
      uniqueConvRate: "47%",
      earnings: "$472.50",
      avgEPC: "$16.29",
      avgConnectDuration: "06:58"
    },
    {
      campaign: "Home Insurance Bundle (Copy)",
      calls: 24,
      repeatCalls: "5 (20.83%)",
      uniqueCalls: 19,
      paidCalls: 6,
      sale: 0,
      convRate: "25%",
      uniqueConvRate: "32%",
      earnings: "$264.00",
      avgEPC: "$11.00",
      avgConnectDuration: "03:52"
    },
    {
      campaign: "Final Expense Bundle",
      calls: 131,
      repeatCalls: "42 (32.06%)",
      uniqueCalls: 89,
      paidCalls: 20,
      sale: 4,
      convRate: "15%",
      uniqueConvRate: "22%",
      earnings: "$1,200.00",
      avgEPC: "$9.16",
      avgConnectDuration: "04:14"
    },
    {
      campaign: "Auto Bundle - Private",
      calls: 1243,
      repeatCalls: "313 (25.18%)",
      uniqueCalls: 930,
      paidCalls: 370,
      sale: 0,
      convRate: "30%",
      uniqueConvRate: "40%",
      earnings: "$7,299.20",
      avgEPC: "$5.87",
      avgConnectDuration: "03:22"
    }
  ];

  const totalRow = {
    campaign: "TOTAL",
    calls: 1429,
    repeatCalls: "375 (26.24%)",
    uniqueCalls: 1054,
    paidCalls: 403,
    sale: 5,
    convRate: "18.80%",
    uniqueConvRate: "28.20%",
    earnings: "$9,235.70",
    avgEPC: "$42.32",
    avgConnectDuration: ""
  };

  const formatCellValue = (value: string | number, isTotal = false) => {
    if (typeof value === 'string' && value.includes('$')) {
      return <span className={isTotal ? "font-bold text-green-600" : "text-blue-600"}>{value}</span>;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return <span className={isTotal ? "font-bold" : ""}>{value}</span>;
    }
    return <span className={isTotal ? "font-bold" : ""}>{value}</span>;
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-48">Campaign</TableHead>
                <TableHead className="text-center">Calls</TableHead>
                <TableHead className="text-center">Repeat Calls (%)</TableHead>
                <TableHead className="text-center">Unique Calls</TableHead>
                <TableHead className="text-center">Paid Calls</TableHead>
                <TableHead className="text-center">Sale</TableHead>
                <TableHead className="text-center">Conv. Rate</TableHead>
                <TableHead className="text-center">Unique Conv. Rate</TableHead>
                <TableHead className="text-center">Earnings</TableHead>
                <TableHead className="text-center">Avg. EPC</TableHead>
                <TableHead className="text-center">Avg. Connect Duration</TableHead>
                <TableHead className="text-center">Show Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{row.campaign}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                      {row.calls}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                      {row.repeatCalls}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                      {row.uniqueCalls}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                      {row.paidCalls}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">{formatCellValue(row.sale)}</TableCell>
                  <TableCell className="text-center">{formatCellValue(row.convRate)}</TableCell>
                  <TableCell className="text-center">{formatCellValue(row.uniqueConvRate)}</TableCell>
                  <TableCell className="text-center">{formatCellValue(row.earnings)}</TableCell>
                  <TableCell className="text-center">{formatCellValue(row.avgEPC)}</TableCell>
                  <TableCell className="text-center">{row.avgConnectDuration}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Total Row */}
              <TableRow className="bg-muted/50 border-t-2">
                <TableCell className="font-bold">{totalRow.campaign}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.calls, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.repeatCalls, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.uniqueCalls, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.paidCalls, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.sale, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.convRate, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.uniqueConvRate, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.earnings, true)}</TableCell>
                <TableCell className="text-center">{formatCellValue(totalRow.avgEPC, true)}</TableCell>
                <TableCell className="text-center">{totalRow.avgConnectDuration}</TableCell>
                <TableCell className="text-center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublisherCampaignsTable;