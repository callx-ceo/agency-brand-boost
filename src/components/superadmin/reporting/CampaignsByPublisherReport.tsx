
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Eye, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CampaignsByPublisherReportProps {
  onBackToDashboard: () => void;
}

interface CampaignPubRow {
  id: string;
  campaign: string;
  publisherName: string;
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

const mockData: CampaignPubRow[] = [
  { id: "1", campaign: "Auto Bundle - Private", publisherName: "RingMax Ltd.", calls: 237, repeatCallsPct: "109 (24.03%)", uniqueCalls: 403, paidCalls: 224, sale: 0, offersNotAvailable: 1, convRate: "42%", uniqueConvRate: "51%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 7585.01, cost: 3748.00, profitPct: "$4,137.01 (Q07%)", revenuePerCall: 12.38, costPerCall: 10.70, revenuePerPaidCall: 32.08, costPerPaidCall: 25.66, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "03:57" },
  { id: "2", campaign: "Final Expense Bundle", publisherName: "Google 9 (info@innervals.com)", calls: 94, repeatCallsPct: "41 (43.62%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 11, convRate: "46%", uniqueConvRate: "85%", salesConvRate: "10.64%", uniqueSalesConvRate: "18.07%", revenue: 15360.00, cost: 2030.00, profitPct: "$0.00 (0%)", revenuePerCall: 23.63, costPerCall: 21.60, revenuePerPaidCall: 47.21, costPerPaidCall: 47.21, revenuePerSale: 203.00, costPerSale: 425.02, avgConnectDuration: "06:14" },
  { id: "3", campaign: "Final Expense MR-T2", publisherName: "Upforce Media", calls: 81, repeatCallsPct: "16 (12.12%)", uniqueCalls: 0, paidCalls: 11, sale: 23, offersNotAvailable: 2, convRate: "35%", uniqueConvRate: "44%", salesConvRate: "3.7%", uniqueSalesConvRate: "4.76%", revenue: 4830.00, cost: 0, profitPct: "$0.00 (0%)", revenuePerCall: 22.47, costPerCall: 22.47, revenuePerPaidCall: 60.00, costPerPaidCall: 60.00, revenuePerSale: 606.67, costPerSale: 606.67, avgConnectDuration: "06:14" },
  { id: "4", campaign: "Medicare Bundled Campaign", publisherName: "Google 9 (info@innervals.com)", calls: 0, repeatCallsPct: "1 (21.87%)", uniqueCalls: 0, paidCalls: 1, sale: 0, offersNotAvailable: 0, convRate: "65%", uniqueConvRate: "82%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 1740.05, cost: 1408.00, profitPct: "$2.25 (0.5%)", revenuePerCall: 18.01, costPerCall: 44.75, revenuePerPaidCall: 33.00, costPerPaidCall: 46.75, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "13:36" },
  { id: "5", campaign: "Auto Bundle - Private 2", publisherName: "Zhen Fong", calls: 156, repeatCallsPct: "32 (23.53%)", uniqueCalls: 130, paidCalls: 50, sale: 0, offersNotAvailable: 0, convRate: "37%", uniqueConvRate: "48%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 5179.60, cost: 1259.20, profitPct: "$196.30 (15%)", revenuePerCall: 11.57, costPerCall: 8.26, revenuePerPaidCall: 33.88, costPerPaidCall: 25.18, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "04:14" },
  { id: "6", campaign: "Final Expense Bundle", publisherName: "Insures Insurance (Google 9)", calls: 14, repeatCallsPct: "22 (66.29%)", uniqueCalls: 14, paidCalls: 23, sale: 0, offersNotAvailable: 30, convRate: "41%", uniqueConvRate: "68%", salesConvRate: "10.7%", uniqueSalesConvRate: "5.88%", revenue: 660.01, cost: 0, profitPct: "$352.01 (0%)", revenuePerCall: 95.88, costPerCall: 15.88, revenuePerPaidCall: 36.96, costPerPaidCall: 36.06, revenuePerSale: 425.01, costPerSale: 425.50, avgConnectDuration: "15:29" },
  { id: "7", campaign: "Home Insurance Bundle (CopyR)", publisherName: "RingMax Ltd.", calls: 14, repeatCallsPct: "9 (28.13%)", uniqueCalls: 18, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "26%", uniqueConvRate: "36%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 603.00, cost: 490.40, profitPct: "$393.60 (26%)", revenuePerCall: 12.88, costPerCall: 24.31, revenuePerPaidCall: 60.00, costPerPaidCall: 48.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "14:21" },
  { id: "8", campaign: "Final Expense Bundle", publisherName: "Zhen Fong", calls: 9, repeatCallsPct: "4 (28.57%)", uniqueCalls: 0, paidCalls: 15, sale: 1, offersNotAvailable: 2, convRate: "71%", uniqueConvRate: "83%", salesConvRate: "21.43%", uniqueSalesConvRate: "50%", revenue: 480.04, cost: 0, profitPct: "$175.15 (0%)", revenuePerCall: 25.03, costPerCall: 21.20, revenuePerPaidCall: 85.00, costPerPaidCall: 72.25, revenuePerSale: 252.50, costPerSale: 880.63, avgConnectDuration: "04:54" },
  { id: "9", campaign: "Life Insurance Bundle", publisherName: "RingMax Ltd.", calls: 14, repeatCallsPct: "3 (17.65%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 2, convRate: "24%", uniqueConvRate: "36%", salesConvRate: "16.76%", uniqueSalesConvRate: "14.26%", revenue: 1225.00, cost: 225.00, profitPct: "$0.00 (0%)", revenuePerCall: 4.62, costPerCall: 4.62, revenuePerPaidCall: 0.00, costPerPaidCall: 203.13, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "10:54" },
  { id: "10", campaign: "Final Expense Bundle", publisherName: "Google 8 (joseb@trails.io)", calls: 14, repeatCallsPct: "20 (58.82%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 1, convRate: "24%", uniqueConvRate: "57%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 1225.00, cost: 225.00, profitPct: "$0.00 (0%)", revenuePerCall: 4.62, costPerCall: 4.62, revenuePerPaidCall: 0.00, costPerPaidCall: 203.13, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "10:54" },
  { id: "11", campaign: "Final Expense Bundle - RM", publisherName: "RingMax Ltd.", calls: 0, repeatCallsPct: "2 (100%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "21%", uniqueConvRate: "25%", salesConvRate: "93%", uniqueSalesConvRate: "0%", revenue: 175.01, cost: 354.00, profitPct: "$4.00 (10%)", revenuePerCall: 7.00, costPerCall: 0.00, revenuePerPaidCall: 85.00, costPerPaidCall: 68.00, revenuePerSale: 370.00, costPerSale: 204.00, avgConnectDuration: "06:32" },
  { id: "12", campaign: "Home Insurance Bundle", publisherName: "Google 8 (joseb@trails.io)", calls: 0, repeatCallsPct: "2 (33%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "100%", uniqueConvRate: "100%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 80.91, cost: 49.75, profitPct: "$2.25 (0.5%)", revenuePerCall: 18.01, costPerCall: 44.75, revenuePerPaidCall: 33.00, costPerPaidCall: 46.75, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "13:36" },
  { id: "13", campaign: "Final Expense - Search - No IVR", publisherName: "ZocBrands", calls: 2, repeatCallsPct: "0 (0%)", uniqueCalls: 2, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "14", campaign: "Final Expense - Social - No IVR", publisherName: "Leadmore", calls: 0, repeatCallsPct: "1 (100%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "15", campaign: "Final Expense - Social - No IVR", publisherName: "Audio Interactive", calls: 1, repeatCallsPct: "1 (50%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "10:44" },
  { id: "16", campaign: "Final Expense MR-T2", publisherName: "AdWiz LLC", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 10, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "17", campaign: "Final Expense MR-T2", publisherName: "Pacebound", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 10, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:08" },
  { id: "18", campaign: "Final Expense MR-T2", publisherName: "Burst Impact", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "19", campaign: "Final Expense Bundle - C30 Total Duration", publisherName: "Consumer Review USA Inc", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "20", campaign: "Test Sales Agent Campaign", publisherName: "Test Publisher", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "21", campaign: "Final Expense Bundle", publisherName: "Accuracy Squared", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "22", campaign: "Home Insurance Bundle (CopyR)", publisherName: "Zhen Fong", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "23", campaign: "Webflx: For new rep training", publisherName: "MSBTC Tel", calls: 0, repeatCallsPct: "2 (100%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "24", campaign: "Dental Insurance Bundle", publisherName: "Google 9 (info@innervals.com)", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "25", campaign: "Debt Consolidation Bundle - With IVR", publisherName: "Pinnacol LLC", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 1, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "26", campaign: "Home Security Bundle (Duration)", publisherName: "Chartwell Media Group", calls: 0, repeatCallsPct: "1 (100%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:04" },
  { id: "27", campaign: "Home Insurance Bundle", publisherName: "EngageFin LLC", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "28", campaign: "Auto Bundle - Private", publisherName: "Dotazii, Inc.", calls: 1, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
  { id: "29", campaign: "Auto Bundle - Private", publisherName: "Zhen Fong", calls: 0, repeatCallsPct: "0 (0%)", uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, convRate: "0%", uniqueConvRate: "0%", salesConvRate: "0%", uniqueSalesConvRate: "0%", revenue: 0.00, cost: 0.00, profitPct: "$0.00 (0%)", revenuePerCall: 0.00, costPerCall: 0.00, revenuePerPaidCall: 0.00, costPerPaidCall: 0.00, revenuePerSale: 0.00, costPerSale: 0.00, avgConnectDuration: "00:00" },
];

const datePresets = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last Month", "This Month", "This Year"];

const CampaignsByPublisherReport = ({ onBackToDashboard }: CampaignsByPublisherReportProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("Today");
  const [dateRange] = useState("Apr 14, 2026 - Apr 14, 2026");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [publisherFilter, setPublisherFilter] = useState("all");

  const filteredData = mockData.filter(c => {
    if (searchTerm && !c.campaign.toLowerCase().includes(searchTerm.toLowerCase()) && !c.publisherName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totals = filteredData.reduce((acc, c) => ({
    calls: acc.calls + c.calls,
    uniqueCalls: acc.uniqueCalls + c.uniqueCalls,
    paidCalls: acc.paidCalls + c.paidCalls,
    sale: acc.sale + c.sale,
    offersNotAvailable: acc.offersNotAvailable + c.offersNotAvailable,
    revenue: acc.revenue + c.revenue,
    cost: acc.cost + c.cost,
  }), { calls: 0, uniqueCalls: 0, paidCalls: 0, sale: 0, offersNotAvailable: 0, revenue: 0, cost: 0 });

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const uniqueCampaigns = [...new Set(mockData.map(d => d.campaign))];
  const uniquePublishers = [...new Set(mockData.map(d => d.publisherName))];

  return (
    <div className="space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onBackToDashboard} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <span className="text-lg">📊</span> Reports
        </button>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">Campaigns by Publisher</span>
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
        <h1 className="text-2xl font-semibold">Campaigns by Publisher</h1>
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
              <TableHead className="whitespace-nowrap min-w-[180px] font-semibold">Campaign</TableHead>
              <TableHead className="whitespace-nowrap min-w-[180px] font-semibold">Publisher Name</TableHead>
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
                    {uniqueCampaigns.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="py-1">
                <Select value={publisherFilter} onValueChange={setPublisherFilter}>
                  <SelectTrigger className="h-6 text-xs w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {uniquePublishers.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
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
            {filteredData.map((c, idx) => (
              <TableRow key={c.id} className={`text-xs h-8 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/50`}>
                <TableCell className="py-1.5 font-medium text-blue-600 whitespace-nowrap cursor-pointer hover:underline">{c.campaign}</TableCell>
                <TableCell className="py-1.5 text-blue-600 whitespace-nowrap cursor-pointer hover:underline">{c.publisherName}</TableCell>
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
              <TableCell className="py-1.5"></TableCell>
              <TableCell className="py-1.5 text-right">{totals.calls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">259 (36.47%)</TableCell>
              <TableCell className="py-1.5 text-right">{totals.uniqueCalls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.paidCalls.toLocaleString()}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.sale}</TableCell>
              <TableCell className="py-1.5 text-right">{totals.offersNotAvailable}</TableCell>
              <TableCell className="py-1.5 text-right">15.83%</TableCell>
              <TableCell className="py-1.5 text-right">17.66%</TableCell>
              <TableCell className="py-1.5 text-right">1.46%</TableCell>
              <TableCell className="py-1.5 text-right">2.93%</TableCell>
              <TableCell className="py-1.5 text-right text-blue-600 bg-blue-50/50">${fmt(totals.revenue)}</TableCell>
              <TableCell className="py-1.5 text-right">${fmt(totals.cost)}</TableCell>
              <TableCell className="py-1.5 text-right">$2,454.96</TableCell>
              <TableCell className="py-1.5 text-right">$8.89</TableCell>
              <TableCell className="py-1.5 text-right">$7.58</TableCell>
              <TableCell className="py-1.5 text-right">$691.86</TableCell>
              <TableCell className="py-1.5 text-right">$436.68</TableCell>
              <TableCell className="py-1.5 text-right">$201.98</TableCell>
              <TableCell className="py-1.5 text-right">$40.18</TableCell>
              <TableCell className="py-1.5 text-right">$40.60</TableCell>
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

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground py-2">
        <p>Calls 1 - {filteredData.length}</p>
        <p>Reporting is in real-time. Calls and other data presented at the last hour may not be finalized here. Time for all dates and times is PTS (US-UK Pacific Standard Time).</p>
      </div>
    </div>
  );
};

export default CampaignsByPublisherReport;
