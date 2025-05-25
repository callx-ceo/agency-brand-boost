import React from "react";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Users,
  Mail,
  Link,
  FileText,
  PhoneCall,
  UsersRound,
  Lock,
  Bell,
  BarChart3,
  Clock,
  UserCheck,
  History,
  ClipboardList,
  LayoutDashboard,
  Activity,
  UserPlus,
  Megaphone,
  Bot,
  CreditCard,
  List
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

type PlanTier = "agency_starter" | "agency_pro" | "enterprise";

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  // Mock current plan - starting with starter to show gating
  const currentPlan = "agency_starter" as PlanTier;
  const isEnterprise = currentPlan === "enterprise";

  // Mock unread notifications count
  const unreadNotifications = 3;

  // Main Dashboard & Reports sections
  const mainSections = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "reports", label: "Realtime Report", icon: <Activity className="w-5 h-5" /> },
    { id: "applications", label: "Applications", icon: <ClipboardList className="w-5 h-5" /> },
    { id: "call-history", label: "Call History", icon: <History className="w-5 h-5" /> },
    { id: "contacts", label: "Contacts", icon: <UserCheck className="w-5 h-5" /> },
    { id: "leads-list", label: "Leads List", icon: <List className="w-5 h-5" /> },
  ];

  // Agency Management sections
  const managementSections = [
    { id: "team", label: "Team Members", icon: <Users className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <Megaphone className="w-5 h-5" /> },
    { id: "scripts", label: "Scripts & AI", icon: <Bot className="w-5 h-5" /> },
    { 
      id: "publishers", 
      label: "Publishers", 
      icon: isEnterprise ? <UsersRound className="w-5 h-5" /> : <Lock className="w-5 h-5" />,
      isGated: !isEnterprise,
      requiredPlan: "Enterprise"
    },
  ];

  // Admin & Settings sections
  const adminSections = [
    { id: "general", label: "Admin Settings", icon: <Settings className="w-5 h-5" /> },
    { 
      id: "notifications", 
      label: "Notifications", 
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    { id: "referrals", label: "Referral Program", icon: <UserPlus className="w-5 h-5" /> },
    { id: "upgrade", label: "Upgrade Plan", icon: <CreditCard className="w-5 h-5" /> },
  ];

  const renderMenuItem = (item: any) => (
    <li key={item.id} className="mb-1">
      <button
        onClick={() => setActiveSection(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors",
          activeSection === item.id
            ? "bg-blue-50 text-blue-600"
            : item.isGated 
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
        )}
        disabled={item.isGated}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
        {item.isGated && (
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            {item.requiredPlan}
          </span>
        )}
        {item.badge && (
          <Badge variant="destructive" className="text-xs">
            {item.badge}
          </Badge>
        )}
      </button>
    </li>
  );

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <div className="mb-6 px-4 pt-2">
        <h2 className="text-xl font-bold">CallX</h2>
        <p className="text-sm text-gray-500">Agency Portal</p>
      </div>
      
      <nav>
        {/* Dashboard & Reports */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Dashboard & Reports
          </h3>
          <ul>
            {mainSections.map(renderMenuItem)}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Agency Management */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Agency Management
          </h3>
          <ul>
            {managementSections.map(renderMenuItem)}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Admin & Settings */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Admin & Settings
          </h3>
          <ul>
            {adminSections.map(renderMenuItem)}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
