
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, X } from "lucide-react";

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientInfoModal = ({ isOpen, onClose }: ClientInfoModalProps) => {
  // Mock client data - in real app this would come from props or API
  const clientData = {
    firstName: "Benjamin",
    lastName: "Panic",
    gender: "Male",
    zipCode: "0551",
    dob: "20/10/1996",
    weight: "78 Kg",
    height: "5'7\"",
    faceValue: "$5000",
    tobaccoUser: "Yes",
    diseases: "No",
    bankAccount: "Yes"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Summary</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Header Actions */}
          <div className="flex gap-2 justify-end">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              TRANSCRIPT
            </Badge>
            <Badge variant="outline" className="border-gray-300">
              CLIENT INFO
            </Badge>
          </div>

          {/* Client Information */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">First Name:</span>
              <span className="font-medium">{clientData.firstName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Name:</span>
              <span className="font-medium">{clientData.lastName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gender:</span>
              <span className="font-medium">{clientData.gender}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zip Code:</span>
              <span className="font-medium">{clientData.zipCode}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">DOB:</span>
              <span className="font-medium">{clientData.dob}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weight:</span>
              <span className="font-medium">{clientData.weight}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Height:</span>
              <span className="font-medium">{clientData.height}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Face Value:</span>
              <span className="font-medium">{clientData.faceValue}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tobacco User:</span>
              <span className="font-medium">{clientData.tobaccoUser}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Any Diseases:</span>
              <span className="font-medium">{clientData.diseases}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bank Account:</span>
              <span className="font-medium">{clientData.bankAccount}</span>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Notes</h4>
            <div className="bg-gray-50 rounded-lg p-3 min-h-[80px] text-sm text-gray-600">
              Tlex
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientInfoModal;
