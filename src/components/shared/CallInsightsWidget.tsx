import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  XCircle, 
  CheckCircle2, 
  Clock,
  Lightbulb,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface CallInsight {
  category: string;
  items: {
    text: string;
    count: number;
    trend: "up" | "down" | "stable";
    impact: "high" | "medium" | "low";
  }[];
}

interface CallInsightsWidgetProps {
  role?: "agent" | "agency" | "superadmin";
}

const CallInsightsWidget = ({ role = "agent" }: CallInsightsWidgetProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["objections", "winning-strategies"]);

  const insights: CallInsight[] = [
    {
      category: "Top Objections",
      items: [
        { text: "Price concerns - comparing to competitors", count: 23, trend: "up", impact: "high" },
        { text: "Need to think it over / consult spouse", count: 18, trend: "stable", impact: "medium" },
        { text: "Already have coverage", count: 15, trend: "down", impact: "medium" },
      ]
    },
    {
      category: "Winning Strategies",
      items: [
        { text: "Starting with health questions builds trust", count: 34, trend: "up", impact: "high" },
        { text: "Comparing 3 carriers increases close rate 40%", count: 28, trend: "up", impact: "high" },
      ]
    },
    {
      category: "Best Performing Scripts",
      items: [
        { text: "Medicare Advantage intro (Script 3A)", count: 45, trend: "up", impact: "high" },
        { text: "ACA marketplace comparison (Script 2B)", count: 38, trend: "stable", impact: "high" },
      ]
    }
  ];

  const toggleSection = (category: string) => {
    const key = category.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    setExpandedSections(prev => 
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    );
  };

  const isExpanded = (category: string) => {
    const key = category.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return expandedSections.includes(key);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-red-600" />;
      case "down": return <TrendingDown className="w-3 h-3 text-green-600" />;
      default: return <div className="w-3 h-3 rounded-full bg-gray-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("Objection")) return <XCircle className="w-4 h-4 text-red-600" />;
    if (category.includes("Winning")) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (category.includes("Pain")) return <AlertCircle className="w-4 h-4 text-orange-600" />;
    if (category.includes("Script")) return <MessageSquare className="w-4 h-4 text-blue-600" />;
    return <Lightbulb className="w-4 h-4 text-purple-600" />;
  };

  const getRoleTitle = () => {
    switch (role) {
      case "superadmin": return "Platform-Wide Call Insights";
      case "agency": return "Team Call Insights";
      default: return "Call Insights - Sell Smarter Today";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-purple-600" />
          {getRoleTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {insights.map((insight, idx) => (
          <div key={idx} className="border rounded overflow-hidden">
            <button
              onClick={() => toggleSection(insight.category)}
              className="w-full flex items-center justify-between p-2 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                {getCategoryIcon(insight.category)}
                <span className="font-medium text-xs">{insight.category}</span>
                <Badge variant="outline" className="ml-1 text-[10px] px-1 py-0">
                  {insight.items.length}
                </Badge>
              </div>
              {isExpanded(insight.category) ? (
                <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
            
            {isExpanded(insight.category) && (
              <div className="p-2 pt-0 space-y-1.5 bg-muted/20">
                {insight.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-1.5 bg-background rounded border"
                  >
                    <div className="flex items-start gap-1.5 flex-1 min-w-0">
                      <div className="mt-0.5 shrink-0">{getTrendIcon(item.trend)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-2">{item.text}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="outline" className={`text-[10px] px-1 py-0 ${getImpactColor(item.impact)}`}>
                            {item.impact}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {role === "agent" && (
          <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded">
            <div className="flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-purple-900">Pro Tip</p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Address price concerns early. Script 3A has a 40% higher close rate.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallInsightsWidget;
