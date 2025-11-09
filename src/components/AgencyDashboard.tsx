import React, { useState } from "react";
import { Phone, Users, DollarSign, TrendingUp, Clock, FileText } from "lucide-react";
import DashboardHeader from "./dashboard/DashboardHeader";
import NavigationTabs from "./dashboard/NavigationTabs";
import KPICardsGrid from "./dashboard/KPICardsGrid";
import DashboardWidgetRenderer from "./dashboard/DashboardWidgetRenderer";
import ViewRenderer from "./dashboard/ViewRenderer";
import KPICardSelector, { KPIConfig } from "./dashboard/KPICardSelector";
import DashboardWidgetSelector, { DashboardWidget } from "./dashboard/DashboardWidgetSelector";
import AIRecommendationsWidget from "./dashboard/AIRecommendationsWidget";
import CallInsightsWidget from "./shared/CallInsightsWidget";

// Mock data for the dashboard - expanded with new KPIs
const mockDashboardData = {
  qualifiedCallsMTD: 362,
  totalCallsToday: 79,
  liveCalls: 12,
  completedCalls: 67,
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

type ViewType = 'dashboard' | 'agent-reports' | 'contacts' | 'realtime-report' | 'call-history';

const AgencyDashboard = () => {
  const [showKPISelector, setShowKPISelector] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  
  // Default KPI configuration - agencies can customize this
  const [selectedKPIs, setSelectedKPIs] = useState<KPIConfig[]>([
    { id: 'qualified-calls', title: 'Qualified Calls (MTD)', icon: <Phone className="w-5 h-5 text-green-600" />, enabled: true, order: 0 },
    { id: 'avg-duration', title: 'Avg Call Duration', icon: <Clock className="w-5 h-5 text-blue-600" />, enabled: true, order: 1 },
    { id: 'wallet-balance', title: 'Wallet Balance', icon: <DollarSign className="w-5 h-5 text-purple-600" />, enabled: true, order: 2 },
    { id: 'active-agents', title: 'Active Agents Today', icon: <Users className="w-5 h-5 text-indigo-600" />, enabled: true, order: 3 },
    { id: 'conversion-rate', title: 'Conversion Rate', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, enabled: true, order: 4 },
    { id: 'applications-submitted', title: 'Applications Submitted', icon: <FileText className="w-5 h-5 text-blue-500" />, enabled: true, order: 5 },
  ]);

  // Updated default widget configuration with 6 widgets enabled
  const [selectedWidgets, setSelectedWidgets] = useState<DashboardWidget[]>([
    { 
      id: 'call-volume', 
      title: '7-Day Call Volume', 
      description: 'Chart showing call trends over the past week', 
      icon: <></>, 
      enabled: true, 
      order: 0, 
      size: 'medium' 
    },
    { 
      id: 'wallet-spending', 
      title: 'Wallet & Spending', 
      description: 'Current balance and spending analytics', 
      icon: <></>, 
      enabled: true, 
      order: 1, 
      size: 'medium' 
    },
    { 
      id: 'applications-carrier', 
      title: 'Applications by Carrier', 
      description: 'Breakdown of applications by insurance carrier', 
      icon: <></>, 
      enabled: true, 
      order: 2, 
      size: 'medium' 
    },
    { 
      id: 'agent-leaderboard', 
      title: 'Agent Leaderboard', 
      description: 'Top performing agents ranking', 
      icon: <></>, 
      enabled: true, 
      order: 3, 
      size: 'medium' 
    },
    { 
      id: 'agent-status', 
      title: 'Agent Status', 
      description: 'Real-time agent availability and workload', 
      icon: <></>, 
      enabled: true, 
      order: 4, 
      size: 'medium' 
    },
    { 
      id: 'active-campaigns', 
      title: 'Active Campaigns', 
      description: 'Current running campaigns and performance', 
      icon: <></>, 
      enabled: true, 
      order: 5, 
      size: 'medium' 
    },
  ]);

  console.log('Current selected widgets:', selectedWidgets);

  const handleWidgetConfigChange = (newWidgets: DashboardWidget[]) => {
    console.log('Updating widget configuration:', newWidgets);
    setSelectedWidgets(newWidgets);
  };

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

  if (showWidgetSelector) {
    return (
      <div className="flex justify-center items-start pt-8">
        <DashboardWidgetSelector
          selectedWidgets={selectedWidgets}
          onWidgetConfigChange={handleWidgetConfigChange}
          onClose={() => setShowWidgetSelector(false)}
        />
      </div>
    );
  }

  // Render specific views
  if (activeView !== 'dashboard') {
    return (
      <ViewRenderer 
        activeView={activeView} 
        onBackToDashboard={() => setActiveView('dashboard')} 
      />
    );
  }

  return (
    <div className="space-y-6">
        <DashboardHeader 
          liveCalls={mockDashboardData.liveCalls}
          completedCalls={mockDashboardData.completedCalls}
          fallbackCallsToday={mockDashboardData.fallbackCallsToday}
          onCustomizeKPIs={() => setShowKPISelector(true)}
          onCustomizeWidgets={() => setShowWidgetSelector(true)}
        />

      <NavigationTabs
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <KPICardsGrid
        selectedKPIs={selectedKPIs}
        getKPIValue={getKPIValue}
      />

      <CallInsightsWidget role="agency" />

      <AIRecommendationsWidget />

      <DashboardWidgetRenderer
        widgets={selectedWidgets}
        walletBalance={mockDashboardData.walletBalance}
        estimatedSpend={mockDashboardData.estimatedCallSpend}
      />
    </div>
  );
};

export default AgencyDashboard;
