import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Phone, ShoppingCart, TrendingUp } from "lucide-react";

const PublisherKPICards = () => {
  const kpiData = [
    {
      title: "Total Earnings",
      value: "$9,236",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Total Calls",
      value: "1,429",
      icon: Phone,
      color: "bg-blue-500"
    },
    {
      title: "Paid Calls",
      value: "403",
      icon: ShoppingCart,
      color: "bg-orange-500"
    },
    {
      title: "Conversion Rate",
      value: "28%",
      icon: TrendingUp,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className={`${kpi.color} text-white border-0`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
                <Icon className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PublisherKPICards;