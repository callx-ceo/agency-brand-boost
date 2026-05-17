import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Activity, Download, Filter, Columns3, Search, ChevronDown } from "lucide-react";

const rows = [
  { time: "05/16 20:47:19", id: "CW2YEQ7A89M", caller: "881-354-8320", promo: "893-914-6194", type: "Inbound", publisher: "Quotient Connect", campaign: "Medicare Senior - Q2", bundle: "Bundled", persistent: "Yes", live: true },
  { time: "05/16 20:45:49", id: "F4MND32RXZ5", caller: "596-177-1831", promo: "568-979-7561", type: "Inbound", publisher: "Final Expense Direct", campaign: "Medicare Senior - Q2", bundle: "Bundled", persistent: "No", live: true },
  { time: "05/16 20:44:19", id: "HDX7PHGJJGE", caller: "888-464-6136", promo: "985-707-7894", type: "Inbound", publisher: "PingMax Ltd", campaign: "Auto Bundle - Private", bundle: "Bundled", persistent: "No", live: true },
  { time: "05/16 20:42:49", id: "KGH4WUNBV5H", caller: "247-618-5356", promo: "912-543-5911", type: "Inbound", publisher: "Zhan Feng", campaign: "Burial Direct - OS", bundle: "Bundled", persistent: "Yes" },
  { time: "05/16 20:41:19", id: "UGW57DRK3S8", caller: "166-240-5423", promo: "104-634-7216", type: "Inbound", publisher: "RingMax Ltd.", campaign: "Home Insurance Bundle", bundle: "Bundled", persistent: "No" },
  { time: "05/16 20:39:49", id: "QQLI3PR1SSC", caller: "952-910-3195", promo: "878-244-6012", type: "Inbound", publisher: "Zhan Feng", campaign: "Auto Bundle - Private", bundle: "Bundled", persistent: "No" },
  { time: "05/16 20:38:19", id: "KHKQJO5WSW", caller: "694-607-9400", promo: "485-585-8298", type: "Inbound", publisher: "Quotient Connect", campaign: "Auto Bundle - Private 2", bundle: "Bundled", persistent: "No" },
  { time: "05/16 20:36:49", id: "VYVHVL0LFZ", caller: "330-703-8420", promo: "550-142-9840", type: "Inbound", publisher: "RingMax Ltd.", campaign: "Auto Bundle - Private 2", bundle: "Bundled", persistent: "Yes" },
  { time: "05/16 20:35:19", id: "TYMMHAY42ZK", caller: "698-640-3177", promo: "292-592-1869", type: "Inbound", publisher: "RingMax Ltd.", campaign: "Burial Direct - OS", bundle: "Bundled", persistent: "No" },
  { time: "05/16 20:33:49", id: "X4HQA6Q4GFD", caller: "832-608-1786", promo: "582-567-2078", type: "Inbound", publisher: "Zhan Feng", campaign: "Auto Insurance Bundle", bundle: "Bundled", persistent: "Yes" },
  { time: "05/16 20:32:19", id: "Q3N0D0G20S", caller: "288-272-5732", promo: "821-518-5525", type: "Inbound", publisher: "Northern Burial Group", campaign: "Medicare Senior - Q2", bundle: "Bundled", persistent: "Yes" },
  { time: "05/16 20:30:49", id: "EYWWTQFFDT", caller: "437-526-1482", promo: "269-647-2946", type: "Inbound", publisher: "CoverageMax LLC", campaign: "Auto Bundle - Private", bundle: "Bundled", persistent: "Yes" },
  { time: "05/16 20:29:19", id: "O5QJ1GJ9GTM3", caller: "887-867-1803", promo: "252-442-7932", type: "Inbound", publisher: "Northern Burial Group", campaign: "Auto Bundle - Private", bundle: "Bundled", persistent: "Yes" },
];

const RealtimeCallsView = () => {
  const [page, setPage] = useState(1);

  const Th = ({ children }: { children: React.ReactNode }) => (
    <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
      <div className="flex items-center gap-1.5">
        {children}
        <Filter className="w-3 h-3 opacity-40" />
      </div>
    </th>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Realtime Calls</h1>
        <p className="text-sm text-muted-foreground mt-1">Live feed of every call hitting the network in the last 24 hours.</p>
      </div>

      {/* Top stat cards + actions */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex gap-3">
          <Card className="px-5 py-3 flex items-center gap-3 min-w-[200px]">
            <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <Phone className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Total Calls</div>
              <div className="text-2xl font-bold text-foreground leading-tight">35</div>
            </div>
          </Card>
          <Card className="px-5 py-3 flex items-center gap-3 min-w-[200px]">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center relative">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">In Progress</div>
              <div className="text-2xl font-bold text-foreground leading-tight">3</div>
            </div>
          </Card>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live · updating every 5s
          </span>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <Download className="w-4 h-4" /> EXPORT
          </Button>
        </div>
      </div>

      {/* Table card */}
      <Card className="overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border flex-wrap">
          <div className="flex items-center gap-1 text-xs">
            <button className="px-2 py-1 rounded text-muted-foreground hover:bg-muted">First</button>
            <button className="px-2 py-1 rounded text-muted-foreground hover:bg-muted">Previous</button>
            <button onClick={() => setPage(1)} className={`w-7 h-7 rounded ${page===1 ? "bg-slate-900 text-white" : "text-muted-foreground hover:bg-muted"}`}>1</button>
            <button onClick={() => setPage(2)} className={`w-7 h-7 rounded ${page===2 ? "bg-slate-900 text-white" : "text-muted-foreground hover:bg-muted"}`}>2</button>
            <button className="px-2 py-1 rounded text-muted-foreground hover:bg-muted">Next</button>
            <button className="px-2 py-1 rounded text-muted-foreground hover:bg-muted">Last</button>
            <span className="ml-3 text-muted-foreground">Showing 1–35 of 35</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-8">
              <Filter className="w-3.5 h-3.5" /> Filters
              <span className="text-[10px] bg-sky-100 text-sky-700 rounded-full px-1.5 py-0.5 font-semibold">3</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 h-8">
              <Columns3 className="w-3.5 h-3.5" /> Columns
            </Button>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search caller, number, publisher..." className="h-8 pl-8 w-64 text-xs" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <Th>Date/Time</Th>
                <Th>Call Record ID</Th>
                <Th>Caller ID</Th>
                <Th>Promo Number</Th>
                <Th>Call Type</Th>
                <Th>Publisher</Th>
                <Th>Campaign</Th>
                <Th>Type</Th>
                <Th>Pers.</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id + i} className="border-b border-border hover:bg-muted/30 relative">
                  <td className="px-4 py-3 font-mono text-xs text-foreground relative">
                    {r.live && <span className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400" />}
                    {r.time}
                  </td>
                  <td className="px-4 py-3 text-sky-600 font-mono text-xs hover:underline cursor-pointer">{r.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.caller}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.promo}</td>
                  <td className="px-4 py-3 text-foreground">{r.type}</td>
                  <td className="px-4 py-3 text-sky-600 hover:underline cursor-pointer">{r.publisher}</td>
                  <td className="px-4 py-3 text-sky-600 hover:underline cursor-pointer">{r.campaign}</td>
                  <td className="px-4 py-3 text-foreground">{r.bundle}</td>
                  <td className={`px-4 py-3 ${r.persistent === "Yes" ? "text-emerald-600" : "text-muted-foreground"}`}>{r.persistent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RealtimeCallsView;
