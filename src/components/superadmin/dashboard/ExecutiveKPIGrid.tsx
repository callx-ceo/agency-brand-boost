
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExecutiveKPIConfig } from "./ExecutiveKPISelector";

interface ExecutiveKPIGridProps {
  selectedKPIs: ExecutiveKPIConfig[];
  getKPIValue: (kpiId: string) => { value: string; trend: string; trendColor: string };
}

const ExecutiveKPIGrid = ({ selectedKPIs, getKPIValue }: ExecutiveKPIGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {selectedKPIs.sort((a, b) => a.order - b.order).map((kpi) => {
        const kpiData = getKPIValue(kpi.id);
        return (
          <Card key={kpi.id} className="hover:shadow-lg transition-shadow">
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
  );
};

export default ExecutiveKPIGrid;
