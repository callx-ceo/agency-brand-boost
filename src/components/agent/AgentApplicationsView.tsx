
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ExternalLink, Pencil } from "lucide-react";

interface Application {
  id: number;
  name: string;
  phone: string;
  carrier: string;
  product: string;
  policyNo: string;
  state: string;
  submitDate: string;
  effectiveDate: string;
  submittedAP: { monthly: string; yearly: string };
  agent: string;
  splitAgent: string;
  status: "Approved" | "Underwriting" | "Pending" | "Declined";
}

const AgentApplicationsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const applications: Application[] = [
    { id: 1, name: "Gary Andrews", phone: "903-746-5217", carrier: "Other", product: "Other", policyNo: "9801802", state: "TX", submitDate: "04/15/2026", effectiveDate: "04/15/2026", submittedAP: { monthly: "$136.11/mo", yearly: "$1,633.32/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Underwriting" },
    { id: 2, name: "Kisha Goode", phone: "209-390-2352", carrier: "Mutual of Omaha", product: "Living Promise", policyNo: "BU6565868", state: "CA", submitDate: "04/14/2026", effectiveDate: "04/14/2026", submittedAP: { monthly: "$131.18/mo", yearly: "$1,574.16/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 3, name: "Bonnie Harris-Crum", phone: "435-749-0695", carrier: "Transamerica", product: "Immediate Solution", policyNo: "FEXB452012", state: "UT", submitDate: "04/10/2026", effectiveDate: "04/10/2026", submittedAP: { monthly: "$114.01/mo", yearly: "$1,368.12/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 4, name: "Linda Hurley", phone: "405-829-7219", carrier: "Other", product: "Other", policyNo: "7GG60184", state: "OK", submitDate: "04/10/2026", effectiveDate: "05/03/2026", submittedAP: { monthly: "$42.02/mo", yearly: "$504.24/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Approved" },
    { id: 5, name: "Quinton Hockoday", phone: "931-302-4174", carrier: "Transamerica", product: "Immediate Solution", policyNo: "FEX", state: "TN", submitDate: "04/10/2026", effectiveDate: "05/01/2026", submittedAP: { monthly: "$129.52/mo", yearly: "$1,554.24/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Underwriting" },
    { id: 6, name: "Keith Douglas", phone: "774-433-4965", carrier: "Aetna", product: "Accendo", policyNo: "ACC7189564", state: "MA", submitDate: "04/08/2026", effectiveDate: "05/01/2026", submittedAP: { monthly: "$91.83/mo", yearly: "$1,101.96/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 7, name: "Jose Pinela", phone: "760-391-7196", carrier: "Gerber", product: "Final Expense", policyNo: "NA", state: "CA", submitDate: "04/08/2026", effectiveDate: "04/09/2026", submittedAP: { monthly: "$11.04/mo", yearly: "$132.48/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Approved" },
    { id: 8, name: "Jose Pinela", phone: "760-391-7196", carrier: "Other", product: "Other", policyNo: "2200073614", state: "CA", submitDate: "04/08/2026", effectiveDate: "04/09/2026", submittedAP: { monthly: "$132.04/mo", yearly: "$1,584.48/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Approved" },
    { id: 9, name: "Linda Washington", phone: "414-628-2266", carrier: "Americo", product: "Eagle Select", policyNo: "AM03190052", state: "WI", submitDate: "04/07/2026", effectiveDate: "05/04/2026", submittedAP: { monthly: "$47.33/mo", yearly: "$567.96/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Approved" },
    { id: 10, name: "Mark Sizemore", phone: "864-517-6368", carrier: "Aetna", product: "Accendo", policyNo: "ACC7188780", state: "SC", submitDate: "04/07/2026", effectiveDate: "05/01/2026", submittedAP: { monthly: "$110.08/mo", yearly: "$1,320.96/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 11, name: "David Elliott", phone: "614-720-5759", carrier: "Mutual of Omaha", product: "Living Promise", policyNo: "na", state: "OH", submitDate: "04/03/2026", effectiveDate: "04/03/2026", submittedAP: { monthly: "$36.27/mo", yearly: "$435.24/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 12, name: "Myra Johnson", phone: "334-544-4151", carrier: "Transamerica", product: "Immediate Solution", policyNo: "FEXB433931v", state: "AL", submitDate: "04/01/2026", effectiveDate: "04/01/2026", submittedAP: { monthly: "$138.93/mo", yearly: "$1,667.16/yr" }, agent: "Zach Enyeart", splitAgent: "Harold Durana", status: "Approved" },
    { id: 13, name: "Geraldine Kinard", phone: "864-981-3573", carrier: "Mutual of Omaha", product: "Living Promise", policyNo: "BU6530842", state: "SC", submitDate: "03/31/2026", effectiveDate: "03/31/2026", submittedAP: { monthly: "$68.35/mo", yearly: "$820.20/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Underwriting" },
    { id: 14, name: "Cecil Alford", phone: "405-885-7950", carrier: "Other", product: "Other", policyNo: "7G59410", state: "OK", submitDate: "03/31/2026", effectiveDate: "04/03/2026", submittedAP: { monthly: "$113.19/mo", yearly: "$1,358.28/yr" }, agent: "Zach Enyeart", splitAgent: "", status: "Approved" },
  ];

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "Approved":
        return <span className="text-emerald-600 font-medium text-sm">Approved</span>;
      case "Underwriting":
        return <span className="text-amber-600 font-medium text-sm">Underwriting</span>;
      case "Pending":
        return <span className="text-blue-600 font-medium text-sm">Pending</span>;
      case "Declined":
        return <span className="text-red-600 font-medium text-sm">Declined</span>;
    }
  };

  const filtered = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Applications</h2>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Name or Phone Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="border border-border/60 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Name</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Phone Number</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Carrier</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Product</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Policy No</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">State</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Submit Date</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Effective Date</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Submitted AP</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Agent</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Split Agent</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Status</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-2.5">
                    <a href="#" className="text-blue-600 hover:underline font-medium text-sm">{app.name}</a>
                  </td>
                  <td className="px-3 py-2.5 text-foreground">{app.phone}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.carrier}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.product}</td>
                  <td className="px-3 py-2.5 text-foreground font-mono text-xs">{app.policyNo}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.state}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.submitDate}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.effectiveDate}</td>
                  <td className="px-3 py-2.5">
                    <div className="text-foreground text-sm">{app.submittedAP.monthly}</div>
                    <div className="text-muted-foreground text-xs">{app.submittedAP.yearly}</div>
                  </td>
                  <td className="px-3 py-2.5 text-foreground">{app.agent}</td>
                  <td className="px-3 py-2.5 text-foreground">{app.splitAgent || "—"}</td>
                  <td className="px-3 py-2.5">{getStatusBadge(app.status)}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentApplicationsView;
