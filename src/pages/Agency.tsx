
import { useState } from "react";
import AdminPanel from "../components/AdminPanel";
import AdminSidebar from "../components/AdminSidebar";
import AgencyDashboard from "../components/AgencyDashboard";
import RealtimeReport from "../components/dashboard/RealtimeReport";
import ContactsReports from "../components/dashboard/ContactsReports";
import CallHistoryReport from "../components/dashboard/CallHistoryReport";
import ApplicationsReport from "../components/dashboard/ApplicationsReport";
import AgencyOffersManagement from "../components/agency/AgencyOffersManagement";
import { AgencySettings } from "../components/settings/AgencySettings";
import BillingTab from "../components/settings/BillingTab";
import BrandingSettings from "../components/settings/BrandingSettings";

import { AgencyReferralTab } from "../components/settings/AgencyReferralTab";
import LiveCallWorkspace, { WorkspaceTab } from "../components/shared/LiveCallWorkspace";

const workspaceTabMap: Record<string, WorkspaceTab> = {
  'workspace-dashboard': 'my-dashboard',
  'workspace-live-calls': 'live-calls',
  'workspace-history': 'my-history',
  'workspace-contacts': 'my-contacts',
  'workspace-applications': 'my-applications',
  'workspace-recommendations': 'my-recommendations',
  'workspace-website': 'my-website',
  'workspace-referrals': 'my-referrals',
  'workspace-settings': 'my-settings',
  'workspace-support': 'my-support',
  'go-live': 'live-calls',
};
import { Toaster } from "sonner";

const Agency = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AgencyDashboard />;
      case "offers":
        return (
          <div className="space-y-6">
            <AgencyOffersManagement />
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Realtime Report</h1>
              <p className="text-gray-600">Real-time call monitoring and analytics</p>
            </div>
            <RealtimeReport />
          </div>
        );
      case "applications":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-gray-600">Track and manage insurance applications</p>
            </div>
            <ApplicationsReport />
          </div>
        );
      case "call-history":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Call History</h1>
              <p className="text-gray-600">View call records and detailed AI-generated summaries</p>
            </div>
            <CallHistoryReport />
          </div>
        );
      case "contacts":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Contacts</h1>
              <p className="text-gray-600">Contact management and lead tracking</p>
            </div>
            <ContactsReports />
          </div>
        );
      case "leads-list":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Leads List</h1>
              <p className="text-gray-600">Comprehensive lead management and tracking system</p>
            </div>
            <ContactsReports />
          </div>
        );
      case "go-live":
      case "workspace-dashboard":
      case "workspace-live-calls":
      case "workspace-history":
      case "workspace-contacts":
      case "workspace-applications":
      case "workspace-recommendations":
      case "workspace-website":
      case "workspace-referrals":
      case "workspace-settings":
      case "workspace-support":
        return <LiveCallWorkspace activeTab={workspaceTabMap[activeSection] || 'live-calls'} />;
      case "team":
        return <AgencySettings onBackToDashboard={() => setActiveSection("dashboard")} />;
      case "branding":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Branding & Email Templates</h1>
              <p className="text-gray-600">Customize your agency's appearance and email templates</p>
            </div>
            <BrandingSettings />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Billing & Payments</h1>
              <p className="text-gray-600">Manage billing, payments, and financial settings</p>
            </div>
            <BillingTab />
          </div>
        );
      case "referrals":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Referral Program</h1>
              <p className="text-gray-600">Track referrals made by your agents</p>
            </div>
            <AgencyReferralTab />
          </div>
        );
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Agency Admin Panel</h1>
            <AdminPanel activeSection={activeSection} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex">
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Agency;
