
import React from "react";
import Admin from "./settings/Admin";
import PlaceholderSection from "./settings/PlaceholderSection";
import ReferralProgramTab from "./settings/ReferralProgramTab";
import TeamMembersTab from "./settings/TeamMembersTab";
import ScriptsAITab from "./settings/ScriptsAITab";
import CampaignsTab from "./settings/CampaignsTab";
import PublishersTab from "./settings/PublishersTab";
import NotificationsTab from "./settings/NotificationsTab";
import UpgradePlans from "./settings/UpgradePlans";
import ImpersonationBanner from "./ImpersonationBanner";
import { ImpersonationProvider } from "@/contexts/ImpersonationContext";

interface AdminPanelProps {
  activeSection: string;
}

const AdminPanel = ({ activeSection }: AdminPanelProps) => {
  return (
    <ImpersonationProvider>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ImpersonationBanner />
        {activeSection === "general" && <Admin />}
        {activeSection === "team" && <TeamMembersTab />}
        {activeSection === "campaigns" && <CampaignsTab />}
        {activeSection === "scripts" && <ScriptsAITab />}
        {activeSection === "publishers" && <PublishersTab />}
        {activeSection === "referrals" && <ReferralProgramTab />}
        {activeSection === "notifications" && <NotificationsTab />}
        {activeSection === "upgrade" && <UpgradePlans />}
      </div>
    </ImpersonationProvider>
  );
};

export default AdminPanel;
