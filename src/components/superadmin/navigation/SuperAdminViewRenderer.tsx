
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
  switch (activeView) {
    case 'agencies':
      return <AgencyManagement onViewAgencyAgents={onViewAgencyAgents} />;
    
    case 'agents':
      return <AgentManagement />;
    
    case 'advertisers':
      return <AdvertiserManagement />;
    
    case 'publishers':
      return <PublisherManagement />;
    
    case 'campaigns':
      return <CampaignManagement />;
    
    case 'offers':
      return <OfferManagement />;
    
    case 'analytics':
      return <AdvancedAnalytics />;
    
    case 'compliance':
      return <ComplianceReporting />;
    
    case 'system-health':
      return <SystemHealthMonitor />;
    
    case 'user-management':
      return <UserRoleManagement />;
    
    case 'global-reporting':
      return <GlobalReporting onBackToDashboard={() => onViewChange('dashboard')} />;
    
    case 'agency-agents':
      return selectedAgencyId ? (
        <AgencyAgentsView 
          agencyId={selectedAgencyId} 
          onBack={() => onViewChange('agencies')} 
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
