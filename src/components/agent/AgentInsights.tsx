import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, TrendingUp, TrendingDown, Target, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface AgentInsightsProps {
  agentData: {
    name: string;
    calls: number;
    applications: number;
    closeRate: number;
  };
}

const AgentInsights = ({ agentData }: AgentInsightsProps) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock yesterday's performance data
  const yesterdayData = {
    calls: 12,
    applications: 3,
    closeRate: 25,
    avgCallDuration: "18:30",
    topDeclineReasons: ["Price concerns", "Need to think about it", "Not interested"],
    bestPerformingHour: "2-3 PM",
    mostSuccessfulScript: "Life insurance opening",
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Call Supabase Edge Function for AI insights
      const response = await fetch('/api/supabase/functions/v1/generate-agent-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentData,
          yesterdayData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const aiInsights = await response.json();
      setInsights(aiInsights);
      toast.success("AI insights generated successfully");
    } catch (error) {
      // Fallback to mock insights if API fails
      console.error("Error generating insights:", error);
      toast.error("Using cached insights - AI service temporarily unavailable");
      
      const mockInsights = {
        summary: "Yesterday was a solid day with 12 calls and a 25% close rate. Your performance was strongest in the afternoon.",
        strengths: [
          "Excellent call volume - 12 calls exceeded your daily target",
          "Strong afternoon performance with 3 applications between 2-3 PM",
          "Life insurance script showed 40% higher conversion rate"
        ],
        improvements: [
          "Address price concerns more proactively - this was the top objection",
          "Develop better follow-up strategy for 'need to think' responses",
          "Focus morning calls on warming up leads rather than cold outreach"
        ],
        recommendations: [
          "Start today with 2-3 warm follow-up calls to build confidence",
          "Use the successful life insurance script for auto insurance prospects",
          "Schedule most important calls between 2-4 PM when you perform best",
          "Prepare price justification examples before going online"
        ],
        sentiment: "positive",
        confidenceScore: 85
      };
      
      setInsights(mockInsights);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-generate insights on component mount
    generateInsights();
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <TrendingUp className="w-4 h-4" />;
      case "negative": return <TrendingDown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Yesterday's Stats Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Yesterday's Performance</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {new Date(Date.now() - 86400000).toLocaleDateString()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{yesterdayData.calls}</div>
              <div className="text-sm text-gray-500">Calls Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{yesterdayData.applications}</div>
              <div className="text-sm text-gray-500">Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{yesterdayData.closeRate}%</div>
              <div className="text-sm text-gray-500">Close Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{yesterdayData.avgCallDuration}</div>
              <div className="text-sm text-gray-500">Avg Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>AI Insights - Yesterday's Recap</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateInsights}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-gray-500">Analyzing your performance...</p>
              </div>
            </div>
          ) : insights ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className={`${getSentimentColor(insights.sentiment)} mt-1`}>
                  {getSentimentIcon(insights.sentiment)}
                </div>
                <div>
                  <h4 className="font-medium mb-1">Performance Summary</h4>
                  <p className="text-gray-700">{insights.summary}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: {insights.confidenceScore}%
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  What You Did Well
                </h4>
                <ul className="space-y-2">
                  {insights.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div>
                <h4 className="font-medium text-orange-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {insights.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Today's Action Plan
                </h4>
                <ul className="space-y-2">
                  {insights.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Click refresh to generate AI insights</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Performance Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">Best Performing Time</h5>
              <p className="text-blue-600 font-semibold">{yesterdayData.bestPerformingHour}</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Most Successful Script</h5>
              <p className="text-green-600 font-semibold">{yesterdayData.mostSuccessfulScript}</p>
            </div>
            <div className="md:col-span-2">
              <h5 className="font-medium mb-2">Top Decline Reasons</h5>
              <div className="flex flex-wrap gap-2">
                {yesterdayData.topDeclineReasons.map((reason, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentInsights;