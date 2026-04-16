import React, { useState } from "react";
import { 
  Search, Filter, PhoneIncoming, PhoneOutgoing, PhoneMissed, 
  AlertTriangle, ChevronDown, ChevronRight, Play, FileText, 
  MessageSquare, Mail, RotateCcw, Phone
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CallRecord {
  id: number;
  status: "ended" | "missed" | "voicemail";
  hasAlert: boolean;
  direction: "inbound" | "outbound";
  contactName: string;
  callerId: string;
  score: number;
  relevance: number;
  process: string;
  startTime: string;
  endTime: string;
  duration: string;
  disposition: string;
}

const mockCalls: CallRecord[] = [
  { id: 1, status: "ended", hasAlert: true, direction: "outbound", contactName: "Linda Castellano", callerId: "(555) 234-8901", score: 11, relevance: 100, process: "CallX - External Call", startTime: "Apr 6, 2026, 09:44 PM", endTime: "Apr 6, 2026, 09:46 PM", duration: "2m 25s", disposition: "other" },
  { id: 2, status: "ended", hasAlert: true, direction: "outbound", contactName: "Michael Hayden", callerId: "(555) 876-5432", score: 27, relevance: 100, process: "CallX - External Call", startTime: "Apr 6, 2026, 09:23 PM", endTime: "Apr 6, 2026, 09:28 PM", duration: "4m 41s", disposition: "follow-up" },
  { id: 3, status: "ended", hasAlert: false, direction: "outbound", contactName: "Sandra Okonkwo", callerId: "(555) 321-6789", score: 10, relevance: 90, process: "CallX - External Call", startTime: "Mar 24, 2026, 10:35 PM", endTime: "Mar 24, 2026, 10:36 PM", duration: "1m 10s", disposition: "no contact" },
  { id: 4, status: "ended", hasAlert: false, direction: "inbound", contactName: "Priya Nambiar", callerId: "(555) 654-3210", score: 39, relevance: 100, process: "CallX - External Call", startTime: "Mar 17, 2026, 06:43 AM", endTime: "Mar 17, 2026, 06:46 AM", duration: "2m 47s", disposition: "follow-up" },
  { id: 5, status: "ended", hasAlert: true, direction: "outbound", contactName: "James Rutherford", callerId: "(555) 789-0123", score: 32, relevance: 100, process: "CallX - External Call", startTime: "Mar 15, 2026, 10:18 PM", endTime: "Mar 15, 2026, 10:19 PM", duration: "1m 14s", disposition: "follow-up" },
  { id: 6, status: "ended", hasAlert: false, direction: "outbound", contactName: "Carlos Mendez", callerId: "(555) 432-1098", score: 45, relevance: 90, process: "CallX - External Call", startTime: "Mar 10, 2026, 09:53 PM", endTime: "Mar 10, 2026, 09:55 PM", duration: "2m 47s", disposition: "follow-up" },
  { id: 7, status: "ended", hasAlert: false, direction: "inbound", contactName: "Unknown", callerId: "(555) 000-1234", score: 39, relevance: 90, process: "CallX - External Call", startTime: "Mar 10, 2026, 09:56 PM", endTime: "Mar 10, 2026, 09:59 PM", duration: "2m 54s", disposition: "follow-up" },
  { id: 8, status: "ended", hasAlert: false, direction: "outbound", contactName: "Emily Davis", callerId: "(555) 567-8901", score: 26, relevance: 90, process: "CallX - External Call", startTime: "Mar 10, 2026, 09:05 PM", endTime: "Mar 10, 2026, 09:08 PM", duration: "2m 19s", disposition: "follow-up" },
  { id: 9, status: "ended", hasAlert: false, direction: "inbound", contactName: "Unknown", callerId: "(555) 111-2222", score: 29, relevance: 90, process: "CallX - External Call", startTime: "Mar 9, 2026, 05:08 PM", endTime: "Mar 9, 2026, 05:10 PM", duration: "1m 50s", disposition: "no contact" },
  { id: 10, status: "ended", hasAlert: true, direction: "outbound", contactName: "Sarah Johnson", callerId: "(555) 987-6543", score: 22, relevance: 100, process: "CallX - External Call", startTime: "Mar 9, 2026, 05:04 PM", endTime: "Mar 9, 2026, 05:06 PM", duration: "2m 11s", disposition: "no contact" },
  { id: 11, status: "missed", hasAlert: false, direction: "inbound", contactName: "Unknown", callerId: "(555) 333-4444", score: 0, relevance: 80, process: "CallX - External Call", startTime: "Mar 8, 2026, 02:15 PM", endTime: "Mar 8, 2026, 02:15 PM", duration: "0m 00s", disposition: "missed" },
  { id: 12, status: "ended", hasAlert: false, direction: "outbound", contactName: "John Smith", callerId: "(555) 123-4567", score: 17, relevance: 80, process: "CallX - External Call", startTime: "Mar 6, 2026, 12:21 AM", endTime: "Mar 6, 2026, 12:22 AM", duration: "1m 20s", disposition: "follow-up" },
];

const scoreColor = (s: number) => {
  if (s >= 40) return "bg-emerald-500 text-white";
  if (s >= 25) return "bg-amber-500 text-white";
  if (s > 0) return "bg-red-500 text-white";
  return "bg-gray-200 text-gray-500";
};

const relevanceColor = (r: number) => {
  if (r >= 100) return "text-emerald-600";
  if (r >= 90) return "text-blue-600";
  return "text-[#8a8a86]";
};

const dispositionStyle = (d: string) => {
  switch (d) {
    case "follow-up": return "text-blue-600";
    case "no contact": return "text-[#8a8a86]";
    case "other": return "text-[#8a8a86]";
    case "missed": return "text-red-500";
    default: return "text-[#8a8a86]";
  }
};

const AgentHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hideIrrelevant, setHideIrrelevant] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = mockCalls
    .filter(c => {
      if (hideIrrelevant && c.relevance < 80) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return c.contactName.toLowerCase().includes(term) || c.callerId.includes(term) || c.disposition.toLowerCase().includes(term) || c.process.toLowerCase().includes(term);
      }
      return true;
    })
    .slice(0, visibleCount);

  return (
    <div className="space-y-4">
      {/* Header with shortcuts */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">My History</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#1a1a1a] bg-white border border-[#e8e8e5] hover:border-[#d0d0cc] px-3 py-1.5 rounded-lg transition-colors">
            <Phone className="w-3.5 h-3.5" /> Callback Queue
          </button>
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#1a1a1a] bg-white border border-[#e8e8e5] hover:border-[#d0d0cc] px-3 py-1.5 rounded-lg transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Missed Calls
          </button>
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#1a1a1a] bg-white border border-[#e8e8e5] hover:border-[#d0d0cc] px-3 py-1.5 rounded-lg transition-colors">
            <FileText className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex items-center justify-between bg-white border border-[#e8e8e5] rounded-xl px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#8a8a86]" />
            <span className="text-[12px] font-semibold text-[#8a8a86]">Filters:</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={hideIrrelevant} onCheckedChange={(v) => setHideIrrelevant(!!v)} />
            <span className="text-[12px] font-medium text-[#1a1a1a]">Hide irrelevant</span>
          </label>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8a8a86]" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search calls..."
            className="text-[12px] pl-8 pr-3 py-1.5 border border-[#e8e8e5] rounded-lg bg-[#fafaf9] focus:outline-none focus:border-violet-300 w-52"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8e8e5] rounded-xl overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#e8e8e5] bg-[#fafaf9]">
              <th className="text-left px-4 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Status <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Dir <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Score <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Relevance <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Process <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">Start Time <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center gap-1">End Time <ChevronDown className="w-3 h-3" /></span>
              </th>
              <th className="text-right px-3 py-2.5 font-semibold text-[#8a8a86] uppercase tracking-wider">Duration</th>
              <th className="text-right px-4 py-2.5 font-semibold text-[#8a8a86]">
                <span className="flex items-center justify-end gap-1">Disposition <ChevronDown className="w-3 h-3" /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const DirIcon = c.direction === "inbound" ? PhoneIncoming : PhoneOutgoing;
              const dirColor = c.direction === "inbound" ? "text-emerald-500" : "text-blue-500";
              return (
                <tr key={c.id} className="border-b border-[#f0f0ee] hover:bg-[#fafaf9] transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${c.status === "ended" ? "bg-gray-400" : c.status === "missed" ? "bg-red-400" : "bg-amber-400"}`} />
                      <span className="text-[#1a1a1a] font-medium capitalize">{c.status === "ended" ? "Ended" : c.status === "missed" ? "Missed" : "VM"}</span>
                      {c.hasAlert && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <DirIcon className={`w-4 h-4 ${dirColor}`} />
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-5 rounded text-[11px] font-bold ${scoreColor(c.score)}`}>
                      {c.score}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`font-semibold ${relevanceColor(c.relevance)}`}>{c.relevance}%</span>
                  </td>
                  <td className="px-3 py-3 text-[#8a8a86]">{c.process}</td>
                  <td className="px-3 py-3 text-[#1a1a1a]">{c.startTime}</td>
                  <td className="px-3 py-3 text-[#1a1a1a]">{c.endTime}</td>
                  <td className="px-3 py-3 text-right font-mono text-[#1a1a1a]">{c.duration}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`font-medium ${dispositionStyle(c.disposition)}`}>{c.disposition}</span>
                      {/* Quick actions on hover */}
                      <div className="hidden group-hover:flex items-center gap-1 ml-2">
                        <button className="p-1 rounded hover:bg-[#f0f0ee] transition-colors" title="Play recording">
                          <Play className="w-3 h-3 text-[#8a8a86]" />
                        </button>
                        <button className="p-1 rounded hover:bg-[#f0f0ee] transition-colors" title="Send SMS">
                          <MessageSquare className="w-3 h-3 text-[#8a8a86]" />
                        </button>
                        <button className="p-1 rounded hover:bg-[#f0f0ee] transition-colors" title="Send Email">
                          <Mail className="w-3 h-3 text-[#8a8a86]" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8e8e5] bg-[#fafaf9]">
          <span className="text-[12px] text-[#8a8a86]">Showing {filtered.length} calls</span>
          <button
            onClick={() => setVisibleCount((p) => p + 12)}
            className="text-[12px] font-medium text-[#1a1a1a] bg-white border border-[#e8e8e5] hover:border-[#d0d0cc] px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            Load More <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentHistoryView;