
import React from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import AgencyManagement from "../entities/AgencyManagement";
import AgentManagement from "../entities/AgentManagement";
import AdvertiserManagement from "../entities/AdvertiserManagement";
import PublisherManagement from "../entities/PublisherManagement";
import AdvancedAnalytics from "../analytics/AdvancedAnalytics";
import ComplianceReporting from "../analytics/ComplianceReporting";
import SystemHealthMonitor from "../dashboard/SystemHealthMonitor";
import UserRoleManagement from "../entities/UserRoleManagement";
import GlobalReporting from "../reporting/GlobalReporting";
import AgencyAgentsView from "../entities/AgencyAgentsView";
import CampaignManagement from "../entities/CampaignManagement";
import OfferManagement from "../entities/OfferManagement";

interface SuperAdminViewRendererProps {
  activeView: SuperAdminViewType;
  selectedAgencyId: string | null;
  onViewChange: (view: SuperAdminViewType) => void;
  onViewAgencyAgents: (agencyId: string) => void;
}

const SuperAdminViewRenderer = ({ 
  activeView, 
  selectedAgencyId, 
  onViewChange, 
  onViewAgencyAgents 
}: SuperAdminViewRendererProps) => {
  const handleBackToDashboard = () => onViewChange('dashboard');
  const handleBackToAgencies = () => onViewChange('agencies');

  switch (activeView) {
    case 'agencies':
      return <AgencyManagement onBackToDashboard={handleBackToDashboard} onViewAgents={onViewAgencyAgents} />;
    case 'agents':
      return <AgentManagement onBackToDashboard={handleBackToDashboard} />;
    case 'agency-agents':
      return <AgencyAgentsView agencyId={selectedAgencyId!} onBackToAgencies={handleBackToAgencies} />;
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
      return <GlobalReporting onBackToDashboard={handleBackToDashboard} />;
    default:
      return null;
  }
};

export default SuperAdminViewRenderer;
