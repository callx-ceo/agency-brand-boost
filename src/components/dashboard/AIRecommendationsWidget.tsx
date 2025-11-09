import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Users, Phone, DollarSign } from "lucide-react";

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  impact: string;
  actionRequired: boolean;
}

const AIRecommendationsWidget = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockRecommendations: AIRecommendation[] = [
      {
        id: "1",
        title: "Optimize Agent Schedules",
        description: "Peak call volume detected 2-4 PM. Increase agent availability by 30% during this window.",
        priority: "high",
        category: "Operations",
        impact: "Reduce missed calls by 25%",
        actionRequired: true
      },
      {
        id: "2",
        title: "Wallet Top-Up Alert",
        description: "Current balance ($412.57) will last ~3 days at current spend rate. Consider adding funds.",
        priority: "medium",
        category: "Finance",
        impact: "Prevent service interruption",
        actionRequired: false
      },
      {
        id: "3",
        title: "Agent Training Opportunity",
        description: "3 agents with conversion rates below 60%. Schedule training session on objection handling.",
        priority: "medium",
        category: "Training",
        impact: "Boost team performance by 15%",
        actionRequired: true
      },
      {
        id: "4",
        title: "Campaign Performance Review",
        description: "Medicare campaign outperforming by 40%. Consider reallocating budget from underperforming campaigns.",
        priority: "low",
        category: "Strategy",
        impact: "Maximize ROI",
        actionRequired: false
      },
      {
        id: "5",
        title: "Quality Assurance Alert",
        description: "Call quality scores dropped 8% this week. Review recent calls for common issues.",
        priority: "high",
        category: "Quality",
        impact: "Maintain service standards",
        actionRequired: true
      }
    ];

    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertTriangle className="w-4 h-4" />;
      case "medium": return <TrendingUp className="w-4 h-4" />;
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "operations": return <Phone className="w-3 h-3" />;
      case "finance": return <DollarSign className="w-3 h-3" />;
      case "training": return <Users className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Recommendations
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateRecommendations}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
            Analyzing your data...
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recommendations at this time</p>
          </div>
        ) : (
          recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    {rec.actionRequired && (
                      <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                        Action Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                      <span className="mr-1">{getPriorityIcon(rec.priority)}</span>
                      {rec.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      {getCategoryIcon(rec.category)}
                      {rec.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">• {rec.impact}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendationsWidget;
