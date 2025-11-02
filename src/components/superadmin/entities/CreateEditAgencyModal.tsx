import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Upload, GitMerge } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreateEditAgencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agency?: any;
  onSuccess?: () => void;
}

const CreateEditAgencyModal = ({ open, onOpenChange, agency, onSuccess }: CreateEditAgencyModalProps) => {
  const [formData, setFormData] = useState({
    name: agency?.name || "",
    description: agency?.description || "",
    agencyModel: agency?.agency_model || "marketplace_buyers",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const agencyModels = [
    {
      value: "marketplace_buyers",
      icon: ShoppingCart,
      title: "Marketplace Buyers",
      description: "Buy 100% of calls through CallX media.",
      badge: "$0 Tracking Fee",
      bestFor: "Agencies that want done-for-you inbound flow.",
    },
    {
      value: "bring_your_own_media",
      icon: Upload,
      title: "Bring Your Own Media (BYO)",
      description: "Run their own ads and publishers through CallX tracking.",
      badge: "Usage-Based",
      bestFor: "Agencies with in-house buyers or publisher relationships.",
    },
    {
      value: "hybrid",
      icon: GitMerge,
      title: "Hybrid",
      description: "Combine CallX Marketplace calls with their own external sources.",
      badge: "Flexible Pricing",
      bestFor: "Growth agencies that mix owned and network traffic.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (agency) {
        // Update existing agency
        const { error } = await supabase
          .from("agency_branding")
          .update({
            agency_model: formData.agencyModel,
            agency_description: formData.description,
          })
          .eq("agency_id", agency.id);

        if (error) throw error;
        toast.success("Agency updated successfully");
      } else {
        // Create new agency - in a real app, this would create the agency user account first
        toast.info("Agency creation flow would be implemented here");
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error saving agency:", error);
      toast.error(error.message || "Failed to save agency");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agency ? "Edit Agency" : "Create New Agency"}</DialogTitle>
          <DialogDescription>
            {agency
              ? "Update agency details and configuration"
              : "Set up a new agency with their preferred call sourcing model"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agency Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter agency name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional notes about this agency"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Agency Model</Label>
              <RadioGroup
                value={formData.agencyModel}
                onValueChange={(value) => setFormData({ ...formData, agencyModel: value })}
              >
                <div className="grid gap-4">
                  {agencyModels.map((model) => {
                    const Icon = model.icon;
                    const isSelected = formData.agencyModel === model.value;

                    return (
                      <Card
                        key={model.value}
                        className={`cursor-pointer transition-all hover:border-primary ${
                          isSelected ? "border-primary ring-2 ring-primary/20" : ""
                        }`}
                        onClick={() => setFormData({ ...formData, agencyModel: model.value })}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <RadioGroupItem value={model.value} id={model.value} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Label htmlFor={model.value} className="text-base font-semibold cursor-pointer">
                                      {model.title}
                                    </Label>
                                    <Badge variant="secondary" className="text-xs">
                                      {model.badge}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{model.description}</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground ml-14">
                                <span className="font-medium">Best for:</span> {model.bestFor}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            {formData.agencyModel !== "marketplace_buyers" && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 text-sm">Usage-Based Pricing</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">US/CA Numbers</p>
                      <p className="font-medium">$0.85/month</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">US/CA Minutes</p>
                      <p className="font-medium">$0.041/min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recording</p>
                      <p className="font-medium">$0.0085/min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Transcription</p>
                      <p className="font-medium">$0.034/min</p>
                    </div>
                  </div>
                  {formData.agencyModel === "hybrid" && (
                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                      Note: Marketplace calls have $0 tracking fees. Usage billing applies only to external traffic.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : agency ? "Update Agency" : "Create Agency"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAgencyModal;
