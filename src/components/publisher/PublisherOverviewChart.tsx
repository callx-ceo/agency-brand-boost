import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";

const PublisherOverviewChart = () => {
  const chartData = [
    { day: "0", earnings: 500, calls: 45 },
    { day: "2", earnings: 800, calls: 65 },
    { day: "4", earnings: 1200, calls: 85 },
    { day: "6", earnings: 1500, calls: 95 },
    { day: "8", earnings: 1800, calls: 110 },
    { day: "10", earnings: 2100, calls: 125 },
    { day: "12", earnings: 2300, calls: 135 },
    { day: "14", earnings: 2200, calls: 130 },
    { day: "16", earnings: 2000, calls: 120 },
    { day: "18", earnings: 1900, calls: 115 },
    { day: "20", earnings: 1800, calls: 110 },
    { day: "22", earnings: 1700, calls: 105 },
    { day: "24", earnings: 1600, calls: 100 }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-end gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-muted-foreground">Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-muted-foreground">Calls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            <span className="text-muted-foreground">Paid Calls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
            <span className="text-muted-foreground">Conversion Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublisherOverviewChart;