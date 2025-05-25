
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, FileText, Calendar } from "lucide-react";

interface ComplianceReportingProps {
  onBackToDashboard: () => void;
}

const ComplianceReporting = ({ onBackToDashboard }: ComplianceReportingProps) => {
  const complianceAreas = [
    { name: "GDPR Compliance", score: 98, status: "compliant", lastAudit: "Nov 15, 2024" },
    { name: "CCPA Compliance", score: 96, status: "compliant", lastAudit: "Nov 10, 2024" },
    { name: "SOX Compliance", score: 89, status: "warning", lastAudit: "Oct 25, 2024" },
    { name: "HIPAA Compliance", score: 95, status: "compliant", lastAudit: "Nov 12, 2024" },
    { name: "PCI DSS", score: 93, status: "compliant", lastAudit: "Nov 8, 2024" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant": return <Badge variant="default" className="bg-green-100 text-green-800">Compliant</Badge>;
      case "warning": return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Warning</Badge>;
      default: return <Badge variant="destructive">Non-Compliant</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance Reporting</h1>
          <p className="text-gray-600">Regulatory compliance and audit trail management</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Audits</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Audit</p>
                <p className="text-2xl font-bold">Dec 15</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(area.status)}
                  <div>
                    <div className="font-medium">{area.name}</div>
                    <div className="text-sm text-muted-foreground">Last audit: {area.lastAudit}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{area.score}%</div>
                  {getStatusBadge(area.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceReporting;
