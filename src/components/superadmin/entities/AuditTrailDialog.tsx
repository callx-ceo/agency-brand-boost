
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Clock, FileText, AlertTriangle } from "lucide-react";

interface AuditEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: 'status_change' | 'document_upload' | 'note_added' | 'system_action';
}

interface AuditTrailDialogProps {
  applicationId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockAuditTrail: AuditEntry[] = [
  {
    id: 1,
    timestamp: "2025-05-26 14:30:22",
    user: "Super Admin",
    action: "Status Changed",
    details: "Changed from 'Under Review' to 'Approved'",
    type: "status_change"
  },
  {
    id: 2,
    timestamp: "2025-05-26 10:15:45",
    user: "System",
    action: "Carrier Response",
    details: "Received approval notification from carrier API",
    type: "system_action"
  },
  {
    id: 3,
    timestamp: "2025-05-25 16:22:10",
    user: "Admin User",
    action: "Note Added",
    details: "Added compliance review notes",
    type: "note_added"
  },
  {
    id: 4,
    timestamp: "2025-05-25 09:30:00",
    user: "Agency Contact",
    action: "Document Upload",
    details: "Uploaded additional KYC documentation",
    type: "document_upload"
  }
];

const AuditTrailDialog = ({ applicationId, open, onOpenChange }: AuditTrailDialogProps) => {
  const getActionIcon = (type: AuditEntry['type']) => {
    switch (type) {
      case 'status_change':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'document_upload':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'note_added':
        return <User className="w-4 h-4 text-green-500" />;
      case 'system_action':
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionBadge = (type: AuditEntry['type']) => {
    switch (type) {
      case 'status_change':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700">Status Change</Badge>;
      case 'document_upload':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Document</Badge>;
      case 'note_added':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Note</Badge>;
      case 'system_action':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">System</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Audit Trail - Application #{applicationId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {mockAuditTrail.map((entry, index) => (
            <div key={entry.id}>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(entry.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{entry.action}</span>
                      {getActionBadge(entry.type)}
                    </div>
                    <span className="text-xs text-gray-500">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{entry.details}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    {entry.user}
                  </div>
                </div>
              </div>
              {index < mockAuditTrail.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditTrailDialog;
