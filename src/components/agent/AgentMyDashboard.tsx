import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone, TrendingUp, DollarSign, Calendar, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Star
} from "lucide-react";

const AgentMyDashboard = () => {
  const stats = [
    { label: "Calls Today", value: "12", change: "+3", up: true, icon: Phone },
    { label: "Close Rate", value: "34%", change: "+5%", up: true, icon: TrendingUp },
    { label: "Avg Call Score", value: "78", change: "+2", up: true, icon: Star },
    { label: "Earnings (MTD)", value: "$2,340", change: "+$420", up: true, icon: DollarSign },
  ];

  const agenda = [
    { time: "9:30 AM", task: "Follow-up call — Michael Hayden", type: "call", urgent: true },
    { time: "10:00 AM", task: "Send quote email — Sandra Okonkwo", type: "email", urgent: false },
    { time: "11:15 AM", task: "Application review — Priya Nambiar", type: "app", urgent: false },
    { time: "1:00 PM", task: "Callback scheduled — Linda Castellano", type: "call", urgent: true },
    { time: "3:00 PM", task: "Send coaching note — James Rutherford", type: "email", urgent: false },
  ];

  const performance = [
    { label: "Talk-to-Listen Ratio", value: 62, target: 50, unit: "%" },
    { label: "Avg Handle Time", value: 18, target: 15, unit: " min" },
    { label: "First Call Close", value: 22, target: 30, unit: "%" },
    { label: "Rapport Score", value: 85, target: 80, unit: "/100" },
  ];

  const recentCommissions = [
    { client: "Terrence Wilkes", product: "Final Expense $25K", amount: "$312", date: "Apr 10" },
    { client: "Priya Nambiar", product: "Final Expense $20K", amount: "$248", date: "Apr 8" },
    { client: "Michael Hayden", product: "Final Expense $5K", amount: "$65", date: "Apr 5" },
  ];

  return (
    <div className="h-full overflow-auto bg-muted/20 p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold">My Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Benjamin — here's your day at a glance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className={`flex items-center gap-1 text-xs mt-1 ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change} vs last week
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Today's Agenda */}
        <Card className="col-span-1 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Today's Agenda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                <span className="text-[11px] text-muted-foreground font-mono w-16 shrink-0 pt-0.5">{item.time}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium truncate">{item.task}</span>
                    {item.urgent && (
                      <Badge className="bg-red-100 text-red-700 border-0 text-[9px] px-1.5 py-0">Urgent</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="text-xs w-full mt-2">View full schedule</Button>
          </CardContent>
        </Card>

        {/* Performance Snapshot */}
        <Card className="col-span-1 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Performance Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            {performance.map((p) => {
              const isGood = p.label === "Talk-to-Listen Ratio" || p.label === "Avg Handle Time"
                ? p.value <= p.target
                : p.value >= p.target;
              return (
                <div key={p.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{p.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold">{p.value}{p.unit}</span>
                      {isGood ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                  </div>
                  <Progress value={(p.value / (p.target * 1.5)) * 100} className="h-1.5" />
                  <span className="text-[10px] text-muted-foreground">Target: {p.target}{p.unit}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Earnings & Commissions */}
        <Card className="col-span-1 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Earnings & Commissions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-emerald-600">$2,340</div>
                <div className="text-[10px] text-muted-foreground">This Month</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <div className="text-xl font-bold">$8,920</div>
                <div className="text-[10px] text-muted-foreground">This Quarter</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2">Recent Commissions</div>
              {recentCommissions.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="text-xs font-medium">{c.client}</div>
                    <div className="text-[10px] text-muted-foreground">{c.product}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-emerald-600">{c.amount}</div>
                    <div className="text-[10px] text-muted-foreground">{c.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="text-xs w-full">View all payouts</Button>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" /> This Week's Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const calls = [8, 12, 10, 14, 12, 0, 0][i];
              const maxCalls = 14;
              const isToday = i === 3;
              return (
                <div key={day} className={`text-center p-3 rounded-lg ${isToday ? "bg-emerald-50 border border-emerald-200" : "bg-muted/30"}`}>
                  <div className={`text-[10px] font-medium mb-1 ${isToday ? "text-emerald-700" : "text-muted-foreground"}`}>{day}</div>
                  <div className="h-16 flex items-end justify-center mb-1">
                    <div
                      className={`w-6 rounded-t ${isToday ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                      style={{ height: `${(calls / maxCalls) * 100}%`, minHeight: calls > 0 ? 4 : 0 }}
                    />
                  </div>
                  <div className={`text-xs font-semibold ${isToday ? "text-emerald-700" : ""}`}>{calls}</div>
                  <div className="text-[9px] text-muted-foreground">calls</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMyDashboard;
