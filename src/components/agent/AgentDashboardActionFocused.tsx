import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  Users,
  Phone,
  MessageSquare,
  BarChart3,
  Settings,
  Clock,
  Flame,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SendTextModal from "./SendTextModal";
import LeadDetailsPanel from "./LeadDetailsPanel";

interface Lead {
  id: string;
  name: string;
  company: string;
  status: "Hot Lead" | "Warm" | "Cold" | "Follow-up";
  context: string;
  action: string;
  bestTime: string;
  avatar?: string;
}

const AgentDashboardActionFocused = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [todaysFocusExpanded, setTodaysFocusExpanded] = useState(true);

  const leads: Lead[] = [
    {
      id: "1",
      name: "John Hamm",
      company: "TechCorp",
      status: "Hot Lead",
      context: "Requested pricing info yesterday",
      action: "Send Pricing",
      bestTime: "Best time: 2-4pm",
    },
    {
      id: "2",
      name: "Sarah Watson",
      company: "DesignCo",
      status: "Warm",
      context: "Opened email 3x today",
      action: "Call Now",
      bestTime: "Available now",
    },
    {
      id: "3",
      name: "Mike Davis",
      company: "StartupInc",
      status: "Follow-up",
      context: "No response in 7 days",
      action: "Send Check-in",
      bestTime: "Due today",
    },
    {
      id: "4",
      name: "Emily Chen",
      company: "BigRetail",
      status: "Hot Lead",
      context: "Clicked demo link 30 min ago",
      action: "Schedule Demo",
      bestTime: "Best time: 10am-12pm",
    },
    {
      id: "5",
      name: "James Miller",
      company: "LocalBiz",
      status: "Warm",
      context: "Asked about features",
      action: "Send Info",
      bestTime: "Best time: 3-5pm",
    },
  ];

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Leads", active: false },
    { icon: Phone, label: "Calls", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: BarChart3, label: "Performance", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return "bg-red-500 text-white hover:bg-red-600";
      case "Warm":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "Follow-up":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "Cold":
        return "bg-gray-500 text-white hover:bg-gray-600";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleAction = (lead: Lead) => {
    setSelectedLead(lead);
    if (lead.action.includes("Send") || lead.action.includes("Check-in")) {
      setShowTextModal(true);
    } else {
      console.log(`Action: ${lead.action} for ${lead.name}`);
    }
  };

  const handleLeadClick = (leadId: string) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#2C3E50] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">CallX</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">7</span>
                  <span className="text-muted-foreground">calls today</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">12</span>
                  <span className="text-muted-foreground">messages sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">23</span>
                  <span className="text-muted-foreground">active leads</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Online</span>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Your Next Moves Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Your Next Moves</h2>
              <p className="text-muted-foreground">
                Prioritized actions for today
              </p>
            </div>
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card
                  key={lead.id}
                  className="transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleLeadClick(lead.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold">{lead.name}</h3>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {lead.company}
                          </p>
                          <p className="text-sm italic text-foreground/80">
                            "{lead.context}"
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{lead.bestTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(lead);
                        }}
                        className="bg-[#10B981] hover:bg-[#059669] text-white font-medium px-6 py-6 text-base"
                      >
                        {lead.action}
                      </Button>
                    </div>

                    {expandedLead === lead.id && (
                      <LeadDetailsPanel lead={lead} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Wins Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Quick Wins</h2>
              <p className="text-muted-foreground">
                Batch actions to save time
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Daily Check-ins</h3>
                      <p className="text-sm text-muted-foreground">
                        Send 'checking in' message to 8 warm leads
                      </p>
                    </div>
                    <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white">
                      Send to All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Follow-up Calls</h3>
                      <p className="text-sm text-muted-foreground">
                        Call 5 leads who requested follow-up
                      </p>
                    </div>
                    <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white">
                      Start Call Queue
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-red-500/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center relative">
                      <Flame className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Hot Leads Alert</h3>
                      <p className="text-sm text-muted-foreground">
                        3 leads highly engaged in last 2 hours
                      </p>
                    </div>
                    <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Today's Focus Section */}
          <section>
            <button
              onClick={() => setTodaysFocusExpanded(!todaysFocusExpanded)}
              className="flex items-center gap-2 mb-4 text-xl font-bold hover:text-primary transition-colors"
            >
              <span>Today's Focus</span>
              {todaysFocusExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {todaysFocusExpanded && (
              <div className="grid grid-cols-3 gap-4">
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Calls Goal
                        </span>
                        <Phone className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">7</span>
                          <span className="text-muted-foreground">/ 12</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Response Rate
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">68%</span>
                        <Badge variant="success" className="text-xs">
                          +5%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Hot Leads
                        </span>
                        <Flame className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="text-3xl font-bold">5</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modals */}
      {showTextModal && selectedLead && (
        <SendTextModal
          lead={selectedLead}
          onClose={() => {
            setShowTextModal(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
};

export default AgentDashboardActionFocused;
