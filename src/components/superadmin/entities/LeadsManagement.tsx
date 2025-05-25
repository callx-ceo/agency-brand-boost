
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  Clock, 
  UserPlus, 
  AlertCircle, 
  Eye, 
  FileText,
  XCircle,
  MessageSquare,
  Phone,
  Megaphone,
  Users,
  Globe
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadsManagementProps {
  onBackToDashboard: () => void;
}

const LeadsManagement = ({ onBackToDashboard }: LeadsManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock summary statistics for leads
  const summaryStats = {
    totalLeads: 4526,
    newLeads: 156,
    qualifiedLeads: 1893,
    convertedLeads: 847,
    conversionRate: 18.7,
    avgResponseTime: 2.4, // hours
    monthlyGrowth: 12.3
  };

  // Mock recent leads data
  const recentLeads = [
    {
      id: "L001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      source: "Google Ads",
      campaign: "Health Insurance Q4",
      status: "New",
      score: 85,
      createdAt: "2 hours ago"
    },
    {
      id: "L002", 
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678",
      source: "Facebook",
      campaign: "Life Insurance Campaign",
      status: "Qualified",
      score: 92,
      createdAt: "4 hours ago"
    },
    {
      id: "L003",
      name: "Emily Rodriguez", 
      email: "emily.r@email.com",
      phone: "+1 (555) 345-6789",
      source: "LinkedIn",
      campaign: "Auto Insurance",
      status: "Contacted",
      score: 78,
      createdAt: "6 hours ago"
    }
  ];

  // Campaigns by Publisher data from the image
  const campaignsByPublisher = [
    {
      campaign: "Final Expense - Social - No IVR",
      publisher: "Taboola",
      leads: 6,
      smsConv: 0,
      smsConvRate: "0%",
      ivrConv: 2,
      ivrConvRate: "33.34%",
      scheduledCalls: 0,
      scheduledCallsRate: "0%",
      transferred: 2,
      transferRate: "33.34%",
      paid: 0,
      convRate: "0%",
      revenue: "$0.00",
      cost: "$0.00",
      profit: "$0.00",
      avgRPL: "$0.00",
      avgCPL: "$0.00",
      optOut: 0,
      optOutRate: "0%"
    },
    {
      campaign: "Auto Insurance Bundle",
      publisher: "Bing",
      leads: 17,
      smsConv: 0,
      smsConvRate: "0%",
      ivrConv: 17,
      ivrConvRate: "100%",
      scheduledCalls: 0,
      scheduledCallsRate: "0%",
      transferred: 10,
      transferRate: "58.83%",
      paid: 6,
      convRate: "35.30%",
      revenue: "$120.00",
      cost: "$108.00",
      profit: "$12.00",
      avgRPL: "$7.06",
      avgCPL: "$6.35",
      optOut: 0,
      optOutRate: "0%"
    }
  ];

  // Calculate totals
  const totals = {
    leads: campaignsByPublisher.reduce((sum, row) => sum + row.leads, 0),
    transferred: campaignsByPublisher.reduce((sum, row) => sum + row.transferred, 0),
    paid: campaignsByPublisher.reduce((sum, row) => sum + row.paid, 0),
    revenue: "$120.00",
    cost: "$108.00",
    profit: "$12.00"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Contacted": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const PlaceholderContent = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          {icon}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            View Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBackToDashboard}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Leads Management</h1>
            <p className="text-gray-600">Manage marketing campaign leads and track conversion performance</p>
          </div>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Import Leads
        </Button>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="post-report" className="text-xs">Post Report</TabsTrigger>
          <TabsTrigger value="rejected-leads" className="text-xs">Rejected Leads</TabsTrigger>
          <TabsTrigger value="smsm-report" className="text-xs">SMSM Report</TabsTrigger>
          <TabsTrigger value="dnc-list" className="text-xs">DNC List</TabsTrigger>
          <TabsTrigger value="campaigns" className="text-xs">Campaigns</TabsTrigger>
          <TabsTrigger value="publishers" className="text-xs">Publishers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold">{summaryStats.totalLeads.toLocaleString()}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Leads (24h)</p>
                    <p className="text-2xl font-bold text-green-600">{summaryStats.newLeads}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-purple-600">{summaryStats.conversionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-orange-600">{summaryStats.avgResponseTime}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recent Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Lead ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Contact Info</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{lead.id}</td>
                        <td className="py-3 px-4 font-medium">{lead.name}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>{lead.email}</div>
                            <div className="text-gray-600">{lead.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{lead.source}</td>
                        <td className="py-3 px-4 text-sm">{lead.campaign}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{lead.score}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{lead.createdAt}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="post-report" className="mt-6">
          <PlaceholderContent 
            title="Post Report"
            description="Track lead posting performance and delivery metrics across campaigns"
            icon={<FileText className="w-12 h-12 mx-auto text-blue-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="rejected-leads" className="mt-6">
          <PlaceholderContent 
            title="Rejected Lead Report"
            description="Analyze rejected leads with rejection reasons and quality metrics"
            icon={<XCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="smsm-report" className="mt-6">
          <PlaceholderContent 
            title="SMSM Report"
            description="SMS marketing campaign performance and delivery reports"
            icon={<MessageSquare className="w-12 h-12 mx-auto text-green-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="dnc-list" className="mt-6">
          <PlaceholderContent 
            title="Do Not Contact (DNC) List"
            description="Manage and view the Do Not Contact list for compliance"
            icon={<Phone className="w-12 h-12 mx-auto text-orange-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
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
                    {campaignsByPublisher.map((row, index) => (
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
        </TabsContent>

        <TabsContent value="publishers" className="mt-6">
          <div className="space-y-6">
            <PlaceholderContent 
              title="Publishers"
              description="Manage publishers and their lead generation performance"
              icon={<Globe className="w-12 h-12 mx-auto text-indigo-400 mb-4" />}
            />
            
            <PlaceholderContent 
              title="Campaigns by Publisher"
              description="View campaign performance broken down by publisher"
              icon={<Users className="w-12 h-12 mx-auto text-teal-400 mb-4" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadsManagement;
