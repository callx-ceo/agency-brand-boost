
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockCarrierData = [
  { carrier: "Warphase", applications: 148, color: "#3b82f6" },
  { carrier: "Bannon LLC", applications: 146, color: "#10b981" },
  { carrier: "AllState", applications: 142, color: "#f59e0b" },
  { carrier: "State Farm", applications: 138, color: "#ef4444" },
  { carrier: "Geico", applications: 134, color: "#8b5cf6" },
];

const ApplicationsByCarrierWidget = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Applications by Carrier</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockCarrierData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="carrier" 
                fontSize={12}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
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
              <Bar 
                dataKey="applications" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {mockCarrierData.slice(0, 3).map((carrier, index) => (
            <div key={carrier.carrier} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: carrier.color }}
                />
                <span>{carrier.carrier}</span>
              </div>
              <span className="font-medium">{carrier.applications}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsByCarrierWidget;
