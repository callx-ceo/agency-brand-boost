
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface ComplianceMonitorWidgetProps {
  score: number;
}

const ComplianceMonitorWidget = ({ score }: ComplianceMonitorWidgetProps) => {
  const complianceChecks = [
    { name: "GDPR Compliance", status: "compliant", lastCheck: "2 hours ago" },
    { name: "CCPA Compliance", status: "compliant", lastCheck: "4 hours ago" },
    { name: "SOX Compliance", status: "warning", lastCheck: "1 day ago" },
    { name: "HIPAA Compliance", status: "compliant", lastCheck: "6 hours ago" },
    { name: "PCI DSS", status: "compliant", lastCheck: "3 hours ago" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "pending": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant": return <Badge variant="default" className="bg-green-100 text-green-800">Compliant</Badge>;
      case "warning": return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Warning</Badge>;
      case "pending": return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="destructive">Non-Compliant</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Compliance Monitor</CardTitle>
        <Shield className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{score}%</div>
          <p className="text-xs text-muted-foreground">Compliance Score</p>
        </div>

        <div className="space-y-2">
          {complianceChecks.map((check) => (
            <div key={check.name} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <div>
                  <div className="text-sm font-medium">{check.name}</div>
                  <div className="text-xs text-muted-foreground">{check.lastCheck}</div>
                </div>
              </div>
              {getStatusBadge(check.status)}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground text-center">
            Next audit: December 15, 2024
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceMonitorWidget;
