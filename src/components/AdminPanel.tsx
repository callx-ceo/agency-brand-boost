
import React from "react";
import Admin from "./settings/Admin";
import BrandingSettings from "./settings/BrandingSettings";
import DomainSettings from "./settings/DomainSettings";
import PlaceholderSection from "./settings/PlaceholderSection";

interface AdminPanelProps {
  activeSection: string;
}

const AdminPanel = ({ activeSection }: AdminPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {activeSection === "general" && <Admin />}
      {activeSection === "branding" && <BrandingSettings />}
      {activeSection === "domain" && <DomainSettings />}
      {activeSection === "billing" && <PlaceholderSection title="Billing & Payment" />}
      {activeSection === "team" && <PlaceholderSection title="Team Members" />}
      {activeSection === "notifications" && <PlaceholderSection title="Notifications" />}
    </div>
  );
};

export default AdminPanel;
