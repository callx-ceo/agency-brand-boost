
import React from "react";
import ActiveCampaignsTable from "./ActiveCampaignsTable";
import AgentStatusPanel from "./AgentStatusPanel";

const DashboardBottomSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <ActiveCampaignsTable />
      <AgentStatusPanel />
    </div>
  );
};

export default DashboardBottomSection;
