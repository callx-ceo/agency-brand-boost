
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CallSummaryProps {
  onClientInfoClick?: () => void;
}

const CallSummary = ({ onClientInfoClick }: CallSummaryProps) => {
  return (
    <div className="p-6 h-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              TRANSCRIPT
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300"
              onClick={onClientInfoClick}
            >
              CLIENT INFO
            </Button>
          </div>
        </div>

        {/* Client Information Display */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Client Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">First Name:</span>
                <span className="font-medium">Benjamin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Name:</span>
                <span className="font-medium">Panic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Zip Code:</span>
                <span className="font-medium">0551</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DOB:</span>
                <span className="font-medium">20/10/1996</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">78 Kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">5'7"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Face Value:</span>
                <span className="font-medium">$5000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tobacco User:</span>
                <span className="font-medium">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Any Diseases:</span>
                <span className="font-medium">No</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank Account:</span>
                <span className="font-medium">Yes</span>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h4 className="font-medium mb-2">Notes</h4>
            <div className="bg-gray-50 rounded-lg p-3 min-h-[80px] text-sm text-gray-600">
              Tlex
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallSummary;
