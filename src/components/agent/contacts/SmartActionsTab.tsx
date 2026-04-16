import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Mail, Sparkles, Check, Undo2 } from "lucide-react";

interface SmartActionsTabProps {
  completedActions: Set<string>;
  onToggleAction: (id: string) => void;
}

const actions = [
  {
    id: "a1",
    section: "Priority actions",
    channel: "call",
    priority: "Urgent",
    priorityColor: "bg-red-100 text-red-700",
    dueDate: "Due Apr 18",
    title: "Schedule follow-up call",
    reason: "Customer requested follow-up window, no close attempted despite positive sentiment.",
    aiContext: "Talk track — open with beneficiary confirmation, trial close script.",
    buttons: [
      { label: "Schedule for Apr 18", color: "bg-emerald-600 hover:bg-emerald-700 text-white", completes: true },
      { label: "Call now", color: "bg-blue-600 hover:bg-blue-700 text-white", completes: false },
      { label: "Snooze 24h", color: "", ghost: true, completes: false },
    ],
  },
  {
    id: "a2",
    section: null,
    channel: "sms",
    priority: "High Priority",
    priorityColor: "bg-amber-100 text-amber-700",
    dueDate: "Before app submission",
    title: "Verify height + weight via SMS",
    reason: "Height 7'5\" and weight 62 flagged as transcription errors, required for underwriting.",
    preview: "\"Hi Michael, quick question — can you confirm your height and weight for me? We had 7'5 and 62 lbs on file and want to make sure that's right before we submit. Thanks!\"",
    buttons: [
      { label: "Send SMS now", color: "bg-emerald-600 hover:bg-emerald-700 text-white", completes: true },
      { label: "Edit before sending", color: "", ghost: true, completes: false },
    ],
  },
  {
    id: "a3",
    section: null,
    channel: "app",
    priority: "Ready to start",
    priorityColor: "bg-blue-100 text-blue-700",
    dueDate: null,
    title: "Pre-fill and start application",
    reason: null,
    aiContext: "Pre-filled: Name, DOB, Phone, Address, Tobacco status, Bank info\nMissing: Height (verify), Weight (verify)",
    buttons: [
      { label: "Start pre-filled draft", color: "bg-amber-600 hover:bg-amber-700 text-white", completes: true },
      { label: "Start blank", color: "", ghost: true, completes: false },
    ],
  },
  {
    id: "a4",
    section: "Follow-up outreach",
    channel: "email",
    priority: "Recommended",
    priorityColor: "bg-blue-100 text-blue-700",
    dueDate: null,
    title: "Send decision-support email",
    reason: null,
    preview: "Subject: Your Final Expense Coverage Options\n\n\"Hi Michael, I wanted to follow up on our conversation about your $5,000 final expense policy...\"",
    buttons: [
      { label: "Send AI-drafted email", color: "bg-purple-600 hover:bg-purple-700 text-white", completes: true },
      { label: "Customize first", color: "", ghost: true, completes: false },
    ],
  },
  {
    id: "a5",
    section: "Agent coaching",
    channel: "coaching",
    priority: "Coaching",
    priorityColor: "bg-green-100 text-green-700",
    dueDate: null,
    title: "Close attempt missing — coach Benjamin",
    reason: null,
    scores: [
      { label: "Close", value: 55 },
      { label: "Talk ratio", value: 62, suffix: "%" },
      { label: "Interruptions", value: 7 },
      { label: "Rapport", value: 85 },
    ],
    buttons: [
      { label: "Send coaching note", color: "bg-emerald-600 hover:bg-emerald-700 text-white", completes: true },
      { label: "Review call analysis", color: "", ghost: true, completes: false },
    ],
  },
];

const channelIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
  call: { icon: <Phone className="w-4 h-4 text-blue-600" />, bg: "bg-blue-50" },
  sms: { icon: <MessageSquare className="w-4 h-4 text-emerald-600" />, bg: "bg-emerald-50" },
  email: { icon: <Mail className="w-4 h-4 text-purple-600" />, bg: "bg-purple-50" },
  app: { icon: <Sparkles className="w-4 h-4 text-amber-600" />, bg: "bg-amber-50" },
  coaching: { icon: <Sparkles className="w-4 h-4 text-green-600" />, bg: "bg-green-50" },
};

const SmartActionsTab = ({ completedActions, onToggleAction }: SmartActionsTabProps) => {
  let lastSection = "";

  return (
    <div className="bg-[#f5f4f1] min-h-full p-4 space-y-3">
      {actions.map((action) => {
        const isDone = completedActions.has(action.id);
        const ch = channelIcons[action.channel] || channelIcons.app;
        const showSection = action.section && action.section !== lastSection;
        if (action.section) lastSection = action.section;

        return (
          <React.Fragment key={action.id}>
            {showSection && (
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pt-2">
                {action.section}
              </div>
            )}
            <div className={`bg-background rounded-lg border transition-opacity ${isDone ? "opacity-60" : ""}`}>
              {/* Done banner */}
              {isDone && (
                <div className="flex items-center justify-between px-4 py-2 bg-green-50 border-b rounded-t-lg">
                  <span className="text-xs font-medium text-green-700">Done — {action.title}</span>
                  <button onClick={() => onToggleAction(action.id)} className="text-xs text-green-600 hover:underline flex items-center gap-1">
                    <Undo2 className="w-3 h-3" /> Undo
                  </button>
                </div>
              )}

              <div className="flex p-4 gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => onToggleAction(action.id)}
                  className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* Channel icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${ch.bg}`}>
                  {ch.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${action.priorityColor}`}>
                      {action.priority}
                    </span>
                    {action.dueDate && (
                      <span className="text-[10px] text-muted-foreground">{action.dueDate}</span>
                    )}
                  </div>

                  <div className={`text-sm font-semibold mb-1 ${isDone ? "line-through" : ""}`}>{action.title}</div>

                  {action.reason && !isDone && (
                    <p className="text-xs text-muted-foreground mb-2">{action.reason}</p>
                  )}

                  {action.aiContext && !isDone && (
                    <div className="border-l-2 border-purple-400 bg-purple-50 rounded-r px-3 py-2 mb-2">
                      <p className="text-[11px] text-purple-800 whitespace-pre-line">{action.aiContext}</p>
                    </div>
                  )}

                  {action.preview && !isDone && (
                    <div className="bg-muted/50 rounded px-3 py-2 mb-2">
                      <p className="text-[11px] italic text-muted-foreground whitespace-pre-line">{action.preview}</p>
                    </div>
                  )}

                  {(action as any).scores && !isDone && (
                    <div className="flex gap-4 mb-2">
                      {(action as any).scores.map((s: any) => (
                        <div key={s.label} className="text-center">
                          <div className="text-sm font-bold">{s.value}{s.suffix || ""}</div>
                          <div className="text-[10px] text-muted-foreground">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              {!isDone && (
                <div className="flex items-center gap-2 px-4 py-3 border-t bg-muted/20">
                  {action.buttons.map((btn, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={btn.ghost ? "ghost" : "default"}
                      className={`text-xs h-8 ${btn.ghost ? "" : btn.color}`}
                      onClick={() => btn.completes && onToggleAction(action.id)}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SmartActionsTab;
