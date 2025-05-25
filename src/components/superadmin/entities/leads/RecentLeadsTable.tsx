
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye } from "lucide-react";
import { RecentLead } from "@/types/leadsTypes";
import { getStatusColor } from "@/utils/leadsUtils";

interface RecentLeadsTableProps {
  leads: RecentLead[];
}

const RecentLeadsTable = ({ leads }: RecentLeadsTableProps) => {
  return (
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
              {leads.map((lead) => (
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
  );
};

export default RecentLeadsTable;
