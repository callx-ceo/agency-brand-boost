
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import AgentTimeFilter, { TimeFilterPeriod } from "../../agent/AgentTimeFilter";

const mockAgentLeaderboardData = [
  {
    rank: 1,
    agent: "Sarah Mitchell",
    agency: "Premium Insurance Partners",
    applications: 28,
    submitted: 15600,
    issued: 14200,
    conversionRate: 91.0,
    onlineTime: "7h 21m",
    callTime: "5h 9m",
    icon: <Trophy className="w-4 h-4 text-yellow-500" />
  },
  {
    rank: 2,
    agent: "Michael Rodriguez", 
    agency: "Elite Coverage Solutions",
    applications: 24,
    submitted: 13800,
    issued: 12400,
    conversionRate: 89.9,
    onlineTime: "6h 32m",
    callTime: "4h 18m",
    icon: <Medal className="w-4 h-4 text-gray-400" />
  },
  {
    rank: 3,
    agent: "Jennifer Chen",
    agency: "Secure Life Agency",
    applications: 22,
    submitted: 12900,
    issued: 11200,
    conversionRate: 86.8,
    onlineTime: "5h 45m",
    callTime: "3h 52m",
    icon: <Award className="w-4 h-4 text-amber-600" />
  },
  {
    rank: 4,
    agent: "David Thompson",
    agency: "Guardian Insurance Group",
    applications: 20,
    submitted: 11500,
    issued: 9800,
    conversionRate: 85.2,
    onlineTime: "4h 15m",
    callTime: "2h 43m",
    icon: null
  },
  {
    rank: 5,
    agent: "Lisa Wang",
    agency: "Premier Protection LLC",
    applications: 19,
    submitted: 10800,
    issued: 9100,
    conversionRate: 84.3,
    onlineTime: "3h 28m",
    callTime: "2h 15m",
    icon: null
  }
];

const AgentPerformanceLeaderboardWidget = () => {
  const [filteredData, setFilteredData] = useState(mockAgentLeaderboardData);

  const handleFilterChange = (period: TimeFilterPeriod, dateRange?: any) => {
    // Mock filtering logic - in real app, this would filter data from API
    const filteredAgents = mockAgentLeaderboardData.map(agent => ({
      ...agent,
      onlineTime: period === "monthly" ? "168h 20m" : period === "yesterday" ? "7h 45m" : "6h 32m",
      callTime: period === "monthly" ? "112h 45m" : period === "yesterday" ? "5h 12m" : "4h 18m",
    }));
    setFilteredData(filteredAgents);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Top Agent Performers</CardTitle>
          <Button variant="outline" size="sm">View All Agents</Button>
        </div>
        <AgentTimeFilter onFilterChange={handleFilterChange} />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredData.map((agent) => (
            <div key={`${agent.rank}-${agent.agent}`} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-8">
                  {agent.icon ? (
                    agent.icon
                  ) : (
                    <span className="text-sm font-medium text-gray-600">#{agent.rank}</span>
                  )}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {agent.agent.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{agent.agent}</div>
                  <div className="text-xs text-muted-foreground">{agent.agency}</div>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-emerald-600 font-medium">{agent.onlineTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                      <span className="text-violet-600 font-medium">{agent.callTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${agent.submitted.toLocaleString()}</div>
                <div className="text-xs text-gray-500">${agent.issued.toLocaleString()} issued</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {agent.conversionRate}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceLeaderboardWidget;
