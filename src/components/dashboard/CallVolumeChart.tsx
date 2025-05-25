
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockChartData = [
  { date: "May 18", totalCalls: 45, qualifiedCalls: 34 },
  { date: "May 19", totalCalls: 52, qualifiedCalls: 41 },
  { date: "May 20", totalCalls: 38, qualifiedCalls: 29 },
  { date: "May 21", totalCalls: 67, qualifiedCalls: 51 },
  { date: "May 22", totalCalls: 73, qualifiedCalls: 58 },
  { date: "May 23", totalCalls: 89, qualifiedCalls: 67 },
  { date: "May 24", totalCalls: 79, qualifiedCalls: 62 }
];

const CallVolumeChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockChartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            fontSize={12}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalCalls" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Total Calls"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="qualifiedCalls" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Qualified Calls"
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallVolumeChart;
