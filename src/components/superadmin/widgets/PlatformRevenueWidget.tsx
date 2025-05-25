
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface PlatformRevenueWidgetProps {
  revenue: number;
}

const PlatformRevenueWidget = ({ revenue }: PlatformRevenueWidgetProps) => {
  const formattedRevenue = (revenue / 1000000).toFixed(1);
  const monthlyGrowth = 18.5;
  const dailyRevenue = 89234;
  const weeklyGrowth = 12.3;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-2xl font-bold">${formattedRevenue}M</div>
          <p className="text-xs text-muted-foreground">Month to Date</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Monthly Growth</span>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-sm font-medium">+{monthlyGrowth}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Daily Revenue</span>
            <span className="text-sm font-medium">${dailyRevenue.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Weekly Growth</span>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-sm font-medium">+{weeklyGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            Revenue target: $3.2M (75% achieved)
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformRevenueWidget;
