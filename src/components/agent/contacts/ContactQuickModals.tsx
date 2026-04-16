import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Phone, PhoneOff, Mic, MicOff, Pause, UserPlus, Send } from "lucide-react";
import { ContactItem } from "./contactData";
import { useToast } from "@/hooks/use-toast";

interface ModalProps {
  contact: ContactItem;
  open: boolean;
  onClose: () => void;
}

// ─── Call Modal ───
export const CallModal = ({ contact, open, onClose }: ModalProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!open) { setSeconds(0); setIsMuted(false); setIsOnHold(false); setNotes(""); return; }
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [open]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const handleEnd = () => {
    toast({ title: `Call with ${contact.firstName} ended (${mm}:${ss})`, duration: 2500 });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            Calling {contact.firstName} {contact.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 gap-4">
          {/* Pulse indicator */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Phone className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-emerald-400/30 animate-ping" />
          </div>

          {/* Timer */}
          <div className="text-3xl font-mono font-semibold tracking-wider">{mm}:{ss}</div>
          <div className="text-sm text-muted-foreground">{contact.phone}</div>

          {/* Customer snapshot */}
          <div className="grid grid-cols-2 gap-3 w-full bg-muted/40 rounded-lg p-3 text-xs">
            <div><span className="text-muted-foreground">Stage:</span> <span className="font-medium">{contact.stage}</span></div>
            <div><span className="text-muted-foreground">Product:</span> <span className="font-medium">{contact.product || "—"}</span></div>
            <div><span className="text-muted-foreground">Premium:</span> <span className="font-medium">{contact.estPremium || "—"}</span></div>
            <div><span className="text-muted-foreground">Score:</span> <span className="font-medium">{contact.callScore ?? "—"}</span></div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="h-10 w-10 p-0 rounded-full" onClick={() => toast({ title: "Add participant", duration: 2000 })}>
              <UserPlus className="w-4 h-4" />
            </Button>
            <Button size="sm" variant={isOnHold ? "default" : "outline"} className="h-10 w-10 p-0 rounded-full" onClick={() => setIsOnHold(!isOnHold)}>
              <Pause className="w-4 h-4" />
            </Button>
            <Button size="sm" variant={isMuted ? "default" : "outline"} className="h-10 w-10 p-0 rounded-full" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button size="sm" className="h-10 w-10 p-0 rounded-full bg-red-600 hover:bg-red-700 text-white" onClick={handleEnd}>
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>

          {/* Notes */}
          <Textarea
            placeholder="Call notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-sm h-20 resize-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── SMS Modal ───
export const SMSModal = ({ contact, open, onClose }: ModalProps) => {
  const [message, setMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [thread, setThread] = useState([
    { from: "agent", text: "Hi, just following up on our conversation. Let me know if you have questions!", time: "10:30 AM" },
    { from: "contact", text: "Thanks — still thinking it over...", time: "11:15 AM" },
  ]);
  const { toast } = useToast();

  const handleAISuggest = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      const lastMsg = thread.filter(t => t.from === "contact").pop();
      const suggestions: Record<string, string> = {
        "Thanks — still thinking it over...": `Hi ${contact.firstName}, totally understand! Just wanted to let you know your ${contact.estPremium || "$18/mo"} rate for ${contact.faceValue || "$5,000"} coverage is locked in until Friday. Happy to answer any questions — no pressure at all!`,
        default: `Hi ${contact.firstName}, just checking in on your ${contact.product || "insurance"} quote. Your coverage at ${contact.estPremium || "the quoted rate"} is a great value. Would you like to schedule a quick call to go over any questions?`,
      };
      setMessage(suggestions[lastMsg?.text || ""] || suggestions.default);
      setIsAiLoading(false);
      toast({ title: "AI suggestion ready", duration: 2000 });
    }, 800);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setThread((prev) => [...prev, { from: "agent", text: message, time: "Now" }]);
    setMessage("");
    toast({ title: "SMS sent", duration: 2500 });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { onClose(); setMessage(""); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>SMS — {contact.firstName} {contact.lastName}</DialogTitle>
          <p className="text-xs text-muted-foreground">{contact.phone}</p>
        </DialogHeader>

        {/* Thread */}
        <div className="flex flex-col gap-2 max-h-64 overflow-auto py-3 px-1">
          {thread.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                msg.from === "agent"
                  ? "bg-emerald-600 text-white rounded-br-md"
                  : "bg-muted rounded-bl-md"
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "agent" ? "text-emerald-100" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compose */}
        <div className="space-y-2 border-t pt-3">
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-sm h-16 resize-none"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="text-xs gap-1" onClick={handleAISuggest} disabled={isAiLoading}>
              <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? "animate-spin" : ""}`} /> {isAiLoading ? "Thinking..." : "AI Suggest"}
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSend} disabled={!message.trim()}>
              <Send className="w-4 h-4 mr-1" /> Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── Email Modal ───
export const EmailModal = ({ contact, open, onClose }: ModalProps) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { toast } = useToast();

  const handleAIDraft = () => {
    setSubject(`Following up on your ${contact.product || "insurance"} quote`);
    setBody(`Hi ${contact.firstName},\n\nThank you for your time on our recent call. I wanted to follow up regarding the ${contact.product || "insurance"} policy we discussed.\n\nYour estimated premium of ${contact.estPremium || "the quoted amount"} for ${contact.faceValue || "the selected coverage"} is a great value, and I'd love to help you move forward.\n\nWould you be available for a quick call this week to finalize the details?\n\nBest regards,\n${contact.agent}`);
    toast({ title: "AI draft generated", duration: 2000 });
  };

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) return;
    toast({ title: `Email sent to ${contact.email}`, duration: 2500 });
    setSubject("");
    setBody("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { onClose(); setSubject(""); setBody(""); } }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-12">To:</span>
            <span className="font-medium">{contact.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-12">From:</span>
            <span className="text-muted-foreground">{contact.agent.toLowerCase()}@agency.com</span>
          </div>

          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-sm"
          />

          <Textarea
            placeholder="Write your email..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="text-sm h-40 resize-none"
          />

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleAIDraft}>
              ✨ AI Draft
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => { toast({ title: "Draft saved", duration: 2000 }); onClose(); }}>
                Save Draft
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSend} disabled={!subject.trim() || !body.trim()}>
                <Send className="w-4 h-4 mr-1" /> Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
