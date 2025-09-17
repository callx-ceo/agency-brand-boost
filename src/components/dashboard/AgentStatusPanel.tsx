
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "online",
    currentLoad: 2,
    maxConcurrency: 3,
    callsToday: 23,
    onlineTime: "6h 32m",
    callTime: "4h 18m"
  },
  {
    id: 2,
    name: "Mike Chen",
    status: "online",
    currentLoad: 3,
    maxConcurrency: 3,
    callsToday: 19,
    onlineTime: "5h 45m",
    callTime: "3h 52m"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    status: "offline",
    currentLoad: 0,
    maxConcurrency: 2,
    callsToday: 15,
    onlineTime: "2h 15m",
    callTime: "1h 43m"
  },
  {
    id: 4,
    name: "James Wilson",
    status: "online",
    currentLoad: 1,
    maxConcurrency: 4,
    callsToday: 31,
    onlineTime: "7h 21m",
    callTime: "5h 9m"
  }
];

const AgentStatusPanel = () => {
  const onlineAgents = mockAgents.filter(agent => agent.status === "online").length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Agent Status
          <Badge variant="secondary">{onlineAgents}/{mockAgents.length} online</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    agent.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {agent.callsToday} calls
                  </div>
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
              <div className="flex items-center gap-2">
                <Badge 
                  variant={agent.currentLoad >= agent.maxConcurrency ? "destructive" : "outline"}
                  className="text-xs"
                >
                  {agent.currentLoad}/{agent.maxConcurrency}
                </Badge>
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentStatusPanel;
