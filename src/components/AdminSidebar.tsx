
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
  History
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "general", label: "Admin", icon: <Settings className="w-5 h-5" /> },
    { id: "team", label: "Team Members", icon: <Users className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <PhoneCall className="w-5 h-5" /> },
    { id: "scripts", label: "Scripts & AI", icon: <FileText className="w-5 h-5" /> },
    { 
      id: "publishers", 
      label: "Publishers", 
      icon: isEnterprise ? <UsersRound className="w-5 h-5" /> : <Lock className="w-5 h-5" />,
      isGated: !isEnterprise,
      requiredPlan: "Enterprise"
    },
    { id: "reports", label: "Reports", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "call-history", label: "Call History", icon: <History className="w-5 h-5" /> },
    { id: "contacts", label: "Contacts", icon: <UserCheck className="w-5 h-5" /> },
    { id: "referrals", label: "Referral Program", icon: <Link className="w-5 h-5" /> },
    { 
      id: "notifications", 
      label: "Notifications", 
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    { id: "upgrade", label: "Upgrade Plan", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <div className="mb-6 px-4 pt-2">
        <h2 className="text-xl font-bold">CallX</h2>
        <p className="text-sm text-gray-500">Agency Admin</p>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
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
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
