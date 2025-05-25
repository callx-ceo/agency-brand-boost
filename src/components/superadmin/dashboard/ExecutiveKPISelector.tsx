
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, BarChart3, Building2, Users, DollarSign, TrendingUp, Server, Megaphone, Globe, Activity, Shield, UserCheck } from "lucide-react";

export interface ExecutiveKPIConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  enabled: boolean;
  order: number;
  accessLevel: 'public' | 'internal' | 'executive';
  dataSource: 'realtime' | 'aggregated' | 'calculated';
}

const availableKPIs: Omit<ExecutiveKPIConfig, 'enabled' | 'order'>[] = [
  { id: 'platform-revenue', title: 'Total Platform Revenue', icon: <DollarSign className="w-5 h-5 text-green-600" />, accessLevel: 'executive', dataSource: 'aggregated' },
  { id: 'call-volume', title: 'Total Call Volume', icon: <BarChart3 className="w-5 h-5 text-blue-600" />, accessLevel: 'public', dataSource: 'realtime' },
  { id: 'conversion-rate', title: 'Global Conversion Rate', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, accessLevel: 'internal', dataSource: 'calculated' },
  { id: 'system-uptime', title: 'System Uptime', icon: <Server className="w-5 h-5 text-purple-600" />, accessLevel: 'internal', dataSource: 'realtime' },
  { id: 'active-agencies', title: 'Total Active Agencies', icon: <Building2 className="w-5 h-5 text-indigo-600" />, accessLevel: 'public', dataSource: 'aggregated' },
  { id: 'active-agents', title: 'Total Active Agents', icon: <Users className="w-5 h-5 text-cyan-600" />, accessLevel: 'public', dataSource: 'aggregated' },
  { id: 'total-advertisers', title: 'Total Advertisers', icon: <Megaphone className="w-5 h-5 text-orange-600" />, accessLevel: 'public', dataSource: 'aggregated' },
  { id: 'total-publishers', title: 'Total Publishers', icon: <Globe className="w-5 h-5 text-pink-600" />, accessLevel: 'public', dataSource: 'aggregated' },
  { id: 'avg-revenue-agent', title: 'Average Revenue per Agent', icon: <UserCheck className="w-5 h-5 text-teal-600" />, accessLevel: 'internal', dataSource: 'calculated' },
  { id: 'advertiser-roi', title: 'Advertiser ROI', icon: <TrendingUp className="w-5 h-5 text-lime-600" />, accessLevel: 'internal', dataSource: 'calculated' },
  { id: 'system-capacity', title: 'System Capacity Utilization', icon: <Activity className="w-5 h-5 text-amber-600" />, accessLevel: 'internal', dataSource: 'realtime' },
  { id: 'compliance-score', title: 'Compliance Score', icon: <Shield className="w-5 h-5 text-green-500" />, accessLevel: 'executive', dataSource: 'calculated' },
];

interface ExecutiveKPISelectorProps {
  selectedKPIs: ExecutiveKPIConfig[];
  onKPIConfigChange: (configs: ExecutiveKPIConfig[]) => void;
  onClose: () => void;
}

const ExecutiveKPISelector = ({ selectedKPIs, onKPIConfigChange, onClose }: ExecutiveKPISelectorProps) => {
  const [tempConfigs, setTempConfigs] = useState<ExecutiveKPIConfig[]>(
    availableKPIs.map(kpi => {
      const existing = selectedKPIs.find(s => s.id === kpi.id);
      return {
        ...kpi,
        enabled: existing?.enabled || false,
        order: existing?.order || 999
      };
    }).sort((a, b) => a.order - b.order)
  );

  const toggleKPI = (id: string) => {
    setTempConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, enabled: !config.enabled } : config
    ));
  };

  const handleSave = () => {
    const enabledConfigs = tempConfigs
      .filter(config => config.enabled)
      .map((config, index) => ({ ...config, order: index }))
      .slice(0, 6);
    
    onKPIConfigChange(enabledConfigs);
    onClose();
  };

  const enabledCount = tempConfigs.filter(c => c.enabled).length;

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'executive': return <Badge variant="destructive" className="text-xs">Executive</Badge>;
      case 'internal': return <Badge variant="secondary" className="text-xs">Internal</Badge>;
      case 'public': return <Badge variant="outline" className="text-xs">Public</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Customize Executive KPIs
          <Badge variant="secondary">{enabledCount}/6 selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tempConfigs.map((kpi) => (
            <div key={kpi.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox
                checked={kpi.enabled}
                onCheckedChange={() => toggleKPI(kpi.id)}
                disabled={!kpi.enabled && enabledCount >= 6}
              />
              <div className="flex items-center gap-2 flex-1">
                {kpi.icon}
                <div className="flex-1">
                  <span className="text-sm font-medium">{kpi.title}</span>
                  <div className="flex gap-2 mt-1">
                    {getAccessLevelBadge(kpi.accessLevel)}
                    <Badge variant="outline" className="text-xs">{kpi.dataSource}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveKPISelector;
