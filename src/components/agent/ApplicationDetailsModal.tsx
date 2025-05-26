
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, X } from "lucide-react";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: any) => void;
}

const ApplicationDetailsModal = ({ isOpen, onClose, onSubmit }: ApplicationDetailsModalProps) => {
  const [formData, setFormData] = useState({
    applicationNumber: "Application 01",
    firstName: "",
    lastName: "",
    company: "",
    product: "",
    policyNumber: "",
    insuranceType: "",
    splitWithAgent: "male",
    monthlyPayment: "",
    annualPayment: "",
    submittedDate: "",
    effectiveDate: "",
    carrier: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Application Detail</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-gray-600">Please enter application details below</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Application Number */}
          <div>
            <Label htmlFor="appNumber" className="text-sm font-medium">Application Number</Label>
            <Input
              id="appNumber"
              value={formData.applicationNumber}
              onChange={(e) => handleInputChange("applicationNumber", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Company and Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company" className="text-sm font-medium">Company</Label>
              <Select value={formData.company} onValueChange={(value) => handleInputChange("company", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company1">Company 1</SelectItem>
                  <SelectItem value="company2">Company 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="product" className="text-sm font-medium">Product</Label>
              <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product1">Product 1</SelectItem>
                  <SelectItem value="product2">Product 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Policy Number and Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="policyNumber" className="text-sm font-medium">Policy Number</Label>
              <Input
                id="policyNumber"
                placeholder="123456789012"
                value={formData.policyNumber}
                onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="productSelect" className="text-sm font-medium">Product</Label>
              <Select value={formData.insuranceType} onValueChange={(value) => handleInputChange("insuranceType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="10 Year Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10year">10 Year Term</SelectItem>
                  <SelectItem value="20year">20 Year Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Insurance Types */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insuranceType1" className="text-sm font-medium">Insurance Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Final Expense" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="final">Final Expense</SelectItem>
                  <SelectItem value="term">Term Life</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="insuranceType2" className="text-sm font-medium">Insurance Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Auto Insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Split With Agent */}
          <div>
            <Label className="text-sm font-medium">Split With Agent?</Label>
            <RadioGroup 
              value={formData.splitWithAgent} 
              onValueChange={(value) => handleInputChange("splitWithAgent", value)}
              className="flex gap-8 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="splitMale" />
                <Label htmlFor="splitMale" className="font-normal">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="splitFemale" />
                <Label htmlFor="splitFemale" className="font-normal">Female</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthlyPayment" className="text-sm font-medium">Monthly Payment</Label>
              <Input
                id="monthlyPayment"
                placeholder="$ 244.30"
                value={formData.monthlyPayment}
                onChange={(e) => handleInputChange("monthlyPayment", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="annualPayment" className="text-sm font-medium">Annual Payment</Label>
              <Input
                id="annualPayment"
                placeholder="$ 2844.36"
                value={formData.annualPayment}
                onChange={(e) => handleInputChange("annualPayment", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="submittedDate" className="text-sm font-medium">Submitted Date</Label>
              <div className="relative mt-1">
                <Input
                  id="submittedDate"
                  placeholder="01/04/2025"
                  value={formData.submittedDate}
                  onChange={(e) => handleInputChange("submittedDate", e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="effectiveDate" className="text-sm font-medium">Effective Date</Label>
              <div className="relative mt-1">
                <Input
                  id="effectiveDate"
                  placeholder="01/04/2025"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Carrier */}
          <div>
            <Label htmlFor="carrier" className="text-sm font-medium">Carrier</Label>
            <Select value={formData.carrier} onValueChange={(value) => handleInputChange("carrier", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carrier1">Carrier 1</SelectItem>
                <SelectItem value="carrier2">Carrier 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="mt-1 min-h-[60px] resize-none"
            />
          </div>

          {/* Add another application link */}
          <div className="text-center">
            <button className="text-blue-600 text-sm hover:underline">
              + Add another application
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} className="bg-gray-800 hover:bg-gray-900 text-white px-8">
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
