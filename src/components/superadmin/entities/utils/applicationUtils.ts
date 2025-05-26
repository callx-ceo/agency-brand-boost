
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock } from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case "approved": return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
    case "rejected": return <Badge variant="destructive">Rejected</Badge>;
    case "under-review": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export const getUrgencyIndicator = (dateSubmitted: string) => {
  const daysSinceSubmission = Math.floor((new Date().getTime() - new Date(dateSubmitted).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceSubmission > 7) {
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  } else if (daysSinceSubmission > 5) {
    return <Clock className="w-4 h-4 text-orange-500" />;
  }
  return null;
};

export const getUniqueAgencies = (applications: any[]) => {
  const agencies = [...new Set(applications.map(app => app.agencyName))];
  return agencies.sort();
};

export const getTabCounts = (applications: any[], selectedAgency: string) => {
  const allFiltered = selectedAgency === "all" ? applications : applications.filter(a => a.agencyName === selectedAgency);
  return {
    all: allFiltered.length,
    pending: allFiltered.filter(a => a.status === "pending").length,
    approved: allFiltered.filter(a => a.status === "approved").length,
    rejected: allFiltered.filter(a => a.status === "rejected").length,
    "under-review": allFiltered.filter(a => a.status === "under-review").length,
  };
};
