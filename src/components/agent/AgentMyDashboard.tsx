import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
  Star, Zap, Trophy, Flame, Brain, PhoneIncoming, PhoneOutgoing,
  PhoneMissed, ChevronRight, MessageSquare, Eye, FileText, Play,
  AlertTriangle, CheckCircle2, Users
} from "lucide-react";

const copilotMessages = [
  { emoji: "⚡", text: "3 leads need follow-up before today ends" },
  { emoji: "📈", text: "You're pacing +18% above yesterday" },
  { emoji: "⚠️", text: "2 missed revenue opportunities detected" },
];

const smartActions = [
  {
    color: "#E24B4A",
    colorLight: "#FCEBEB",
    type: "Callback",
    name: "Michael Hayden",
    detail: "Quoted $5,000 · follow-up window closes today",
    buttons: [
      { label: "Call Now", primary: true, icon: Phone },
      { label: "Send SMS", primary: false },
    ],
  },
  {
    color: "#EF9F27",
    colorLight: "#FAEEDA",
    type: "Verify data",
    name: "Sandra Okonkwo",
    detail: "Underwriting will reject without correction",
    buttons: [
      { label: "Send SMS", primary: false },
      { label: "View Contact", primary: false },
    ],
  },
  {
    color: "#1D9E75",
    colorLight: "#E1F5EE",
    type: "New inbound call",
    name: "Unknown Caller",
    detail: "Est. $22/mo · Final expense",
    buttons: [{ label: "Take Call", primary: true, fullWidth: true, pulse: true, icon: Phone }],
    pulse: true,
  },
  {
    color: "#378ADD",
    colorLight: "#E6F1FB",
    type: "Review low score",
    name: "James Rutherford",
    detail: "Score 44 · close not attempted",
    buttons: [
      { label: "Review AI Summary", primary: false },
      { label: "Call Back", primary: true, icon: Phone },
    ],
  },
  {
    color: "#7F77DD",
    colorLight: "#EEEDFE",
    type: "Application ready",
    name: "Priya Nambiar",
    detail: "6 of 8 fields pre-filled by AI",
    buttons: [
      { label: "Start Draft", primary: true, icon: FileText },
      { label: "View Contact", primary: false },
    ],
  },
];

const recentCalls = [
  { dir: "in", name: "Linda Castellano", score: 82, duration: "12:34", insight: "Strong rapport, good objection handling", scoreColor: "#1D9E75" },
  { dir: "out", name: "Michael Hayden", score: 44, duration: "3:21", insight: "Price discussed too early", scoreColor: "#E24B4A" },
  { dir: "in", name: "Priya Nambiar", score: 91, duration: "18:02", insight: "Excellent close technique", scoreColor: "#1D9E75" },
  { dir: "missed", name: "Unknown", score: 0, duration: "0:00", insight: "Missed — no voicemail", scoreColor: "#6b6b67" },
  { dir: "out", name: "James Rutherford", score: 55, duration: "6:45", insight: "Needs follow-up on objections", scoreColor: "#EF9F27" },
];

const AgentMyDashboard = () => {
  const [copilotIndex, setCopilotIndex] = useState(0);
  const [copilotFade, setCopilotFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopilotFade(false);
      setTimeout(() => {
        setCopilotIndex((prev) => (prev + 1) % copilotMessages.length);
        setCopilotFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMsg = copilotMessages[copilotIndex];

  return (
    <div className="h-full overflow-auto p-6 space-y-5" style={{ background: "#f5f4f1", fontFamily: "'DM Sans', sans-serif" }}>
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "#1a1a18" }}>Command Center</h1>
          <p className="text-sm" style={{ color: "#6b6b67" }}>Good morning, Benjamin — you're pacing +18% above yesterday.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#E1F5EE", color: "#1D9E75" }}>
              <DollarSign className="w-3 h-3" /> $2,140 today
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#f0f0ee", color: "#1a1a18" }}>
              <Phone className="w-3 h-3" /> 14 calls
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#f0f0ee", color: "#1a1a18" }}>
              <TrendingUp className="w-3 h-3" /> 28% close
            </span>
          </div>
          <span className="text-xs font-medium" style={{ color: "#6b6b67" }}>Wed, Apr 16</span>
        </div>
      </div>

      {/* AI COPILOT STRIP */}
      <div className="rounded-xl px-5 py-3.5 flex items-center gap-3" style={{ background: "#EEEDFE", border: "1px solid rgba(127,119,221,0.15)" }}>
        <Brain className="w-5 h-5 shrink-0" style={{ color: "#7F77DD" }} />
        <span
          className="text-sm font-medium transition-opacity duration-300"
          style={{ color: "#5B52C4", opacity: copilotFade ? 1 : 0 }}
        >
          {currentMsg.emoji} {currentMsg.text}
        </span>
      </div>

      {/* ROW 1: Smart Actions | Performance | Streak + Leaderboard */}
      <div className="grid grid-cols-12 gap-5">
        {/* SMART ACTIONS */}
        <div className="col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: "#7F77DD" }} />
              <span className="text-sm font-semibold" style={{ color: "#1a1a18" }}>Smart Actions</span>
              <Badge className="text-[10px] px-2 py-0 border-0 font-semibold" style={{ background: "#EEEDFE", color: "#7F77DD" }}>5 pending</Badge>
            </div>
            <button className="text-xs font-medium flex items-center gap-0.5" style={{ color: "#7F77DD" }}>
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {smartActions.map((action, i) => (
              <div
                key={i}
                className="rounded-xl p-3.5 flex gap-3 transition-all hover:shadow-md"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderLeft: `3px solid ${action.color}`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: action.color }}>{action.type}</span>
                    {action.pulse && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: action.color }} /><span className="relative inline-flex rounded-full h-2 w-2" style={{ background: action.color }} /></span>}
                  </div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "#1a1a18" }}>{action.name}</div>
                  <div className="text-xs mb-2.5" style={{ color: "#6b6b67" }}>{action.detail}</div>
                  <div className="flex items-center gap-2">
                    {action.buttons.map((btn, bi) => (
                      <button
                        key={bi}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          btn.primary
                            ? "text-white shadow-sm hover:opacity-90"
                            : "hover:opacity-80"
                        } ${(btn as any).fullWidth ? "flex-1 justify-center" : ""} ${(btn as any).pulse ? "animate-pulse" : ""}`}
                        style={
                          btn.primary
                            ? { background: action.color }
                            : { background: action.colorLight, color: action.color }
                        }
                      >
                        {btn.icon && <btn.icon className="w-3 h-3" />}
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S PERFORMANCE */}
        <div className="col-span-4">
          <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#1a1a18" }}>Today's Performance</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { label: "Revenue", value: "$2,140", change: "+18%", up: true, color: "#1D9E75", bg: "#E1F5EE" },
                { label: "Applications", value: "3", change: "+2", up: true, color: "#7F77DD", bg: "#EEEDFE" },
                { label: "Calls", value: "14", change: "", up: true, color: "#378ADD", bg: "#E6F1FB" },
                { label: "Close Rate", value: "28%", change: "+3%", up: true, color: "#1D9E75", bg: "#E1F5EE" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg p-3" style={{ background: s.bg }}>
                  <div className="text-[10px] font-medium mb-1" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-xl font-bold" style={{ color: "#1a1a18" }}>{s.value}</div>
                  {s.change && (
                    <div className="flex items-center gap-0.5 text-[10px] font-semibold mt-0.5" style={{ color: s.color }}>
                      <ArrowUpRight className="w-3 h-3" /> {s.change}
                    </div>
                  )}
                </div>
              ))}
              <div className="col-span-2 rounded-lg p-3" style={{ background: "#FAEEDA" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10px] font-medium" style={{ color: "#EF9F27" }}>Avg Score</div>
                  <div className="flex items-center gap-0.5 text-[10px] font-semibold" style={{ color: "#E24B4A" }}>
                    <ArrowDownRight className="w-3 h-3" /> -3
                  </div>
                </div>
                <div className="text-xl font-bold" style={{ color: "#1a1a18" }}>77</div>
              </div>
            </div>

            {/* DAILY GOAL */}
            <div className="rounded-lg p-3" style={{ background: "#f5f4f1" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold" style={{ color: "#1a1a18" }}>Daily Goal</span>
                <span className="text-xs font-bold" style={{ color: "#1D9E75" }}>$2,140 / $3,000</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E1F5EE" }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: "71%", background: "#1D9E75" }} />
              </div>
              <div className="text-[10px] font-medium mt-1" style={{ color: "#6b6b67" }}>$860 to go — you've got this 💪</div>
            </div>
          </div>
        </div>

        {/* STREAK + LEADERBOARD */}
        <div className="col-span-3 space-y-4">
          {/* STREAK */}
          <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span className="text-sm font-semibold" style={{ color: "#1a1a18" }}>3-Day Streak</span>
            </div>
            <div className="text-xs" style={{ color: "#6b6b67" }}>You've beaten your daily goal 3 days in a row.</div>
            <div className="mt-2 text-xs font-semibold rounded-lg px-3 py-2 text-center" style={{ background: "#FAEEDA", color: "#EF9F27" }}>
              Hit $3,000 today to extend 🔥
            </div>
          </div>

          {/* LEADERBOARD */}
          <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span className="text-sm font-semibold" style={{ color: "#1a1a18" }}>Leaderboard</span>
            </div>
            <div className="space-y-2">
              {[
                { rank: 1, name: "Carla M.", amount: "$3,420", highlight: false },
                { rank: 2, name: "You", amount: "$2,140", highlight: true },
                { rank: 3, name: "Marcus D.", amount: "$1,980", highlight: false },
              ].map((p) => (
                <div
                  key={p.rank}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{
                    background: p.highlight ? "#E1F5EE" : "#f5f4f1",
                    border: p.highlight ? "1px solid rgba(29,158,117,0.2)" : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold w-4" style={{ color: p.rank === 1 ? "#EF9F27" : "#6b6b67" }}>#{p.rank}</span>
                    <span className="text-xs font-semibold" style={{ color: p.highlight ? "#1D9E75" : "#1a1a18" }}>{p.name}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: "#1a1a18" }}>{p.amount}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-[10px] font-semibold rounded-md py-1.5" style={{ background: "#FAEEDA", color: "#EF9F27" }}>
              +$160 to pass Marcus 🏃
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: AI Copilot Coach | Recent Calls */}
      <div className="grid grid-cols-12 gap-5">
        {/* AI COPILOT COACH */}
        <div className="col-span-6">
          <div className="rounded-xl p-4" style={{ background: "#E6F1FB", border: "1px solid rgba(55,138,221,0.15)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4" style={{ color: "#378ADD" }} />
              <span className="text-sm font-semibold" style={{ color: "#1a1a18" }}>CallX Copilot — Coaching</span>
            </div>
            <div className="rounded-lg p-3.5 mb-3" style={{ background: "#ffffff" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "#378ADD" }}>Insight</div>
              <div className="text-sm font-medium mb-2" style={{ color: "#1a1a18" }}>You're discussing price too early — costing you closes.</div>
              <div className="text-xs font-semibold mb-1" style={{ color: "#1D9E75" }}>Suggestion</div>
              <div className="text-xs" style={{ color: "#6b6b67" }}>Delay pricing until emotional commitment is established. Build value and urgency first.</div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold" style={{ color: "#378ADD" }}>Coaching Score</span>
                  <span className="text-xs font-bold" style={{ color: "#1a1a18" }}>55 / 70+</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(55,138,221,0.2)" }}>
                  <div className="h-full rounded-full" style={{ width: "55%", background: "#378ADD" }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "#378ADD" }}>
                <Play className="w-3 h-3" /> Watch Example
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#ffffff", color: "#378ADD" }}>
                <CheckCircle2 className="w-3 h-3" /> Apply to Next Call
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: "#FAEEDA", color: "#EF9F27" }}>
                Talk ratio 62%
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: "#FCEBEB", color: "#E24B4A" }}>
                7 interruptions
              </span>
            </div>
          </div>
        </div>

        {/* RECENT CALLS */}
        <div className="col-span-6">
          <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#1a1a18" }}>Recent Calls</h3>
            <div className="space-y-1">
              {recentCalls.map((call, i) => {
                const DirIcon = call.dir === "in" ? PhoneIncoming : call.dir === "out" ? PhoneOutgoing : PhoneMissed;
                const dirColor = call.dir === "in" ? "#1D9E75" : call.dir === "out" ? "#378ADD" : "#E24B4A";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors"
                    style={{ background: i % 2 === 0 ? "#f5f4f1" : "transparent" }}
                  >
                    <DirIcon className="w-4 h-4 shrink-0" style={{ color: dirColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold" style={{ color: "#1a1a18" }}>{call.name}</div>
                      <div className="text-[10px] truncate" style={{ color: "#6b6b67" }}>{call.insight}</div>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: "#6b6b67" }}>{call.duration}</span>
                    {call.score > 0 && (
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold text-white"
                        style={{ background: call.scoreColor }}
                      >
                        {call.score}
                      </span>
                    )}
                    <button className="text-[10px] font-semibold px-2 py-1 rounded-md" style={{ background: "#f5f4f1", color: "#7F77DD" }}>
                      Review
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: PIPELINE SNAPSHOT */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Hot", count: 4, value: "$18,200", color: "#E24B4A", bg: "#FCEBEB", btnLabel: "Work Hot Leads", icon: Flame },
          { label: "Warm", count: 11, value: "$43,500", color: "#EF9F27", bg: "#FAEEDA", btnLabel: "View Warm Leads", icon: Users },
          { label: "At Risk", count: 3, value: "$12,000", color: "#378ADD", bg: "#E6F1FB", btnLabel: "Rescue Leads", icon: AlertTriangle },
        ].map((pipe) => (
          <div key={pipe.label} className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <pipe.icon className="w-4 h-4" style={{ color: pipe.color }} />
              <span className="text-sm font-semibold" style={{ color: "#1a1a18" }}>{pipe.label}</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>
                <div className="text-2xl font-bold" style={{ color: "#1a1a18" }}>{pipe.count}</div>
                <div className="text-[10px]" style={{ color: "#6b6b67" }}>leads</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: pipe.color }}>{pipe.value}</div>
                <div className="text-[10px]" style={{ color: "#6b6b67" }}>est. value</div>
              </div>
            </div>
            <button
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: pipe.bg, color: pipe.color }}
            >
              {pipe.btnLabel} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentMyDashboard;
