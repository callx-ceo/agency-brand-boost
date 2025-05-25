
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Users, DollarSign, TrendingUp, AlertTriangle, Clock, FileText, CheckCircle, XCircle, Hourglass, Settings } from "lucide-react";
import CallVolumeChart from "./dashboard/CallVolumeChart";
import ActiveCampaignsTable from "./dashboard/ActiveCampaignsTable";
import AgentStatusPanel from "./dashboard/AgentStatusPanel";
import WalletPanel from "./dashboard/WalletPanel";
import KPICardSelector, { KPIConfig } from "./dashboard/KPICardSelector";
import AgentReports from "./dashboard/AgentReports";
import ContactsReports from "./dashboard/ContactsReports";

// Mock data for the dashboard - expanded with new KPIs
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
  fallbackCallsToday: 4,
  // New KPIs
  applicationsSubmitted: 127,
  pendingApplications: 89,
  approvedApplications: 156,
  submittedAP: 234567.89,
  approvedAP: 189432.12,
  applicationsRejected: 23,
  underwritingAP: 45123.67
};

const AgencyDashboard = () => {
  const [showKPISelector, setShowKPISelector] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'agent-reports' | 'contacts'>('dashboard');
  
  // Default KPI configuration - agencies can customize this
  const [selectedKPIs, setSelectedKPIs] = useState<KPIConfig[]>([
    { id: 'qualified-calls', title: 'Qualified Calls (MTD)', icon: <Phone className="w-5 h-5 text-green-600" />, enabled: true, order: 0 },
    { id: 'avg-duration', title: 'Avg Call Duration', icon: <Clock className="w-5 h-5 text-blue-600" />, enabled: true, order: 1 },
    { id: 'wallet-balance', title: 'Wallet Balance', icon: <DollarSign className="w-5 h-5 text-purple-600" />, enabled: true, order: 2 },
    { id: 'active-agents', title: 'Active Agents Today', icon: <Users className="w-5 h-5 text-indigo-600" />, enabled: true, order: 3 },
    { id: 'conversion-rate', title: 'Conversion Rate', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, enabled: true, order: 4 },
    { id: 'applications-submitted', title: 'Applications Submitted', icon: <FileText className="w-5 h-5 text-blue-500" />, enabled: true, order: 5 },
  ]);

  const getKPIValue = (kpiId: string) => {
    const data = mockDashboardData;
    switch (kpiId) {
      case 'qualified-calls': return { value: data.qualifiedCallsMTD.toLocaleString(), trend: "+12%", trendColor: "text-green-600" };
      case 'avg-duration': return { value: `${data.avgCallDuration} min`, trend: "+0.3 min", trendColor: "text-green-600" };
      case 'wallet-balance': return { value: `$${data.walletBalance.toLocaleString()}`, trend: "-$89", trendColor: "text-red-600" };
      case 'active-agents': return { value: data.activeAgentsToday.toString(), trend: `${data.agentsAtMaxConcurrency} at max`, trendColor: data.agentsAtMaxConcurrency > 0 ? "text-orange-600" : "text-gray-600" };
      case 'conversion-rate': return { value: `${data.callConversionRate}%`, trend: "+2.1%", trendColor: "text-green-600" };
      case 'missed-calls': return { value: data.missedCallsToday.toString(), trend: data.missedCallsToday > 5 ? "High" : "Normal", trendColor: data.missedCallsToday > 5 ? "text-red-600" : "text-green-600" };
      case 'applications-submitted': return { value: data.applicationsSubmitted.toString(), trend: "+15", trendColor: "text-green-600" };
      case 'pending-applications': return { value: data.pendingApplications.toString(), trend: "-5", trendColor: "text-green-600" };
      case 'approved-applications': return { value: data.approvedApplications.toString(), trend: "+22", trendColor: "text-green-600" };
      case 'submitted-ap': return { value: `$${data.submittedAP.toLocaleString()}`, trend: "+12%", trendColor: "text-green-600" };
      case 'approved-ap': return { value: `$${data.approvedAP.toLocaleString()}`, trend: "+8%", trendColor: "text-green-600" };
      case 'applications-rejected': return { value: data.applicationsRejected.toString(), trend: "-2", trendColor: "text-green-600" };
      case 'underwriting-ap': return { value: `$${data.underwritingAP.toLocaleString()}`, trend: "+5%", trendColor: "text-green-600" };
      default: return { value: "0", trend: "0%", trendColor: "text-gray-600" };
    }
  };

  if (showKPISelector) {
    return (
      <div className="flex justify-center items-start pt-8">
        <KPICardSelector
          selectedKPIs={selectedKPIs}
          onKPIConfigChange={setSelectedKPIs}
          onClose={() => setShowKPISelector(false)}
        />
      </div>
    );
  }

  if (activeView === 'agent-reports') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Agent Reports</h1>
            <p className="text-gray-600">Performance metrics and analytics for all agents</p>
          </div>
          <Button variant="outline" onClick={() => setActiveView('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        <AgentReports />
      </div>
    );
  }

  if (activeView === 'contacts') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Contacts Reports</h1>
            <p className="text-gray-600">Lead management and contact tracking</p>
          </div>
          <Button variant="outline" onClick={() => setActiveView('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        <ContactsReports />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agency Dashboard</h1>
          <p className="text-gray-600">Real-time KPIs and operational insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowKPISelector(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Customize KPIs
          </Button>
          <Badge variant="secondary">{mockDashboardData.totalCallsToday} calls today</Badge>
          {mockDashboardData.fallbackCallsToday > 0 && (
            <Badge variant="destructive">{mockDashboardData.fallbackCallsToday} fallbacks</Badge>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-2">
        <Button 
          variant={activeView === 'dashboard' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveView('dashboard')}
        >
          Dashboard
        </Button>
        <Button 
          variant={activeView === 'agent-reports' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveView('agent-reports')}
        >
          Agent Reports
        </Button>
        <Button 
          variant={activeView === 'contacts' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveView('contacts')}
        >
          Contacts
        </Button>
      </div>

      {/* Customizable KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedKPIs.sort((a, b) => a.order - b.order).map((kpi) => {
          const kpiData = getKPIValue(kpi.id);
          return (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                {kpi.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.value}</div>
                <p className={`text-xs ${kpiData.trendColor} flex items-center gap-1`}>
                  {kpiData.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
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
          balance={mockDashboardData.walletBalance}
          estimatedSpend={mockDashboardData.estimatedCallSpend}
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
