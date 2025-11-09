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
      category: "Top Objections (Today)",
      items: [
        { text: "Price concerns - comparing to competitors", count: 23, trend: "up", impact: "high" },
        { text: "Need to think it over / consult spouse", count: 18, trend: "stable", impact: "medium" },
        { text: "Already have coverage", count: 15, trend: "down", impact: "medium" },
        { text: "Not interested right now", count: 12, trend: "stable", impact: "low" },
      ]
    },
    {
      category: "Winning Strategies",
      items: [
        { text: "Starting with health questions builds trust", count: 34, trend: "up", impact: "high" },
        { text: "Comparing 3 carriers increases close rate 40%", count: 28, trend: "up", impact: "high" },
        { text: "Addressing objections early improves conversion", count: 22, trend: "stable", impact: "high" },
      ]
    },
    {
      category: "Common Pain Points",
      items: [
        { text: "Confusion about deductibles vs premiums", count: 19, trend: "up", impact: "medium" },
        { text: "Network provider concerns", count: 14, trend: "stable", impact: "medium" },
        { text: "Pre-existing condition questions", count: 11, trend: "down", impact: "high" },
      ]
    },
    {
      category: "Best Performing Scripts",
      items: [
        { text: "Medicare Advantage intro (Script 3A)", count: 45, trend: "up", impact: "high" },
        { text: "ACA marketplace comparison (Script 2B)", count: 38, trend: "stable", impact: "high" },
        { text: "Final expense direct approach (Script 5C)", count: 31, trend: "up", impact: "medium" },
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
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-purple-600" />
          {getRoleTitle()}
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          {role === "agent" 
            ? "Real-time insights from today's calls to help you close more deals"
            : "Aggregated insights from all conversations to improve team performance"}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(insight.category)}
              className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(insight.category)}
                <span className="font-medium text-sm">{insight.category}</span>
                <Badge variant="outline" className="ml-2">
                  {insight.items.length} insights
                </Badge>
              </div>
              {isExpanded(insight.category) ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {isExpanded(insight.category) && (
              <div className="p-3 pt-0 space-y-2 bg-muted/20">
                {insight.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-2 bg-background rounded border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <div className="mt-1">{getTrendIcon(item.trend)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                            {item.impact} impact
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.count} occurrences
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
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-900">Pro Tip</p>
                <p className="text-xs text-purple-700 mt-1">
                  Address the top objection ("Price concerns") early in your pitch. 
                  Use Script 3A's comparison framework - it has a 40% higher close rate.
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
