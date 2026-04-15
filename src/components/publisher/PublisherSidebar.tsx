import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, Clock, FileText, Settings, Megaphone, Gift, DollarSign, Users, Phone,
  Contact, UserCheck, MessageSquare, Bot, Building2, Shield, ChevronDown, ChevronRight
} from "lucide-react";

interface PublisherSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  key: string;
  label: string;
  items: NavItem[];
}

const PublisherSidebar = ({ activeView, onViewChange }: PublisherSidebarProps) => {
  const sections: NavSection[] = [
    {
      key: "dashboard",
      label: "Dashboard & Analytics",
      items: [{ id: "dashboard", label: "Dashboard", icon: BarChart3 }],
    },
    {
      key: "reports",
      label: "Reports",
      items: [
        { id: "realtime", label: "Realtime", icon: Clock },
        { id: "reports", label: "Reports", icon: FileText },
      ],
    },
    {
      key: "entities",
      label: "Entity Management",
      items: [
        { id: "campaigns", label: "Campaigns", icon: Megaphone },
        { id: "offers", label: "Offers", icon: Gift },
        { id: "advertisers", label: "Advertisers", icon: DollarSign },
        { id: "publishers", label: "Publishers", icon: Users },
      ],
    },
    {
      key: "calls",
      label: "Call Management",
      items: [
        { id: "leads", label: "Leads List", icon: Contact },
        { id: "contacts", label: "Contacts List", icon: Phone },
        { id: "audiences", label: "Audiences", icon: UserCheck },
      ],
    },
    {
      key: "communication",
      label: "Communication",
      items: [
        { id: "chats", label: "Chats", icon: MessageSquare, badge: "NEW" },
        { id: "rasa", label: "Rasa", icon: Bot },
      ],
    },
    {
      key: "agency",
      label: "Agency Management",
      items: [
        { id: "agency-owner", label: "Agency Owner", icon: Building2 },
        { id: "agencies", label: "Agencies", icon: Building2 },
        { id: "managers", label: "Managers", icon: Shield },
        { id: "agents", label: "Agents", icon: Users },
        { id: "carriers", label: "Carriers", icon: Phone },
      ],
    },
    {
      key: "config",
      label: "Configuration",
      items: [{ id: "settings", label: "Settings", icon: Settings }],
    },
  ];

  const findSectionForView = (view: string): string | null => {
    for (const s of sections) {
      if (s.items.some(i => i.id === view)) return s.key;
    }
    return null;
  };

  const activeKey = findSectionForView(activeView);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(activeKey ? [activeKey] : ["dashboard"])
  );

  useEffect(() => {
    const key = findSectionForView(activeView);
    if (key && !expanded.has(key)) {
      setExpanded(prev => new Set([...prev, key]));
    }
  }, [activeView]);

  const toggle = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="w-60 bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-sm font-medium text-muted-foreground">NAVIGATION</h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {sections.map((section) => {
          const isExpanded = expanded.has(section.key);
          const hasActive = section.items.some(i => i.id === activeView);

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
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-4 py-2 rounded-md text-left text-sm transition-colors",
                          activeView === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                            {item.badge}
                          </Badge>
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
    </div>
  );
};

export default PublisherSidebar;
