import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  MessageSquare,
  Mail,
  Calendar,
  Phone,
  Clock,
  Sparkles,
  X,
  Send,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCallScreenProps {
  onTakeNextCall?: () => void;
  onReviewBreakdown?: () => void;
  onViewTrends?: () => void;
  onClose?: () => void;
}

const rotatingMessages = [
  "Analyzing your call…",
  "Detecting buying signals…",
  "Generating follow-up actions…",
];

const PostCallScreen = ({ onTakeNextCall, onClose }: PostCallScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2.5;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % rotatingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 30) setShowActions(true);
  }, [progress]);

  const actions = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Send Follow-Up Text",
      description: "\"Thanks for your time! Here's the plan we discussed…\"",
      impact: "+18% close rate",
      urgency: "Best within 2 min",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
      iconBg: "bg-blue-100 text-blue-600",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      buttonLabel: "Send Now",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Send Email Summary",
      description: "Personalized pricing breakdown with next steps",
      impact: "+12% re-engagement",
      urgency: null,
      color: "bg-purple-50 border-purple-200 hover:border-purple-400",
      iconBg: "bg-purple-100 text-purple-600",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
      buttonLabel: "Send Email",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Schedule Callback",
      description: "Customer showed interest — book a follow-up",
      impact: "+22% conversion",
      urgency: null,
      color: "bg-green-50 border-green-200 hover:border-green-400",
      iconBg: "bg-green-100 text-green-600",
      buttonClass: "bg-green-600 hover:bg-green-700",
      buttonLabel: "Pick Time",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
      >
        <X className="w-4 h-4" />
      </button>

      {/* AI Progress Header */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {progress >= 100 ? "Analysis complete" : rotatingMessages[messageIndex]}
          </span>
          {progress < 100 && (
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
        <Progress value={Math.min(progress, 100)} className="h-1" />
      </div>

      {/* Main Content — Centered & Clean */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-6 overflow-auto">
        {/* AI Verdict */}
        <div className="text-center mb-8 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Follow-Up Needed
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            This lead can still convert
          </h2>
          <p className="text-sm text-muted-foreground">
            Customer asked about pricing but no close was attempted. Take action now to recover this opportunity.
          </p>
        </div>

        {/* Action Cards */}
        <div
          className={cn(
            "w-full max-w-2xl space-y-3 transition-all duration-500",
            showActions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Recommended Actions
          </p>

          {actions.map((action, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                action.color
              )}
            >
              <div className={cn("p-2.5 rounded-lg shrink-0", action.iconBg)}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground">{action.label}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-green-100 text-green-700 border-0">
                    {action.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                {action.urgency && (
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-600">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{action.urgency}</span>
                  </div>
                )}
              </div>
              <Button size="sm" className={cn("h-8 text-xs shrink-0 text-white", action.buttonClass)}>
                <Send className="w-3 h-3 mr-1" />
                {action.buttonLabel}
              </Button>
            </div>
          ))}
        </div>

        {/* Quick coaching nudge */}
        <div className="mt-6 max-w-2xl w-full">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50">
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Tip:</span> You didn't ask for commitment — try closing earlier next call.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t bg-background px-8 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <span className="text-xs text-muted-foreground italic">Don't lose momentum</span>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 px-6" onClick={onTakeNextCall}>
            <Phone className="w-4 h-4" />
            Take Next Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCallScreen;
