
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockGlobalCallData = [
  { date: "May 18", totalCalls: 12453, qualifiedCalls: 9234, conversionRate: 74.1 },
  { date: "May 19", totalCalls: 13892, qualifiedCalls: 10456, conversionRate: 75.3 },
  { date: "May 20", totalCalls: 11567, qualifiedCalls: 8734, conversionRate: 75.5 },
  { date: "May 21", totalCalls: 15234, qualifiedCalls: 11678, conversionRate: 76.7 },
  { date: "May 22", totalCalls: 16789, qualifiedCalls: 12934, conversionRate: 77.0 },
  { date: "May 23", totalCalls: 18234, qualifiedCalls: 14123, conversionRate: 77.5 },
  { date: "May 24", totalCalls: 15847, qualifiedCalls: 12298, conversionRate: 77.6 }
];

const GlobalCallVolumeChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockGlobalCallData}>
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
            strokeWidth={3}
            name="Total Calls"
            dot={{ fill: '#3b82f6', r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="qualifiedCalls" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Qualified Calls"
            dot={{ fill: '#10b981', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GlobalCallVolumeChart;
