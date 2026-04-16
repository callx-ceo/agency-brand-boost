import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  DollarSign,
  AlertTriangle,
  XCircle,
  CheckCircle,
  MessageSquare,
  Mail,
  Calendar,
  Target,
  Phone,
  TrendingUp,
  Clock,
  
  Sparkles,
  Shield,
  Heart,
  BarChart3,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCallScreenProps {
  onTakeNextCall?: () => void;
  onReviewBreakdown?: () => void;
  onViewTrends?: () => void;
  onClose?: () => void;
}

interface AIInsight {
  id: number;
  icon: React.ReactNode;
  text: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  color: string;
  visible: boolean;
}

const rotatingMessages = [
  "Analyzing missed revenue opportunities…",
  "Detecting buying signals…",
  "Generating follow-up actions…",
  "This call may still convert…",
];

const PostCallScreen = ({ onTakeNextCall, onReviewBreakdown, onViewTrends }: PostCallScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [visibleInsights, setVisibleInsights] = useState(0);
  const [scores, setScores] = useState({ call: 0, closing: 0, compliance: 0, rapport: 0 });
  const [revenueValue, setRevenueValue] = useState(0);
  const [actionsVisible, setActionsVisible] = useState(false);

  const insights: AIInsight[] = [
    { id: 1, icon: <DollarSign className="w-4 h-4" />, text: "Customer asked about monthly price", impact: "HIGH", color: "text-green-600 bg-green-50", visible: true },
    { id: 2, icon: <XCircle className="w-4 h-4" />, text: "No close attempt detected", impact: "HIGH", color: "text-red-600 bg-red-50", visible: true },
    { id: 3, icon: <AlertTriangle className="w-4 h-4" />, text: "Affordability not confirmed", impact: "MEDIUM", color: "text-amber-600 bg-amber-50", visible: true },
    { id: 4, icon: <Brain className="w-4 h-4" />, text: "Objection detected — \"I need to think about it\"", impact: "MEDIUM", color: "text-amber-600 bg-amber-50", visible: true },
    { id: 5, icon: <CheckCircle className="w-4 h-4" />, text: "Strong rapport built with customer", impact: "LOW", color: "text-blue-600 bg-blue-50", visible: true },
    { id: 6, icon: <DollarSign className="w-4 h-4" />, text: "Interest in premium tier pricing", impact: "HIGH", color: "text-green-600 bg-green-50", visible: true },
  ];

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.67;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotating messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % rotatingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Stream insights
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleInsights((v) => {
        if (v >= insights.length) { clearInterval(interval); return v; }
        return v + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Animate scores
  useEffect(() => {
    const targets = { call: 72, closing: 65, compliance: 94, rapport: 88 };
    const interval = setInterval(() => {
      setScores((s) => ({
        call: Math.min(s.call + 2, targets.call),
        closing: Math.min(s.closing + 2, targets.closing),
        compliance: Math.min(s.compliance + 2, targets.compliance),
        rapport: Math.min(s.rapport + 2, targets.rapport),
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate revenue
  useEffect(() => {
    const target = 420;
    const interval = setInterval(() => {
      setRevenueValue((v) => {
        if (v >= target) { clearInterval(interval); return target; }
        return v + 7;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Show actions near completion
  useEffect(() => {
    if (progress > 60) setActionsVisible(true);
  }, [progress]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 overflow-auto">
      {/* Top Bar — AI + Urgency */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Brain className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-semibold text-sm text-foreground">CallX Copilot is analyzing your call…</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium transition-opacity duration-500">
              {rotatingMessages[messageIndex]}
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-1.5" />
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 min-h-0">
        {/* LEFT — Live AI Feed */}
        <div className="col-span-3 flex flex-col gap-3">
          <Card className="flex-1 shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <CardTitle className="text-sm font-semibold">Live AI Feed</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {insights.slice(0, visibleInsights).map((insight, idx) => (
                <div
                  key={insight.id}
                  className={cn(
                    "flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-300 animate-fade-in",
                    insight.color.split(" ")[1]
                  )}
                >
                  <div className={cn("mt-0.5", insight.color.split(" ")[0])}>
                    {insight.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground leading-snug">{insight.text}</p>
                  </div>
                  <Badge
                    variant={insight.impact === "HIGH" ? "destructive" : insight.impact === "MEDIUM" ? "warning" : "secondary"}
                    className="text-[10px] px-1.5 py-0 shrink-0"
                  >
                    {insight.impact}
                  </Badge>
                </div>
              ))}
              {visibleInsights < insights.length && (
                <div className="flex items-center gap-2 p-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs">Analyzing…</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Micro-Coaching */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Coaching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg">
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-foreground">You did not ask for commitment — fix this next call</p>
              </div>
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-foreground">Strong emotional connection increased engagement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER — Key Moments + Disposition + Recovery */}
        <div className="col-span-5 flex flex-col gap-3">
          {/* Key Moments */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Key Moments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="warning" className="text-[10px]">Objection</Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">@ 1:42</span>
                </div>
                <p className="text-xs text-foreground italic mb-1">"I need to think about it"</p>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-1">
                  <ArrowRight className="w-3 h-3" />
                  <span>Opportunity: Reframe urgency and ask for commitment</span>
                </div>
              </div>
              <div className="p-3 border rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="destructive" className="text-[10px]">Missed Close</Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">@ 3:05</span>
                </div>
                <p className="text-xs text-foreground italic mb-1">"That sounds interesting, let me…"</p>
                <div className="flex items-center gap-1.5 text-[11px] text-red-700 bg-red-50 rounded px-2 py-1">
                  <ArrowRight className="w-3 h-3" />
                  <span>Opportunity: Ask for decision before ending call</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Opportunity */}
          <Card className="shadow-sm border-0 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">You can still close this lead</p>
                  <p className="text-xs text-muted-foreground">Take action now to increase your chance of closing this sale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disposition */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Disposition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Suggested Outcome</p>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                    FOLLOW-UP NEEDED
                  </Badge>
                  <p className="text-[11px] text-muted-foreground mt-1.5">If no action is taken, this lead may be lost</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-8">Change</Button>
                  <Button size="sm" className="text-xs h-8 bg-green-600 hover:bg-green-700">Accept</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* One-Click Actions */}
          <Card className={cn("shadow-sm border-0 bg-white transition-all duration-500", actionsVisible ? "opacity-100" : "opacity-0")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                One-Click Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {/* Send Follow-Up Text */}
              <div className="p-3 border rounded-lg hover:shadow-md transition-shadow bg-white group cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold">Send Follow-Up Text</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
                  "Hi, thanks for your time today! I wanted to follow up on the plan we discussed…"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-green-600">+18% chance to close</span>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Best within 2 min</span>
                    </div>
                  </div>
                  <Button size="sm" className="h-7 text-[11px] bg-blue-600 hover:bg-blue-700">Send Now</Button>
                </div>
              </div>

              {/* Send Email */}
              <div className="p-3 border rounded-lg hover:shadow-md transition-shadow bg-white group cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-purple-100 rounded-md">
                    <Mail className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold">Send Email</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
                  Personalized follow-up email with pricing breakdown and next steps
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-green-600">+12% re-engagement</span>
                  <Button size="sm" className="h-7 text-[11px] bg-purple-600 hover:bg-purple-700">Send Email</Button>
                </div>
              </div>

              {/* Schedule Callback */}
              <div className="p-3 border rounded-lg hover:shadow-md transition-shadow bg-white group cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold">Schedule Callback</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
                  Customer showed interest in pricing — schedule a follow-up
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-green-600">+22% conversion</span>
                  <Button size="sm" className="h-7 text-[11px] bg-green-600 hover:bg-green-700">Pick Time</Button>
                </div>
              </div>

              {/* Retry Close Strategy */}
              <div className="p-3 border rounded-lg hover:shadow-md transition-shadow bg-white group cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-amber-100 rounded-md">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold">Retry Close Strategy</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
                  Use urgency framing to reduce hesitation and close
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-green-600">AI-powered script</span>
                  <Button size="sm" className="h-7 text-[11px] bg-amber-600 hover:bg-amber-700">Try Script</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — Score + Revenue */}
        <div className="col-span-4 flex flex-col gap-3">
          {/* Call Scores */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                Call Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Call Score", value: scores.call, icon: <Phone className="w-3.5 h-3.5" /> },
                { label: "Closing Probability", value: scores.closing, icon: <Target className="w-3.5 h-3.5" /> },
                { label: "Compliance", value: scores.compliance, icon: <Shield className="w-3.5 h-3.5" /> },
                { label: "Rapport", value: scores.rapport, icon: <Heart className="w-3.5 h-3.5" /> },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">{metric.icon}</span>
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <span className={cn("text-sm font-bold", getScoreColor(metric.value))}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue Potential */}
          <Card className="shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1 font-medium">Revenue Potential</p>
              <p className="text-4xl font-bold text-green-700 tracking-tight transition-all duration-300">
                ${revenueValue}
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-green-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">This call is still recoverable</span>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Signals */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Revenue Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span className="text-xs text-foreground">Customer engaged with pricing details</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span className="text-xs text-foreground">Asked about coverage for spouse</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-xs text-foreground">Price sensitivity detected</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="text-xs text-foreground">No urgency established</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReviewBreakdown}>
              Review Call Breakdown
            </Button>
            <Button variant="outline" size="sm" onClick={onViewTrends}>
              View Performance Trends
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground italic">Don't lose momentum</span>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2 px-6" onClick={onTakeNextCall}>
              <Phone className="w-4 h-4" />
              Take Next Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCallScreen;
