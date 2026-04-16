import React, { useState, useEffect, useRef } from "react";
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
  CheckCircle,
  PhoneOff,
  PhoneMissed,
  UserX,
  CalendarClock,
  AlertTriangle,
  DollarSign,
  XCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCallScreenProps {
  onTakeNextCall?: () => void;
  onReviewBreakdown?: () => void;
  onViewTrends?: () => void;
  onClose?: () => void;
}

type Phase = "analyzing" | "disposition" | "actions";

const statusMessages = [
  "Transcribing conversation…",
  "Detecting buying signals…",
  "Scoring call quality…",
  "Generating follow-ups…",
];

const feedItems = [
  // Call analysis insights
  { icon: <CheckCircle className="w-4 h-4" />, text: "Strong rapport built in first 30 seconds", color: "text-green-600", bg: "bg-green-50", category: "insight" },
  { icon: <DollarSign className="w-4 h-4" />, text: "High intent signal detected — customer asked about pricing twice", color: "text-amber-600", bg: "bg-amber-50", category: "insight" },
  { icon: <AlertTriangle className="w-4 h-4" />, text: "Missed affordability check — customer mentioned budget concerns at 2:14", color: "text-orange-500", bg: "bg-orange-50", category: "insight" },
  // Coaching tips
  { icon: <Sparkles className="w-4 h-4" />, text: "Tip: When a customer mentions budget, pivot to value — not discounts", color: "text-purple-600", bg: "bg-purple-50", category: "coaching" },
  { icon: <Brain className="w-4 h-4" />, text: "Objection detected — price concern raised but not fully addressed", color: "text-blue-600", bg: "bg-blue-50", category: "insight" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Try: \"What would make this feel like the right investment for you?\"", color: "text-purple-600", bg: "bg-purple-50", category: "coaching" },
  // More analysis
  { icon: <Clock className="w-4 h-4" />, text: "Talk-to-listen ratio: 62/38 — aim for 50/50 or less talking", color: "text-blue-600", bg: "bg-blue-50", category: "insight" },
  { icon: <XCircle className="w-4 h-4" />, text: "Draft date not confirmed — customer was ready but wasn't asked", color: "text-red-500", bg: "bg-red-50", category: "insight" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Next call: Ask \"When would you like coverage to start?\" before the 3-min mark", color: "text-purple-600", bg: "bg-purple-50", category: "coaching" },
  // Sentiment & scoring
  { icon: <CheckCircle className="w-4 h-4" />, text: "Customer sentiment: Positive overall — ended on a good note", color: "text-green-600", bg: "bg-green-50", category: "insight" },
  { icon: <AlertTriangle className="w-4 h-4" />, text: "No urgency language used — try time-bound phrases like \"rates lock Friday\"", color: "text-orange-500", bg: "bg-orange-50", category: "coaching" },
  { icon: <BarChart3 className="w-4 h-4" />, text: "Preliminary call score: 72/100 — above your weekly average of 68", color: "text-blue-600", bg: "bg-blue-50", category: "insight" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Top agents on this campaign close 23% more by confirming next steps before hang-up", color: "text-purple-600", bg: "bg-purple-50", category: "coaching" },
  { icon: <CheckCircle className="w-4 h-4" />, text: "Compliance check passed — all required disclosures were made", color: "text-green-600", bg: "bg-green-50", category: "insight" },
];

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
  const [statusIndex, setStatusIndex] = useState(0);
  const [visibleFeedItems, setVisibleFeedItems] = useState<number[]>([]);
  const [selectedDisposition, setSelectedDisposition] = useState<string | null>(null);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [suggestedDisposition] = useState("callback");
  const feedEndRef = useRef<HTMLDivElement>(null);

  const ANALYSIS_DURATION = 60; // seconds

  // Progress bar — fills over 60 seconds
  useEffect(() => {
    if (phase !== "analyzing") return;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const pct = Math.min((elapsed / ANALYSIS_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  // Rotate status text every 4s
  useEffect(() => {
    if (phase !== "analyzing") return;
    const interval = setInterval(() => {
      setStatusIndex((i) => (i + 1) % statusMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phase]);

  // Feed items spaced evenly across 60s
  useEffect(() => {
    if (phase !== "analyzing") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const interval = (ANALYSIS_DURATION * 1000) / (feedItems.length + 1);
    feedItems.forEach((_, idx) => {
      timers.push(setTimeout(() => {
        setVisibleFeedItems((prev) => [...prev, idx]);
      }, interval * (idx + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Auto-scroll feed
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleFeedItems]);

  // Transition to disposition after all feed items + progress done
  useEffect(() => {
    if (phase === "analyzing" && progress >= 100 && visibleFeedItems.length === feedItems.length) {
      const timer = setTimeout(() => setPhase("disposition"), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, visibleFeedItems, phase]);

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
        className="absolute top-3 right-4 z-20 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Sticky AI Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="px-6 py-3 flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {phase === "analyzing" && "CallX Copilot is analyzing your call…"}
            {phase === "disposition" && "Your recording has been processed"}
            {phase === "actions" && "Recommended next steps"}
          </span>
          {phase === "analyzing" && (
            <div className="ml-auto text-xs text-muted-foreground animate-fade-in" key={statusIndex}>
              {statusMessages[statusIndex]}
            </div>
          )}
          {phase === "disposition" && (
            <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          )}
          {phase === "actions" && (
            <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              {dispositions.find(d => d.id === selectedDisposition)?.label}
            </Badge>
          )}
        </div>
        {phase === "analyzing" && (
          <Progress value={Math.min(progress, 100)} className="h-0.5 rounded-none" />
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto px-6 py-6">

        {/* Phase 1: Live AI Feed */}
        {phase === "analyzing" && (
          <div className="max-w-lg mx-auto">
            <div className="space-y-2">
              {visibleFeedItems.map((idx) => {
                const item = feedItems[idx];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card animate-fade-in"
                  >
                    <div className={cn("p-1.5 rounded-md", item.bg, item.color)}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                );
              })}
              <div ref={feedEndRef} />
            </div>
            {visibleFeedItems.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">Listening to your call…</p>
              </div>
            )}
          </div>
        )}

        {/* Phase 2: Disposition */}
        {phase === "disposition" && (
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-3">
                <CheckCircle className="w-3 h-3" />
                Recording processed
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Is this the correct disposition?
              </h2>
              <p className="text-sm text-muted-foreground">
                Based on AI analysis, we suggest:
              </p>
            </div>

            {!showOtherOptions && (
              <div className="space-y-4 animate-fade-in">
                <div className={cn(
                  "flex items-center gap-4 p-5 rounded-xl border-2 transition-all",
                  dispositions.find(d => d.id === suggestedDisposition)?.selectedColor
                )}>
                  <div className="p-2.5 rounded-lg bg-white/80">
                    {dispositions.find(d => d.id === suggestedDisposition)?.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-base font-semibold text-foreground">
                      {dispositions.find(d => d.id === suggestedDisposition)?.label}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">Customer showed interest but didn't commit</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-0 text-[10px]">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Pick
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10"
                    onClick={() => handleDispositionSelect(suggestedDisposition)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-10"
                    onClick={() => setShowOtherOptions(true)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}

            {showOtherOptions && (
              <div className="space-y-2 animate-fade-in">
                {dispositions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleDispositionSelect(d.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left",
                      selectedDisposition === d.id ? d.selectedColor : d.color,
                    )}
                  >
                    {d.icon}
                    <span className="text-sm font-medium">{d.label}</span>
                    {d.id === suggestedDisposition && (
                      <Badge className="ml-auto bg-amber-100 text-amber-700 border-0 text-[10px]">Suggested</Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Actions */}
        {phase === "actions" && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-6">
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

            {/* Review Call Score link */}
            <div className="mt-5 flex items-center justify-center">
              <button className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-colors">
                <BarChart3 className="w-4 h-4" />
                Review your full call score
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Coaching tip */}
            <div className="mt-4">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Tip:</span> You didn't ask for commitment — try closing earlier next call.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {phase === "actions" && (
        <div className="border-t bg-background px-6 py-4">
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
