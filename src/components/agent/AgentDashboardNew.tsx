import React, { useState, useEffect } from "react";
import RecommendedActions from "./RecommendedActions";
import InboxPanel from "./InboxPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  History, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  Power,
  Gift
} from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import ImpersonationBanner from "@/components/ImpersonationBanner";
import AgentContactsView from "./AgentContactsView";
import AgentApplicationsView from "./AgentApplicationsView";
import AgentHistoryView from "./AgentHistoryView";
import AgentSettingsView from "./AgentSettingsView";
import AgentInsights from "./AgentInsights";
import { ReferralDashboard } from "./ReferralDashboard";

const AgentDashboardNew = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [timeOnline, setTimeOnline] = useState("00:00:00");
  const [activeNav, setActiveNav] = useState("home");
  const { isImpersonating, impersonatedAgent } = useImpersonation();

  // Mock agent data
  const agentData = {
    name: isImpersonating ? impersonatedAgent?.name || "Sean Frank" : "Sean Frank",
    calls: 0,
    applications: 0,
    closeRate: 0,
    credits: 250.00 // Available credits balance
  };

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", active: true },
    { id: "inbox", icon: Users, label: "Inbox", active: false },
    { id: "history", icon: History, label: "History", active: false },
    { id: "contacts", icon: Users, label: "Contacts", active: false },
    { id: "applications", icon: FileText, label: "Applications", active: false },
    { id: "referrals", icon: Gift, label: "Referrals", active: false },
    { id: "settings", icon: Settings, label: "Settings", active: false },
    { id: "support", icon: HelpCircle, label: "Support", active: false }
  ];

  // Timer effect for time online
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOnline) {
      interval = setInterval(() => {
        setTimeOnline(prev => {
          const [hours, minutes, seconds] = prev.split(':').map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;
          return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-white text-xl font-bold">CallX</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      isActive 
                        ? "bg-blue-600 text-white" 
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Status Toggle */}
        <div className="p-4 border-t border-slate-700">
          <div className="space-y-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isOnline 
                  ? "bg-green-600 text-white" 
                  : "bg-slate-600 text-slate-300"
              }`}
            >
              <Power className="w-4 h-4" />
              {isOnline ? "ON" : "OFF"}
            </button>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <span>Credits</span>
                <span className={`font-medium ${agentData.credits < 100 ? 'text-orange-400' : 'text-slate-300'}`}>
                  ${agentData.credits.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Impersonation Banner */}
        {isImpersonating && <ImpersonationBanner />}

        {/* Status Bar */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Status Badge */}
            <div className="flex items-center gap-4">
              <Badge 
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium ${
                  isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeOnline}</div>
                <div className="text-sm text-gray-500">Time Online Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agentData.calls}</div>
                <div className="text-sm text-gray-500">Calls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agentData.applications}</div>
                <div className="text-sm text-gray-500">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agentData.closeRate}</div>
                <div className="text-sm text-gray-500">Close Rate %</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium">{agentData.name}</div>
                <div className="text-sm text-gray-500">Agent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {activeNav === "home" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Agent Dashboard</h1>
                <div className="text-sm text-gray-500">
                  Welcome back, {agentData.name}
                </div>
              </div>
              
              {!isOnline && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">You are currently offline</h2>
                    <p className="text-gray-600 mb-4">Review your AI insights below, then click "Go Online" when you're ready to start receiving calls.</p>
                    <Button 
                      onClick={() => setIsOnline(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Go Online
                    </Button>
                  </CardContent>
                </Card>
              )}

              {isOnline && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Ready for calls</h2>
                    <p className="text-gray-600">You are online and ready to receive calls.</p>
                  </CardContent>
                </Card>
              )}

              {/* Today's Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600">{agentData.calls}</div>
                    <div className="text-sm text-gray-500">Calls Today</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600">{agentData.applications}</div>
                    <div className="text-sm text-gray-500">Applications Today</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600">{agentData.closeRate}%</div>
                    <div className="text-sm text-gray-500">Close Rate Today</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommended Actions */}
              <RecommendedActions />

              {/* AI Insights Section */}
              <AgentInsights agentData={agentData} />
            </div>
          )}

          {activeNav === "inbox" && <InboxPanel />}
          {activeNav === "contacts" && <AgentContactsView />}
          {activeNav === "applications" && <AgentApplicationsView />}
          {activeNav === "history" && <AgentHistoryView />}
          {activeNav === "referrals" && <ReferralDashboard />}
          {activeNav === "settings" && <AgentSettingsView />}
          
          {activeNav === "support" && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Support</h2>
              <div className="text-gray-500">
                Contact support for assistance with the platform.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardNew;