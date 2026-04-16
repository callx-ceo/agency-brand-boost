import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Mail, ChevronDown, ChevronRight, Check } from "lucide-react";
import { ContactItem, getStageColor } from "./contactData";

interface ContactLeftPanelProps {
  contact: ContactItem;
  onCall?: () => void;
  onSms?: () => void;
  onEmail?: () => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border-l-2 ${open ? "border-teal-500" : "border-transparent"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted/40"
      >
        {title}
        {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
      {open && <div className="px-4 pb-3 space-y-1.5">{children}</div>}
    </div>
  );
};

const Field = ({ label, value, warn }: { label: string; value: string; warn?: boolean }) => (
  <div className="flex justify-between text-[11px]">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-medium text-right ${warn ? "text-red-600" : ""}`}>{value || "—"}</span>
  </div>
);

const ContactLeftPanel = ({ contact, onCall, onSms, onEmail }: ContactLeftPanelProps) => {
  const sc = getStageColor(contact.stage);
  const [nextSteps, setNextSteps] = useState([
    { id: 1, text: "Schedule follow-up call by Apr 18", done: false },
    { id: 2, text: "Verify height + weight before app", done: false },
    { id: 3, text: "Send quote comparison email", done: true },
  ]);

  const toggleStep = (id: number) => {
    setNextSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  return (
    <div className="w-[290px] shrink-0 border-r bg-background overflow-y-auto h-full">
      {/* Hero */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4 border-b">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-2 ${sc.avatar}`}>
          {contact.firstName[0]}{contact.lastName[0]}
        </div>
        <div className="text-[15px] font-semibold">{contact.firstName} {contact.lastName}</div>
        <div className="text-[11px] text-muted-foreground mb-2">{contact.phone}</div>
        <div className="flex items-center gap-1.5 mb-4">
          <Badge className={`text-[10px] ${sc.bg} ${sc.text} border-0`}>{contact.stage}</Badge>
          {contact.followUpDue && (
            <Badge className="text-[10px] bg-red-100 text-red-700 border-0">Follow-up Due</Badge>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 text-[10px]" onClick={onCall}>
            <Phone className="w-4 h-4 mb-0.5" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 text-[10px]" onClick={onSms}>
            <MessageSquare className="w-4 h-4 mb-0.5" />
            SMS
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 text-[10px]" onClick={onEmail}>
            <Mail className="w-4 h-4 mb-0.5" />
            Email
          </Button>
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="divide-y">
        <CollapsibleSection title="Contact details" defaultOpen>
          <Field label="First name" value={contact.firstName} />
          <Field label="Last name" value={contact.lastName} />
          <Field label="Phone" value={contact.phone} />
          <Field label="Email" value={contact.email} />
          <Field label="Address" value={contact.address} />
          <Field label="City" value={contact.city} />
          <Field label="Zip" value={contact.zip} />
          <Field label="State" value={contact.state} />
          <Field label="DOB" value={contact.dob} />
          <Field label="Age" value={String(contact.age)} />
          <Field label="Gender" value={contact.gender} />
          <Field label="Lead source" value={contact.leadSource} />
        </CollapsibleSection>

        <CollapsibleSection title="Policy info">
          <Field label="Product" value={contact.product} />
          <Field label="Face value" value={contact.faceValue} />
          <Field label="Est. premium" value={contact.estPremium} />
          <Field label="Beneficiary" value={contact.beneficiary} />
          <Field label="Relationship" value={contact.relationship} />
          <Field label="Tobacco" value={contact.tobacco} />
          <Field label="Diseases" value={contact.diseases} />
          <Field label="Height" value={contact.height} warn={contact.height.includes("verify")} />
          <Field label="Weight" value={contact.weight} warn={contact.weight.includes("verify")} />
          <Field label="Bank draft" value={contact.bankDraft} />
        </CollapsibleSection>

        <CollapsibleSection title="Financial">
          <Field label="Bank name" value={contact.bankName} />
          <Field label="Account type" value={contact.accountType} />
          <Field label="Draft date" value={contact.draftDate} />
          <Field label="Payment method" value={contact.paymentMethod} />
          <Field label="Income range" value={contact.incomeRange} />
        </CollapsibleSection>

        <CollapsibleSection title="Assignment">
          <Field label="Agent" value={contact.agent} />
          <Field label="Team" value={contact.team} />
          <Field label="Created" value={contact.created} />
          <Field label="Last contact" value={contact.lastContact} />
          <Field label="Total calls" value={String(contact.totalCalls)} />
          <Field label="Avg call score" value={contact.avgCallScore ? String(contact.avgCallScore) : "—"} />
        </CollapsibleSection>

        <CollapsibleSection title="Open next steps">
          {nextSteps.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleStep(s.id)}
              className="flex items-center gap-2 w-full text-left text-[11px] py-1"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${s.done ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                {s.done && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={s.done ? "line-through text-muted-foreground" : ""}>{s.text}</span>
            </button>
          ))}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ContactLeftPanel;
