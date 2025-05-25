
import { useState } from "react";
import { DollarSign, BarChart3, TrendingUp, Server, Building2, Users } from "lucide-react";
import { ExecutiveKPIConfig } from "../dashboard/ExecutiveKPISelector";
import { SuperAdminWidget } from "../dashboard/SuperAdminWidgetSelector";

export const useSuperAdminConfig = () => {
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
  ]);

  const handleWidgetConfigChange = (newWidgets: SuperAdminWidget[]) => {
    console.log('SuperAdmin - Updating widget configuration:', newWidgets);
    setSelectedWidgets(newWidgets);
  };

  const handleKPIConfigChange = (newKPIs: ExecutiveKPIConfig[]) => {
    console.log('SuperAdmin - Updating KPI configuration:', newKPIs);
    setSelectedKPIs(newKPIs);
  };

  return {
    selectedKPIs,
    selectedWidgets,
    handleKPIConfigChange,
    handleWidgetConfigChange
  };
};
