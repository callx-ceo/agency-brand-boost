
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import { 
  LayoutDashboard,
  Building2,
  Users,
  Megaphone,
  Globe,
  BarChart3,
  Shield,
  Activity,
  UserCheck,
  Settings,
  TrendingUp,
  PhoneCall,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronRight,
  Hash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SuperAdminSidebarProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

const SuperAdminSidebar = ({ activeView, onViewChange }: SuperAdminSidebarProps) => {
  const [reportsExpanded, setReportsExpanded] = useState(false);
  
  // Mock data for alert badges
  const mockAlerts = {
    pendingAgencies: 3,
    suspendedAgents: 8,
    fraudAlerts: 2,
    complianceIssues: 1,
    systemAlerts: 5
  };

  // Dashboard & Analytics sections
  const dashboardSections = [
    { id: "dashboard", label: "Executive Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "analytics", label: "Advanced Analytics", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "compliance", label: "Compliance Reporting", icon: <Shield className="w-5 h-5" /> },
  ];

  // Reports sections
  const reportSections = [
    { id: "reports-campaigns", label: "Campaigns", icon: <PhoneCall className="w-4 h-4" /> },
    { id: "reports-campaigns-by-publisher", label: "Campaigns by Publisher", icon: <Users className="w-4 h-4" /> },
    { id: "reports-publisher-by-manager", label: "Publisher by Manager", icon: <UserCheck className="w-4 h-4" /> },
    { id: "reports-offers", label: "Offers", icon: <DollarSign className="w-4 h-4" /> },
    { id: "reports-offers-by-publisher", label: "Offers by Publisher", icon: <Globe className="w-4 h-4" /> },
    { id: "reports-promo-numbers", label: "Promo Numbers", icon: <Hash className="w-4 h-4" /> },
    { id: "reports-offers-by-promo", label: "Offers by Promo #", icon: <Hash className="w-4 h-4" /> },
    { id: "reports-advertisers", label: "Advertisers", icon: <Megaphone className="w-4 h-4" /> },
    { id: "reports-publishers", label: "Publishers", icon: <Globe className="w-4 h-4" /> },
    { id: "reports-ivr-fees", label: "IVR Fees", icon: <PhoneCall className="w-4 h-4" /> },
    { id: "reports-key-press", label: "Key Press", icon: <Hash className="w-4 h-4" /> },
  ];

  // Entity Management sections
  const entitySections = [
    { 
      id: "agencies", 
      label: "Agencies", 
      icon: <Building2 className="w-5 h-5" />,
      badge: mockAlerts.pendingAgencies > 0 ? mockAlerts.pendingAgencies : undefined
    },
    { 
      id: "agents", 
      label: "Agents", 
      icon: <Users className="w-5 h-5" />,
      badge: mockAlerts.suspendedAgents > 0 ? mockAlerts.suspendedAgents : undefined
    },
    { id: "advertisers", label: "Advertisers", icon: <Megaphone className="w-5 h-5" /> },
    { id: "publishers", label: "Publishers", icon: <Globe className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <PhoneCall className="w-5 h-5" /> },
    { id: "offers", label: "Offers", icon: <DollarSign className="w-5 h-5" /> },
  ];

  // System & Administration sections
  const systemSections = [
    { 
      id: "system-health", 
      label: "System Health", 
      icon: <Activity className="w-5 h-5" />,
      badge: mockAlerts.systemAlerts > 0 ? mockAlerts.systemAlerts : undefined
    },
    { id: "user-management", label: "User & Role Management", icon: <UserCheck className="w-5 h-5" /> },
    { id: "settings", label: "Platform Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const renderMenuItem = (item: any) => (
    <li key={item.id} className="mb-1">
      <button
        onClick={() => onViewChange(item.id as SuperAdminViewType)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors",
          activeView === item.id
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <Badge variant={item.badgeVariant || "outline"} className="text-xs">
            {item.badge}
          </Badge>
        )}
      </button>
    </li>
  );

  const renderReportsMenuItem = (item: any) => (
    <li key={item.id} className="mb-1">
      <button
        onClick={() => onViewChange(item.id as SuperAdminViewType)}
        className={cn(
          "w-full flex items-center gap-3 px-6 py-2 rounded-md text-left transition-colors text-sm",
          activeView === item.id
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
      </button>
    </li>
  );

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <div className="mb-6 px-4 pt-2">
        <h2 className="text-xl font-bold">CallX</h2>
        <p className="text-sm text-gray-500">SuperAdmin Portal</p>
      </div>
      
      <nav>
        {/* Dashboard & Overview */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Dashboard & Analytics
          </h3>
          <ul>
            {dashboardSections.map(renderMenuItem)}
          </ul>
        </div>

        {/* Reports Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Reports
          </h3>
          <ul>
            <li className="mb-1">
              <button
                onClick={() => setReportsExpanded(!reportsExpanded)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors",
                  reportsExpanded || activeView.startsWith('reports-')
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <FileText className="w-5 h-5" />
                <span className="flex-1">All Reports</span>
                {reportsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </li>
            {(reportsExpanded || activeView.startsWith('reports-')) && (
              <div className="ml-2">
                {reportSections.map(renderReportsMenuItem)}
              </div>
            )}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Entity Management */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Entity Management
          </h3>
          <ul>
            {entitySections.map(renderMenuItem)}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* System & Administration */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            System & Administration
          </h3>
          <ul>
            {systemSections.map(renderMenuItem)}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SuperAdminSidebar;
