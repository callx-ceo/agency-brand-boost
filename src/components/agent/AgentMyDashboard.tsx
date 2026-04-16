import React, { useState, useEffect } from "react";
import {
  Phone, ArrowUpRight, ArrowDownRight,
  Trophy, Flame, Brain, PhoneIncoming, PhoneOutgoing,
  PhoneMissed, ChevronRight, FileText, Play, Sparkles,
  MessageSquare, Mail, Wand2, Target
} from "lucide-react";
import GoalBuilderModal from "./goals/GoalBuilderModal";
import type { SuccessPlan } from "./goals/GoalBuilderChat";

const copilotMessages = [
  "3 leads need follow-up before today ends",
  "You're pacing +18% above yesterday",
  "2 missed revenue opportunities detected",
];

const getTimeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const getTimeNudge = () => {
  const h = new Date().getHours();
  const remaining = 17 - h;
  if (h < 9) return "Your day starts soon — review your priorities before calls begin.";
  if (remaining > 4) return "Plenty of runway today. Front-load your hot leads while energy is high.";
  if (remaining > 2) return `${remaining} hours left today. Focus on high-value actions to hit your goal.`;
  if (remaining > 0) return "Final stretch — prioritize closeable leads and pending apps.";
  return "Day's wrapping up. Prep tomorrow's top 3 actions before logging off.";
};

const smartActions = [
  {
    priority: "urgent",
    type: "Callback",
    name: "Michael Hayden",
    detail: "Quoted $5,000 · follow-up window closes today",
    primaryBtn: { label: "Call Now", icon: Phone },
  },
  {
    priority: "warning",
    type: "Verify data",
    name: "Sandra Okonkwo",
    detail: "Underwriting will reject without correction",
    primaryBtn: { label: "View Contact" },
  },
  {
    priority: "info",
    type: "Low score",
    name: "James Rutherford",
    detail: "Score 44 · close not attempted",
    primaryBtn: { label: "Call Back", icon: Phone },
  },
  {
    priority: "ready",
    type: "App ready",
    name: "Priya Nambiar",
    detail: "6 of 8 fields pre-filled by AI",
    primaryBtn: { label: "Start Draft", icon: FileText },
  },
];

const recentCalls = [
  { dir: "in" as const, name: "Linda Castellano", score: 82, duration: "12:34", insight: "Strong rapport, good objection handling" },
  { dir: "out" as const, name: "Michael Hayden", score: 44, duration: "3:21", insight: "Price discussed too early" },
  { dir: "in" as const, name: "Priya Nambiar", score: 91, duration: "18:02", insight: "Excellent close technique" },
  { dir: "missed" as const, name: "Unknown", score: 0, duration: "0:00", insight: "Missed — no voicemail left" },
  { dir: "out" as const, name: "James Rutherford", score: 55, duration: "6:45", insight: "Needs follow-up on objections" },
];

const priorityDot: Record<string, string> = {
  urgent: "bg-red-500",
  warning: "bg-amber-500",
  live: "bg-emerald-500 animate-pulse",
  info: "bg-blue-500",
  ready: "bg-violet-500",
};

const scoreColor = (s: number) =>
  s >= 80 ? "text-emerald-600 bg-emerald-50" :
  s >= 60 ? "text-amber-600 bg-amber-50" :
  s > 0 ? "text-red-500 bg-red-50" : "text-muted-foreground bg-muted";

const AgentMyDashboard = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [goalBuilderOpen, setGoalBuilderOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<SuccessPlan | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((p) => (p + 1) % copilotMessages.length);
        setFade(true);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const greeting = getTimeGreeting();
  const timeNudge = getTimeNudge();

  return (
    <div className="h-full overflow-auto bg-[#fafaf9] px-8 py-6">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">Command Center</h1>
          <p className="text-[13px] text-[#8a8a86] mt-0.5">Wed, Apr 16</p>
        </div>
        <div className="flex items-center gap-5 text-[13px] text-[#8a8a86]">
          <span className="font-medium text-[#1a1a1a]">$2,140 <span className="text-[#8a8a86] font-normal">today</span></span>
          <span>14 calls</span>
          <span>28% close</span>
        </div>
      </div>

      {/* AI DAILY BRIEFING */}
      <div className="rounded-xl bg-white border border-[#e8e8e5] px-5 py-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] font-semibold text-[#1a1a1a]">CallX Copilot</span>
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-[13px] text-[#1a1a1a] leading-relaxed">
              {greeting}, Benjamin. You're <span className="text-emerald-600 font-semibold">$860 away</span> from your daily goal. Here's your priority stack:
            </p>
            <ol className="mt-2.5 space-y-1.5 text-[13px] text-[#1a1a1a]">
              <li className="flex items-start gap-2">
                <span className="text-[11px] font-bold text-white bg-red-500 rounded w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span><span className="font-semibold">Call Michael Hayden</span> — quoted $5K, follow-up window closes today</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[11px] font-bold text-white bg-amber-500 rounded w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span><span className="font-semibold">Fix Sandra Okonkwo's data</span> — underwriting will reject without it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[11px] font-bold text-white bg-violet-500 rounded w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span><span className="font-semibold">Submit Priya Nambiar's app</span> — 6 of 8 fields already pre-filled</span>
              </li>
            </ol>
            <p className="text-[12px] text-[#8a8a86] mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {timeNudge}
            </p>
          </div>
        </div>
      </div>

      {/* ROTATING COPILOT NUDGE */}
      <div className="flex items-center gap-2.5 rounded-lg bg-[#f5f3ff] border border-violet-100 px-4 py-2 mb-6">
        <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0" />
        <span className={`text-[12px] text-violet-700 font-medium transition-opacity duration-250 ${fade ? "opacity-100" : "opacity-0"}`}>
          {copilotMessages[msgIndex]}
        </span>
      </div>

      {/* MAIN LAYOUT — 2 columns */}
      <div className="grid grid-cols-5 gap-6">

        {/* LEFT COLUMN — Smart Actions */}
        <div className="col-span-3 space-y-6">

          {/* Smart Actions */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-semibold text-[#1a1a1a]">Smart Actions</h2>
                <span className="text-[11px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">4 pending</span>
              </div>
              <button className="text-[12px] text-[#8a8a86] hover:text-[#1a1a1a] transition-colors flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {smartActions.map((a, i) => (
                <div key={i} className="group flex items-center gap-4 bg-white border border-[#e8e8e5] rounded-xl px-4 py-3 hover:border-[#d0d0cc] hover:shadow-sm transition-all cursor-pointer">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[a.priority]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8a8a86]">{a.type}</span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">{a.name}</div>
                    <div className="text-[12px] text-[#8a8a86] mt-0.5">{a.detail}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {(
                      <>
                        <button className="flex items-center gap-1 text-[11px] font-medium text-[#8a8a86] hover:text-[#1a1a1a] px-2 py-1.5 rounded-lg hover:bg-[#f5f4f1] transition-colors" title="Send SMS with AI Assist">
                          <MessageSquare className="w-3 h-3" />
                          <span className="hidden xl:inline">SMS</span>
                        </button>
                        <button className="flex items-center gap-1 text-[11px] font-medium text-[#8a8a86] hover:text-[#1a1a1a] px-2 py-1.5 rounded-lg hover:bg-[#f5f4f1] transition-colors" title="Send Email with AI Assist">
                          <Mail className="w-3 h-3" />
                          <span className="hidden xl:inline">Email</span>
                        </button>
                        <button className="flex items-center gap-1 text-[11px] font-medium text-violet-600 hover:text-violet-700 px-2 py-1.5 rounded-lg hover:bg-violet-50 transition-colors" title="AI Assist">
                          <Wand2 className="w-3 h-3" />
                          <span className="hidden xl:inline">AI Assist</span>
                        </button>
                        <div className="w-px h-4 bg-[#e8e8e5] mx-0.5" />
                      </>
                    )}
                    <button className="text-[11px] font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                      {a.primaryBtn.icon && <a.primaryBtn.icon className="w-3 h-3" />}
                      {a.primaryBtn.label}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Coaching */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-blue-500" />
              <h2 className="text-[13px] font-semibold text-[#1a1a1a]">AI Coaching</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-medium text-[#1a1a1a] leading-relaxed">
                  You're discussing price too early — it's costing you closes.
                </p>
                <p className="text-[12px] text-[#8a8a86] mt-2 leading-relaxed">
                  Delay pricing until emotional commitment is established. Build value and urgency first.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button className="text-[11px] font-semibold text-white bg-[#1a1a1a] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Play className="w-3 h-3" /> Watch Example
                  </button>
                  <button className="text-[11px] font-medium text-[#8a8a86] hover:text-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#e8e8e5] transition-colors">
                    Apply to Next Call
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#8a8a86]">Coaching Score</span>
                    <span className="font-semibold text-[#1a1a1a]">55 <span className="text-[#8a8a86] font-normal">/ 70</span></span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#f0f0ee]">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-1000" style={{ width: "55%" }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-amber-50 text-amber-600">Talk ratio 62%</span>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-red-50 text-red-500">7 interruptions</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Calls */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <h2 className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Recent Calls</h2>
            <div className="space-y-0.5">
              {recentCalls.map((c, i) => {
                const Icon = c.dir === "in" ? PhoneIncoming : c.dir === "out" ? PhoneOutgoing : PhoneMissed;
                return (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#fafaf9] transition-colors cursor-pointer group">
                    <Icon className="w-3.5 h-3.5 text-[#8a8a86] shrink-0" />
                    <span className="text-[13px] font-medium text-[#1a1a1a] w-36 truncate">{c.name}</span>
                    <span className="text-[12px] text-[#8a8a86] flex-1 truncate">{c.insight}</span>
                    <span className="text-[11px] font-mono text-[#b0b0ac] w-12 text-right">{c.duration}</span>
                    {c.score > 0 && (
                      <span className={`text-[11px] font-semibold w-8 text-center py-0.5 rounded-md ${scoreColor(c.score)}`}>{c.score}</span>
                    )}
                    <button className="text-[11px] font-medium text-[#8a8a86] opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 space-y-6">

          {/* Performance */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <h2 className="text-[13px] font-semibold text-[#1a1a1a] mb-4">Today</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5">
              {[
                { label: "Revenue", value: "$2,140", sub: "+18%", up: true },
                { label: "Applications", value: "3", sub: "+2", up: true },
                { label: "Calls", value: "14", sub: "" },
                { label: "Close Rate", value: "28%", sub: "+3%", up: true },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[11px] text-[#8a8a86] mb-1">{s.label}</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">{s.value}</span>
                    {s.sub && (
                      <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> {s.sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#f0f0ee]">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-[#8a8a86]">Daily Goal</span>
                <span className="font-semibold text-[#1a1a1a]">$2,140 <span className="text-[#8a8a86] font-normal">/ $3,000</span></span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#f0f0ee]">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: "71%" }} />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[11px] text-[#8a8a86]">$860 to go</span>
                <button
                  onClick={() => setGoalBuilderOpen(true)}
                  className="text-[11px] font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
                >
                  <Target className="w-3 h-3" />
                  {activePlan ? "Edit Plan" : "Set Goals"}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#f0f0ee]">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-[#8a8a86]">Avg Score</span>
                <span className="flex items-center gap-1 font-medium text-amber-600">
                  <ArrowDownRight className="w-3 h-3" /> 77
                </span>
              </div>
            </div>
          </section>

          {/* Streak */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="text-[13px] font-semibold text-[#1a1a1a]">3-Day Streak</h2>
            </div>
            <p className="text-[12px] text-[#8a8a86]">You've beaten your daily goal 3 days running.</p>
            <div className="mt-3 text-[12px] font-medium text-amber-600 bg-amber-50 rounded-lg px-3 py-2 text-center">
              Hit $3,000 today to extend 🔥
            </div>
          </section>

          {/* Leaderboard */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h2 className="text-[13px] font-semibold text-[#1a1a1a]">Leaderboard</h2>
            </div>
            <div className="space-y-1.5">
              {[
                { rank: 1, name: "Carla M.", amount: "$3,420", you: false },
                { rank: 2, name: "You", amount: "$2,140", you: true },
                { rank: 3, name: "Marcus D.", amount: "$1,980", you: false },
              ].map((p) => (
                <div key={p.rank} className={`flex items-center justify-between rounded-lg px-3 py-2 ${p.you ? "bg-emerald-50" : "bg-[#fafaf9]"}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-semibold text-[#b0b0ac] w-4">#{p.rank}</span>
                    <span className={`text-[13px] font-medium ${p.you ? "text-emerald-700" : "text-[#1a1a1a]"}`}>{p.name}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{p.amount}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#8a8a86] text-center mt-2">+$160 to pass Marcus</div>
          </section>

          {/* Pipeline */}
          <section className="bg-white border border-[#e8e8e5] rounded-xl p-5">
            <h2 className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Pipeline</h2>
            <div className="space-y-2">
              {[
                { label: "Hot", count: 4, value: "$18.2K", dot: "bg-red-500" },
                { label: "Warm", count: 11, value: "$43.5K", dot: "bg-amber-500" },
                { label: "At Risk", count: 3, value: "$12.0K", dot: "bg-blue-500" },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between py-2 group cursor-pointer hover:bg-[#fafaf9] rounded-lg px-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                    <span className="text-[13px] font-medium text-[#1a1a1a]">{p.label}</span>
                    <span className="text-[11px] text-[#b0b0ac]">{p.count} leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#1a1a1a]">{p.value}</span>
                    <ChevronRight className="w-3 h-3 text-[#b0b0ac] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <GoalBuilderModal
        open={goalBuilderOpen}
        onClose={() => setGoalBuilderOpen(false)}
        onPlanActivated={(plan) => setActivePlan(plan)}
      />
    </div>
  );
};

export default AgentMyDashboard;
