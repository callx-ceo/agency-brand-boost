
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Activity } from "lucide-react";

const UserActivityWidget = () => {
  const stats = [
    { label: "Active Users", value: 2847, change: "+12%" },
    { label: "Daily Logins", value: 1653, change: "+8%" },
    { label: "Session Duration", value: "24m", change: "+3%" },
    { label: "Page Views", value: "45.2K", change: "+15%" }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User Activity</CardTitle>
        <Users className="h-4 w-4 text-cyan-600" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-2 border rounded">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <Badge variant="outline" className="text-xs mt-1 text-green-600">
                {stat.change}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivityWidget;
