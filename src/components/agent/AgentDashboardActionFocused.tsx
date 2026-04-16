import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  CheckCircle,
  Mail,
  Calendar,
  Trophy,
  Loader2,
  Edit2,
  MoreVertical,
} from "lucide-react";
import SendTextModal from "./SendTextModal";
import LeadDetailsPanel from "./LeadDetailsPanel";
import EditLeadModal from "./EditLeadModal";
import LiveCallWorkspace, { WorkspaceTab } from "../shared/LiveCallWorkspace";

const agentWorkspaceTabMap: Record<string, WorkspaceTab> = {
  'workspace-dashboard': 'my-dashboard',
  'workspace-live-calls': 'live-calls',
  'workspace-history': 'my-history',
  'workspace-contacts': 'my-contacts',
  'workspace-applications': 'my-applications',
  'workspace-referrals': 'my-referrals',
  'workspace-settings': 'my-settings',
  'workspace-support': 'my-support',
  'live-calls': 'live-calls',
};

interface Lead {
  id: string;
  name: string;
  company: string;
  status: "Hot Lead" | "Warm" | "Cold" | "Follow-up";
  context: string;
  action: string;
  bestTime: string;
  timeSaved: number;
  priority: number;
  avatar?: string;
}

interface CompletedAction {
  id: string;
  description: string;
  timestamp: string;
  timeSaved: number;
}

const AgentDashboardActionFocused = () => {
  const { toast } = useToast();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  
  const [allLeads, setAllLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Hamm",
      company: "TechCorp",
      status: "Hot Lead",
      context: "Requested pricing info yesterday",
      action: "Send Pricing",
      bestTime: "Best time: 2-4pm",
      timeSaved: 4,
      priority: 1,
    },
    {
      id: "2",
      name: "Sarah Watson",
      company: "DesignCo",
      status: "Warm",
      context: "Opened email 3x today",
      action: "Call Now",
      bestTime: "Available now",
      timeSaved: 2,
      priority: 2,
    },
    {
      id: "3",
      name: "Mike Davis",
      company: "StartupInc",
      status: "Follow-up",
      context: "No response in 7 days",
      action: "Send Check-in",
      bestTime: "Due today",
      timeSaved: 3,
      priority: 3,
    },
    {
      id: "4",
      name: "Emily Chen",
      company: "BigRetail",
      status: "Hot Lead",
      context: "Clicked demo link 30 min ago",
      action: "Schedule Demo",
      bestTime: "Best time: 10am-12pm",
      timeSaved: 6,
      priority: 4,
    },
    {
      id: "5",
      name: "James Miller",
      company: "LocalBiz",
      status: "Warm",
      context: "Asked about features",
      action: "Send Info",
      bestTime: "Best time: 3-5pm",
      timeSaved: 5,
      priority: 5,
    },
    {
      id: "6",
      name: "Lisa Anderson",
      company: "GrowthCo",
      status: "Hot Lead",
      context: "Downloaded case study today",
      action: "Call Now",
      bestTime: "Best time: 1-3pm",
      timeSaved: 2,
      priority: 6,
    },
    {
      id: "7",
      name: "David Park",
      company: "InnovateLab",
      status: "Follow-up",
      context: "Meeting scheduled tomorrow",
      action: "Send Reminder",
      bestTime: "Send today",
      timeSaved: 3,
      priority: 7,
    },
    {
      id: "8",
      name: "Rachel Green",
      company: "MediaHub",
      status: "Warm",
      context: "Visited pricing page 5x",
      action: "Send Offer",
      bestTime: "Best time: 4-6pm",
      timeSaved: 4,
      priority: 8,
    },
  ]);

  const [visibleLeads, setVisibleLeads] = useState<Lead[]>(allLeads);
  const [completedActions, setCompletedActions] = useState<CompletedAction[]>([]);
  const [timeSavedToday, setTimeSavedToday] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const [activeAgentView, setActiveAgentView] = useState<string>("dashboard");

  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", active: activeAgentView === "dashboard" },
    { icon: Users, label: "Leads", id: "leads", active: activeAgentView === "leads" },
    { icon: MessageSquare, label: "Messages", id: "messages", active: activeAgentView === "messages" },
    { icon: BarChart3, label: "Performance", id: "performance", active: activeAgentView === "performance" },
    { icon: Settings, label: "Settings", id: "settings", active: activeAgentView === "settings" },
  ];

  const workspaceSubItems = [
    { icon: BarChart3, label: "Command Center", id: "workspace-dashboard" },
    { icon: Phone, label: "Live Calls", id: "workspace-live-calls" },
    { icon: Clock, label: "My History", id: "workspace-history" },
    { icon: Users, label: "My Contacts", id: "workspace-contacts" },
    { icon: BarChart3, label: "My Applications", id: "workspace-applications" },
    { icon: TrendingUp, label: "My Referrals", id: "workspace-referrals" },
    { icon: Settings, label: "My Settings", id: "workspace-settings" },
    { icon: Flame, label: "My Support", id: "workspace-support" },
  ];

  const isWorkspaceActive = activeAgentView.startsWith("workspace-") || activeAgentView === "live-calls";

  const remainingOpportunities = visibleLeads.length;
  const totalOpportunities = 8;
  const progressPercentage = ((totalOpportunities - remainingOpportunities) / totalOpportunities) * 100;

  useEffect(() => {
    if (remainingOpportunities === 0 && totalOpportunities > 0) {
      setShowConfetti(true);
      setShowCelebrationModal(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [remainingOpportunities, totalOpportunities]);

  useEffect(() => {
    if (timeSavedToday === 30 || timeSavedToday === 60 || timeSavedToday === 120) {
      const messages = {
        30: "🎯 30 minutes saved! You're on fire!",
        60: "🏆 1 hour saved! That's impressive!",
        120: "⭐ 2 hours saved! You're a productivity machine!",
      };
      toast({
        title: messages[timeSavedToday as 30 | 60 | 120],
        duration: 3000,
      });
    }
  }, [timeSavedToday, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "Warm":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "Follow-up":
        return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "Cold":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes("Call")) return Phone;
    if (action.includes("Send") || action.includes("Email")) return Mail;
    if (action.includes("Text") || action.includes("Message")) return MessageSquare;
    if (action.includes("Schedule") || action.includes("Demo")) return Calendar;
    return Mail;
  };

  const handleCompleteAction = async (lead: Lead) => {
    setLoadingAction(lead.id);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    toast({
      title: `✅ ${lead.action} to ${lead.name}`,
      description: `⏱️ Saved ${lead.timeSaved} minutes`,
      duration: 3000,
    });

    const newCompleted: CompletedAction = {
      id: lead.id,
      description: `${lead.action} ${lead.name}`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      timeSaved: lead.timeSaved,
    };

    setCompletedActions([newCompleted, ...completedActions]);
    setTimeSavedToday(timeSavedToday + lead.timeSaved);

    setTimeout(() => {
      setVisibleLeads(prev => prev.filter(l => l.id !== lead.id));
      
      setAllLeads(prev => {
        const updated = prev.filter(l => l.id !== lead.id);
        return updated.map((l, idx) => ({ ...l, priority: idx + 1 }));
      });
      
      setLoadingAction(null);
    }, 300);
  };

  const handleQuickWin = async (type: "checkins" | "calls" | "hotleads") => {
    const quickWinData = {
      checkins: { count: 8, time: 24, desc: "Daily check-ins sent" },
      calls: { count: 5, time: 10, desc: "Follow-up calls queued" },
      hotleads: { count: 3, time: 15, desc: "Hot leads viewed" },
    };

    const data = quickWinData[type];

    toast({
      title: `✅ ${data.desc} to ${data.count} leads`,
      description: `⏱️ Saved ${data.time} minutes`,
      duration: 3000,
    });

    setTimeSavedToday(timeSavedToday + data.time);
  };

  const handleLeadClick = (leadId: string) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    setAllLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
    setVisibleLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
    toast({
      title: "Lead Updated",
      description: `Changes saved for ${updatedLead.name}`,
    });
  };

  const getBannerGradient = () => {
    if (remainingOpportunities === 0) return "bg-gradient-to-r from-emerald-500 to-green-600";
    if (remainingOpportunities <= 3) return "bg-gradient-to-r from-emerald-500 to-teal-600";
    if (remainingOpportunities <= 7) return "bg-gradient-to-r from-blue-500 to-purple-600";
    return "bg-gradient-to-r from-amber-500 to-orange-600";
  };

  const getBannerText = () => {
    if (remainingOpportunities === 0) return "🎉 All caught up! Queue cleared!";
    if (remainingOpportunities <= 3) return `🎉 Almost there! ${remainingOpportunities} opportunities left`;
    return `You have ${remainingOpportunities} new opportunities today`;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#2C3E50] text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">CallX</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {/* My Workspace collapsible section */}
          <div>
            <button
              onClick={() => {
                if (!isWorkspaceActive) setActiveAgentView("workspace-live-calls");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isWorkspaceActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Phone className="w-5 h-5" />
              <span className="flex-1 text-left">My Workspace</span>
              {isWorkspaceActive ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {isWorkspaceActive && (
              <div className="ml-4 mt-1 space-y-0.5">
                {workspaceSubItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveAgentView(sub.id)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeAgentView === sub.id
                        ? "bg-white/15 text-white font-medium"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <sub.icon className="w-4 h-4" />
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveAgentView(item.id)}
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
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
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
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeAgentView.startsWith("workspace-") || activeAgentView === "live-calls" ? (
            <LiveCallWorkspace activeTab={agentWorkspaceTabMap[activeAgentView] || 'live-calls'} />
          ) : (
          <>
          {/* Priority Status Banner */}
          <section className={`${getBannerGradient()} rounded-2xl p-10 text-white shadow-2xl transition-all duration-600 border border-white/10 backdrop-blur-sm`}>
            <div className="text-center space-y-5">
              <h1 className="text-5xl font-extrabold tracking-tight">{getBannerText()}</h1>
              <p className="text-white/95 text-xl font-medium">
                {remainingOpportunities === 0 
                  ? `You saved ${timeSavedToday} minutes today!` 
                  : "Complete actions to clear your queue"}
              </p>
              <div className="flex items-center justify-center gap-8 text-sm font-medium bg-white/10 backdrop-blur-md rounded-full px-6 py-3 inline-flex mx-auto">
                <span className="flex items-center gap-2">⏱️ <strong>{timeSavedToday}</strong> minutes saved today</span>
                <span>•</span>
                <span><strong>{totalOpportunities - remainingOpportunities}</strong> of <strong>{totalOpportunities}</strong> completed</span>
                {progressPercentage >= 70 && <Trophy className="w-5 h-5 animate-bounce" />}
              </div>
              <div className="max-w-2xl mx-auto">
                <Progress value={progressPercentage} className="h-4 bg-white/20 border border-white/30 shadow-inner" />
              </div>
            </div>
          </section>

          {/* Your Next Moves Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Your Next Moves
              </h2>
              <p className="text-muted-foreground text-lg">
                {remainingOpportunities === 0 ? "All caught up! Great work!" : "Complete these to clear your queue"}
              </p>
            </div>
            
            {remainingOpportunities === 0 ? (
              <Card className="p-12 text-center">
                <CardContent className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">All caught up! Great work!</h3>
                  <p className="text-muted-foreground">Check back soon for new opportunities</p>
                  <Button 
                    onClick={() => setCompletedExpanded(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    Review Completed Actions
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {visibleLeads.map((lead) => {
                  const ActionIcon = getActionIcon(lead.action);
                  return (
                    <Card
                      key={lead.id}
                      className={`group relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm ${
                        loadingAction === lead.id ? "opacity-50" : "opacity-100"
                      }`}
                      onClick={() => handleLeadClick(lead.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <Badge className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10 shadow-lg">
                                #{lead.priority}
                              </Badge>
                              <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-lg font-bold">
                                  {lead.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-foreground">{lead.name}</h3>
                                <Badge className={`${getStatusColor(lead.status)} shadow-sm`}>
                                  {lead.status === "Hot Lead" && "🔥"} 
                                  {lead.status === "Warm" && "☀️"}
                                  {lead.status === "Follow-up" && "📋"}
                                  {lead.status === "Cold" && "❄️"}
                                  {lead.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1 font-medium">{lead.company}</p>
                              <p className="text-sm italic text-foreground/70 leading-relaxed">"{lead.context}"</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{lead.bestTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditLead(lead);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteAction(lead);
                              }}
                              disabled={loadingAction === lead.id}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                              {loadingAction === lead.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <ActionIcon className="w-4 h-4 mr-2" />
                                  {lead.action}
                                </>
                              )}
                            </Button>
                            <p className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                              💚 Saves {lead.timeSaved} min
                            </p>
                          </div>
                        </div>

                        {expandedLead === lead.id && <LeadDetailsPanel lead={lead} />}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Quick Wins Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Quick Wins
              </h2>
              <p className="text-muted-foreground text-lg">Batch actions to save time</p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <Badge className="bg-primary text-primary-foreground shadow-sm">8 leads</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Daily Check-ins</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send 'checking in' message to warm leads
                  </p>
                  <Badge className="bg-emerald-50 text-emerald-700 mb-4 font-semibold">
                    💚 Save 24 min
                  </Badge>
                  <Button
                    onClick={() => handleQuickWin("checkins")}
                    className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Send to All
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <Badge className="bg-primary text-primary-foreground shadow-sm">5 leads</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Follow-up Calls</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call leads who requested follow-up
                  </p>
                  <Badge className="bg-emerald-50 text-emerald-700 mb-4 font-semibold">
                    💚 Save 10 min
                  </Badge>
                  <Button
                    onClick={() => handleQuickWin("calls")}
                    className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Call Queue
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-destructive/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-destructive/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                      <Flame className="w-8 h-8 text-destructive animate-pulse" />
                    </div>
                    <Badge className="bg-destructive text-destructive-foreground shadow-sm animate-pulse">3 leads</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Hot Leads Alert</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Highly engaged in last 2 hours
                  </p>
                  <Badge className="bg-emerald-50 text-emerald-700 mb-4 font-semibold">
                    💚 Save 15 min
                  </Badge>
                  <Button
                    onClick={() => handleQuickWin("hotleads")}
                    className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    View All
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Completed Today Section */}
          {completedActions.length > 0 && (
            <section>
              <button
                onClick={() => setCompletedExpanded(!completedExpanded)}
                className="flex items-center gap-2 mb-4 text-xl font-bold hover:text-primary transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>✓ Completed Today ({completedActions.length})</span>
              </button>
              
              <div className="space-y-2">
                {(completedExpanded ? completedActions : completedActions.slice(0, 3)).map((action) => (
                  <Card key={action.id} className="bg-muted/50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{action.description}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{action.timestamp}</span>
                        <Badge variant="outline">Saved {action.timeSaved} min</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {completedActions.length > 3 && !completedExpanded && (
                  <button
                    onClick={() => setCompletedExpanded(true)}
                    className="text-primary hover:underline text-sm"
                  >
                    View All Activity
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Today's Stats Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Today's Stats</h2>
            <div className="grid grid-cols-4 gap-4">
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Calls Goal</span>
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
                      <span className="text-sm text-muted-foreground">Response Rate</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">68%</span>
                      <Badge className="text-xs bg-green-100 text-green-700">+5%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Actions Completed</span>
                      <Trophy className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-3xl font-bold">{completedActions.length}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold">94%</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          </>
          )}
        </main>
      </div>

      {/* Celebration Modal */}
      <Dialog open={showCelebrationModal} onOpenChange={setShowCelebrationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">🎉 Daily Summary 🎉</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3 text-center">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Actions Completed:</span>
                <span className="text-2xl font-bold">{completedActions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time Saved:</span>
                <span className="text-2xl font-bold">{timeSavedToday} minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Efficiency Rate:</span>
                <span className="text-2xl font-bold">94%</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground">
              That's like getting an extra hour to focus on closing deals!
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                View Detailed Report
              </Button>
              <Button onClick={() => setShowCelebrationModal(false)} className="flex-1 bg-[#10B981] hover:bg-[#059669]">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
      
      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
};

export default AgentDashboardActionFocused;
