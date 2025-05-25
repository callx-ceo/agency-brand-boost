
import React from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import CampaignsReport from "./CampaignsReport";
import AgentReports from "@/components/dashboard/AgentReports";
import AgencyReports from "./AgencyReports";
import RealtimeReport from "@/components/dashboard/RealtimeReport";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface ReportRendererProps {
  activeView: SuperAdminViewType;
  onBackToDashboard: () => void;
}

const PlaceholderReport = ({ 
  title, 
  description, 
  onBackToDashboard 
}: { 
  title: string; 
  description: string; 
  onBackToDashboard: () => void;
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </div>

    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ReportRenderer = ({ activeView, onBackToDashboard }: ReportRendererProps) => {
  switch (activeView) {
    case 'reports-realtime':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Realtime Report</h1>
              <p className="text-gray-600">Real-time call monitoring and system activity</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <RealtimeReport />
        </div>
      );
    
    case 'reports-campaigns':
      return <CampaignsReport onBackToDashboard={onBackToDashboard} />;
    
    case 'reports-agents':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Agent Reports</h1>
              <p className="text-gray-600">Agent performance across all agencies</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <AgentReports />
        </div>
      );
    
    case 'reports-agencies':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Agency Reports</h1>
              <p className="text-gray-600">Agency performance metrics and analytics</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <AgencyReports />
        </div>
      );
    
    case 'reports-campaigns-by-publisher':
      return (
        <PlaceholderReport 
          title="Campaigns by Publisher"
          description="Campaign performance broken down by publisher"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-publisher-by-manager':
      return (
        <PlaceholderReport 
          title="Publisher by Manager"
          description="Publisher performance organized by account managers"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-offers':
      return (
        <PlaceholderReport 
          title="Offers Report"
          description="Complete offers performance and conversion data"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-offers-by-publisher':
      return (
        <PlaceholderReport 
          title="Offers by Publisher"
          description="Offer performance segmented by publisher"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-promo-numbers':
      return (
        <PlaceholderReport 
          title="Promo Numbers Report"
          description="Promotional number usage and performance tracking"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-offers-by-promo':
      return (
        <PlaceholderReport 
          title="Offers by Promo Number"
          description="Offer performance tied to specific promotional numbers"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-advertisers':
      return (
        <PlaceholderReport 
          title="Advertisers Report"
          description="Advertiser performance and spend analytics"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-publishers':
      return (
        <PlaceholderReport 
          title="Publishers Report"
          description="Publisher performance and revenue analytics"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-ivr-fees':
      return (
        <PlaceholderReport 
          title="IVR Fees Report"
          description="Interactive Voice Response system fees and usage"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    case 'reports-key-press':
      return (
        <PlaceholderReport 
          title="Key Press Report"
          description="Call key press analytics and conversion tracking"
          onBackToDashboard={onBackToDashboard}
        />
      );
    
    default:
      return <div>Report not found</div>;
  }
};

export default ReportRenderer;
