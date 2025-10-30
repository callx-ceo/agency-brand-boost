
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ColorPicker from "../ui/ColorPicker";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandPreview from "./BrandPreview";
import { EmailTemplateSelector } from "../agent/EmailTemplatePreview";

const BrandingSettings = () => {
  const [formData, setFormData] = useState({
    logoUrl: "",
    logoFile: null as File | null,
    logoPreview: "",
    faviconUrl: "",
    faviconFile: null as File | null,
    faviconPreview: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    fontFamily: "System UI",
    emailPrimaryColor: "#3B82F6",
  });

  const [activeTab, setActiveTab] = useState("settings");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or SVG file");
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        logoFile: file,
        logoPreview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/x-icon"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PNG or ICO file");
      return;
    }

    // Validate file size (500KB max)
    if (file.size > 500 * 1024) {
      toast.error("Favicon must be smaller than 500KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        faviconFile: file,
        faviconPreview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Here you would make an API call to save settings
    // For now, we'll just simulate a successful save
    toast.success("Branding settings saved successfully");
  };

  const handleColorChange = (color: string, type: "primary" | "secondary") => {
    setFormData({
      ...formData,
      [type === "primary" ? "primaryColor" : "secondaryColor"]: color,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Branding & Appearance</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <div className="space-y-8">
            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Logo</h3>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <Label htmlFor="logo-upload">Upload Logo</Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg"
                      onChange={handleLogoChange}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended: PNG or SVG with transparent background. Maximum 2MB.
                    </p>
                  </div>
                  <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-gray-50">
                    {formData.logoPreview ? (
                      <img
                        src={formData.logoPreview}
                        alt="Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm text-center">
                        No logo<br />uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Favicon</h3>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <Label htmlFor="favicon-upload">Upload Favicon</Label>
                    <Input
                      id="favicon-upload"
                      type="file"
                      accept=".png,.ico"
                      onChange={handleFaviconChange}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Must be a PNG or ICO file. Maximum 500KB. Recommended size: 32x32 or 16x16 pixels.
                    </p>
                  </div>
                  <div className="w-10 h-10 border rounded-md flex items-center justify-center bg-gray-50">
                    {formData.faviconPreview ? (
                      <img
                        src={formData.faviconPreview}
                        alt="Favicon Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-[10px]">
                        No icon
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primary-color">Primary Brand Color</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <ColorPicker
                        color={formData.primaryColor}
                        onChange={(color) => handleColorChange(color, "primary")}
                      />
                      <Input
                        id="primary-color"
                        value={formData.primaryColor}
                        onChange={(e) => handleColorChange(e.target.value, "primary")}
                        className="font-mono"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Used for buttons, headers, and key UI elements
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Brand Color</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <ColorPicker
                        color={formData.secondaryColor}
                        onChange={(color) => handleColorChange(color, "secondary")}
                      />
                      <Input
                        id="secondary-color"
                        value={formData.secondaryColor}
                        onChange={(e) => handleColorChange(e.target.value, "secondary")}
                        className="font-mono"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Used for accents, highlights, and secondary elements
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Typography</h3>
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={formData.fontFamily}
                    onValueChange={(value) => setFormData({ ...formData, fontFamily: value })}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="System UI">System UI</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    The primary font used throughout your branded portal
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button onClick={handleSave}>Save Branding Settings</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emails">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Email Template Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Customize the appearance and branding of automated performance emails sent to your agents
              </p>
            </div>
            
            <div>
              <Label htmlFor="email-primary-color">Email Brand Color</Label>
              <div className="flex items-center gap-3 mt-1">
                <ColorPicker
                  color={formData.emailPrimaryColor}
                  onChange={(color) => setFormData({ ...formData, emailPrimaryColor: color })}
                />
                <Input
                  id="email-primary-color"
                  value={formData.emailPrimaryColor}
                  onChange={(e) => setFormData({ ...formData, emailPrimaryColor: e.target.value })}
                  className="font-mono"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Primary color used in email headers, buttons, and accents
              </p>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-md font-medium mb-4">Email Template Previews</h4>
              <EmailTemplateSelector />
            </div>

            <div className="pt-4 border-t">
              <Button onClick={handleSave}>Save Email Template Settings</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <BrandPreview 
            logoUrl={formData.logoPreview || "/placeholder.svg"}
            primaryColor={formData.primaryColor}
            secondaryColor={formData.secondaryColor}
            fontFamily={formData.fontFamily}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandingSettings;
