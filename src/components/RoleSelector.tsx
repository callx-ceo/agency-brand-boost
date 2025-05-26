
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Building2, 
  Users, 
  Megaphone, 
  Headphones,
  UserCheck
} from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon";
  onClick: () => void;
}

const RoleCard = ({ title, description, icon, status, onClick }: RoleCardProps) => (
  <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
    <CardHeader className="text-center">
      <div className="mx-auto mb-4 p-3 rounded-full bg-blue-100 w-fit">
        {icon}
      </div>
      <CardTitle className="flex items-center justify-center gap-2">
        {title}
        {status === "coming-soon" && (
          <Badge variant="secondary" className="text-xs">
            Coming Soon
          </Badge>
        )}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button 
        onClick={onClick}
        className="w-full" 
        disabled={status === "coming-soon"}
        variant={status === "active" ? "default" : "outline"}
      >
        {status === "active" ? "Enter Dashboard" : "Coming Soon"}
      </Button>
    </CardContent>
  </Card>
);

const RoleSelector = () => {
  const roles = [
    {
      title: "Super Admin",
      description: "Platform-wide administration, system management, and global oversight",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      status: "active" as const,
      path: "/super-admin"
    },
    {
      title: "Agency",
      description: "Manage campaigns, agents, and client relationships",
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      status: "active" as const,
      path: "/agency"
    },
    {
      title: "Publisher",
      description: "Content publishing, lead generation, and performance tracking",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      status: "coming-soon" as const,
      path: "/publisher"
    },
    {
      title: "Advertiser",
      description: "Campaign creation, budget management, and ROI optimization",
      icon: <Megaphone className="w-8 h-8 text-blue-600" />,
      status: "coming-soon" as const,
      path: "/advertiser"
    },
    {
      title: "Guide",
      description: "Pre-qualify and screen incoming calls, customer service support",
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      status: "coming-soon" as const,
      path: "/guide"
    },
    {
      title: "Agent",
      description: "Handle calls, manage leads, and track performance metrics",
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      status: "coming-soon" as const,
      path: "/agent"
    }
  ];

  const handleRoleClick = (path: string, status: string) => {
    if (status === "active") {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CallX Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and tools tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {roles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              icon={role.icon}
              status={role.status}
              onClick={() => handleRoleClick(role.path, role.status)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Currently in development: Additional role dashboards will be available soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
