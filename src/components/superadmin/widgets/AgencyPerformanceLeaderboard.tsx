
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const mockAgencyPerformance = [
  { id: 1, name: "Elite Insurance Group", revenue: 234567, conversion: 82.4, agents: 28, rank: 1 },
  { id: 2, name: "Premier Coverage Solutions", revenue: 218934, conversion: 79.8, agents: 22, rank: 2 },
  { id: 3, name: "Nationwide Benefits Corp", revenue: 201456, conversion: 78.2, agents: 31, rank: 3 },
  { id: 4, name: "Superior Insurance Partners", revenue: 189234, conversion: 76.9, agents: 19, rank: 4 },
  { id: 5, name: "Guardian Life Services", revenue: 176543, conversion: 75.6, agents: 24, rank: 5 },
  { id: 6, name: "ProTech Insurance Solutions", revenue: 165432, conversion: 74.3, agents: 17, rank: 6 },
  { id: 7, name: "Dynasty Coverage Group", revenue: 154321, conversion: 73.8, agents: 20, rank: 7 },
  { id: 8, name: "Pinnacle Risk Management", revenue: 143210, conversion: 72.4, agents: 15, rank: 8 },
  { id: 9, name: "Apex Insurance Network", revenue: 132109, conversion: 71.6, agents: 18, rank: 9 },
  { id: 10, name: "Crown Coverage Alliance", revenue: 125987, conversion: 70.9, agents: 14, rank: 10 }
];

const AgencyPerformanceLeaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2: return <Medal className="h-4 w-4 text-gray-400" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-medium text-gray-500">#{rank}</span>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Agency Performance Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-96 overflow-y-auto space-y-2">
          {mockAgencyPerformance.map((agency) => (
            <div key={agency.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {getRankIcon(agency.rank)}
                <div>
                  <div className="font-medium text-sm">{agency.name}</div>
                  <div className="text-xs text-gray-500">{agency.agents} agents</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">${agency.revenue.toLocaleString()}</div>
                <Badge 
                  variant={agency.conversion >= 80 ? "default" : agency.conversion >= 75 ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {agency.conversion}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyPerformanceLeaderboard;
