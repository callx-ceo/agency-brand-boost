
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, X } from "lucide-react";

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientInfoModal = ({ isOpen, onClose }: ClientInfoModalProps) => {
  // Mock client data - in real app this would come from props or API
  const initialClientData = {
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

  const [clientData, setClientData] = useState(initialClientData);
  const [notes, setNotes] = useState("Tlex");

  const handleInputChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving client data:", clientData);
    console.log("Notes:", notes);
    // Here you would typically save to API
    onClose();
  };

  const handleCancel = () => {
    // Reset to initial data
    setClientData(initialClientData);
    setNotes("Tlex");
    onClose();
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
            <Button variant="ghost" size="sm" onClick={handleCancel}>
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

          {/* Client Information Form */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-xs text-gray-600">First Name:</Label>
                <Input
                  id="firstName"
                  value={clientData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs text-gray-600">Last Name:</Label>
                <Input
                  id="lastName"
                  value={clientData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="gender" className="text-xs text-gray-600">Gender:</Label>
              <Select value={clientData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="zipCode" className="text-xs text-gray-600">Zip Code:</Label>
              <Input
                id="zipCode"
                value={clientData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="dob" className="text-xs text-gray-600">DOB:</Label>
              <Input
                id="dob"
                value={clientData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="h-8 text-sm"
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div>
              <Label htmlFor="weight" className="text-xs text-gray-600">Weight:</Label>
              <Input
                id="weight"
                value={clientData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="height" className="text-xs text-gray-600">Height:</Label>
              <Input
                id="height"
                value={clientData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="faceValue" className="text-xs text-gray-600">Face Value:</Label>
              <Input
                id="faceValue"
                value={clientData.faceValue}
                onChange={(e) => handleInputChange('faceValue', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="tobaccoUser" className="text-xs text-gray-600">Tobacco User:</Label>
              <Select value={clientData.tobaccoUser} onValueChange={(value) => handleInputChange('tobaccoUser', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="diseases" className="text-xs text-gray-600">Any Diseases:</Label>
              <Select value={clientData.diseases} onValueChange={(value) => handleInputChange('diseases', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="bankAccount" className="text-xs text-gray-600">Bank Account:</Label>
              <Select value={clientData.bankAccount} onValueChange={(value) => handleInputChange('bankAccount', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <Label htmlFor="notes" className="text-sm font-semibold mb-2 block">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] text-sm resize-none"
              placeholder="Add notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientInfoModal;
