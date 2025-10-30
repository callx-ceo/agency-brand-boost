
import React from "react";
import { 
  BarChart3, 
  Users, 
  Settings, 
  Phone, 
  FileText, 
  UserPlus, 
  Target,
  Gift,
  Bell,
  CreditCard,
  Home,
  Contact,
  History,
  UserCheck,
  Briefcase,
  Headphones,
  Mail,
  Palette
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const menuItems = [
    { 
      category: "Dashboard", 
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
      ]
    },
    { 
      category: "Agent Operations", 
      items: [
        { id: "go-live", label: "Go Live", icon: Headphones },
      ]
    },
    { 
      category: "Business Operations", 
      items: [
        { id: "offers", label: "Offers", icon: Briefcase },
        { id: "reports", label: "Realtime Report", icon: BarChart3 },
        { id: "applications", label: "Applications", icon: FileText },
        { id: "call-history", label: "Call History", icon: History },
        { id: "contacts", label: "Contacts", icon: Contact },
        { id: "leads-list", label: "Leads List", icon: UserCheck },
      ]
    },
    { 
      category: "Settings", 
      items: [
        { id: "general", label: "General", icon: Settings },
        { id: "team", label: "Team Members", icon: Users },
        { id: "branding", label: "Branding & Emails", icon: Palette },
        { id: "campaigns", label: "Campaigns", icon: Target },
        { id: "scripts", label: "Scripts & AI", icon: Phone },
        { id: "publishers", label: "Publishers", icon: UserPlus },
        { id: "referrals", label: "Referrals", icon: Gift },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "upgrade", label: "Upgrade Plans", icon: CreditCard },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Agency Portal</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((category) => (
          <div key={category.category} className="mb-6">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {category.category}
            </h3>
            <ul>
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
