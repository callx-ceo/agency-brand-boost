
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
    callsToday: 23
  },
  {
    id: 2,
    name: "Mike Chen",
    status: "online",
    currentLoad: 3,
    maxConcurrency: 3,
    callsToday: 19
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    status: "offline",
    currentLoad: 0,
    maxConcurrency: 2,
    callsToday: 15
  },
  {
    id: 4,
    name: "James Wilson",
    status: "online",
    currentLoad: 1,
    maxConcurrency: 4,
    callsToday: 31
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
                  <div className="text-xs text-gray-500">
                    {agent.callsToday} calls today
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
