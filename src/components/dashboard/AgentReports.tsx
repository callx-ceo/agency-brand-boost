import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter } from "lucide-react";
import DateRangeSelector from "./DateRangeSelector";

// Mock data for agent performance metrics
const mockAgentData = [
  { agent: "Zach Enveant", total: 62, paid: 34, refund: 24, submitted: 19, quoted: 34, submitPercent: 30.65, quotePercent: 54.84, closePercent: 30.65, scpa: 157.89, totalSpend: 3000, totalSubmittedAP: 22626.16 },
  { agent: "Vincent Dinh", total: 50, paid: 43, refund: 6, submitted: 15, quoted: 43, submitPercent: 30, quotePercent: 86, closePercent: 30, scpa: 200, totalSpend: 3000, totalSubmittedAP: 18599.28 },
  { agent: "Tyler Wilson", total: 50, paid: 38, refund: 10, submitted: 8, quoted: 38, submitPercent: 16, quotePercent: 76, closePercent: 16, scpa: 335.62, totalSpend: 2685, totalSubmittedAP: 6791.08 },
  { agent: "Ty Jackson", total: 21, paid: 10, refund: 10, submitted: 2, quoted: 10, submitPercent: 9.52, quotePercent: 47.62, closePercent: 9.52, scpa: 477.5, totalSpend: 955, totalSubmittedAP: 1433.16 },
  { agent: "Test Agent", total: 9, paid: 7, refund: 0, submitted: 0, quoted: 7, submitPercent: 0, quotePercent: 77.78, closePercent: 0, scpa: 0, totalSpend: 0, totalSubmittedAP: 0 },
  { agent: "Teresa Ugarte", total: 32, paid: 23, refund: 6, submitted: 10, quoted: 23, submitPercent: 31.25, quotePercent: 71.88, closePercent: 31.25, scpa: 193.5, totalSpend: 1935, totalSubmittedAP: 6087 },
  { agent: "Steffanie Arce", total: 169, paid: 128, refund: 38, submitted: 34, quoted: 128, submitPercent: 20.12, quotePercent: 75.74, closePercent: 20.12, scpa: 291.47, totalSpend: 9910, totalSubmittedAP: 31827.96 },
  { agent: "Shalik Stripathane", total: 125, paid: 75, refund: 50, submitted: 27, quoted: 75, submitPercent: 21.6, quotePercent: 60, closePercent: 21.6, scpa: 197.22, totalSpend: 5325, totalSubmittedAP: 33208.32 },
];

const AgentReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 3, 25), // Apr 25, 2025
    to: new Date(2025, 4, 24)    // May 24, 2025
  });

  const filteredData = mockAgentData.filter(agent =>
    agent.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            Agent Reports
          </CardTitle>
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
              placeholder="Search agents..."
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
                <TableHead>Agent Name</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Refund</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Quoted</TableHead>
                <TableHead>Submit (%)</TableHead>
                <TableHead>Quote (%)</TableHead>
                <TableHead>Close (%)</TableHead>
                <TableHead>SCPA</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Total Submitted AP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-primary">{agent.agent}</TableCell>
                  <TableCell>{agent.total}</TableCell>
                  <TableCell>{agent.paid}</TableCell>
                  <TableCell>{agent.refund}</TableCell>
                  <TableCell>{agent.submitted}</TableCell>
                  <TableCell>{agent.quoted}</TableCell>
                  <TableCell>{agent.submitPercent.toFixed(2)}%</TableCell>
                  <TableCell>{agent.quotePercent.toFixed(2)}%</TableCell>
                  <TableCell>{agent.closePercent.toFixed(2)}%</TableCell>
                  <TableCell>${agent.scpa.toFixed(2)}</TableCell>
                  <TableCell>${agent.totalSpend.toLocaleString()}</TableCell>
                  <TableCell>${agent.totalSubmittedAP.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentReports;
