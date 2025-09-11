import React from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import AgencyManagement from "../entities/AgencyManagement";
import AgentManagement from "../entities/AgentManagement";
import AdvertiserManagement from "../entities/AdvertiserManagement";
import PublisherManagement from "../entities/PublisherManagement";
import CampaignManagement from "../entities/CampaignManagement";
import OfferManagement from "../entities/OfferManagement";
import VerticalManagement from "../entities/VerticalManagement";
import { LanguageManagement } from "../entities/LanguageManagement";
import ProductsManagement from "../entities/ProductsManagement";
import CarriersManagement from "../entities/CarriersManagement";
import AdvancedAnalytics from "../analytics/AdvancedAnalytics";
import ComplianceReporting from "../analytics/ComplianceReporting";
import SystemHealthMonitor from "../dashboard/SystemHealthMonitor";
import UserRoleManagement from "../entities/UserRoleManagement";
import GlobalReporting from "../reporting/GlobalReporting";
import AgencyAgentsView from "../entities/AgencyAgentsView";
import CampaignDetailView from "../entities/CampaignDetailView";
import ReportRenderer from "../reporting/ReportRenderer";
import GoalsManagement from "../goals/GoalsManagement";
import OfferDetails from "../entities/OfferDetails";
import ContactsManagement from "../entities/ContactsManagement";
import LeadsManagement from "../entities/LeadsManagement";
import AgencyApplicationsManagement from "../entities/AgencyApplicationsManagement";
import ContactsReports from "../../dashboard/ContactsReports";
import AgentListReport from "../reporting/AgentListReport";
import RealtimeReport from "../../dashboard/RealtimeReport";
import CostApiManagement from "../management/CostApiManagement";
import PromptManagement from "../entities/PromptManagement";
import CustomerManagement from "../entities/CustomerManagement";
import MinimumBidManagement from "../entities/MinimumBidManagement";
import CallSettingsManagement from "../entities/CallSettingsManagement";

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

  const handleViewOfferDetails = (offerId: string) => {
    onViewChange('offer-details');
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
          onViewOfferStatistics={handleViewOfferDetails}
        />
      );

    case 'verticals':
      return <VerticalManagement onBackToDashboard={handleBackToDashboard} />;

    case 'languages':
      return <LanguageManagement />;

    case 'products':
      return <ProductsManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'carriers':
      return <CarriersManagement onBackToDashboard={handleBackToDashboard} />;

    case 'offer-statistics':
    case 'offer-details':
      return (
        <OfferDetails 
          offerId={selectedOfferId || ''}
          onBackToDashboard={handleBackToDashboard}
          onBackToOffers={() => onViewChange('offers')}
          onSwitchToStatistics={() => {}}
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
    
    case 'leads':
      return (
        <LeadsManagement onBackToDashboard={handleBackToDashboard} />
      );
    
    case 'contacts':
      return (
        <ContactsManagement onBackToDashboard={handleBackToDashboard} />
      );
    
    case 'customers':
      return (
        <CustomerManagement />
      );
    
    case 'agency-applications':
      return (
        <AgencyApplicationsManagement onBackToDashboard={handleBackToDashboard} />
      );
    
    case 'reports-realtime':
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
    
    case 'cost-api-management':
      return <CostApiManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'reports-agent-list':
      return <AgentListReport onBackToDashboard={handleBackToDashboard} />;
    
    case 'prompt-management':
      return <PromptManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'minimum-bid-management':
      return <MinimumBidManagement onBackToDashboard={handleBackToDashboard} />;
    
    case 'call-settings-management':
      return <CallSettingsManagement onBackToDashboard={handleBackToDashboard} />;
    
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
