import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Lead {
  id: string;
  name: string;
  company: string;
  status: "Hot Lead" | "Warm" | "Cold" | "Follow-up";
  context: string;
  action: string;
  bestTime: string;
  timeSaved: number;
}

interface EditLeadModalProps {
  lead: Lead;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
}

const EditLeadModal = ({ lead, onClose, onSave }: EditLeadModalProps) => {
  const [formData, setFormData] = useState(lead);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Lead Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Lead Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="TechCorp"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hot Lead">🔥 Hot Lead</SelectItem>
                <SelectItem value="Warm">☀️ Warm</SelectItem>
                <SelectItem value="Cold">❄️ Cold</SelectItem>
                <SelectItem value="Follow-up">📋 Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Context / Notes</Label>
            <Textarea
              id="context"
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              rows={3}
              placeholder="Add context about this lead..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="action">Action Button Text</Label>
              <Input
                id="action"
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                placeholder="Send Pricing"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bestTime">Best Time</Label>
              <Input
                id="bestTime"
                value={formData.bestTime}
                onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                placeholder="Best time: 2-4pm"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadModal;
