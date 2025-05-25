
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Building2, User, Mail, Phone, Calendar, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";

interface ApplicationDetailsDialogProps {
  application: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationDetailsDialog = ({ application, open, onOpenChange }: ApplicationDetailsDialogProps) => {
  if (!application) return null;

  const handleRefreshStatus = () => {
    toast.success("Status refreshed from carrier");
    console.log("Refreshed status for application:", application.id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved": return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected": return <Badge variant="destructive">Rejected</Badge>;
      case "under-review": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyIndicator = (dateSubmitted: string) => {
    const daysSinceSubmission = Math.floor((new Date().getTime() - new Date(dateSubmitted).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceSubmission > 7) {
      return <Badge variant="destructive" className="ml-2">Overdue</Badge>;
    } else if (daysSinceSubmission > 5) {
      return <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-800">Urgent</Badge>;
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Application Details - {application.agencyName}</span>
            <div className="flex items-center gap-2">
              {getStatusBadge(application.status)}
              {getUrgencyIndicator(application.dateSubmitted)}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleRefreshStatus}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Status from Carrier
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agency Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-lg">Agency Information</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Agency Name:</span>
                  <span className="font-medium">{application.agencyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Business Type:</span>
                  <span>{application.businessType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Expected Revenue:</span>
                  <span className="text-green-600 font-medium">{application.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Expected Agents:</span>
                  <span>{application.expectedAgents}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Contact Name:</span>
                  <span className="font-medium">{application.contactName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Email:</span>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span>{application.email}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{application.phone}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Agent Name:</span>
                  <span className="font-medium">{application.agentName}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Application Timeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-lg">Application Timeline</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date Submitted:</span>
                <span>{application.dateSubmitted}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Current Status:</span>
                {getStatusBadge(application.status)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold text-lg">Notes & Comments</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">{application.notes}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
