import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Sparkles, Play } from "lucide-react";

// ── Emails Tab ──
export const EmailsTab = () => {
  const emails = [
    { id: 1, direction: "inbound", unread: true, from: "Michael Hayden", subject: "Re: Your Final Expense Coverage Options", preview: "Thanks for reaching out — I'm still interested...", date: "Apr 14, 3:48 PM" },
    { id: 2, direction: "inbound", unread: true, from: "Michael Hayden", subject: "Question about coverage", preview: "Hi, I had a question about the beneficiary section...", date: "Apr 13, 10:22 AM" },
    { id: 3, direction: "outbound", unread: false, from: "Benjamin", subject: "Your Final Expense Coverage Options", preview: "Quote summary + policy comparison PDF attached.", date: "Apr 14, 3:15 PM", opens: 3 },
    { id: 4, direction: "outbound", unread: false, from: "Benjamin", subject: "Welcome — let's find the right coverage", preview: "Hi Michael, thanks for your interest in final expense...", date: "Apr 10, 11:00 AM", opens: 5 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Compose */}
      <div className="p-4 border-b bg-background space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">To:</span>
          <span className="font-medium">m.hayden@gmail.com</span>
          <span className="ml-auto text-muted-foreground">From: benjamin@agency.com</span>
        </div>
        <Input placeholder="Subject" className="h-8 text-sm" />
        <Textarea placeholder="Write your email..." className="min-h-[70px] text-sm resize-none" />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI draft
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs ml-auto">Send</Button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto">
        {emails.map((e) => (
          <div key={e.id} className={`flex items-start gap-3 px-4 py-3 border-b hover:bg-muted/30 cursor-pointer ${e.unread ? "border-l-2 border-l-blue-500" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs ${e.unread ? "font-bold" : "font-medium"}`}>{e.from}</span>
                {e.unread && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                {(e as any).opens && <span className="text-[10px] text-muted-foreground">{(e as any).opens} opens</span>}
              </div>
              <div className="text-xs font-medium truncate">{e.subject}</div>
              <div className="text-[11px] text-muted-foreground truncate">{e.preview}</div>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{e.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Calls Tab ──
export const CallsTab = () => {
  const calls = [
    { id: 1, direction: "Inbound", status: "Accepted", statusColor: "bg-green-100 text-green-700", date: "Today, 9:21 AM", duration: "26.5 min", score: 80 },
    { id: 2, direction: "Outbound", status: "Missed", statusColor: "bg-red-100 text-red-700", date: "Apr 14, 11:21 AM", duration: "0:00", score: null },
    { id: 3, direction: "Inbound", status: "Connected", statusColor: "bg-green-100 text-green-700", date: "Apr 14, 9:21 AM", duration: "26.5 min", score: 74 },
    { id: 4, direction: "Outbound", status: "Accepted", statusColor: "bg-green-100 text-green-700", date: "Apr 8, 2:30 PM", duration: "18 min", score: 82 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Initiate bar */}
      <div className="flex items-center gap-3 p-4 border-b bg-background">
        <span className="font-mono text-sm">01234567891</span>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1">
          <Phone className="w-3.5 h-3.5" /> Call Michael
        </Button>
        <Button size="sm" variant="ghost" className="text-xs">Schedule callback</Button>
      </div>

      {/* Call list */}
      <div className="flex-1 overflow-auto">
        {calls.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 py-3 border-b hover:bg-muted/30">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge className={`text-[10px] border-0 ${c.statusColor}`}>{c.status}</Badge>
                <span className="text-xs font-medium">{c.direction} call</span>
                <span className="text-[10px] text-muted-foreground">{c.duration}</span>
                {c.score && <span className="text-[10px] text-muted-foreground">Score: {c.score}</span>}
              </div>
              <div className="text-[11px] text-muted-foreground">{c.date}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Play className="w-3.5 h-3.5" /></Button>
              <Button size="sm" variant="ghost" className="text-[10px] h-7 px-2">AI Summary</Button>
              <Button size="sm" variant="ghost" className="text-[10px] h-7 px-2">Transcript</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Chats Tab ──
export const ChatsTab = () => {
  const [msg, setMsg] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: 1, from: "agent", text: "Hi Michael, I tried calling earlier — did you have a chance to look over the quote?", time: "Apr 14, 11:25 AM" },
    { id: 2, from: "customer", text: "Hey! Yeah sorry I missed the call. I was at work.", time: "Apr 14, 12:10 PM" },
    { id: 3, from: "agent", text: "No worries at all. Would you like me to walk you through the coverage details?", time: "Apr 14, 12:15 PM" },
    { id: 4, from: "customer", text: "Sure, can you send me a summary first? I want to show my wife.", time: "Apr 14, 1:30 PM" },
    { id: 5, from: "agent", text: "Absolutely! Sending that over now. It includes the $5,000 face value plan at ~$18/mo.", time: "Apr 14, 1:35 PM" },
    { id: 6, from: "customer", text: "Thanks! We'll look it over tonight.", time: "Apr 14, 6:00 PM" },
    { id: 7, from: "customer", text: "Still thinking it over. Can I have until Friday?", time: "Apr 15, 11:15 AM" },
  ]);

  const handleSend = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), from: "agent", text: msg, time: "Now" }]);
    setMsg("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-xs ${
              m.from === "agent" ? "bg-emerald-500 text-white rounded-br-sm" : "bg-white border rounded-bl-sm"
            }`}>
              <p>{m.text}</p>
              <p className={`text-[9px] mt-1 ${m.from === "agent" ? "text-emerald-100" : "text-muted-foreground"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-4 border-t bg-background">
        <Textarea
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="min-h-[40px] max-h-[80px] text-sm resize-none flex-1"
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        />
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs self-end" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

// ── Notes Tab ──
export const NotesTab = () => {
  const [notes, setNotes] = React.useState([
    { id: 1, text: "Customer prefers to be contacted after 5 PM.", date: "Apr 14, 3:00 PM", by: "Benjamin" },
    { id: 2, text: "Wife is the beneficiary — she may join the next call.", date: "Apr 13, 10:00 AM", by: "Benjamin" },
    { id: 3, text: "Height and weight need verification — possible transcription error.", date: "Apr 10, 11:30 AM", by: "System" },
  ]);
  const [newNote, setNewNote] = React.useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[60px] text-sm resize-none mb-2"
        />
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs" onClick={() => {
          if (newNote.trim()) {
            setNotes([{ id: Date.now(), text: newNote, date: "Now", by: "Benjamin" }, ...notes]);
            setNewNote("");
          }
        }}>Add Note</Button>
      </div>
      <div className="flex-1 overflow-auto">
        {notes.map((n) => (
          <div key={n.id} className="px-4 py-3 border-b">
            <p className="text-xs">{n.text}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{n.by} · {n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Applications Tab ──
export const ApplicationsTab = () => (
  <div className="p-4">
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold">Final Expense — $5,000</div>
          <div className="text-xs text-muted-foreground">Started Apr 13 · Draft</div>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px]">Draft</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
        <div><span className="text-muted-foreground">Carrier:</span> Mutual of Omaha</div>
        <div><span className="text-muted-foreground">Premium:</span> ~$18/mo</div>
        <div><span className="text-muted-foreground">Fields complete:</span> 14/18</div>
        <div><span className="text-muted-foreground">Missing:</span> <span className="text-red-600">Height, Weight</span></div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">Continue Draft</Button>
        <Button size="sm" variant="ghost" className="text-xs">View Details</Button>
      </div>
    </div>
  </div>
);
