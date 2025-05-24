
import React from "react";
import Admin from "./settings/Admin";
import PlaceholderSection from "./settings/PlaceholderSection";
import ReferralProgramTab from "./settings/ReferralProgramTab";
import TeamMembersTab from "./settings/TeamMembersTab";
import ScriptsAITab from "./settings/ScriptsAITab";
import CampaignsTab from "./settings/CampaignsTab";

interface AdminPanelProps {
  activeSection: string;
}

const AdminPanel = ({ activeSection }: AdminPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {activeSection === "general" && <Admin />}
      {activeSection === "team" && <TeamMembersTab />}
      {activeSection === "campaigns" && <CampaignsTab />}
      {activeSection === "scripts" && <ScriptsAITab />}
      {activeSection === "referrals" && <ReferralProgramTab />}
      {activeSection === "notifications" && <PlaceholderSection title="Notifications" />}
    </div>
  );
};

export default AdminPanel;
