
import React, { useState } from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import SuperAdminSidebar from "./layout/SuperAdminSidebar";
import ExecutiveKPISelector from "./dashboard/ExecutiveKPISelector";
import SuperAdminWidgetSelector from "./dashboard/SuperAdminWidgetSelector";
import SuperAdminViewRenderer from "./navigation/SuperAdminViewRenderer";
import SuperAdminDashboardContent from "./dashboard/SuperAdminDashboardContent";
import { useSuperAdminConfig } from "./hooks/useSuperAdminConfig";
import { ImpersonationProvider } from "@/contexts/ImpersonationContext";
import ImpersonationBanner from "@/components/ImpersonationBanner";

const SuperAdminDashboard = () => {
  const [showKPISelector, setShowKPISelector] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeView, setActiveView] = useState<SuperAdminViewType>('dashboard');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  
  const {
    selectedKPIs,
    selectedWidgets,
    handleKPIConfigChange,
    handleWidgetConfigChange
  } = useSuperAdminConfig();

  console.log('SuperAdmin Dashboard - Current view:', activeView);
  console.log('SuperAdmin Dashboard - Selected widgets:', selectedWidgets);

  const handleViewAgencyAgents = (agencyId: string) => {
    setSelectedAgencyId(agencyId);
    setActiveView('agency-agents');
  };

  if (showKPISelector) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <SuperAdminSidebar 
            activeView={activeView} 
            onViewChange={setActiveView} 
          />
          <div className="flex-1 p-8">
            <div className="flex justify-center items-start pt-8">
              <ExecutiveKPISelector
                selectedKPIs={selectedKPIs}
                onKPIConfigChange={handleKPIConfigChange}
                onClose={() => setShowKPISelector(false)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showWidgetSelector) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <SuperAdminSidebar 
            activeView={activeView} 
            onViewChange={setActiveView} 
          />
          <div className="flex-1 p-8">
            <div className="flex justify-center items-start pt-8">
              <SuperAdminWidgetSelector
                selectedWidgets={selectedWidgets}
                onWidgetConfigChange={handleWidgetConfigChange}
                onClose={() => setShowWidgetSelector(false)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ImpersonationProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <SuperAdminSidebar 
            activeView={activeView} 
            onViewChange={setActiveView} 
          />
          <div className="flex-1 p-8">
            <ImpersonationBanner />
            {activeView !== 'dashboard' ? (
              <SuperAdminViewRenderer
                activeView={activeView}
                selectedAgencyId={selectedAgencyId}
                onViewChange={setActiveView}
                onViewAgencyAgents={handleViewAgencyAgents}
              />
            ) : (
              <SuperAdminDashboardContent
                activeView={activeView}
                selectedKPIs={selectedKPIs}
                selectedWidgets={selectedWidgets}
                onViewChange={setActiveView}
                onCustomizeKPIs={() => setShowKPISelector(true)}
                onCustomizeWidgets={() => setShowWidgetSelector(true)}
              />
            )}
          </div>
        </div>
      </div>
    </ImpersonationProvider>
  );
};

export default SuperAdminDashboard;
