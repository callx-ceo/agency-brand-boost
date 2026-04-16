import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Settings, Phone, FileText, UserPlus, Target, Gift, Bell,
  CreditCard, Home, Contact, History, UserCheck, Briefcase, Headphones, Palette,
  ChevronDown, ChevronRight
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface NavSection {
  key: string;
  label: string;
  items: { id: string; label: string; icon: React.ElementType }[];
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const sections: NavSection[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
      ],
    },
    {
      key: "workspace",
      label: "My Workspace",
      items: [
        { id: "workspace-dashboard", label: "My Dashboard", icon: Home },
        { id: "workspace-live-calls", label: "Live Calls", icon: Phone },
        { id: "workspace-history", label: "My History", icon: History },
        { id: "workspace-contacts", label: "My Contacts", icon: Contact },
        { id: "workspace-applications", label: "My Applications", icon: FileText },
        { id: "workspace-referrals", label: "My Referrals", icon: Gift },
        { id: "workspace-settings", label: "My Settings", icon: Settings },
        { id: "workspace-support", label: "My Support", icon: Headphones },
      ],
    },
    {
      key: "campaigns",
      label: "Campaign Management",
      items: [
        { id: "offers", label: "Offers", icon: Briefcase },
        { id: "campaigns", label: "Campaigns", icon: Target },
        { id: "publishers", label: "Publishers", icon: UserPlus },
      ],
    },
    {
      key: "reports",
      label: "Reports & Analytics",
      items: [
        { id: "reports", label: "Realtime Report", icon: BarChart3 },
        { id: "applications", label: "Applications", icon: FileText },
        { id: "call-history", label: "Call History", icon: History },
        { id: "contacts", label: "Contacts", icon: Contact },
        { id: "leads-list", label: "Leads List", icon: UserCheck },
      ],
    },
    {
      key: "settings",
      label: "General Settings",
      items: [
        { id: "general", label: "General", icon: Settings },
        { id: "branding", label: "Branding & Emails", icon: Palette },
        { id: "scripts", label: "Scripts & AI", icon: Phone },
        { id: "notifications", label: "Notifications", icon: Bell },
      ],
    },
    {
      key: "team",
      label: "Team & Finance",
      items: [
        { id: "team", label: "Team Members", icon: Users },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "upgrade", label: "Upgrade Plans", icon: CreditCard },
        { id: "referrals", label: "Referrals", icon: Gift },
      ],
    },
  ];

  const findSectionForItem = (id: string): string | null => {
    for (const s of sections) {
      if (s.items.some(i => i.id === id)) return s.key;
    }
    return null;
  };

  const activeKey = findSectionForItem(activeSection);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(activeKey ? [activeKey] : ["dashboard"])
  );

  useEffect(() => {
    const key = findSectionForItem(activeSection);
    if (key && !expanded.has(key)) {
      setExpanded(prev => new Set([...prev, key]));
    }
  }, [activeSection]);

  const toggle = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="w-60 bg-card border-r flex flex-col h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-foreground">Agency Portal</h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {sections.map((section) => {
          const isExpanded = expanded.has(section.key);
          const hasActive = section.items.some(i => i.id === activeSection);

          return (
            <div key={section.key}>
              <button
                onClick={() => toggle(section.key)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  hasActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex-1 text-left">{section.label}</span>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="space-y-0.5 pb-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-4 py-2 rounded-md text-left text-sm transition-colors",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
