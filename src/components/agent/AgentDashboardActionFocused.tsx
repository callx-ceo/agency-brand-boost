import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Leads", active: false },
    { icon: Phone, label: "Calls", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: BarChart3, label: "Performance", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

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
          {/* Priority Status Banner */}
          <section className={`${getBannerGradient()} rounded-xl p-8 text-white shadow-lg transition-all duration-600`}>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{getBannerText()}</h1>
              <p className="text-white/90 text-lg">
                {remainingOpportunities === 0 
                  ? `You saved ${timeSavedToday} minutes today!` 
                  : "Complete actions to clear your queue"}
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <span>⏱️ {timeSavedToday} minutes saved today</span>
                <span>•</span>
                <span>{totalOpportunities - remainingOpportunities} of {totalOpportunities} completed</span>
                {progressPercentage >= 70 && <Trophy className="w-5 h-5 animate-bounce" />}
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
            </div>
          </section>

          {/* Your Next Moves Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Your Next Moves</h2>
              <p className="text-muted-foreground">
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
                      className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                        loadingAction === lead.id ? "opacity-50" : "opacity-100"
                      }`}
                      onClick={() => handleLeadClick(lead.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <Badge className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold z-10">
                                #{lead.priority}
                              </Badge>
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                                  {lead.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold">{lead.name}</h3>
                                <Badge className={getStatusColor(lead.status)}>
                                  {lead.status === "Hot Lead" && "🔥"} 
                                  {lead.status === "Warm" && "☀️"}
                                  {lead.status === "Follow-up" && "📋"}
                                  {lead.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{lead.company}</p>
                              <p className="text-sm italic text-foreground/80">"{lead.context}"</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{lead.bestTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteAction(lead);
                              }}
                              disabled={loadingAction === lead.id}
                              className="bg-[#10B981] hover:bg-[#059669] text-white font-medium px-6 py-6 text-base mb-2 transition-transform hover:scale-105"
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
                            <p className="text-xs text-muted-foreground">💚 Saves {lead.timeSaved} min</p>
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Quick Wins</h2>
              <p className="text-muted-foreground">Batch actions to save time</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="transition-all hover:shadow-lg hover:-translate-y-1 relative">
                <Badge className="absolute top-4 right-4 bg-blue-500">8 leads</Badge>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Daily Check-ins</h3>
                      <p className="text-sm text-muted-foreground">Send 'checking in' message to warm leads</p>
                      <Badge className="mt-2 bg-emerald-100 text-emerald-700">💚 Save 24 min</Badge>
                    </div>
                    <Button 
                      onClick={() => handleQuickWin("checkins")}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      Send to All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:-translate-y-1 relative">
                <Badge className="absolute top-4 right-4 bg-blue-500">5 leads</Badge>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Follow-up Calls</h3>
                      <p className="text-sm text-muted-foreground">Call leads who requested follow-up</p>
                      <Badge className="mt-2 bg-emerald-100 text-emerald-700">💚 Save 10 min</Badge>
                    </div>
                    <Button 
                      onClick={() => handleQuickWin("calls")}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      Start Call Queue
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-red-500/20 relative">
                <Badge className="absolute top-4 right-4 bg-red-500">3 leads</Badge>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Hot Leads Alert</h3>
                      <p className="text-sm text-muted-foreground">Highly engaged in last 2 hours</p>
                      <Badge className="mt-2 bg-emerald-100 text-emerald-700">💚 Save 15 min</Badge>
                    </div>
                    <Button 
                      onClick={() => handleQuickWin("hotleads")}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      View All
                    </Button>
                  </div>
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
    </div>
  );
};

export default AgentDashboardActionFocused;
