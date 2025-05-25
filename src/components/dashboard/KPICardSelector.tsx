
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Phone, Users, DollarSign, TrendingUp, AlertTriangle, Clock, FileText, CheckCircle, XCircle, Hourglass } from "lucide-react";

export interface KPIConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  enabled: boolean;
  order: number;
}

const availableKPIs: Omit<KPIConfig, 'enabled' | 'order'>[] = [
  { id: 'qualified-calls', title: 'Qualified Calls (MTD)', icon: <Phone className="w-5 h-5 text-green-600" /> },
  { id: 'avg-duration', title: 'Avg Call Duration', icon: <Clock className="w-5 h-5 text-blue-600" /> },
  { id: 'wallet-balance', title: 'Wallet Balance', icon: <DollarSign className="w-5 h-5 text-purple-600" /> },
  { id: 'active-agents', title: 'Active Agents Today', icon: <Users className="w-5 h-5 text-indigo-600" /> },
  { id: 'conversion-rate', title: 'Conversion Rate', icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
  { id: 'missed-calls', title: 'Missed Calls Today', icon: <AlertTriangle className="w-5 h-5 text-red-600" /> },
  { id: 'applications-submitted', title: 'Applications Submitted', icon: <FileText className="w-5 h-5 text-blue-500" /> },
  { id: 'pending-applications', title: 'Pending Applications', icon: <Hourglass className="w-5 h-5 text-yellow-500" /> },
  { id: 'approved-applications', title: 'Approved Applications', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { id: 'submitted-ap', title: 'Submitted AP', icon: <FileText className="w-5 h-5 text-indigo-500" /> },
  { id: 'approved-ap', title: 'Approved AP', icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> },
  { id: 'applications-rejected', title: 'Applications Rejected', icon: <XCircle className="w-5 h-5 text-red-500" /> },
  { id: 'underwriting-ap', title: 'Underwriting AP', icon: <Hourglass className="w-5 h-5 text-orange-500" /> },
];

interface KPICardSelectorProps {
  selectedKPIs: KPIConfig[];
  onKPIConfigChange: (configs: KPIConfig[]) => void;
  onClose: () => void;
}

const KPICardSelector = ({ selectedKPIs, onKPIConfigChange, onClose }: KPICardSelectorProps) => {
  const [tempConfigs, setTempConfigs] = useState<KPIConfig[]>(
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
      .slice(0, 6); // Limit to 6 cards
    
    onKPIConfigChange(enabledConfigs);
    onClose();
  };

  const enabledCount = tempConfigs.filter(c => c.enabled).length;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Customize Dashboard KPIs
          <Badge variant="secondary">{enabledCount}/6 selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tempConfigs.map((kpi) => (
            <div key={kpi.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                checked={kpi.enabled}
                onCheckedChange={() => toggleKPI(kpi.id)}
                disabled={!kpi.enabled && enabledCount >= 6}
              />
              <div className="flex items-center gap-2 flex-1">
                {kpi.icon}
                <span className="text-sm font-medium">{kpi.title}</span>
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

export default KPICardSelector;
export { availableKPIs };
