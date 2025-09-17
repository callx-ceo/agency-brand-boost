
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentTimeFilter, { TimeFilterPeriod } from "./AgentTimeFilter";

const AgentCallStats = () => {
  const [filteredData, setFilteredData] = useState({
    onlineTime: "6h 32m",
    talkTime: "4h 18m",
    callsToday: 12,
    applications: 8,
    conversionRate: "67%",
    avgCallTime: "4:23"
  });

  const handleFilterChange = (period: TimeFilterPeriod, dateRange?: any) => {
    // Mock data based on filter - in real app, this would fetch from API
    const mockData = {
      today: { onlineTime: "6h 32m", talkTime: "4h 18m", callsToday: 12, applications: 8, conversionRate: "67%", avgCallTime: "4:23" },
      yesterday: { onlineTime: "7h 45m", talkTime: "5h 12m", callsToday: 15, applications: 10, conversionRate: "67%", avgCallTime: "5:01" },
      monthly: { onlineTime: "168h 20m", talkTime: "112h 45m", callsToday: 324, applications: 215, conversionRate: "66%", avgCallTime: "4:35" },
      custom: { onlineTime: "12h 15m", talkTime: "8h 30m", callsToday: 24, applications: 16, conversionRate: "67%", avgCallTime: "4:18" }
    };
    
    setFilteredData(mockData[period] || mockData.today);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm">Agent Performance</CardTitle>
        <AgentTimeFilter onFilterChange={handleFilterChange} />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Calls:</span>
            <span className="text-white font-medium">{filteredData.callsToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Applications:</span>
            <span className="text-white font-medium">{filteredData.applications}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Time Online:</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-semibold font-mono tracking-wide">{filteredData.onlineTime}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Talk Time:</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
              <span className="text-violet-400 font-semibold font-mono tracking-wide">{filteredData.talkTime}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Conversion Rate:</span>
            <span className="text-green-400 font-medium">{filteredData.conversionRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg Call Time:</span>
            <span className="text-white font-medium">{filteredData.avgCallTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCallStats;
