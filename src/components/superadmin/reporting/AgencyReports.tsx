
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter } from "lucide-react";
import DateRangeSelector from "@/components/dashboard/DateRangeSelector";

// Mock agency performance data
const mockAgencyData = [
  {
    id: "agency-001",
    name: "Elite Insurance Group",
    total: 287,
    valid: 234,
    refund: 53,
    submitted: 187,
    quoted: 234,
    submitPercent: 65.16,
    quotePercent: 81.53,
    closePercent: 65.16,
    scpa: 245.89,
    totalSpend: 46000,
    totalSubmittedAP: 125847.32,
    totalIssuedAP: 0,
    icpa: 0
  },
  {
    id: "agency-002",
    name: "Premier Call Solutions",
    total: 195,
    valid: 156,
    refund: 39,
    submitted: 124,
    quoted: 156,
    submitPercent: 63.59,
    quotePercent: 80.00,
    closePercent: 63.59,
    scpa: 371.77,
    totalSpend: 32000,
    totalSubmittedAP: 89634.12,
    totalIssuedAP: 0,
    icpa: 0
  },
  {
    id: "agency-003",
    name: "MetroLife Partners",
    total: 142,
    valid: 118,
    refund: 24,
    submitted: 89,
    quoted: 118,
    submitPercent: 62.68,
    quotePercent: 83.10,
    closePercent: 62.68,
    scpa: 359.55,
    totalSpend: 28500,
    totalSubmittedAP: 67892.45,
    totalIssuedAP: 0,
    icpa: 0
  },
  {
    id: "agency-004",
    name: "Nationwide Direct",
    total: 218,
    valid: 189,
    refund: 29,
    submitted: 143,
    quoted: 189,
    submitPercent: 65.60,
    quotePercent: 86.70,
    closePercent: 65.60,
    scpa: 294.41,
    totalSpend: 42100,
    totalSubmittedAP: 98745.67,
    totalIssuedAP: 0,
    icpa: 0
  },
  {
    id: "agency-005",
    name: "SafeGuard Insurance Co",
    total: 164,
    valid: 142,
    refund: 22,
    submitted: 105,
    quoted: 142,
    submitPercent: 64.02,
    quotePercent: 86.59,
    closePercent: 64.02,
    scpa: 380.95,
    totalSpend: 31500,
    totalSubmittedAP: 78234.89,
    totalIssuedAP: 0,
    icpa: 0
  },
  {
    id: "agency-006",
    name: "Family First Agency",
    total: 298,
    valid: 256,
    refund: 42,
    submitted: 189,
    quoted: 256,
    submitPercent: 63.42,
    quotePercent: 85.91,
    closePercent: 63.42,
    scpa: 264.55,
    totalSpend: 52000,
    totalSubmittedAP: 142567.23,
    totalIssuedAP: 0,
    icpa: 0
  }
];

const AgencyReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 3, 25), // Apr 25, 2025
    to: new Date(2025, 4, 24)    // May 24, 2025
  });

  const filteredData = mockAgencyData.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDecimal = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Agency Reports</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive agency performance metrics across all agencies
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search agencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DateRangeSelector
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Agency</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Valid</TableHead>
                <TableHead className="text-center">Refund</TableHead>
                <TableHead className="text-center">Submitted</TableHead>
                <TableHead className="text-center">Quoted</TableHead>
                <TableHead className="text-center">Submit (%)</TableHead>
                <TableHead className="text-center">Quote (%)</TableHead>
                <TableHead className="text-center">Close (%)</TableHead>
                <TableHead className="text-center">SCPA</TableHead>
                <TableHead className="text-center">Total Spend</TableHead>
                <TableHead className="text-center">Total Submitted AP</TableHead>
                <TableHead className="text-center">Total Issued AP</TableHead>
                <TableHead className="text-center">ICPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((agency) => (
                <TableRow key={agency.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">
                    {agency.name}
                  </TableCell>
                  <TableCell className="text-center">{agency.total}</TableCell>
                  <TableCell className="text-center">{agency.valid}</TableCell>
                  <TableCell className="text-center">{agency.refund}</TableCell>
                  <TableCell className="text-center">{agency.submitted}</TableCell>
                  <TableCell className="text-center">{agency.quoted}</TableCell>
                  <TableCell className="text-center">{agency.submitPercent.toFixed(2)}%</TableCell>
                  <TableCell className="text-center">{agency.quotePercent.toFixed(2)}%</TableCell>
                  <TableCell className="text-center">{agency.closePercent.toFixed(2)}%</TableCell>
                  <TableCell className="text-center">{formatDecimal(agency.scpa)}</TableCell>
                  <TableCell className="text-center">{formatCurrency(agency.totalSpend)}</TableCell>
                  <TableCell className="text-center">{formatDecimal(agency.totalSubmittedAP)}</TableCell>
                  <TableCell className="text-center">{agency.totalIssuedAP}</TableCell>
                  <TableCell className="text-center">{agency.icpa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyReports;
