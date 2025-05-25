import { useState } from "react";
import AdminPanel from "../components/AdminPanel";
import AdminSidebar from "../components/AdminSidebar";
import AgencyDashboard from "../components/AgencyDashboard";
import RealtimeReport from "../components/dashboard/RealtimeReport";
import ContactsReports from "../components/dashboard/ContactsReports";
import CallHistoryReport from "../components/dashboard/CallHistoryReport";
import ApplicationsReport from "../components/dashboard/ApplicationsReport";
import { Toaster } from "sonner";

const Agency = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AgencyDashboard />;
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
