
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Users,
  Mail,
  Link,
  FileText,
  PhoneCall,
  UsersRound
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  // Mock current plan - this would come from your auth/billing context in a real app
  const currentPlan = "agency_pro"; // Could be "agency_starter", "agency_pro", "enterprise"
  const isEnterprise = currentPlan === "enterprise";

  const menuItems = [
    { id: "general", label: "Admin", icon: <Settings className="w-5 h-5" /> },
    { id: "team", label: "Team Members", icon: <Users className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <PhoneCall className="w-5 h-5" /> },
    { id: "scripts", label: "Scripts & AI", icon: <FileText className="w-5 h-5" /> },
    ...(isEnterprise ? [{ id: "publishers", label: "Publishers", icon: <UsersRound className="w-5 h-5" /> }] : []),
    { id: "referrals", label: "Referral Program", icon: <Link className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Mail className="w-5 h-5" /> },
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
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
