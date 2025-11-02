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
    companyName: agency?.company_name || "",
    legalName: agency?.legal_name || "",
    description: agency?.description || "",
    agencyModel: agency?.agency_model || "marketplace_buyers",
    addressStreet: agency?.address_street || "",
    addressCity: agency?.address_city || "",
    addressState: agency?.address_state || "",
    addressZip: agency?.address_zip || "",
    phone: agency?.phone || "",
    ownerEmail: "",
    ownerPassword: "",
    ownerFullName: "",
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
            company_name: formData.companyName,
            legal_name: formData.legalName,
            agency_model: formData.agencyModel,
            agency_description: formData.description,
            address_street: formData.addressStreet,
            address_city: formData.addressCity,
            address_state: formData.addressState,
            address_zip: formData.addressZip,
            phone: formData.phone,
          })
          .eq("agency_id", agency.id);

        if (error) throw error;
        toast.success("Agency updated successfully");
      } else {
        // Create new agency with owner account
        if (!formData.ownerEmail || !formData.ownerPassword || !formData.ownerFullName) {
          toast.error("Owner email, password, and full name are required");
          return;
        }

        // Create the owner user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.ownerEmail,
          password: formData.ownerPassword,
          options: {
            data: {
              full_name: formData.ownerFullName,
            },
          },
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error("Failed to create user account");

        // Create agency branding record
        const { data: agencyData, error: agencyError } = await supabase
          .from("agency_branding")
          .insert({
            agency_id: authData.user.id,
            company_name: formData.companyName,
            legal_name: formData.legalName,
            agency_model: formData.agencyModel,
            agency_description: formData.description,
            address_street: formData.addressStreet,
            address_city: formData.addressCity,
            address_state: formData.addressState,
            address_zip: formData.addressZip,
            phone: formData.phone,
          })
          .select()
          .single();

        if (agencyError) throw agencyError;

        // Assign owner role using security definer function
        const { error: roleError } = await supabase.rpc("initialize_agency_owner", {
          _user_id: authData.user.id,
          _agency_id: authData.user.id,
        });

        if (roleError) throw roleError;

        toast.success("Agency and owner account created successfully");
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
            {/* Company Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Company Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    placeholder="Legal business name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Address</h3>
              <div className="space-y-2">
                <Label htmlFor="addressStreet">Street Address *</Label>
                <Input
                  id="addressStreet"
                  value={formData.addressStreet}
                  onChange={(e) => setFormData({ ...formData, addressStreet: e.target.value })}
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressCity">City *</Label>
                  <Input
                    id="addressCity"
                    value={formData.addressCity}
                    onChange={(e) => setFormData({ ...formData, addressCity: e.target.value })}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressState">State *</Label>
                  <Input
                    id="addressState"
                    value={formData.addressState}
                    onChange={(e) => setFormData({ ...formData, addressState: e.target.value })}
                    placeholder="CA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressZip">ZIP Code *</Label>
                  <Input
                    id="addressZip"
                    value={formData.addressZip}
                    onChange={(e) => setFormData({ ...formData, addressZip: e.target.value })}
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Owner Account Setup (only for new agencies) */}
            {!agency && (
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-lg font-semibold">Owner Account Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Create the login credentials for the agency owner
                </p>
                <div className="space-y-2">
                  <Label htmlFor="ownerFullName">Owner Full Name *</Label>
                  <Input
                    id="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={(e) => setFormData({ ...formData, ownerFullName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Owner Email *</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      placeholder="owner@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPassword">Password *</Label>
                    <Input
                      id="ownerPassword"
                      type="password"
                      value={formData.ownerPassword}
                      onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                      placeholder="Minimum 6 characters"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Notes (Optional)</Label>
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
