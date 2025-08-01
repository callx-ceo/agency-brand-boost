import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Calendar, DollarSign, Eye, AlertCircle, Clock } from "lucide-react";

const AgentApplicationsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for agent's applications
  const applications = [
    {
      id: 1,
      applicationId: "APP-2024-001",
      customerName: "John Smith",
      product: "Life Insurance",
      coverage: "$250,000",
      premium: "$85/month",
      status: "pending",
      submittedDate: "2024-01-15",
      carrier: "State Farm"
    },
    {
      id: 2,
      applicationId: "APP-2024-002", 
      customerName: "Sarah Johnson",
      product: "Auto Insurance",
      coverage: "$100,000",
      premium: "$120/month",
      status: "approved",
      submittedDate: "2024-01-14",
      carrier: "Progressive"
    },
    {
      id: 3,
      applicationId: "APP-2024-003",
      customerName: "Mike Wilson",
      product: "Home Insurance",
      coverage: "$300,000",
      premium: "$95/month",
      status: "under-review",
      submittedDate: "2024-01-13",
      carrier: "Allstate"
    },
    {
      id: 4,
      applicationId: "APP-2024-004",
      customerName: "Emily Davis",
      product: "Life Insurance",
      coverage: "$500,000",
      premium: "$165/month",
      status: "rejected",
      submittedDate: "2024-01-12",
      carrier: "MetLife"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "under-review":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyIndicator = (submittedDate: string) => {
    const daysSinceSubmission = Math.floor((new Date().getTime() - new Date(submittedDate).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceSubmission > 7) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    } else if (daysSinceSubmission > 5) {
      return <Clock className="w-4 h-4 text-orange-500" />;
    }
    return null;
  };

  const filteredApplications = applications.filter(app =>
    app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.carrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Applications</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === "pending").length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === "approved").length}
            </div>
            <div className="text-sm text-gray-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === "rejected").length}
            </div>
            <div className="text-sm text-gray-500">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Application History</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search applications..."
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
                <TableHead>Application ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-sm">{application.applicationId}</span>
                      {getUrgencyIndicator(application.submittedDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.customerName}</div>
                      <div className="text-sm text-gray-500">{application.carrier}</div>
                    </div>
                  </TableCell>
                  <TableCell>{application.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      {application.coverage}
                    </div>
                  </TableCell>
                  <TableCell>{application.premium}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {application.submittedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
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

export default AgentApplicationsView;