
import React, { useState } from "react";
import { BarChart3, Building2, Users, Megaphone, Globe, TrendingUp, Shield, Activity, UserCheck, Settings, DollarSign, AlertTriangle, Server, CheckCircle } from "lucide-react";
import SuperAdminDashboardHeader from "./dashboard/SuperAdminDashboardHeader";
import GlobalNavigationTabs from "./dashboard/GlobalNavigationTabs";
import ExecutiveKPIGrid from "./dashboard/ExecutiveKPIGrid";
import SuperAdminWidgetRenderer from "./dashboard/SuperAdminWidgetRenderer";
import AgencyManagement from "./entities/AgencyManagement";
import AgentManagement from "./entities/AgentManagement";
import AdvertiserManagement from "./entities/AdvertiserManagement";
import PublisherManagement from "./entities/PublisherManagement";
import AdvancedAnalytics from "./analytics/AdvancedAnalytics";
import ComplianceReporting from "./analytics/ComplianceReporting";
import SystemHealthMonitor from "./dashboard/SystemHealthMonitor";
import UserRoleManagement from "./entities/UserRoleManagement";
import ExecutiveKPISelector, { ExecutiveKPIConfig } from "./dashboard/ExecutiveKPISelector";
import SuperAdminWidgetSelector, { SuperAdminWidget } from "./dashboard/SuperAdminWidgetSelector";

// Mock executive dashboard data
const mockExecutiveDashboardData = {
  totalPlatformRevenue: 2400000,
  totalCallVolume: 15847,
  globalConversionRate: 23.4,
  systemUptime: 99.97,
  totalAgencies: 47,
  activeAgencies: 44,
  totalAgents: 312,
  activeAgents: 289,
  totalAdvertisers: 89,
  activeAdvertisers: 78,
  totalPublishers: 156,
  activePublishers: 142,
  avgRevenuePerAgent: 7650,
  advertiserROI: 340,
  systemCapacityUtilization: 67,
  complianceScore: 98.2,
  activeSecurityAlerts: 3,
  fraudDetectionAlerts: 1,
  pendingAgencies: 3,
  suspendedAgents: 8,
  advertisersUnderReview: 7,
  publishersAwaitingApproval: 14,
};

type SuperAdminViewType = 
  | 'dashboard' 
  | 'agencies' 
  | 'agents' 
  | 'advertisers' 
  | 'publishers' 
  | 'analytics' 
  | 'compliance' 
  | 'system-health'
  | 'user-management';

const SuperAdminDashboard = () => {
  const [showKPISelector, setShowKPISelector] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeView, setActiveView] = useState<SuperAdminViewType>('dashboard');
  
  // Executive KPI configuration
  const [selectedKPIs, setSelectedKPIs] = useState<ExecutiveKPIConfig[]>([
    { id: 'platform-revenue', title: 'Total Platform Revenue', icon: <DollarSign className="w-5 h-5 text-green-600" />, enabled: true, order: 0, accessLevel: 'executive', dataSource: 'aggregated' },
    { id: 'call-volume', title: 'Total Call Volume', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, enabled: true, order: 1, accessLevel: 'public', dataSource: 'realtime' },
    { id: 'conversion-rate', title: 'Global Conversion Rate', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, enabled: true, order: 2, accessLevel: 'internal', dataSource: 'calculated' },
    { id: 'system-uptime', title: 'System Uptime', icon: <Server className="w-5 h-5 text-purple-600" />, enabled: true, order: 3, accessLevel: 'internal', dataSource: 'realtime' },
    { id: 'active-agencies', title: 'Total Active Agencies', icon: <Building2 className="w-5 h-5 text-indigo-600" />, enabled: true, order: 4, accessLevel: 'public', dataSource: 'aggregated' },
    { id: 'active-agents', title: 'Total Active Agents', icon: <Users className="w-5 h-5 text-cyan-600" />, enabled: true, order: 5, accessLevel: 'public', dataSource: 'aggregated' },
  ]);

  // SuperAdmin widget configuration
  const [selectedWidgets, setSelectedWidgets] = useState<SuperAdminWidget[]>([
    { 
      id: 'global-call-volume', 
      title: 'Global Call Volume Chart', 
      description: '7-day platform-wide call trends', 
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />, 
      enabled: true, 
      order: 0, 
      size: 'large',
      permissions: ['read:analytics'],
      refreshInterval: 300,
      dataScope: 'global'
    },
    { 
      id: 'platform-revenue', 
      title: 'Platform Revenue Widget', 
      description: 'Revenue tracking with growth indicators', 
      icon: <DollarSign className="w-5 h-5 text-green-600" />, 
      enabled: true, 
      order: 1, 
      size: 'medium',
      permissions: ['read:financial'],
      refreshInterval: 600,
      dataScope: 'global'
    },
    { 
      id: 'agency-leaderboard', 
      title: 'Agency Performance Leaderboard', 
      description: 'Top 10 agencies by performance', 
      icon: <Building2 className="w-5 h-5 text-purple-600" />, 
      enabled: true, 
      order: 2, 
      size: 'large',
      permissions: ['read:agencies'],
      refreshInterval: 900,
      dataScope: 'filtered'
    },
    { 
      id: 'system-capacity', 
      title: 'System Capacity Widget', 
      description: 'Infrastructure utilization metrics', 
      icon: <Activity className="w-5 h-5 text-orange-600" />, 
      enabled: true, 
      order: 3, 
      size: 'medium',
      permissions: ['read:system'],
      refreshInterval: 60,
      dataScope: 'global'
    },
    { 
      id: 'compliance-monitor', 
      title: 'Compliance Monitor Widget', 
      description: 'Regulatory compliance tracking', 
      icon: <Shield className="w-5 h-5 text-emerald-600" />, 
      enabled: true, 
      order: 4, 
      size: 'medium',
      permissions: ['read:compliance'],
      refreshInterval: 3600,
      dataScope: 'global'
    },
    { 
      id: 'fraud-detection', 
      title: 'Fraud Detection Widget', 
      description: 'Security alerts and monitoring', 
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />, 
      enabled: true, 
      order: 5, 
      size: 'medium',
      permissions: ['read:security'],
      refreshInterval: 120,
      dataScope: 'global'
    },
  ]);

  console.log('SuperAdmin Dashboard - Current view:', activeView);
  console.log('SuperAdmin Dashboard - Selected widgets:', selectedWidgets);

  const handleWidgetConfigChange = (newWidgets: SuperAdminWidget[]) => {
    console.log('SuperAdmin - Updating widget configuration:', newWidgets);
    setSelectedWidgets(newWidgets);
  };

  const handleKPIConfigChange = (newKPIs: ExecutiveKPIConfig[]) => {
    console.log('SuperAdmin - Updating KPI configuration:', newKPIs);
    setSelectedKPIs(newKPIs);
  };

  const getKPIValue = (kpiId: string) => {
    const data = mockExecutiveDashboardData;
    switch (kpiId) {
      case 'platform-revenue': return { value: `$${(data.totalPlatformRevenue / 1000000).toFixed(1)}M`, trend: "+18.5%", trendColor: "text-green-600" };
      case 'call-volume': return { value: data.totalCallVolume.toLocaleString(), trend: "+1,247", trendColor: "text-green-600" };
      case 'conversion-rate': return { value: `${data.globalConversionRate}%`, trend: "+2.1%", trendColor: "text-green-600" };
      case 'system-uptime': return { value: `${data.systemUptime}%`, trend: "99.9% SLA", trendColor: "text-green-600" };
      case 'active-agencies': return { value: data.activeAgencies.toString(), trend: `${data.pendingAgencies} pending`, trendColor: "text-blue-600" };
      case 'active-agents': return { value: data.activeAgents.toString(), trend: `${data.suspendedAgents} suspended`, trendColor: data.suspendedAgents > 5 ? "text-orange-600" : "text-green-600" };
      case 'total-advertisers': return { value: data.totalAdvertisers.toString(), trend: `${data.advertisersUnderReview} under review`, trendColor: "text-blue-600" };
      case 'total-publishers': return { value: data.totalPublishers.toString(), trend: `${data.publishersAwaitingApproval} awaiting`, trendColor: "text-orange-600" };
      case 'avg-revenue-agent': return { value: `$${data.avgRevenuePerAgent.toLocaleString()}`, trend: "+$450", trendColor: "text-green-600" };
      case 'advertiser-roi': return { value: `${data.advertiserROI}%`, trend: "+15%", trendColor: "text-green-600" };
      case 'system-capacity': return { value: `${data.systemCapacityUtilization}%`, trend: "Normal", trendColor: "text-green-600" };
      case 'compliance-score': return { value: `${data.complianceScore}%`, trend: "+0.3%", trendColor: "text-green-600" };
      default: return { value: "0", trend: "0%", trendColor: "text-gray-600" };
    }
  };

  if (showKPISelector) {
    return (
      <div className="flex justify-center items-start pt-8">
        <ExecutiveKPISelector
          selectedKPIs={selectedKPIs}
          onKPIConfigChange={handleKPIConfigChange}
          onClose={() => setShowKPISelector(false)}
        />
      </div>
    );
  }

  if (showWidgetSelector) {
    return (
      <div className="flex justify-center items-start pt-8">
        <SuperAdminWidgetSelector
          selectedWidgets={selectedWidgets}
          onWidgetConfigChange={handleWidgetConfigChange}
          onClose={() => setShowWidgetSelector(false)}
        />
      </div>
    );
  }

  // Render specific views
  if (activeView !== 'dashboard') {
    switch (activeView) {
      case 'agencies':
        return <AgencyManagement onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'agents':
        return <AgentManagement onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'advertisers':
        return <AdvertiserManagement onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'publishers':
        return <PublisherManagement onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'analytics':
        return <AdvancedAnalytics onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'compliance':
        return <ComplianceReporting onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'system-health':
        return <SystemHealthMonitor onBackToDashboard={() => setActiveView('dashboard')} />;
      case 'user-management':
        return <UserRoleManagement onBackToDashboard={() => setActiveView('dashboard')} />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <SuperAdminDashboardHeader
        totalCallsToday={mockExecutiveDashboardData.totalCallVolume}
        activeAgencies={mockExecutiveDashboardData.activeAgencies}
        systemUptime={mockExecutiveDashboardData.systemUptime}
        activeAlerts={mockExecutiveDashboardData.activeSecurityAlerts}
        onCustomizeKPIs={() => setShowKPISelector(true)}
        onCustomizeWidgets={() => setShowWidgetSelector(true)}
      />

      <GlobalNavigationTabs
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <ExecutiveKPIGrid
        selectedKPIs={selectedKPIs}
        getKPIValue={getKPIValue}
      />

      <SuperAdminWidgetRenderer
        widgets={selectedWidgets}
        platformRevenue={mockExecutiveDashboardData.totalPlatformRevenue}
        systemMetrics={{
          uptime: mockExecutiveDashboardData.systemUptime,
          capacity: mockExecutiveDashboardData.systemCapacityUtilization,
          compliance: mockExecutiveDashboardData.complianceScore,
          alerts: mockExecutiveDashboardData.activeSecurityAlerts
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
