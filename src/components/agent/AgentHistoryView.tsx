import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Phone, Clock, Calendar, PlayCircle, FileText } from "lucide-react";

const AgentHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for agent's call history
  const callHistory = [
    {
      id: 1,
      customerName: "John Smith",
      phone: "(555) 123-4567",
      callDate: "2024-01-15",
      callTime: "14:30",
      duration: "15:42",
      disposition: "interested",
      outcome: "Application Started",
      recordingUrl: "#",
      notes: "Customer interested in life insurance, will call back tomorrow"
    },
    {
      id: 2,
      customerName: "Sarah Johnson", 
      phone: "(555) 987-6543",
      callDate: "2024-01-15",
      callTime: "11:15",
      duration: "08:30",
      disposition: "no-answer",
      outcome: "Voicemail Left",
      recordingUrl: "#",
      notes: "Left voicemail with callback number"
    },
    {
      id: 3,
      customerName: "Mike Wilson",
      phone: "(555) 456-7890", 
      callDate: "2024-01-14",
      callTime: "16:45",
      duration: "22:15",
      disposition: "not-interested",
      outcome: "Not Interested",
      recordingUrl: "#",
      notes: "Not interested at this time, may call back in 6 months"
    },
    {
      id: 4,
      customerName: "Emily Davis",
      phone: "(555) 321-0987",
      callDate: "2024-01-14",
      callTime: "13:20",
      duration: "31:05",
      disposition: "application-completed",
      outcome: "Application Submitted",
      recordingUrl: "#",
      notes: "Completed full application for $500k life insurance policy"
    }
  ];

  const getDispositionBadge = (disposition: string) => {
    switch (disposition) {
      case "interested":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Interested</Badge>;
      case "not-interested":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Not Interested</Badge>;
      case "no-answer":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">No Answer</Badge>;
      case "application-completed":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Application Completed</Badge>;
      default:
        return <Badge variant="outline">{disposition}</Badge>;
    }
  };

  const filteredHistory = callHistory.filter(call =>
    call.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.phone.includes(searchTerm) ||
    call.outcome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Call History</h1>
      </div>


      {/* Call History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Calls</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search call history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Disposition</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div className="font-medium">{call.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {call.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div>{call.callDate}</div>
                        <div className="text-sm text-gray-500">{call.callTime}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {call.duration}
                    </div>
                  </TableCell>
                  <TableCell>{getDispositionBadge(call.disposition)}</TableCell>
                  <TableCell>{call.outcome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" title="Play Recording">
                        <PlayCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="View Notes">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentHistoryView;