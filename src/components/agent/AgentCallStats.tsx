
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AgentCallStats = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Calls Today:</span>
            <span className="text-white font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Applications:</span>
            <span className="text-white font-medium">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time Online:</span>
            <span className="text-blue-400 font-medium font-mono">6h 32m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time on Calls:</span>
            <span className="text-purple-400 font-medium font-mono">4h 18m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Conversion Rate:</span>
            <span className="text-green-400 font-medium">67%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg Call Time:</span>
            <span className="text-white font-medium">4:23</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCallStats;
