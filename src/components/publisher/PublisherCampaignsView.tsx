import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  type: string;
  category: string;
  totalCalls: number;
  earnings: number;
  epc: number;
  payout: string;
  status: "Active" | "Paused" | "Pending";
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Auto Bundle - Private",
    type: "Bundle",
    category: "Auto Bundle - Private",
    totalCalls: 619721,
    earnings: 3131817.18,
    epc: 5.05,
    payout: "$17.60 - $20.00",
    status: "Active"
  },
  {
    id: "2", 
    name: "Final Expense Bundle",
    type: "Bundle",
    category: "Final Expense Bundle",
    totalCalls: 43527,
    earnings: 435166.60,
    epc: 10.00,
    payout: "$60.00",
    status: "Active"
  },
  {
    id: "3",
    name: "Home Insurance Bundle", 
    type: "Bundle",
    category: "Home Insurance",
    totalCalls: 25479,
    earnings: 174231.20,
    epc: 6.84,
    payout: "$44.00",
    status: "Active"
  },
  {
    id: "4",
    name: "Home Insurance Bundle (Copy)",
    type: "Bundle", 
    category: "Home Insurance OS",
    totalCalls: 18381,
    earnings: 160652.00,
    epc: 8.74,
    payout: "$44.00",
    status: "Active"
  },
  {
    id: "5",
    name: "Life Insurance Bundle",
    type: "Bundle",
    category: "Life Insurance Bundle", 
    totalCalls: 16739,
    earnings: 142737.45,
    epc: 8.53,
    payout: "$67.50",
    status: "Active"
  },
  {
    id: "6",
    name: "Health Insurance Bundle - ACA",
    type: "Bundle",
    category: "Health Insurance",
    totalCalls: 6641,
    earnings: 69786.40,
    epc: 10.51,
    payout: "$39.00", 
    status: "Active"
  },
  {
    id: "7",
    name: "Credit Repair Bundle (CD:Private)",
    type: "Bundle",
    category: "Credit Repair Bundle (Copy)",
    totalCalls: 15297,
    earnings: 57528.00,
    epc: 3.76,
    payout: "$136.00",
    status: "Active"
  },
  {
    id: "8", 
    name: "Health Insurance Bundle - ACA - United",
    type: "Bundle",
    category: "Health Insurance ACA-United",
    totalCalls: 2768,
    earnings: 40644.00,
    epc: 14.68,
    payout: "$36.00",
    status: "Active"
  },
  {
    id: "9",
    name: "Credit Repair Bundle",
    type: "Bundle",
    category: "Credit Repair Bundle",
    totalCalls: 6970,
    earnings: 30163.10,
    epc: 4.33,
    payout: "$18.70",
    status: "Active"
  },
  {
    id: "10",
    name: "Medicare Bundled Campaign (Copy)",
    type: "Bundle", 
    category: "Medicare Bundle RO",
    totalCalls: 1275,
    earnings: 15160.00,
    epc: 11.89,
    payout: "$40.00",
    status: "Active"
  },
  {
    id: "11",
    name: "Auto Insurance Bundle",
    type: "Bundle",
    category: "Auto Insurance",
    totalCalls: 2456,
    earnings: 10738.50,
    epc: 4.37,
    payout: "$15.00 - $18.75",
    status: "Active"
  },
  {
    id: "12",
    name: "Home Security Bundle (Duration)",
    type: "Bundle",
    category: "Home Security Bundle (Copy)",
    totalCalls: 2252,
    earnings: 10109.00,
    epc: 4.49,
    payout: "$80.00",
    status: "Active"
  }
];

const PublisherCampaignsView = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleCampaignSelection = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedCampaigns(
      selectedCampaigns.length === filteredCampaigns.length 
        ? [] 
        : filteredCampaigns.map(c => c.id)
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          APPLY TO NEW CAMPAIGN
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-medium">Campaign Name</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium text-right">Total Calls</TableHead>
                  <TableHead className="font-medium text-right bg-blue-50">Earnings</TableHead>
                  <TableHead className="font-medium text-right">EPC</TableHead>
                  <TableHead className="font-medium text-right">Payout</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedCampaigns.includes(campaign.id)}
                        onCheckedChange={() => toggleCampaignSelection(campaign.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800">
                        {campaign.name}
                      </Button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{campaign.type}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.category}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatNumber(campaign.totalCalls)}
                    </TableCell>
                    <TableCell className="text-right font-medium bg-blue-50">
                      {formatCurrency(campaign.earnings)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(campaign.epc)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {campaign.payout}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={campaign.status === "Active" ? "default" : "secondary"}
                        className={campaign.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border shadow-lg z-50">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                          <DropdownMenuItem>Download Report</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Pause Campaign</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredCampaigns.length} of {mockCampaigns.length} campaigns
          {selectedCampaigns.length > 0 && (
            <span className="ml-2">
              ({selectedCampaigns.length} selected)
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>Total Earnings: {formatCurrency(filteredCampaigns.reduce((sum, c) => sum + c.earnings, 0))}</span>
          <span>Total Calls: {formatNumber(filteredCampaigns.reduce((sum, c) => sum + c.totalCalls, 0))}</span>
        </div>
      </div>
    </div>
  );
};

export default PublisherCampaignsView;