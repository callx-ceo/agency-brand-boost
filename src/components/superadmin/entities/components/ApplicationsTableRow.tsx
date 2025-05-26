
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, History, RefreshCw, Mail, Phone, Building2, Calendar } from "lucide-react";
import { getStatusBadge, getUrgencyIndicator } from "../utils/applicationUtils";

interface ApplicationsTableRowProps {
  application: any;
  isSelected: boolean;
  onSelectApplication: (id: number, checked: boolean) => void;
  onViewDetails: (application: any) => void;
  onViewAuditTrail: (id: number) => void;
  onRefreshStatus: (id: number) => void;
}

const ApplicationsTableRow = ({
  application,
  isSelected,
  onSelectApplication,
  onViewDetails,
  onViewAuditTrail,
  onRefreshStatus,
}: ApplicationsTableRowProps) => {
  return (
    <TableRow className={isSelected ? "bg-blue-50" : ""}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectApplication(application.id, checked as boolean)}
        />
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{application.contactName}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span className="truncate max-w-[150px]">{application.email}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1 md:hidden">
            <Phone className="w-3 h-3" />
            {application.phone}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="truncate">{application.agencyName}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium truncate">{application.agentName}</div>
      </TableCell>
      <TableCell>
        <span className="truncate">{application.businessType}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {application.dateSubmitted}
          </div>
          {getUrgencyIndicator(application.dateSubmitted)}
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(application.status)}</TableCell>
      <TableCell>
        <div className="flex gap-1 flex-wrap">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewDetails(application)}
            className="flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewAuditTrail(application.id)}
            className="flex-shrink-0"
          >
            <History className="w-4 h-4" />
          </Button>
          {(application.status === "pending" || application.status === "under-review") && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onRefreshStatus(application.id)}
              className="text-blue-600 hover:text-blue-700 flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ApplicationsTableRow;
