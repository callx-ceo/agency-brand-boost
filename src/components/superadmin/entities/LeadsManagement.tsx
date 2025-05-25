
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, TrendingUp, Clock, UserPlus, AlertCircle, Eye } from "lucide-react";

interface LeadsManagementProps {
  onBackToDashboard: () => void;
}

const LeadsManagement = ({ onBackToDashboard }: LeadsManagementProps) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Contacted": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Qualified Leads</p>
                <p className="text-xl font-bold">{summaryStats.qualifiedLeads.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Converted to Contacts</p>
                <p className="text-xl font-bold">{summaryStats.convertedLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Monthly Growth</p>
                <p className="text-xl font-bold text-green-600">+{summaryStats.monthlyGrowth}%</p>
              </div>
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
    </div>
  );
};

export default LeadsManagement;
