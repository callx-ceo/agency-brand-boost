
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, BarChart3, DollarSign, Building2, Activity, Shield, AlertTriangle, Users, Globe, TrendingUp } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export interface SuperAdminWidget {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  order: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  permissions: string[];
  refreshInterval: number;
  dataScope: 'global' | 'filtered' | 'specific';
}

const availableWidgets: Omit<SuperAdminWidget, 'enabled' | 'order'>[] = [
  {
    id: 'global-call-volume',
    title: 'Global Call Volume Chart',
    description: '7-day platform-wide call trends',
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
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
    size: 'large',
    permissions: ['read:agencies'],
    refreshInterval: 900,
    dataScope: 'filtered'
  },
  {
    id: 'advertiser-spend',
    title: 'Advertiser Spend Analytics',
    description: 'Spending breakdown by advertiser',
    icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
    size: 'medium',
    permissions: ['read:advertisers'],
    refreshInterval: 1800,
    dataScope: 'filtered'
  },
  {
    id: 'publisher-revenue',
    title: 'Publisher Revenue Widget',
    description: 'Publisher performance and payouts',
    icon: <Globe className="w-5 h-5 text-pink-600" />,
    size: 'medium',
    permissions: ['read:publishers'],
    refreshInterval: 1800,
    dataScope: 'filtered'
  },
  {
    id: 'system-capacity',
    title: 'System Capacity Widget',
    description: 'Infrastructure utilization metrics',
    icon: <Activity className="w-5 h-5 text-orange-600" />,
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
    size: 'medium',
    permissions: ['read:security'],
    refreshInterval: 120,
    dataScope: 'global'
  },
  {
    id: 'user-activity',
    title: 'User Activity Widget',
    description: 'Platform usage analytics',
    icon: <Users className="w-5 h-5 text-cyan-600" />,
    size: 'large',
    permissions: ['read:users'],
    refreshInterval: 900,
    dataScope: 'global'
  }
];

interface SuperAdminWidgetSelectorProps {
  selectedWidgets: SuperAdminWidget[];
  onWidgetConfigChange: (widgets: SuperAdminWidget[]) => void;
  onClose: () => void;
}

const SuperAdminWidgetSelector = ({ selectedWidgets, onWidgetConfigChange, onClose }: SuperAdminWidgetSelectorProps) => {
  const [tempWidgets, setTempWidgets] = useState<SuperAdminWidget[]>(
    availableWidgets.map(widget => {
      const existing = selectedWidgets.find(s => s.id === widget.id);
      return {
        ...widget,
        enabled: existing?.enabled || false,
        order: existing?.order || 999
      };
    }).sort((a, b) => a.order - b.order)
  );

  const toggleWidget = (id: string) => {
    setTempWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const enabledWidgets = tempWidgets.filter(w => w.enabled);
    const items = Array.from(enabledWidgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedWidgets = tempWidgets.map(widget => {
      if (!widget.enabled) return widget;
      const newIndex = items.findIndex(item => item.id === widget.id);
      return { ...widget, order: newIndex };
    });

    setTempWidgets(updatedWidgets);
  };

  const handleSave = () => {
    const enabledWidgets = tempWidgets
      .filter(widget => widget.enabled)
      .map((widget, index) => ({ ...widget, order: index }))
      .slice(0, 6);
    
    onWidgetConfigChange(enabledWidgets);
    onClose();
  };

  const enabledCount = tempWidgets.filter(w => w.enabled).length;
  const enabledWidgets = tempWidgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  const getScopeBadge = (scope: string) => {
    switch (scope) {
      case 'global': return <Badge variant="default" className="text-xs">Global</Badge>;
      case 'filtered': return <Badge variant="secondary" className="text-xs">Filtered</Badge>;
      case 'specific': return <Badge variant="outline" className="text-xs">Specific</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Customize SuperAdmin Widgets
          <Badge variant="secondary">{enabledCount}/6 widgets selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Available Widgets</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tempWidgets.map((widget) => (
                <div key={widget.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={widget.enabled}
                    onCheckedChange={() => toggleWidget(widget.id)}
                    disabled={!widget.enabled && enabledCount >= 6}
                  />
                  <div className="flex items-start gap-3 flex-1">
                    {widget.icon}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{widget.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{widget.description}</div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{widget.size}</Badge>
                        {getScopeBadge(widget.dataScope)}
                        <Badge variant="outline" className="text-xs">{widget.refreshInterval}s</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Dashboard Preview</h3>
            {enabledWidgets.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="dashboard">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2 min-h-[300px] p-3 border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      {enabledWidgets.map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white border rounded-lg cursor-move shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-2">
                                {widget.icon}
                                <span className="font-medium text-sm">{widget.title}</span>
                                <div className="ml-auto flex gap-1">
                                  <Badge variant="outline" className="text-xs">{widget.size}</Badge>
                                  {getScopeBadge(widget.dataScope)}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                Select widgets to see them here
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminWidgetSelector;
