
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DowngradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  agencyId?: string;
}

const DowngradeModal = ({ open, onOpenChange, currentPlan, agencyId }: DowngradeModalProps) => {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reasonOptions = [
    { value: "cost_concerns", label: "Cost concerns" },
    { value: "no_white_label", label: "No longer need white label" },
    { value: "scaling_down", label: "Scaling down operations" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch("/api/v1/agency/billing/downgrade-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          agencyId: agencyId || "mock-agency-id",
          currentPlan: currentPlan,
          requestedPlan: "agency_basic",
          reason: reason,
          notes: notes
        })
      });

      console.log("Downgrade request submitted:", { currentPlan, reason, notes });
      
      toast({
        title: "Request Submitted",
        description: "Your downgrade request has been submitted. Our team will follow up with next steps.",
        variant: "default"
      });
      
      onOpenChange(false);
      // Reset form
      setReason("");
      setNotes("");
      
    } catch (error) {
      console.error("Failed to submit downgrade request:", error);
      toast({
        title: "Error",
        description: "Failed to submit downgrade request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Downgrade to Basic Plan</DialogTitle>
          <DialogDescription>
            Please review the changes that will occur with your plan downgrade.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Warning Section */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-2">Important Changes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• White label branding will be removed</li>
                  <li>• Custom domains will be disabled</li>
                  <li>• Agent seats reduced from 10 to 3</li>
                  <li>• Agents above limit may be deactivated</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Downgrades are reviewed manually to ensure a smooth transition. 
              A CallX team member will follow up shortly to coordinate the change.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for Downgrade (Optional)</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Comments (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional details about your downgrade request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DowngradeModal;
