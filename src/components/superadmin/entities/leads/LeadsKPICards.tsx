
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { LeadSummaryStats } from "@/types/leadsTypes";

interface LeadsKPICardsProps {
  stats: LeadSummaryStats;
}

const LeadsKPICards = ({ stats }: LeadsKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold">{stats.totalLeads.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-green-600">{stats.newLeads}</p>
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
              <p className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</p>
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
              <p className="text-2xl font-bold text-orange-600">{stats.avgResponseTime}h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsKPICards;
