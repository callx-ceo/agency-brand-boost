import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare, Sparkles } from "lucide-react";

interface TimelineEntry {
  id: string;
  type: "sms" | "email" | "call";
  direction: "inbound" | "outbound";
  status: string;
  statusColor: string;
  label: string;
  time: string;
  date?: string;
  detail: string;
  agent?: string;
  score?: number;
  extra?: string;
}

const initialTimeline: TimelineEntry[] = [
  { id: "t1", type: "sms", direction: "inbound", status: "Reply received", statusColor: "bg-green-100 text-green-700", label: "SMS", time: "11:15 AM", detail: "\"Thanks — still thinking it over. Can I have until Friday?\"", agent: undefined, extra: "From: Michael Hayden" },
  { id: "t2", type: "sms", direction: "outbound", status: "Sent", statusColor: "bg-blue-100 text-blue-700", label: "SMS", time: "10:30 AM", detail: "\"Hi Michael, just following up on your final expense coverage quote. Let me know if you have any questions!\"", agent: "Benjamin", extra: "Read" },
  { id: "t3", type: "call", direction: "inbound", status: "Accepted", statusColor: "bg-green-100 text-green-700", label: "Inbound call · 26.5 min", time: "9:21 AM", detail: "Discussed $5,000 face value policy. Customer requested 2-day follow-up window.", agent: "Benjamin", score: 80, extra: "Tap for AI summary ›" },
  { id: "t4", type: "email", direction: "inbound", status: "Reply received", statusColor: "bg-green-100 text-green-700", label: "Email", time: "3:48 PM", date: "Apr 14", detail: "\"Thanks for reaching out — I'm still interested, just need a few more days to think it over.\"", extra: "From: Michael Hayden" },
  { id: "t5", type: "email", direction: "outbound", status: "Sent", statusColor: "bg-blue-100 text-blue-700", label: "Email", time: "3:15 PM", detail: "Quote summary + policy comparison PDF. Subject: \"Your Final Expense Coverage Options\"", agent: "Benjamin", extra: "View email" },
  { id: "t6", type: "call", direction: "outbound", status: "Missed", statusColor: "bg-red-100 text-red-700", label: "Outbound call", time: "11:21 AM", detail: "No answer. Auto-triggered follow-up SMS sent.", agent: "Benjamin", extra: "Tap for AI summary ›" },
  { id: "t7", type: "call", direction: "inbound", status: "Connected", statusColor: "bg-green-100 text-green-700", label: "Inbound call · 26.5 min", time: "9:21 AM", detail: "Initial qualification. Confirmed tobacco use, no pre-existing diseases, bank account active.", agent: "Benjamin", score: 74, extra: "Tap for AI summary ›" },
];

const quickReplies = [
  "Following up on your quote",
  "Are you available for a quick call?",
  "Sending your quote summary",
  "Ready to get you covered",
];

const ActivityTab = () => {
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState(initialTimeline);

  const handleSend = () => {
    if (!message.trim()) return;
    const entry: TimelineEntry = {
      id: `t-${Date.now()}`,
      type: channel,
      direction: "outbound",
      status: "Sent",
      statusColor: "bg-blue-100 text-blue-700",
      label: channel === "sms" ? "SMS" : "Email",
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      detail: `"${message}"`,
      agent: "Benjamin",
    };
    setTimeline([entry, ...timeline]);
    setMessage("");
  };

  const iconMap = {
    sms: <MessageSquare className="w-4 h-4 text-muted-foreground" />,
    email: <Mail className="w-4 h-4 text-muted-foreground" />,
    call: <Phone className="w-4 h-4 text-muted-foreground" />,
  };

  let lastDate = "";

  return (
    <div className="flex flex-col h-full">
      {/* Quick reply bar */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setChannel("sms")}
              className={`px-3 py-1 text-xs font-medium ${channel === "sms" ? "bg-blue-600 text-white" : "bg-background"}`}
            >SMS</button>
            <button
              onClick={() => setChannel("email")}
              className={`px-3 py-1 text-xs font-medium ${channel === "email" ? "bg-blue-600 text-white" : "bg-background"}`}
            >Email</button>
          </div>
          <span className="text-xs text-muted-foreground">to Michael Hayden · 01234567891</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              onClick={() => setMessage(qr)}
              className="text-[11px] px-3 py-1 border rounded-full hover:bg-muted/50 transition-colors"
            >
              {qr}
            </button>
          ))}
          <button className="text-[11px] px-3 py-1 border rounded-full text-muted-foreground">+ More</button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Or type a custom message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-sm h-9 flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="outline" size="sm" className="h-9 text-xs gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI suggest
          </Button>
          <Button size="sm" className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4 space-y-1">
        {timeline.map((entry) => {
          const showDate = entry.date && entry.date !== lastDate;
          if (entry.date) lastDate = entry.date;

          return (
            <React.Fragment key={entry.id}>
              {showDate && (
                <div className="flex items-center justify-center py-3">
                  <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">{entry.date}</span>
                </div>
              )}
              <div className="flex gap-3 py-2.5 hover:bg-muted/40 px-2 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  {iconMap[entry.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge className={`text-[10px] border-0 ${entry.statusColor}`}>{entry.status}</Badge>
                    <span className="text-xs font-medium">{entry.label}</span>
                    {entry.score && (
                      <span className="text-[10px] text-muted-foreground">Score: {entry.score}</span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/80 mb-0.5">{entry.detail}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    {entry.agent && <span>Agent: {entry.agent}</span>}
                    {entry.extra && (
                      <span className={entry.extra.includes("AI summary") ? "text-teal-600 cursor-pointer hover:underline" : ""}>
                        {entry.extra}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{entry.time}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTab;
