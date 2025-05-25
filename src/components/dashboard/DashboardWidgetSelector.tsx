
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, BarChart3, DollarSign, FileText, Users, Activity, Globe } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export interface DashboardWidget {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  order: number;
  size: 'small' | 'medium' | 'large';
}

const availableWidgets: Omit<DashboardWidget, 'enabled' | 'order'>[] = [
  {
    id: 'call-volume',
    title: '7-Day Call Volume',
    description: 'Chart showing call trends over the past week',
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    size: 'medium'
  },
  {
    id: 'wallet-spending',
    title: 'Wallet & Spending',
    description: 'Current balance and spending analytics',
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    size: 'medium'
  },
  {
    id: 'applications-carrier',
    title: 'Applications by Carrier',
    description: 'Breakdown of applications by insurance carrier',
    icon: <FileText className="w-5 h-5 text-purple-600" />,
    size: 'large'
  },
  {
    id: 'agent-leaderboard',
    title: 'Agent Leaderboard',
    description: 'Top performing agents ranking',
    icon: <Users className="w-5 h-5 text-indigo-600" />,
    size: 'large'
  },
  {
    id: 'agent-status',
    title: 'Agent Status',
    description: 'Real-time agent availability and workload',
    icon: <Activity className="w-5 h-5 text-emerald-600" />,
    size: 'medium'
  },
  {
    id: 'active-campaigns',
    title: 'Active Campaigns',
    description: 'Current running campaigns and performance',
    icon: <Globe className="w-5 h-5 text-orange-600" />,
    size: 'large'
  }
];

interface DashboardWidgetSelectorProps {
  selectedWidgets: DashboardWidget[];
  onWidgetConfigChange: (widgets: DashboardWidget[]) => void;
  onClose: () => void;
}

const DashboardWidgetSelector = ({ selectedWidgets, onWidgetConfigChange, onClose }: DashboardWidgetSelectorProps) => {
  const [tempWidgets, setTempWidgets] = useState<DashboardWidget[]>(
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
      .map((widget, index) => ({ ...widget, order: index }));
    
    onWidgetConfigChange(enabledWidgets);
    onClose();
  };

  const enabledCount = tempWidgets.filter(w => w.enabled).length;
  const enabledWidgets = tempWidgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Customize Dashboard Widgets
          <Badge variant="secondary">{enabledCount} widgets selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Widgets */}
          <div>
            <h3 className="font-semibold mb-3">Available Widgets</h3>
            <div className="space-y-3">
              {tempWidgets.map((widget) => (
                <div key={widget.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={widget.enabled}
                    onCheckedChange={() => toggleWidget(widget.id)}
                  />
                  <div className="flex items-start gap-3 flex-1">
                    {widget.icon}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{widget.title}</div>
                      <div className="text-xs text-gray-500">{widget.description}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {widget.size}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div>
            <h3 className="font-semibold mb-3">Dashboard Preview</h3>
            {enabledWidgets.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="dashboard">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2 min-h-[200px]"
                    >
                      {enabledWidgets.map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-gray-50 border rounded-lg cursor-move"
                            >
                              <div className="flex items-center gap-2">
                                {widget.icon}
                                <span className="font-medium text-sm">{widget.title}</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {widget.size}
                                </Badge>
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

export default DashboardWidgetSelector;
