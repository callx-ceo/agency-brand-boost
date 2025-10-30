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
  Hash,
  ContactRound,
  UserCog,
  Target,
  UserPlus,
  Package,
  ClipboardList,
  Gift,
  Mail,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SuperAdminSidebarProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

const SuperAdminSidebar = ({ activeView, onViewChange }: SuperAdminSidebarProps) => {
  const [reportsExpanded, setReportsExpanded] = useState(true);
  
  // Mock data for alert badges
  const mockAlerts = {
    pendingAgencies: 3,
    suspendedAgents: 8,
    fraudAlerts: 2,
    complianceIssues: 1,
    systemAlerts: 5,
    newLeads: 47,
    pendingContacts: 12,
    pendingApplications: 15,
    apiFailures: 5
  };

  // Dashboard & Analytics sections
  const dashboardSections = [
    { id: "dashboard", label: "Executive Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "analytics", label: "Advanced Analytics", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "compliance", label: "Compliance Reporting", icon: <Shield className="w-5 h-5" /> },
  ];

  // Reports sections
  const reportSections = [
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
    { id: "verticals", label: "Verticals", icon: <Target className="w-5 h-5" /> },
    { id: "languages", label: "Languages", icon: <Globe className="w-5 h-5" /> },
  ];

  // Agency Management sections - NEW SECTION
  const agencyManagementSections = [
    { 
      id: "agency-applications", 
      label: "Agency Applications", 
      icon: <ClipboardList className="w-5 h-5" />,
      badge: mockAlerts.pendingApplications > 0 ? mockAlerts.pendingApplications : undefined
    },
    { id: "products", label: "Products", icon: <Package className="w-5 h-5" /> },
    { id: "carriers", label: "Carriers", icon: <Building2 className="w-5 h-5" /> },
  ];

  // Lead & Contact Management sections
  const leadContactSections = [
    { 
      id: "leads", 
      label: "Leads Management", 
      icon: <Target className="w-5 h-5" />,
      badge: mockAlerts.newLeads > 0 ? mockAlerts.newLeads : undefined,
      badgeVariant: "secondary" as const
    },
    { 
      id: "contacts", 
      label: "Contacts Management", 
      icon: <ContactRound className="w-5 h-5" />,
      badge: mockAlerts.pendingContacts > 0 ? mockAlerts.pendingContacts : undefined
    },
    { 
      id: "customers", 
      label: "Customer Management", 
      icon: <Users className="w-5 h-5" />
    },
  ];

  // Billing & Finance sections
  const billingSections = [
    { id: "billing-management", label: "Billing Management", icon: <DollarSign className="w-5 h-5" /> },
    { id: "referral-management", label: "Referral Management", icon: <Gift className="w-5 h-5" /> },
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
    { id: "notification-settings", label: "Notification Settings", icon: <Bell className="w-5 h-5" /> },
    { id: "goals-management", label: "Goals Management", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "prompt-management", label: "AI Prompt Management", icon: <Settings className="w-5 h-5" /> },
    { id: "email-template-management", label: "Email Templates", icon: <Mail className="w-5 h-5" /> },
    { 
      id: "cost-api-management", 
      label: "Cost & API Management", 
      icon: <DollarSign className="w-5 h-5" />,
      badge: mockAlerts.apiFailures > 0 ? mockAlerts.apiFailures : undefined
    },
    { id: "minimum-bid-management", label: "Minimum Bid Management", icon: <Target className="w-5 h-5" /> },
    { id: "call-settings-management", label: "Call Settings Management", icon: <PhoneCall className="w-5 h-5" /> },
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
              <div
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left",
                  activeView.startsWith('reports-')
                    ? "text-blue-600"
                    : "text-gray-700"
                )}
              >
                <FileText className="w-5 h-5" />
                <span className="flex-1">All Reports</span>
                <button
                  onClick={() => setReportsExpanded(!reportsExpanded)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {reportsExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
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

        {/* Agency Management - NEW SECTION */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Agency Management
          </h3>
          <ul>
            {agencyManagementSections.map(renderMenuItem)}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Lead & Contact Management */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Lead & Contact Management
          </h3>
          <ul>
            {leadContactSections.map(renderMenuItem)}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Billing & Finance */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Billing & Finance
          </h3>
          <ul>
            {billingSections.map(renderMenuItem)}
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
