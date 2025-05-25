
import React from "react";
import { Button } from "@/components/ui/button";
import AgentReports from "./AgentReports";
import ContactsReports from "./ContactsReports";
import RealtimeReport from "./RealtimeReport";
import CallHistoryReport from "./CallHistoryReport";

type ViewType = 'dashboard' | 'agent-reports' | 'contacts' | 'realtime-report' | 'call-history';

interface ViewRendererProps {
  activeView: ViewType;
  onBackToDashboard: () => void;
}

const ViewRenderer = ({ activeView, onBackToDashboard }: ViewRendererProps) => {
  switch (activeView) {
    case 'agent-reports':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Agent Reports</h1>
              <p className="text-gray-600">Performance metrics and analytics for all agents</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <AgentReports />
        </div>
      );

    case 'contacts':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Contacts Reports</h1>
              <p className="text-gray-600">Lead management and contact tracking</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <ContactsReports />
        </div>
      );

    case 'realtime-report':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Realtime</h1>
              <p className="text-gray-600">Real-time call monitoring and tracking</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <RealtimeReport />
        </div>
      );

    case 'call-history':
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Call History</h1>
              <p className="text-gray-600">View call records and detailed AI-generated summaries</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
          <CallHistoryReport />
        </div>
      );

    default:
      return null;
  }
};

export default ViewRenderer;
