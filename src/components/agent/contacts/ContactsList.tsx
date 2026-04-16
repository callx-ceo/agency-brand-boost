import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Phone, MessageSquare, Mail } from "lucide-react";
import { ContactItem, stages, getStageColor, getScoreColor } from "./contactData";

interface ContactsListProps {
  contacts: ContactItem[];
  onSelectContact: (contact: ContactItem) => void;
}

const ContactsList = ({ contacts, onSelectContact }: ContactsListProps) => {
  const [search, setSearch] = useState("");
  const [activeStage, setActiveStage] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      !search ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStage = activeStage === "All" || c.stage === activeStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold">My Contacts</h1>
          <Badge variant="secondary" className="text-xs">{contacts.length} contacts</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-72 h-9 text-sm"
            />
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-9">
            <Plus className="w-4 h-4 mr-1" /> Add Contact
          </Button>
          <Button size="sm" variant="outline" className="h-9 w-9 p-0">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter pills + sort */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b bg-muted/30">
        <div className="flex items-center gap-1.5">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeStage === stage
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-muted border"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs h-7">Import</Button>
          <select className="text-xs border rounded px-2 py-1 bg-background">
            <option>Last contact</option>
            <option>Name A–Z</option>
            <option>Score</option>
          </select>
        </div>
      </div>

      {/* Contact rows */}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Search className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No contacts match this filter</p>
          </div>
        ) : (
          filtered.map((c) => {
            const sc = getStageColor(c.stage);
            return (
              <div
                key={c.id}
                onClick={() => onSelectContact(c)}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex items-center px-6 py-3 border-b cursor-pointer hover:bg-muted/40 transition-colors"
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3 shrink-0 ${sc.avatar}`}>
                  {c.firstName[0]}{c.lastName[0]}
                </div>

                {/* Name + phone */}
                <div className="w-44 mr-4">
                  <div className="text-[13px] font-semibold truncate">{c.firstName} {c.lastName}</div>
                  <div className="text-[11px] text-muted-foreground">{c.phone}</div>
                </div>

                {/* Stage */}
                <div className="w-32 mr-4">
                  <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full ${sc.bg} ${sc.text}`}>
                    {c.stage}
                  </span>
                </div>

                {/* Last contact */}
                <div className="w-20 text-xs text-muted-foreground mr-4">{c.lastContact}</div>

                {/* Agent */}
                <div className="w-24 text-xs text-muted-foreground mr-4">{c.agent}</div>

                {/* Score */}
                <div className="w-16 mr-4">
                  {c.callScore !== null ? (
                    <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded border ${getScoreColor(c.callScore)}`}>
                      {c.callScore}
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">—</span>
                  )}
                </div>

                {/* Quick actions */}
                <div className={`flex items-center gap-1 ml-auto transition-opacity ${hoveredId === c.id ? 'opacity-100' : 'opacity-0'}`}>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                    <Phone className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                    <Mail className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContactsList;
