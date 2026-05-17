import React, { useState } from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  Circle,
  CreditCard,
  Phone,
  PhoneCall,
  FileText,
  Users,
  Clock,
  Pause,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ExecutiveKPIConfig } from "./ExecutiveKPISelector";
import { SuperAdminWidget } from "./SuperAdminWidgetSelector";

interface SuperAdminDashboardContentProps {
  activeView: SuperAdminViewType;
  selectedKPIs: ExecutiveKPIConfig[];
  selectedWidgets: SuperAdminWidget[];
  onViewChange: (view: SuperAdminViewType) => void;
  onCustomizeKPIs: () => void;
  onCustomizeWidgets: () => void;
}

const dateRanges = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last Month", "This Month", "This Year"];

const marketplaceKPIs = [
  { label: "Total Revenue", value: "$285", icon: DollarSign },
  { label: "Total Cost", value: "$230", icon: Circle },
  { label: "Total Profit", value: "$55", icon: CreditCard },
  { label: "Total Calls", value: "49", icon: Phone },
  { label: "Paid Calls", value: "6", icon: PhoneCall },
];

const agencyKPIs = [
  { label: "Applications", value: "192", icon: FileText, tint: "bg-violet-100 text-violet-600" },
  { label: "Agents Online", value: "192", icon: Users, tint: "bg-emerald-100 text-emerald-600" },
  { label: "Agents on Call", value: "87", icon: Phone, tint: "bg-sky-100 text-sky-600" },
  { label: "Agents Waiting", value: "52", icon: Clock, tint: "bg-amber-100 text-amber-600" },
  { label: "Agents Paused", value: "53", icon: Pause, tint: "bg-rose-100 text-rose-600" },
  { label: "Annual Premium", value: "$200K", icon: DollarSign, tint: "bg-blue-100 text-blue-600" },
];

const chartData = [
  { d: "Mon", curr: 1800, prev: 1500 },
  { d: "Tue", curr: 1950, prev: 1700 },
  { d: "Wed", curr: 2100, prev: 1800 },
  { d: "Thu", curr: 2400, prev: 2050 },
  { d: "Fri", curr: 2350, prev: 2150 },
  { d: "Sat", curr: 2550, prev: 2250 },
  { d: "Sun", curr: 2628, prev: 2398 },
];

const verticals = [
  { name: "Final expense", value: 182440, color: "bg-sky-400", pct: 95 },
  { name: "Medicare", value: 148210, color: "bg-emerald-400", pct: 78 },
  { name: "Auto insurance", value: 94802, color: "bg-amber-400", pct: 50 },
  { name: "Life insurance", value: 82016, color: "bg-violet-400", pct: 43 },
  { name: "Health insurance", value: 54326, color: "bg-indigo-400", pct: 29 },
  { name: "Home services", value: 27330, color: "bg-teal-400", pct: 15 },
];

const topAdvertisers = [
  { name: "Liberty Mutual Insurance Company", value: "$225", trend: "25%" },
  { name: "Progressive Insurance", value: "$198", trend: "18%" },
  { name: "GEICO", value: "$176", trend: "12%" },
];

const topPublishers = [
  { name: "RingMax Ltd.", value: "$250", trend: "96%" },
  { name: "CallStream Media", value: "$214", trend: "62%" },
  { name: "LeadFlow Networks", value: "$189", trend: "44%" },
];

const SuperAdminDashboardContent = ({ activeView, onViewChange }: SuperAdminDashboardContentProps) => {
  const [range, setRange] = useState("Today");
  const [chartMode, setChartMode] = useState<"Calls" | "Earnings">("Calls");

  return (
    <div className="space-y-6">
      {/* Date filter row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">May 16, 2026 – May 16, 2026</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900 rounded-full p-1">
          {dateRanges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                range === r ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
          <button className="px-3 py-1.5 text-xs font-medium rounded-full text-slate-300 hover:text-white flex items-center gap-1">
            Custom <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Call Marketplace */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-sky-500" />
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Call Marketplace</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {marketplaceKPIs.map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{k.label}</span>
                <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center">
                  <k.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold text-foreground">{k.value}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Agency Activity */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-sky-500" />
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Agency Activity</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {agencyKPIs.map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight">{k.label}</span>
                <div className={`h-7 w-7 rounded-md flex items-center justify-center ${k.tint}`}>
                  <k.icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold text-foreground">{k.value}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Overview chart + Revenue by vertical */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Hourly · last 7 days vs prior week</p>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              {(["Calls", "Earnings"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setChartMode(m)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                    chartMode === m ? "bg-sky-400 text-white" : "text-muted-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="currG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199 89% 60%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(199 89% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Area type="monotone" dataKey="prev" stroke="hsl(160 60% 60%)" strokeDasharray="4 4" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="curr" stroke="hsl(199 89% 50%)" fill="url(#currG)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> This week · 14,728</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Prior week · 13,098</span>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-foreground">Revenue by vertical</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
          <div className="mt-4 space-y-4">
            {verticals.map((v) => (
              <div key={v.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground">{v.name}</span>
                  <span className="font-semibold text-foreground">${v.value.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${v.color}`} style={{ width: `${v.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performers */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-sky-500" />
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Top Performers · Marketplace</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { title: "Top Advertisers", icon: Circle, data: topAdvertisers },
            { title: "Top Publishers", icon: Users, data: topPublishers },
          ].map((section) => (
            <Card key={section.title} className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
                <span className="text-sm text-muted-foreground">({section.data.length})</span>
              </div>
              <div className="space-y-2.5">
                {section.data.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm text-muted-foreground w-5">{i + 1}.</span>
                      <span className="text-sm text-sky-600 hover:underline cursor-pointer truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                      <span className="text-xs text-emerald-600 font-medium">↑ {item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboardContent;
