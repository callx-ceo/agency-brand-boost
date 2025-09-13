import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Clock, 
  FileText, 
  Settings, 
  Megaphone, 
  Gift, 
  DollarSign, 
  Users, 
  Phone, 
  Contact, 
  UserCheck, 
  MessageSquare, 
  Bot,
  Building2,
  Shield,
  Calendar
} from "lucide-react";

interface PublisherSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const PublisherSidebar = ({ activeView, onViewChange }: PublisherSidebarProps) => {
  const menuItems = [
    {
      section: "DASHBOARD & ANALYTICS",
      items: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      ]
    },
    {
      section: "REPORTS",
      items: [
        { id: "realtime", label: "Realtime", icon: Clock },
        { id: "reports", label: "Reports", icon: FileText },
      ]
    },
    {
      section: "ENTITY MANAGEMENT",
      items: [
        { id: "campaigns", label: "Campaigns", icon: Megaphone },
        { id: "offers", label: "Offers", icon: Gift },
        { id: "advertisers", label: "Advertisers", icon: DollarSign },
        { id: "publishers", label: "Publishers", icon: Users },
      ]
    },
    {
      section: "CALL MANAGEMENT",
      items: [
        { id: "leads", label: "Leads List", icon: Contact },
        { id: "contacts", label: "Contacts List", icon: Phone },
        { id: "audiences", label: "Audiences", icon: UserCheck },
      ]
    },
    {
      section: "COMMUNICATION",
      items: [
        { id: "chats", label: "Chats", icon: MessageSquare, badge: "NEW" },
        { id: "rasa", label: "Rasa", icon: Bot },
      ]
    },
    {
      section: "AGENCY MANAGEMENT",
      items: [
        { id: "agency-owner", label: "Agency Owner", icon: Building2 },
        { id: "agencies", label: "Agencies", icon: Building2 },
        { id: "managers", label: "Managers", icon: Shield },
        { id: "agents", label: "Agents", icon: Users },
        { id: "carriers", label: "Carriers", icon: Phone },
      ]
    },
    {
      section: "CONFIGURATION",
      items: [
        { id: "settings", label: "Settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-2">NAVIGATION</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        {menuItems.map((section, index) => (
          <div key={section.section} className="mb-4">
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground">{section.section}</h3>
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start px-4 h-9"
                    onClick={() => onViewChange(item.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
            {index < menuItems.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublisherSidebar;