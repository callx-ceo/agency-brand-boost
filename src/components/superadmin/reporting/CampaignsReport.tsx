
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CampaignsReportProps {
  onBackToDashboard: () => void;
}

interface CampaignRow {
  id: string;
  campaign: string;
  calls: number;
  repeatCallsPct: string;
  uniqueCalls: number;
  paidCalls: number;
  sale: number;
  offersNotAvailable: number;
  convRate: string;
  uniqueConvRate: string;
  salesConvRate: string;
  uniqueSalesConvRate: string;
  revenue: number;
  cost: number;
  profitPct: string;
  revenuePerCall: number;
  costPerCall: number;
  revenuePerPaidCall: number;
  costPerPaidCall: number;
  revenuePerSale: number;
  costPerSale: number;
  avgConnectDuration: string;
}

const mockCampaigns: CampaignRow[] = [
  { id: "1", campaign: "Auto Bundle - Private", calls: 339, repeatCallsPct: "129 (31.81%)", uniqueCalls: 491, paidCalls: 218, sale: 0, offersNotAvailable: 1, convRate: "42%", uniqueConvRate: "55%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 7585.01, cost: 3748.00, profitPct: "$4,137.01 (28)", revenuePerCall: 10.33, costPerCall: 10.66, revenuePerPaidCall: 32.08, costPerPaidCall: 35.66, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "03:56" },
  { id: "2", campaign: "Final Expense Bundle", calls: 201, repeatCallsPct: "87 (41.90%)", uniqueCalls: 94, paidCalls: 80, sale: 11, offersNotAvailable: 14, convRate: "42%", uniqueConvRate: "74%", salesConvRate: "7.46%", uniqueSalesConvRate: "10.94%", revenue: 15360.00, cost: 1445.40, profitPct: "$10,061 (14)", revenuePerCall: 57.74, costPerCall: 17.04, revenuePerPaidCall: 42.44, costPerPaidCall: 46.02, revenuePerSale: 1375.67, costPerSale: 229.69, avgConnectDuration: "04:50" },
  { id: "3", campaign: "Final Expense MR-T2", calls: 91, repeatCallsPct: "56 (36.59%)", uniqueCalls: 20, paidCalls: 25, sale: 1, offersNotAvailable: 11, convRate: "30%", uniqueConvRate: "27%", salesConvRate: "3.21%", uniqueSalesConvRate: "4%", revenue: 4830.00, cost: 620.00, profitPct: "$0.00 (0)", revenuePerCall: 96.07, costPerCall: 19.57, revenuePerPaidCall: 60.00, costPerPaidCall: 65.00, revenuePerSale: 606.67, costPerSale: 606.67, avgConnectDuration: "11:26" },
  { id: "4", campaign: "Medicare Bundled Campaign", calls: 101, repeatCallsPct: "47 (46%)", uniqueCalls: 81, paidCalls: 23, sale: 0, offersNotAvailable: 3, convRate: "68%", uniqueConvRate: "83%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 1891.50, cost: 1654.76, profitPct: "$362.25 (19.8)", revenuePerCall: 26.30, costPerCall: 29.50, revenuePerPaidCall: 50.00, costPerPaidCall: 49.08, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "08:09" },
  { id: "5", campaign: "Auto Bundle - Private 2", calls: 156, repeatCallsPct: "32 (23.53%)", uniqueCalls: 304, paidCalls: 50, sale: 0, offersNotAvailable: 0, convRate: "37%", uniqueConvRate: "48%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 5079.60, cost: 1259.20, profitPct: "$249.80 (20)", revenuePerCall: 11.57, costPerCall: 8.26, revenuePerPaidCall: 31.88, costPerPaidCall: 25.80, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "04:16" },
  { id: "6", campaign: "Home Insurance Bundle (CopyR)", calls: 45, repeatCallsPct: "12 (26.08%)", uniqueCalls: 21, paidCalls: 5, sale: 0, offersNotAvailable: 2, convRate: "22%", uniqueConvRate: "30%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 603.04, cost: 480.00, profitPct: "$203.01 (29)", revenuePerCall: 15.04, costPerCall: 10.42, revenuePerPaidCall: 60.00, costPerPaidCall: 48.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "-04:39" },
  { id: "7", campaign: "Life Insurance Bundle", calls: 23, repeatCallsPct: "3 (14.29%)", uniqueCalls: 10, paidCalls: 1, sale: 2, offersNotAvailable: 0, convRate: "24%", uniqueConvRate: "18%", salesConvRate: "9.52%", uniqueSalesConvRate: "10%", revenue: 425.01, cost: 907.25, profitPct: "$637.15 (15)", revenuePerCall: 20.24, costPerCall: 17.20, revenuePerPaidCall: 85.00, costPerPaidCall: 72.15, revenuePerSale: 212.50, costPerSale: 880.63, avgConnectDuration: "04:57" },
  { id: "8", campaign: "Final Expense Bundle - RM", calls: 15, repeatCallsPct: "2 (28%)", uniqueCalls: 10, paidCalls: 1, sale: 0, offersNotAvailable: 0, convRate: "20%", uniqueConvRate: "25%", salesConvRate: "9%", uniqueSalesConvRate: "12.5%", revenue: 375.60, cost: 506.00, profitPct: "$34.00 (2.0)", revenuePerCall: 37.50, costPerCall: 24.75, revenuePerPaidCall: 0.00, costPerPaidCall: 49.50, revenuePerSale: 0.00, costPerSale: 156.00, avgConnectDuration: "06:32" },
  { id: "9", campaign: "Home Insurance Bundle", calls: 2, repeatCallsPct: "1 (33%)", uniqueCalls: 0, paidCalls: 1, sale: 0, offersNotAvailable: 0, convRate: "50%", uniqueConvRate: "100%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 80.91, cost: 49.50, profitPct: "$53.50 (0)", revenuePerCall: 27.50, costPerCall: 24.75, revenuePerPaidCall: 55.00, costPerPaidCall: 49.50, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "10", campaign: "Final Expense - Search - No IVR", calls: 2, repeatCallsPct: "1 (33%)", uniqueCalls: 1, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 31.04, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "11", campaign: "Final Expense - Social - No IVR", calls: 2, repeatCallsPct: "1 (33%)", uniqueCalls: 1, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 31.04, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "12", campaign: "Final Expense Bundle - C30 Total Duration", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 1, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 31.04, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "13", campaign: "Test Sales Agent Campaign", calls: 1, repeatCallsPct: "2 (67%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "14", campaign: "Webflx: For new rep training", calls: 1, repeatCallsPct: "2 (67%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "15", campaign: "Dental Insurance Bundle", calls: 0, repeatCallsPct: "1 (100%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "16", campaign: "Debt Consolidation Bundle - With IVR", calls: 1, repeatCallsPct: "1 (50%)", uniqueCalls: 0, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "17", campaign: "Home Security Bundle (Duration)", calls: 0, repeatCallsPct: "1 (100%)", uniqueCalls: 0, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "18", campaign: "Health Insurance Bundle - ACA", calls: 40, repeatCallsPct: "2 (5%)", uniqueCalls: 10, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:02" },
  { id: "19", campaign: "Credit Repair Bundle", calls: 5, repeatCallsPct: "2 (40%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "20", campaign: "Auto Insurance Bundle", calls: 2, repeatCallsPct: "2 (50%)", uniqueCalls: 1, paidCalls: 2, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
];

const datePresets = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last Month", "This Month", "This Year"];

const CampaignsReport = ({ onBackToDashboard }: CampaignsReportProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("Today");
  const [dateRange] = useState("Apr 14, 2026 - Apr 14, 2026");
  const [campaignFilter, setCampaignFilter] = useState("all");

  const filteredCampaigns = mockCampaigns.filter(c => {
    if (searchTerm && !c.campaign.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totals = filteredCampaigns.reduce((acc, c) => ({
    calls: acc.calls + c.calls,
    uniqueCalls: acc.uniqueCalls + c.uniqueCalls,
    paidCalls: acc.paidCalls + c.paidCalls,
    sale: acc.sale + c.sale,
    offersNotAvailable: acc.offersNotAvailable + c.offersNotAvailable,
    revenue: acc.revenue + c.revenue,
    cost: acc.cost + c.cost,
  }), { calls: 0, uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, revenue: 0, cost: 0 });

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onBackToDashboard} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <span className="text-lg">📊</span> Reports
        </button>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">Campaigns</span>
      </div>

      {/* Date Range & Presets */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-blue-500">{dateRange}</p>
        <div className="flex items-center gap-1">
          {datePresets.map(preset => (
            <Button
              key={preset}
              variant={selectedPreset === preset ? "default" : "ghost"}
              size="sm"
              className={`text-xs h-7 px-2 ${selectedPreset === preset ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setSelectedPreset(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      {/* Title & Export */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 w-48 text-xs"
            />
          </div>
          <Button size="sm" className="h-8 bg-red-500 hover:bg-red-600 text-white">
            <Download className="w-3.5 h-3.5 mr-1" />
            EXPORT
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-auto bg-background" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
            <TableRow className="text-xs">
              <TableHead className="whitespace-nowrap min-w-[200px] font-semibold">Campaign</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Calls</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Repeat Calls (%)</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Unique Calls</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Paid Calls</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Sale</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Offers Not Available</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Conv. Rate</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Unique Conv. Rate</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Sales Conv. Rate</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Unique Sales Conv. Rate</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold text-blue-600 bg-blue-50">Revenue</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Cost</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Profit (%)</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Revenue Per Call</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Cost Per Call</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Revenue Per Paid Call</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Cost Per Paid Call</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Revenue Per Sale</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Cost Per Sale</TableHead>
              <TableHead className="whitespace-nowrap text-right font-semibold">Avg. Connect Duration</TableHead>
              <TableHead className="whitespace-nowrap text-center font-semibold">Show Details</TableHead>
            </TableRow>
            {/* Filter row */}
            <TableRow className="text-xs bg-muted/40">
              <TableHead className="py-1">
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger className="h-6 text-xs w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {mockCampaigns.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.campaign}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              {Array.from({ length: 20 }).map((_, i) => (
                <TableHead key={i} className="py-1">
                  <Input className="h-6 text-xs w-full min-w-[60px]" placeholder=">" />
                </TableHead>
              ))}
              <TableHead className="py-1" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((c, idx) => (
              <TableRow key={c.id} className={`text-xs h-8 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/50`}>
                <TableCell className="py-1.5 font-medium text-blue-600 whitespace-nowrap cursor-pointer hover:underline">{c.campaign}</TableCell>
                <TableCell className="py-1.5 text-right text-blue-600">{c.calls}</TableCell>
                <TableCell className="py-1.5 text-right text-blue-600">{c.repeatCallsPct}</TableCell>
                <TableCell className="py-1.5 text-right text-blue-600">{c.uniqueCalls}</TableCell>
                <TableCell className="py-1.5 text-right text-blue-600">{c.paidCalls}</TableCell>
                <TableCell className="py-1.5 text-right">{c.sale}</TableCell>
                <TableCell className="py-1.5 text-right">{c.offersNotAvailable}</TableCell>
                <TableCell className="py-1.5 text-right">{c.convRate}</TableCell>
                <TableCell className="py-1.5 text-right">{c.uniqueConvRate}</TableCell>
                <TableCell className="py-1.5 text-right">{c.salesConvRate}</TableCell>
                <TableCell className="py-1.5 text-right">{c.uniqueSalesConvRate}</TableCell>
                <TableCell className="py-1.5 text-right font-medium text-blue-600 bg-blue-50/50">${fmt(c.revenue)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.cost)}</TableCell>
                <TableCell className="py-1.5 text-right">{c.profitPct}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.revenuePerCall)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.costPerCall)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.revenuePerPaidCall)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.costPerPaidCall)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.revenuePerSale)}</TableCell>
                <TableCell className="py-1.5 text-right">${fmt(c.costPerSale)}</TableCell>
                <TableCell className="py-1.5 text-right">{c.avgConnectDuration}</TableCell>
                <TableCell className="py-1.5 text-center">
                  <div className="flex justify-center gap-1">
                    <Button variant="default" size="icon" className="h-5 w-5 bg-blue-500 hover:bg-blue-600">
                      <Eye className="h-3 w-3 text-white" />
                    </Button>
                    <Button variant="default" size="icon" className="h-5 w-5 bg-blue-700 hover:bg-blue-800">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Totals Row */}
            <TableRow className="text-xs font-bold bg-muted/60 border-t-2">
              <TableCell className="py-1.5">TOTAL</TableCell>
              <TableCell className="py-1.5 text-right">{totals.calls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">259 (36.47%)</TableCell>
              <TableCell className="py-1.5 text-right">{totals.uniqueCalls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.paidCalls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.sale}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.offersNotAvailable}</TableCell>
              <TableCell className="py-1.5 text-right">16.48%</TableCell>
              <TableCell className="py-1.5 text-right">34%</TableCell>
              <TableCell className="py-1.5 text-right">1.59%</TableCell>
              <TableCell className="py-1.5 text-right">2.04%</TableCell>
              <TableCell className="py-1.5 text-right text-blue-600 bg-blue-50/50">${fmt(totals.revenue)}</TableCell>
              <TableCell className="py-1.5 text-right">${fmt(totals.cost)}</TableCell>
              <TableCell className="py-1.5 text-right">$2,454.96</TableCell>
              <TableCell className="py-1.5 text-right">$8.89</TableCell>
              <TableCell className="py-1.5 text-right">$7.50</TableCell>
              <TableCell className="py-1.5 text-right">$91.00</TableCell>
              <TableCell className="py-1.5 text-right">$436.68</TableCell>
              <TableCell className="py-1.5 text-right">$61.34</TableCell>
              <TableCell className="py-1.5 text-right">$87.65</TableCell>
              <TableCell className="py-1.5 text-right"></TableCell>
              <TableCell className="py-1.5 text-center">
                <div className="flex justify-center gap-1">
                  <Button variant="default" size="icon" className="h-5 w-5 bg-blue-500 hover:bg-blue-600">
                    <Eye className="h-3 w-3 text-white" />
                  </Button>
                  <Button variant="default" size="icon" className="h-5 w-5 bg-blue-700 hover:bg-blue-800">
                    <ChevronRight className="h-3 w-3 text-white" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignsReport;
