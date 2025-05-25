
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandingSettings from "./BrandingSettings";
import DomainSettings from "./DomainSettings";
import BillingTab from "./BillingTab";

const Admin = () => {
  // Track white label platform status
  const [whiteLabelEnabled, setWhiteLabelEnabled] = useState(true); // Default enabled for demo
  
  // Mock current plan - this would come from your auth/billing context in a real app
  const currentPlan = {
    tier: "agency_pro" // Changed to pro to show white label features
  };
  
  // Show branding and domain tabs only for Pro users
  const isProPlan = currentPlan.tier === "agency_pro";

  const handleSave = () => {
    toast.success("General settings saved successfully");
  };

  // Handle white label status change from billing settings
  const handleWhiteLabelChange = (enabled: boolean) => {
    setWhiteLabelEnabled(enabled);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          {isProPlan && (
            <>
              <TabsTrigger value="branding">Branding & Appearance</TabsTrigger>
              <TabsTrigger value="domain">Custom Domain</TabsTrigger>
            </>
          )}
          <TabsTrigger value="billing">Billing & Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="space-y-6">
            <div>
              <Label htmlFor="agency-name">Agency Name</Label>
              <Input id="agency-name" placeholder="Your Agency Name" className="mt-1" defaultValue="Sample Agency" />
            </div>
            
            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" placeholder="contact@youragency.com" className="mt-1" defaultValue="contact@sampleagency.com" />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" className="mt-1" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input id="address" placeholder="123 Main St, City, State, ZIP" className="mt-1" defaultValue="123 Main St, San Francisco, CA 94105" />
            </div>
            
            <div className="pt-4 border-t">
              <Button onClick={handleSave}>Save General Settings</Button>
            </div>
          </div>
        </TabsContent>
        
        {isProPlan && (
          <>
            <TabsContent value="branding">
              <BrandingSettings />
            </TabsContent>
            
            <TabsContent value="domain">
              <DomainSettings />
            </TabsContent>
          </>
        )}

        <TabsContent value="billing">
          <BillingTab onWhiteLabelChange={handleWhiteLabelChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
