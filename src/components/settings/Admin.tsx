
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandingSettings from "./BrandingSettings";
import DomainSettings from "./DomainSettings";
import BillingTab from "./BillingTab";

const Admin = () => {
  const handleSave = () => {
    toast.success("General settings saved successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding & Appearance</TabsTrigger>
          <TabsTrigger value="domain">Custom Domain</TabsTrigger>
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
        
        <TabsContent value="branding">
          <BrandingSettings />
        </TabsContent>
        
        <TabsContent value="domain">
          <DomainSettings />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
