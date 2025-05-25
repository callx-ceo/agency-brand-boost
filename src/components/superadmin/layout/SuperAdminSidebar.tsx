import React from "react";
import { cn } from "@/lib/utils";
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
  FileText,
  Settings,
  Bell,
  AlertTriangle,
  Server,
  Database,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type SuperAdminViewType = 
  | 'dashboard' 
  | 'agencies' 
  | 'agents' 
  | 'advertisers' 
  | 'publishers' 
  | 'analytics' 
  | 'compliance' 
  | 'system-health'
  | 'user-management'
  | 'global-reporting'
  | 'agency-agents';

interface SuperAdminSidebarProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

const SuperAdminSidebar = ({ activeView, onViewChange }: SuperAdminSidebarProps) => {
  // Mock system alerts count
  const systemAlerts = 3;
  const complianceAlerts = 1;

  // Dashboard & Overview sections
  const dashboardSections = [
    { id: "dashboard", label: "Executive Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "analytics", label: "Advanced Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "global-reporting", label: "Global Reporting", icon: <FileText className="w-5 h-5" /> },
  ];

  // Entity Management sections
  const entitySections = [
    { id: "agencies", label: "Agencies", icon: <Building2 className="w-5 h-5" /> },
    { id: "agents", label: "Agents", icon: <Users className="w-5 h-5" /> },
    { id: "advertisers", label: "Advertisers", icon: <Megaphone className="w-5 h-5" /> },
    { id: "publishers", label: "Publishers", icon: <Globe className="w-5 h-5" /> },
  ];

  // System & Administration sections
  const systemSections = [
    { 
      id: "system-health", 
      label: "System Health", 
      icon: <Server className="w-5 h-5" />,
      badge: systemAlerts > 0 ? systemAlerts : undefined,
      badgeVariant: "destructive" as const
    },
    { 
      id: "compliance", 
      label: "Compliance", 
      icon: <Shield className="w-5 h-5" />,
      badge: complianceAlerts > 0 ? complianceAlerts : undefined,
      badgeVariant: "secondary" as const
    },
    { id: "user-management", label: "User Management", icon: <UserCheck className="w-5 h-5" /> },
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
