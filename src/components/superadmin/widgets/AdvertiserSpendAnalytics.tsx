
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Megaphone } from "lucide-react";

const mockAdvertiserData = [
  { name: "HealthFirst Insurance", spend: 45670, roi: 340, status: "active" },
  { name: "AutoGuard Solutions", spend: 38920, roi: 285, status: "active" },
  { name: "LifeCover Partners", spend: 32145, roi: 410, status: "active" },
  { name: "HomeShield Corp", spend: 28930, roi: 195, status: "paused" }
];

const AdvertiserSpendAnalytics = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Advertiser Spend Analytics</CardTitle>
        <Megaphone className="h-4 w-4 text-indigo-600" />
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAdvertiserData.map((advertiser, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <div>
              <div className="text-sm font-medium">{advertiser.name}</div>
              <div className="text-xs text-muted-foreground">
                ${advertiser.spend.toLocaleString()} spend
              </div>
            </div>
            <div className="text-right">
              <Badge variant={advertiser.status === 'active' ? 'default' : 'secondary'}>
                {advertiser.roi}% ROI
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdvertiserSpendAnalytics;
