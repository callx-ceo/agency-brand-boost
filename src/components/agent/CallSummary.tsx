
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const CallSummary = () => {
  const summaryItems = [
    {
      type: "Agent",
      time: "CLICK INFO",
      content: "Is Simply Dummy Text Of The Printing And Typesetting Industry. (15:38)"
    },
    {
      type: "Client",
      time: "13:02",
      content: ""
    },
    {
      type: "Agent",
      time: "CLICK INFO", 
      content: "Is Simply Dummy Text Of The Printing And Typesetting Industry. (14:06)"
    },
    {
      type: "Client",
      time: "13:02",
      content: ""
    },
    {
      type: "Agent",
      time: "CLICK INFO",
      content: "Is Simply Dummy Text Of The Printing And Typesetting Industry. (13:02)"
    },
    {
      type: "Client",
      time: "OK. (10:02)",
      content: ""
    }
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Summary</span>
        </div>
        <X className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">TRANSCRIPT</span>
          <span className="text-xs text-gray-500">CLIENT INFO</span>
        </div>
        
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          {summaryItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge 
                  variant={item.type === "Agent" ? "default" : "outline"}
                  className={`text-xs ${
                    item.type === "Agent" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {item.type}
                </Badge>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              {item.content && (
                <div className="text-xs text-gray-700 p-3 bg-blue-50 rounded border border-blue-100">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallSummary;
