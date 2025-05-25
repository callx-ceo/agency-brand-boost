
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Star } from "lucide-react";

const mockPublisherData = [
  { name: "LeadGen Pro Network", revenue: 23450, quality: 4.8, calls: 1230 },
  { name: "Digital Marketing Hub", revenue: 19890, quality: 4.6, calls: 987 },
  { name: "Traffic Solutions Inc", revenue: 17650, quality: 4.4, calls: 856 },
  { name: "Conversion Masters", revenue: 15320, quality: 4.7, calls: 743 }
];

const PublisherRevenueWidget = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Publisher Revenue</CardTitle>
        <Globe className="h-4 w-4 text-pink-600" />
      </CardHeader>
      <CardContent className="space-y-3">
        {mockPublisherData.map((publisher, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <div>
              <div className="text-sm font-medium">{publisher.name}</div>
              <div className="text-xs text-muted-foreground">
                {publisher.calls} calls delivered
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">${publisher.revenue.toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs">{publisher.quality}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PublisherRevenueWidget;
