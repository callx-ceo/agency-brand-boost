
import React from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import AgencyManagement from "../entities/AgencyManagement";
import AgentManagement from "../entities/AgentManagement";
import AdvertiserManagement from "../entities/AdvertiserManagement";
import PublisherManagement from "../entities/PublisherManagement";
import CampaignManagement from "../entities/CampaignManagement";
import OfferManagement from "../entities/OfferManagement";
import AdvancedAnalytics from "../analytics/AdvancedAnalytics";
import ComplianceReporting from "../analytics/ComplianceReporting";
import SystemHealthMonitor from "../dashboard/SystemHealthMonitor";
import UserRoleManagement from "../entities/UserRoleManagement";
import GlobalReporting from "../reporting/GlobalReporting";
import AgencyAgentsView from "../entities/AgencyAgentsView";
import ContactsReports from "@/components/dashboard/ContactsReports";

interface SuperAdminViewRendererProps {
  activeView: SuperAdminViewType;
  selectedAgencyId?: string | null;
  onViewChange: (view: SuperAdminViewType) => void;
  onViewAgencyAgents: (agencyId: string) => void;
}

const SuperAdminViewRenderer = ({ 
  activeView, 
  selectedAgencyId, 
  onViewChange, 
  onViewAgencyAgents 
}: SuperAdminViewRendererProps) => {
  const handleBackToDashboard = () => {
    onViewChange('dashboard');
  };

  switch (activeView) {
    case 'agencies':
      return <AgencyManagement onViewAgents={onViewAgencyAgents} onBackToDashboard={handleBackToDashboard} />;
    
    case 'agents':
      return <AgentManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'advertisers':
      return <AdvertiserManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'publishers':
      return <PublisherManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'campaigns':
      return <CampaignManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'offers':
      return <OfferManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'analytics':
      return <AdvancedAnalytics onBackToDashboard={handleBackToDashboard} />;
    
    case 'compliance':
      return <ComplianceReporting onBackToDashboard={handleBackToDashboard} />;
    
    case 'system-health':
      return <SystemHealthMonitor onBackToDashboard={handleBackToDashboard} />;
    
    case 'user-management':
      return <UserRoleManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'global-reporting':
      return <GlobalReporting onBackToDashboard={() => onViewChange('dashboard')} />;
    
    case 'agency-agents':
      return selectedAgencyId ? (
        <AgencyAgentsView 
          agencyId={selectedAgencyId} 
          onBackToAgencies={() => onViewChange('agencies')} 
        />
      ) : (
        <div>No agency selected</div>
      );

    case 'contacts':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Global Contacts</h1>
              <p className="text-gray-600">Contact management across all agencies</p>
            </div>
          </div>
          <ContactsReports />
        </div>
      );
    
    default:
      return <div>View not found</div>;
  }
};

export default SuperAdminViewRenderer;
