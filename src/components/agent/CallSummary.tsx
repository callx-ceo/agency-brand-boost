
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

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
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {summaryItems.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge 
                variant={item.type === "Agent" ? "default" : "outline"}
                className={item.type === "Agent" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
              >
                {item.type}
              </Badge>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
            {item.content && (
              <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default CallSummary;
