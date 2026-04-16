import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import { 
  LayoutDashboard, Building2, Users, Megaphone, Globe, BarChart3, Shield, Activity,
  UserCheck, Settings, TrendingUp, PhoneCall, DollarSign, FileText, ChevronDown,
  ChevronRight, Hash, ContactRound, UserCog, Target, Package, ClipboardList, Gift,
  Bell, Palette, Wallet, CalendarDays, Sparkles, Globe as GlobeIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SuperAdminSidebarProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeVariant?: "outline" | "secondary";
}

interface NavSection {
  key: string;
  label: string;
  items: NavItem[];
  children?: { key: string; label: string; items: NavItem[] }[];
}

const SuperAdminSidebar = ({ activeView, onViewChange }: SuperAdminSidebarProps) => {
  const mockAlerts = {
    pendingAgencies: 3, suspendedAgents: 8, fraudAlerts: 2, complianceIssues: 1,
    systemAlerts: 5, newLeads: 47, pendingContacts: 12, pendingApplications: 15, apiFailures: 5
  };

  const sections: NavSection[] = [
    {
      key: "dashboard",
      label: "Dashboard & Analytics",
      items: [
        { id: "dashboard", label: "Executive Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: "analytics", label: "Advanced Analytics", icon: <TrendingUp className="w-4 h-4" /> },
        { id: "compliance", label: "Compliance Reporting", icon: <Shield className="w-4 h-4" /> },
      ],
    },
    {
      key: "workspace",
      label: "My Workspace",
      items: [
        { id: "workspace-dashboard", label: "Command Center", icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: "workspace-live-calls", label: "Live Calls", icon: <PhoneCall className="w-4 h-4" /> },
        { id: "workspace-history", label: "My History", icon: <Activity className="w-4 h-4" /> },
        { id: "workspace-contacts", label: "My Contacts", icon: <ContactRound className="w-4 h-4" /> },
        { id: "workspace-applications", label: "My Applications", icon: <FileText className="w-4 h-4" /> },
        { id: "workspace-calendar", label: "My Calendar", icon: <CalendarDays className="w-4 h-4" /> },
        { id: "workspace-recommendations", label: "Recommendations", icon: <Sparkles className="w-4 h-4" /> },
        { id: "workspace-website", label: "My Website", icon: <GlobeIcon className="w-4 h-4" /> },
        { id: "workspace-referrals", label: "My Referrals", icon: <Gift className="w-4 h-4" /> },
        { id: "workspace-settings", label: "My Settings", icon: <Settings className="w-4 h-4" /> },
        { id: "workspace-support", label: "My Support", icon: <Shield className="w-4 h-4" /> },
      ],
    },
    {
      key: "reports",
      label: "Reports",
      items: [],
      children: [{
        key: "reports-sub",
        label: "All Reports",
        items: [
          { id: "reports-realtime", label: "Realtime", icon: <Activity className="w-4 h-4" /> },
          { id: "reports-campaigns", label: "Campaigns", icon: <PhoneCall className="w-4 h-4" /> },
          { id: "reports-campaigns-by-publisher", label: "Campaigns by Publisher", icon: <Users className="w-4 h-4" /> },
          { id: "reports-publisher-by-manager", label: "Publisher by Manager", icon: <UserCheck className="w-4 h-4" /> },
          { id: "reports-offers", label: "Offers", icon: <DollarSign className="w-4 h-4" /> },
          { id: "reports-offers-by-publisher", label: "Offers by Publisher", icon: <Globe className="w-4 h-4" /> },
          { id: "reports-promo-numbers", label: "Promo Numbers", icon: <Hash className="w-4 h-4" /> },
          { id: "reports-offers-by-promo", label: "Offers by Promo #", icon: <Hash className="w-4 h-4" /> },
          { id: "reports-advertisers", label: "Advertisers", icon: <Megaphone className="w-4 h-4" /> },
          { id: "reports-publishers", label: "Publishers", icon: <Globe className="w-4 h-4" /> },
          { id: "reports-agents", label: "Agents", icon: <Users className="w-4 h-4" /> },
          { id: "reports-agent-list", label: "Agent List Report", icon: <UserCog className="w-4 h-4" /> },
          { id: "reports-agencies", label: "Agencies", icon: <Building2 className="w-4 h-4" /> },
          { id: "reports-ivr-fees", label: "IVR Fees", icon: <PhoneCall className="w-4 h-4" /> },
          { id: "reports-key-press", label: "Key Press", icon: <Hash className="w-4 h-4" /> },
        ]
      }]
    },
    {
      key: "platform",
      label: "Platform Management",
      items: [
        { id: "agencies", label: "Agencies", icon: <Building2 className="w-4 h-4" />, badge: mockAlerts.pendingAgencies },
        { id: "agents", label: "Agents", icon: <Users className="w-4 h-4" />, badge: mockAlerts.suspendedAgents },
        { id: "publishers", label: "Publishers", icon: <Globe className="w-4 h-4" /> },
        { id: "advertisers", label: "Advertisers", icon: <Megaphone className="w-4 h-4" /> },
        { id: "campaigns", label: "Campaigns", icon: <PhoneCall className="w-4 h-4" /> },
        { id: "offers", label: "Offers", icon: <DollarSign className="w-4 h-4" /> },
        { id: "verticals", label: "Verticals", icon: <Target className="w-4 h-4" /> },
        { id: "languages", label: "Languages", icon: <Globe className="w-4 h-4" /> },
      ],
    },
    {
      key: "agency-ops",
      label: "Agency Operations",
      items: [
        { id: "agency-applications", label: "Agency Applications", icon: <ClipboardList className="w-4 h-4" />, badge: mockAlerts.pendingApplications },
        { id: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
        { id: "carriers", label: "Carriers", icon: <Building2 className="w-4 h-4" /> },
        { id: "notification-branding-overview", label: "Agency Branding", icon: <Palette className="w-4 h-4" /> },
      ],
    },
    {
      key: "leads",
      label: "Lead & Contact Management",
      items: [
        { id: "leads", label: "Leads Management", icon: <Target className="w-4 h-4" />, badge: mockAlerts.newLeads, badgeVariant: "secondary" },
        { id: "contacts", label: "Contacts Management", icon: <ContactRound className="w-4 h-4" />, badge: mockAlerts.pendingContacts },
        { id: "customers", label: "Customer Management", icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      key: "billing",
      label: "Billing & Finance",
      items: [
        { id: "billing-management", label: "Billing Management", icon: <DollarSign className="w-4 h-4" /> },
        { id: "call-credits-management", label: "Call Credits", icon: <Wallet className="w-4 h-4" /> },
        { id: "cost-api-management", label: "Cost & API Management", icon: <DollarSign className="w-4 h-4" />, badge: mockAlerts.apiFailures },
        { id: "minimum-bid-management", label: "Minimum Bids", icon: <Target className="w-4 h-4" /> },
        { id: "referral-management", label: "Referrals", icon: <Gift className="w-4 h-4" /> },
      ],
    },
    {
      key: "system",
      label: "System & Administration",
      items: [
        { id: "system-health", label: "System Health", icon: <Activity className="w-4 h-4" />, badge: mockAlerts.systemAlerts },
        { id: "user-management", label: "User & Roles", icon: <UserCheck className="w-4 h-4" /> },
        { id: "goals-management", label: "Goals", icon: <TrendingUp className="w-4 h-4" /> },
        { id: "call-settings-management", label: "Call Settings", icon: <PhoneCall className="w-4 h-4" /> },
        { id: "prompt-management", label: "AI Prompts", icon: <Settings className="w-4 h-4" /> },
        { id: "notification-templates", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
        { id: "settings", label: "Platform Settings", icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  // Determine which section the active view belongs to
  const findSectionForView = (view: string): string | null => {
    for (const section of sections) {
      if (section.items.some(item => item.id === view)) return section.key;
      if (section.children?.some(child => child.items.some(item => item.id === view))) return section.key;
    }
    return null;
  };

  const activeSection = findSectionForView(activeView);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(activeSection ? [activeSection] : ["dashboard"])
  );
  const [reportsExpanded, setReportsExpanded] = useState(activeView.startsWith("reports-"));

  useEffect(() => {
    const section = findSectionForView(activeView);
    if (section && !expandedSections.has(section)) {
      setExpandedSections(prev => new Set([...prev, section]));
    }
    if (activeView.startsWith("reports-")) {
      setReportsExpanded(true);
    }
  }, [activeView]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const renderItem = (item: NavItem, indent = false) => (
    <button
      key={item.id}
      onClick={() => onViewChange(item.id as SuperAdminViewType)}
      className={cn(
        "w-full flex items-center gap-2.5 rounded-md text-left transition-colors text-sm",
        indent ? "px-8 py-1.5" : "px-3 py-2",
        activeView === item.id
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {item.icon}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <Badge variant={item.badgeVariant || "outline"} className="text-[10px] px-1.5 py-0 h-5">
          {item.badge}
        </Badge>
      )}
    </button>
  );

  return (
    <div className="w-60 bg-card border-r flex flex-col min-h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-foreground">CallX</h2>
        <p className="text-xs text-muted-foreground">SuperAdmin Portal</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.key);
          const hasActiveChild = section.items.some(i => i.id === activeView) ||
            section.children?.some(c => c.items.some(i => i.id === activeView));

          return (
            <div key={section.key}>
              <button
                onClick={() => toggleSection(section.key)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  hasActiveChild ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex-1 text-left">{section.label}</span>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="space-y-0.5 pb-1">
                  {section.items.map(item => renderItem(item))}
                  {section.children?.map(child => (
                    <div key={child.key}>
                      <button
                        onClick={() => setReportsExpanded(!reportsExpanded)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left text-sm transition-colors",
                          activeView.startsWith("reports-")
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <FileText className="w-4 h-4" />
                        <span className="flex-1">{child.label}</span>
                        {reportsExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                      {reportsExpanded && (
                        <div className="space-y-0.5">
                          {child.items.map(item => renderItem(item, true))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default SuperAdminSidebar;
