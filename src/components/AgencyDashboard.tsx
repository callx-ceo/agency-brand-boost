
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Users, DollarSign, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import CallVolumeChart from "./dashboard/CallVolumeChart";
import ActiveCampaignsTable from "./dashboard/ActiveCampaignsTable";
import AgentStatusPanel from "./dashboard/AgentStatusPanel";
import WalletPanel from "./dashboard/WalletPanel";

// Mock data for the dashboard
const mockDashboardData = {
  qualifiedCallsMTD: 362,
  totalCallsToday: 79,
  avgCallDuration: 3.8,
  callConversionRate: 76.3,
  walletBalance: 412.57,
  estimatedCallSpend: 1084.25,
  aiToolSpend: 128.12,
  activeAgentsToday: 11,
  missedCallsToday: 6,
  agentsAtMaxConcurrency: 2,
  fallbackCallsToday: 4
};

const AgencyDashboard = () => {
  const {
    qualifiedCallsMTD,
    totalCallsToday,
    avgCallDuration,
    callConversionRate,
    walletBalance,
    estimatedCallSpend,
    activeAgentsToday,
    missedCallsToday,
    agentsAtMaxConcurrency,
    fallbackCallsToday
  } = mockDashboardData;

  const kpiCards = [
    {
      title: "Qualified Calls (MTD)",
      value: qualifiedCallsMTD.toLocaleString(),
      icon: <Phone className="w-5 h-5 text-green-600" />,
      trend: "+12%",
      trendColor: "text-green-600"
    },
    {
      title: "Avg Call Duration",
      value: `${avgCallDuration} min`,
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      trend: "+0.3 min",
      trendColor: "text-green-600"
    },
    {
      title: "Wallet Balance",
      value: `$${walletBalance.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-purple-600" />,
      trend: "-$89",
      trendColor: "text-red-600"
    },
    {
      title: "Active Agents Today",
      value: activeAgentsToday.toString(),
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      trend: `${agentsAtMaxConcurrency} at max`,
      trendColor: agentsAtMaxConcurrency > 0 ? "text-orange-600" : "text-gray-600"
    },
    {
      title: "Conversion Rate",
      value: `${callConversionRate}%`,
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      trend: "+2.1%",
      trendColor: "text-green-600"
    },
    {
      title: "Missed Calls Today",
      value: missedCallsToday.toString(),
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      trend: missedCallsToday > 5 ? "High" : "Normal",
      trendColor: missedCallsToday > 5 ? "text-red-600" : "text-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agency Dashboard</h1>
          <p className="text-gray-600">Real-time KPIs and operational insights</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{totalCallsToday} calls today</Badge>
          {fallbackCallsToday > 0 && (
            <Badge variant="destructive">{fallbackCallsToday} fallbacks</Badge>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.trendColor} flex items-center gap-1`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>7-Day Call Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <CallVolumeChart />
          </CardContent>
        </Card>

        {/* Wallet Panel */}
        <WalletPanel 
          balance={walletBalance}
          estimatedSpend={estimatedCallSpend}
        />
      </div>

      {/* Bottom Row: Campaigns and Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <ActiveCampaignsTable />
        
        {/* Agent Status */}
        <AgentStatusPanel />
      </div>
    </div>
  );
};

export default AgencyDashboard;
