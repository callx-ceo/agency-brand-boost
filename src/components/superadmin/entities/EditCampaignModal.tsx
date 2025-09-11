import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@/types/campaignTypes";
import { CAMPAIGN_VERTICALS } from "./types/campaignTypes";
import { US_STATES } from "./types/offerTypes";
import { useToast } from "@/hooks/use-toast";

interface EditCampaignModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCampaign: Campaign) => void;
}

const EditCampaignModal = ({ campaign, isOpen, onClose, onSave }: EditCampaignModalProps) => {
  const [formData, setFormData] = useState({
    name: campaign.name,
    vertical: campaign.vertical,
    category: campaign.category,
    targetStates: [] as string[], // Would come from campaign data in real app
  });
  const { toast } = useToast();

  const handleStateToggle = (state: string) => {
    const newStates = formData.targetStates.includes(state)
      ? formData.targetStates.filter(s => s !== state)
      : [...formData.targetStates, state];
    setFormData({ ...formData, targetStates: newStates });
  };

  const handleSelectAllStates = () => {
    const allSelected = formData.targetStates.length === US_STATES.length;
    setFormData({ 
      ...formData, 
      targetStates: allSelected ? [] : [...US_STATES]
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Campaign name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.vertical) {
      toast({
        title: "Error", 
        description: "Vertical is required",
        variant: "destructive",
      });
      return;
    }

    const updatedCampaign: Campaign = {
      ...campaign,
      name: formData.name,
      vertical: formData.vertical,
      category: formData.category,
    };

    onSave(updatedCampaign);
    toast({
      title: "Success",
      description: "Campaign updated successfully",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Campaign name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vertical">Vertical *</Label>
                <Select
                  value={formData.vertical}
                  onValueChange={(value) => setFormData({ ...formData, vertical: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a vertical" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPAIGN_VERTICALS.map((vertical) => (
                      <SelectItem key={vertical} value={vertical}>
                        {vertical}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Calls will only be routed to agents assigned to this vertical
                </p>
              </div>

              <div>
                <Label htmlFor="category">Bundle Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Bundle category"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Select the states where this campaign will be active
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllStates}
                  >
                    {formData.targetStates.length === US_STATES.length ? "Deselect All" : "Select All"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-10 gap-2">
                  {US_STATES.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => handleStateToggle(state)}
                      className={`px-3 py-2 text-sm rounded border transition-colors ${
                        formData.targetStates.includes(state)
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
                
                {formData.targetStates.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Selected states ({formData.targetStates.length}):</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.targetStates.map(state => (
                        <Badge key={state} variant="outline">{state}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignModal;