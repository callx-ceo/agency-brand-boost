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
import CampaignDetailView from "../entities/CampaignDetailView";
import ReportRenderer from "../reporting/ReportRenderer";
import GoalsManagement from "../goals/GoalsManagement";
import OfferStatistics from "../entities/OfferStatistics";
import OfferDetails from "../entities/OfferDetails";
import ContactsManagement from "../entities/ContactsManagement";

interface SuperAdminViewRendererProps {
  activeView: SuperAdminViewType;
  selectedAgencyId?: string | null;
  selectedOfferId?: string | null;
  onViewChange: (view: SuperAdminViewType) => void;
  onViewAgencyAgents?: (agencyId: string) => void;
}

const SuperAdminViewRenderer = ({ 
  activeView, 
  selectedAgencyId,
  selectedOfferId, 
  onViewChange, 
  onViewAgencyAgents 
}: SuperAdminViewRendererProps) => {
  const handleBackToDashboard = () => {
    onViewChange('dashboard');
  };

  const handleViewOfferStatistics = (offerId: string) => {
    onViewChange('offer-statistics');
  };

  const handleSwitchToOfferDetails = () => {
    onViewChange('offer-details');
  };

  const handleSwitchToOfferStatistics = () => {
    onViewChange('offer-statistics');
  };

  console.log('SuperAdminViewRenderer - Active view:', activeView);

  switch (activeView) {
    case 'agencies':
      return (
        <AgencyManagement 
          onBackToDashboard={handleBackToDashboard}
          onViewAgents={onViewAgencyAgents || (() => {})}
        />
      );
    
    case 'agents':
      return <AgentManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'advertisers':
      return <AdvertiserManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'publishers':
      return <PublisherManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'campaigns':
      return <CampaignManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'offers':
      return (
        <OfferManagement 
          onBackToDashboard={handleBackToDashboard}
          onViewOfferStatistics={handleViewOfferStatistics}
        />
      );

    case 'offer-statistics':
      return (
        <OfferStatistics 
          offerId={selectedOfferId || ''}
          onBackToDashboard={handleBackToDashboard}
          onBackToOffers={() => onViewChange('offers')}
          onSwitchToDetails={handleSwitchToOfferDetails}
        />
      );
    
    case 'offer-details':
      return (
        <OfferDetails 
          offerId={selectedOfferId || ''}
          onBackToDashboard={handleBackToDashboard}
          onBackToOffers={() => onViewChange('offers')}
          onSwitchToStatistics={handleSwitchToOfferStatistics}
        />
      );
    
    case 'analytics':
      return <AdvancedAnalytics onBackToDashboard={handleBackToDashboard} />;
    
    case 'compliance':
      return <ComplianceReporting onBackToDashboard={handleBackToDashboard} />;
    
    case 'system-health':
      return <SystemHealthMonitor onBackToDashboard={handleBackToDashboard} />;
    
    case 'user-management':
      return <UserRoleManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'goals-management':
      return <GoalsManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'global-reporting':
      return <GlobalReporting onBackToDashboard={handleBackToDashboard} />;
    
    case 'agency-agents':
      return (
        <AgencyAgentsView 
          agencyId={selectedAgencyId || ''} 
          onBackToAgencies={() => onViewChange('agencies')}
        />
      );
    
    case 'contacts':
      return (
        <ContactsManagement onBackToDashboard={handleBackToDashboard} />
      );
    
    // Report cases
    case 'reports-campaigns':
    case 'reports-campaigns-by-publisher':
    case 'reports-publisher-by-manager':
    case 'reports-offers':
    case 'reports-offers-by-publisher':
    case 'reports-promo-numbers':
    case 'reports-offers-by-promo':
    case 'reports-advertisers':
    case 'reports-publishers':
    case 'reports-ivr-fees':
    case 'reports-key-press':
    case 'reports-agents':
    case 'reports-agencies':
      return <ReportRenderer activeView={activeView} onBackToDashboard={handleBackToDashboard} />;
    
    default:
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">View Not Found</h2>
          <p className="text-gray-600 mb-6">The requested view "{activeView}" could not be found.</p>
          <button 
            onClick={handleBackToDashboard}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      );
  }
};

export default SuperAdminViewRenderer;
