
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Download, X } from "lucide-react";
import { toast } from "sonner";

interface BulkActionsBarProps {
  selectedCount: number;
  onRefreshSelected: () => void;
  onExportSelected: () => void;
  onClearSelection: () => void;
}

const BulkActionsBar = ({ selectedCount, onRefreshSelected, onExportSelected, onClearSelection }: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {selectedCount} selected
          </Badge>
          <span className="text-sm text-gray-600">Bulk actions:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onRefreshSelected}
            className="flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Status
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onExportSelected}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearSelection}
            className="flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;
