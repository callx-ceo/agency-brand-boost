import React from "react";
import { cn } from "@/lib/utils";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import {
  LayoutDashboard, Activity, Monitor, Megaphone, Tag, Globe, Users, Layers,
  GitBranch, PhoneCall, BarChart3, Building2, UserCircle, UserCog, User, Headphones,
  Search, ChevronDown, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface SuperAdminSidebarProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

interface NavItem {
  id: SuperAdminViewType;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  key: string;
  label: string;
  collapsible?: boolean;
  items: NavItem[];
}

const SuperAdminSidebar = ({ activeView, onViewChange }: SuperAdminSidebarProps) => {
  const sections: NavSection[] = [
    {
      key: "overview",
      label: "Overview",
      collapsible: true,
      items: [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: "reports-realtime", label: "Realtime", icon: <Activity className="w-4 h-4" />, badge: 35 },
        { id: "live-calls", label: "Live Monitor", icon: <Monitor className="w-4 h-4" />, badge: 12 },
      ],
    },
    {
      key: "marketplace",
      label: "Marketplace Operations",
      collapsible: true,
      items: [
        { id: "campaigns", label: "Campaigns", icon: <Megaphone className="w-4 h-4" /> },
        { id: "offers", label: "Offers", icon: <Tag className="w-4 h-4" /> },
        { id: "publishers", label: "Publishers", icon: <Globe className="w-4 h-4" />, badge: 3 },
        { id: "advertisers", label: "Advertisers", icon: <Users className="w-4 h-4" />, badge: 1 },
        { id: "verticals", label: "Verticals", icon: <Layers className="w-4 h-4" /> },
        { id: "settings", label: "Workflows", icon: <GitBranch className="w-4 h-4" /> },
        { id: "reports-campaigns", label: "Call Details", icon: <PhoneCall className="w-4 h-4" /> },
        { id: "global-reporting", label: "Reports", icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      key: "agent-ops",
      label: "Agent & Agency Operations",
      collapsible: true,
      items: [
        { id: "workspace-dashboard", label: "My Agency", icon: <Building2 className="w-4 h-4" /> },
        { id: "agencies", label: "Agencies", icon: <Building2 className="w-4 h-4" /> },
        { id: "user-management", label: "Agency Owner", icon: <UserCircle className="w-4 h-4" /> },
        { id: "user-management", label: "Managers", icon: <UserCog className="w-4 h-4" /> },
        { id: "agents", label: "Agents", icon: <User className="w-4 h-4" /> },
        { id: "user-management", label: "CSRs", icon: <Headphones className="w-4 h-4" /> },
      ],
    },
  ];

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    overview: true,
    marketplace: true,
    "agent-ops": true,
  });

  const toggle = (k: string) => setOpenSections((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="w-64 bg-slate-900 text-slate-200 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-bold text-white">Call</span>
          <span className="text-cyan-400 text-xl">▸</span>
        </div>
        <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full">
          ● ADMIN
        </Badge>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search publishers, advertis…"
            className="h-9 pl-8 pr-10 bg-slate-800 border-slate-700 text-xs text-slate-300 placeholder:text-slate-500 focus-visible:ring-cyan-500/30"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {sections.map((section) => {
          const open = openSections[section.key];
          return (
            <div key={section.key} className="pt-2">
              <button
                onClick={() => toggle(section.key)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-slate-500 hover:text-slate-300"
              >
                <span>{section.label}</span>
                {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {open && (
                <div className="mt-0.5 space-y-0.5">
                  {section.items.map((item, idx) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={`${item.id}-${idx}`}
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-cyan-500/15 text-cyan-300 font-medium"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        <span className={cn(isActive ? "text-cyan-400" : "text-slate-400")}>{item.icon}</span>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] font-semibold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-800 p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs font-semibold">
          BC
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-white font-medium truncate">Brian Carrozzi</span>
            <Badge className="bg-pink-500/20 text-pink-300 border-0 text-[9px] px-1.5 py-0">SUPER</Badge>
          </div>
          <div className="text-[11px] text-slate-500 truncate">brian@callx.com</div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
