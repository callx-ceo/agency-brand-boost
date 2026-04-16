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
  CheckCircle,
  PhoneOff,
  PhoneMissed,
  UserX,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCallScreenProps {
  onTakeNextCall?: () => void;
  onReviewBreakdown?: () => void;
  onViewTrends?: () => void;
  onClose?: () => void;
}

type Phase = "analyzing" | "disposition" | "actions";

const dispositions = [
  { id: "sale", label: "Sale", icon: <CheckCircle className="w-4 h-4" />, color: "border-green-300 bg-green-50 hover:border-green-500 text-green-700", selectedColor: "border-green-500 bg-green-100 ring-2 ring-green-500/30" },
  { id: "callback", label: "Callback", icon: <CalendarClock className="w-4 h-4" />, color: "border-blue-300 bg-blue-50 hover:border-blue-500 text-blue-700", selectedColor: "border-blue-500 bg-blue-100 ring-2 ring-blue-500/30" },
  { id: "no-answer", label: "No Answer", icon: <PhoneMissed className="w-4 h-4" />, color: "border-amber-300 bg-amber-50 hover:border-amber-500 text-amber-700", selectedColor: "border-amber-500 bg-amber-100 ring-2 ring-amber-500/30" },
  { id: "not-interested", label: "Not Interested", icon: <UserX className="w-4 h-4" />, color: "border-red-300 bg-red-50 hover:border-red-500 text-red-700", selectedColor: "border-red-500 bg-red-100 ring-2 ring-red-500/30" },
  { id: "hung-up", label: "Hung Up", icon: <PhoneOff className="w-4 h-4" />, color: "border-gray-300 bg-gray-50 hover:border-gray-500 text-gray-700", selectedColor: "border-gray-500 bg-gray-100 ring-2 ring-gray-500/30" },
];

const PostCallScreen = ({ onTakeNextCall, onClose }: PostCallScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("analyzing");
  const [selectedDisposition, setSelectedDisposition] = useState<string | null>(null);
  const [suggestedDisposition] = useState("callback");

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Move to disposition phase after brief analysis
  useEffect(() => {
    if (progress >= 40 && phase === "analyzing") {
      setPhase("disposition");
    }
  }, [progress, phase]);

  const handleDispositionSelect = (id: string) => {
    setSelectedDisposition(id);
    setTimeout(() => setPhase("actions"), 400);
  };

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
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Header */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {phase === "analyzing" && "Analyzing your call…"}
            {phase === "disposition" && "How did this call end?"}
            {phase === "actions" && "Here's what you should do next"}
          </span>
          {phase === "analyzing" && (
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
        <Progress value={Math.min(progress, 100)} className="h-1" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-6 overflow-auto">

        {/* Phase 1: Analyzing */}
        {phase === "analyzing" && (
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Processing call audio & transcript…</p>
          </div>
        )}

        {/* Phase 2: Disposition */}
        {phase === "disposition" && (
          <div className="w-full max-w-lg animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3" />
                AI Suggestion: {dispositions.find(d => d.id === suggestedDisposition)?.label}
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Select call disposition
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              {dispositions.slice(0, 3).map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDispositionSelect(d.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    selectedDisposition === d.id ? d.selectedColor : d.color,
                    d.id === suggestedDisposition && !selectedDisposition && "ring-2 ring-amber-400/40"
                  )}
                >
                  {d.icon}
                  <span className="text-xs font-medium">{d.label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dispositions.slice(3).map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDispositionSelect(d.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    selectedDisposition === d.id ? d.selectedColor : d.color,
                  )}
                >
                  {d.icon}
                  <span className="text-xs font-medium">{d.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: Actions */}
        {phase === "actions" && (
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-3">
                <CheckCircle className="w-3 h-3" />
                Disposition saved: {dispositions.find(d => d.id === selectedDisposition)?.label}
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Recommended next steps
              </h2>
              <p className="text-sm text-muted-foreground">
                Take action now to maximize your chance of closing this lead.
              </p>
            </div>

            <div className="space-y-3">
              {actions.map((action, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                    action.color
                  )}
                  style={{ animationDelay: `${idx * 100}ms` }}
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

            {/* Coaching tip */}
            <div className="mt-5">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50">
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Tip:</span> You didn't ask for commitment — try closing earlier next call.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA — only show after disposition */}
      {phase === "actions" && (
        <div className="border-t bg-background px-8 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <span className="text-xs text-muted-foreground italic">Don't lose momentum</span>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 px-6" onClick={onTakeNextCall}>
              <Phone className="w-4 h-4" />
              Take Next Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCallScreen;
