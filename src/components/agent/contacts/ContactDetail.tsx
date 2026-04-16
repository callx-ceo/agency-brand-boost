import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap } from "lucide-react";
import { ContactItem, stages } from "./contactData";
import ContactLeftPanel from "./ContactLeftPanel";
import SmartActionsTab from "./SmartActionsTab";
import ActivityTab from "./ActivityTab";
import { EmailsTab, CallsTab, ChatsTab, NotesTab, ApplicationsTab } from "./ContactDetailTabs";
import { useToast } from "@/hooks/use-toast";

interface ContactDetailProps {
  contact: ContactItem;
  onBack: () => void;
}

const tabs = [
  { id: "smart", label: "Smart Actions", icon: <Zap className="w-3.5 h-3.5" />, badge: "5", badgeColor: "bg-purple-100 text-purple-700" },
  { id: "activity", label: "Activity", badge: "12", badgeColor: "bg-gray-100 text-gray-600" },
  { id: "emails", label: "Emails", badge: "2 new", badgeColor: "bg-green-100 text-green-700" },
  { id: "calls", label: "Calls", badge: "7", badgeColor: "bg-gray-100 text-gray-600" },
  { id: "chats", label: "Chats", badge: "1 new", badgeColor: "bg-green-100 text-green-700" },
  { id: "applications", label: "Applications", badge: "1", badgeColor: "bg-gray-100 text-gray-600" },
  { id: "notes", label: "Notes", badge: "3", badgeColor: "bg-gray-100 text-gray-600" },
];

const ContactDetail = ({ contact, onBack }: ContactDetailProps) => {
  const [activeTab, setActiveTab] = useState("smart");
  const [pendingStage, setPendingStage] = useState(contact.stage);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const hasUnsavedStage = pendingStage !== contact.stage;

  const handleToggleAction = (id: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    toast({ title: completedActions.has(id) ? "Action undone" : "Action completed", duration: 2500 });
  };

  const handleUpdateStage = () => {
    toast({ title: `Stage updated to "${pendingStage}"`, duration: 2500 });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "smart": return <SmartActionsTab completedActions={completedActions} onToggleAction={handleToggleAction} />;
      case "activity": return <ActivityTab />;
      case "emails": return <EmailsTab />;
      case "calls": return <CallsTab />;
      case "chats": return <ChatsTab />;
      case "applications": return <ApplicationsTab />;
      case "notes": return <NotesTab />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            Customer Contacts
          </button>
          <span className="text-muted-foreground">›</span>
          <span className="font-semibold">{contact.firstName} {contact.lastName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Stage</span>
          <Select value={pendingStage} onValueChange={setPendingStage}>
            <SelectTrigger className="w-40 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {stages.filter(s => s !== "All").map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className={`h-8 text-xs ${hasUnsavedStage ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
            variant={hasUnsavedStage ? "default" : "outline"}
            onClick={handleUpdateStage}
            disabled={!hasUnsavedStage}
          >
            Update
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <ContactLeftPanel contact={contact} />

        {/* Right main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center border-b px-4 bg-background overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
                <Badge className={`text-[9px] h-4 px-1.5 border-0 ${tab.badgeColor}`}>{tab.badge}</Badge>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
