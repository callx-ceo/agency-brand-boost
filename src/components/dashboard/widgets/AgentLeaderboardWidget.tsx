
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

const mockLeaderboardData = [
  {
    rank: 1,
    agent: "Dianne Russell",
    applications: 12,
    submitted: 5400,
    issued: 5400,
    onlineTime: "7h 21m",
    callTime: "5h 9m",
    icon: <Trophy className="w-4 h-4 text-yellow-500" />
  },
  {
    rank: 2,
    agent: "Kathryn Murphy", 
    applications: 12,
    submitted: 5200,
    issued: 5200,
    onlineTime: "6h 32m",
    callTime: "4h 18m",
    icon: <Medal className="w-4 h-4 text-gray-400" />
  },
  {
    rank: 3,
    agent: "Arlene McCoy",
    applications: 12,
    submitted: 5500,
    issued: 5500,
    onlineTime: "5h 45m",
    callTime: "3h 52m",
    icon: <Award className="w-4 h-4 text-amber-600" />
  },
  {
    rank: 4,
    agent: "Dianne Russell",
    applications: 12,
    submitted: 5200,
    issued: 5200,
    onlineTime: "4h 15m",
    callTime: "2h 43m",
    icon: null
  }
];

const AgentLeaderboardWidget = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Agent Leaderboard</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboardData.map((agent) => (
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
                  <div className="text-xs text-gray-500">
                    {agent.applications} applications • Online: {agent.onlineTime}
                  </div>
                  <div className="text-xs text-gray-500">
                    Call time: {agent.callTime}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${agent.submitted.toLocaleString()}</div>
                <div className="text-xs text-gray-500">${agent.issued.toLocaleString()} issued</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentLeaderboardWidget;
