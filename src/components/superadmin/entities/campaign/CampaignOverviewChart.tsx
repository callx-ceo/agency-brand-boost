
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockChartData = [
  { day: 2, revenue: 0 },
  { day: 4, revenue: 0 },
  { day: 6, revenue: 0 },
  { day: 8, revenue: 0 },
  { day: 10, revenue: 0 },
  { day: 12, revenue: 0 },
  { day: 14, revenue: 0 },
  { day: 16, revenue: 0 },
  { day: 18, revenue: 0 },
  { day: 20, revenue: 0 },
  { day: 22, revenue: 0 },
  { day: 24, revenue: 0 },
];

const CampaignOverviewChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis 
                domain={[0, 1]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, "Revenue"]}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignOverviewChart;
