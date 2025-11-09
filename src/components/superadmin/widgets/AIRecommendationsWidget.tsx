import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, RefreshCw, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Trash2, X } from "lucide-react";
import { toast } from "sonner";

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
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockRecommendations: AIRecommendation[] = [
      {
        id: "1",
        title: "Optimize Agency Credit Limits",
        description: "3 agencies approaching credit limits.",
        priority: "high",
        category: "Finance",
        impact: "Prevent service disruption",
        actionRequired: true
      },
      {
        id: "2",
        title: "Review Compliance Policies",
        description: "2 new regulatory requirements detected.",
        priority: "high",
        category: "Compliance",
        impact: "Maintain certification",
        actionRequired: true
      },
      {
        id: "3",
        title: "Scale Infrastructure",
        description: "System capacity at 87%.",
        priority: "medium",
        category: "Operations",
        impact: "Ensure performance",
        actionRequired: false
      }
    ];

    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    toast.success("Recommendation dismissed");
  };

  const handleClick = (rec: AIRecommendation) => {
    setSelectedRecommendation(rec);
    setShowDetailDialog(true);
  };

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

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          AI Recommendations
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateRecommendations}
          disabled={loading}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-1" />
            <p className="text-xs">Analyzing...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <Sparkles className="h-5 w-5 mx-auto mb-1 opacity-50" />
            <p className="text-xs">No recommendations</p>
          </div>
        ) : (
          recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => handleClick(rec)}
              className="p-2 border rounded hover:shadow-sm transition-shadow cursor-pointer group relative"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDelete(rec.id, e)}
                className="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="flex items-start justify-between gap-2 pr-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-medium text-xs truncate">{rec.title}</h4>
                    {rec.actionRequired && (
                      <Badge variant="outline" className="text-[10px] px-1 py-0 bg-red-50 text-red-700 border-red-200 shrink-0">
                        Action
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-1.5 line-clamp-2">{rec.description}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" className={`text-[10px] px-1 py-0 ${getPriorityColor(rec.priority)}`}>
                      <span className="mr-0.5">{getPriorityIcon(rec.priority)}</span>
                      {rec.priority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                      {rec.category}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </div>
            </div>
          ))
        )}
      </CardContent>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRecommendation && getPriorityIcon(selectedRecommendation.priority)}
              {selectedRecommendation?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedRecommendation?.category} • {selectedRecommendation?.impact}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Details</h4>
              <p className="text-sm text-muted-foreground">{selectedRecommendation?.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Recommended Actions</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Review the affected agencies/systems</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Prepare implementation plan</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Monitor metrics post-implementation</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Badge variant="outline" className={getPriorityColor(selectedRecommendation?.priority || "low")}>
                {selectedRecommendation?.priority} priority
              </Badge>
              {selectedRecommendation?.actionRequired && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Action Required
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">Take Action</Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedRecommendation) handleDelete(selectedRecommendation.id, {} as React.MouseEvent);
                  setShowDetailDialog(false);
                }}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AIRecommendationsWidget;
