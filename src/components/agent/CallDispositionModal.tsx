
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CallDispositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (disposition: string, notes: string) => void;
  onApplicationSubmitted: () => void;
}

const CallDispositionModal = ({ isOpen, onClose, onSubmit, onApplicationSubmitted }: CallDispositionModalProps) => {
  const [selectedDisposition, setSelectedDisposition] = useState("");
  const [notes, setNotes] = useState("");

  const dispositionOptions = [
    { value: "rate-too-high", label: "Rate Too High", icon: "🔥" },
    { value: "change-mind", label: "Change Mind", icon: "🤔" },
    { value: "doesnt-qualify", label: "Doesn't Qualify", icon: "❌" },
    { value: "application-submitted", label: "Application Submitted", icon: "✅" }
  ];

  const handleSubmit = () => {
    if (selectedDisposition) {
      if (selectedDisposition === "application-submitted") {
        onApplicationSubmitted();
      } else {
        onSubmit(selectedDisposition, notes);
      }
      setSelectedDisposition("");
      setNotes("");
    }
  };

  const handleClose = () => {
    setSelectedDisposition("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Call Disposition
          </DialogTitle>
          <p className="text-center text-sm text-gray-600">
            Please select the call disposition
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <RadioGroup value={selectedDisposition} onValueChange={setSelectedDisposition}>
            {dispositionOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Close
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={!selectedDisposition}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDispositionModal;
