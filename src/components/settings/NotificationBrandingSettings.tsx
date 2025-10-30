import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "../ui/ColorPicker";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationBrandingSettings = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateSettings, setTemplateSettings] = useState<Record<string, boolean>>({});
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    logoUrl: "",
    logoFile: null as File | null,
    logoPreview: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    footerText: "",
  });

  useEffect(() => {
    fetchTemplates();
    fetchAgencyBranding();
    fetchAgencyNotificationSettings();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchAgencyBranding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('agency_branding')
        .select('*')
        .eq('agency_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData({
          logoUrl: data.logo_url || "",
          logoFile: null,
          logoPreview: data.logo_url || "",
          primaryColor: data.primary_color || "#3B82F6",
          secondaryColor: data.secondary_color || "#10B981",
          footerText: data.footer_text || "",
        });
      }
    } catch (error) {
      console.error('Error fetching agency branding:', error);
    }
  };

  const fetchAgencyNotificationSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('agency_notification_settings')
        .select('template_id, enabled')
        .eq('agency_id', user.id);

      if (error) throw error;

      const settings: Record<string, boolean> = {};
      data?.forEach((setting) => {
        settings[setting.template_id] = setting.enabled;
      });
      setTemplateSettings(settings);
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or SVG file");
      return;
    }

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

  const handleSaveBranding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save settings");
        return;
      }

      // TODO: Upload logo file to storage if logoFile exists
      const logoUrl = formData.logoPreview; // Use existing preview for now

      const { error } = await supabase
        .from('agency_branding')
        .upsert({
          agency_id: user.id,
          logo_url: logoUrl,
          primary_color: formData.primaryColor,
          secondary_color: formData.secondaryColor,
          footer_text: formData.footerText,
        });

      if (error) throw error;
      toast.success("Branding settings saved successfully");
    } catch (error) {
      console.error('Error saving branding:', error);
      toast.error("Failed to save branding settings");
    }
  };

  const handleToggleTemplate = async (templateId: string, enabled: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('agency_notification_settings')
        .upsert({
          agency_id: user.id,
          template_id: templateId,
          enabled: enabled,
        });

      if (error) throw error;

      setTemplateSettings({ ...templateSettings, [templateId]: enabled });
      toast.success(`Notification ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error toggling template:', error);
      toast.error("Failed to update notification setting");
    }
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    let content = selectedTemplate.body_html || selectedTemplate.body_sms || '';

    content = content
      .replace(/{{agent_name}}/g, 'John Doe')
      .replace(/{{score}}/g, '85')
      .replace(/{{duration}}/g, '15')
      .replace(/{{outcome}}/g, 'Sale Completed')
      .replace(/{{recommended_action}}/g, 'Focus on objection handling')
      .replace(/{{primary_color}}/g, formData.primaryColor)
      .replace(/{{secondary_color}}/g, formData.secondaryColor)
      .replace(/{{footer}}/g, `<p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">${formData.footerText || 'Powered by CallX'}</p>`);

    // Add logo if available
    if (formData.logoPreview && selectedTemplate.notification_type === 'email') {
      content = `<div style="text-align: center; padding: 20px; background: ${formData.primaryColor};"><img src="${formData.logoPreview}" alt="Logo" style="max-height: 60px; max-width: 200px;" /></div>` + content;
    }

    return selectedTemplate.notification_type === 'email' ? (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    ) : (
      <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md">
        {content}
      </div>
    );
  };

  return (
    <Tabs defaultValue="branding" className="space-y-6">
      <TabsList>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="templates">Notification Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="branding" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Branding</CardTitle>
            <CardDescription>
              Customize how your notifications look with your agency branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="logo-upload">Logo</Label>
              <div className="flex items-start gap-6 mt-2">
                <div className="flex-1">
                  <Input
                    id="logo-upload"
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={handleLogoChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: PNG or SVG with transparent background. Maximum 2MB.
                  </p>
                </div>
                <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-muted">
                  {formData.logoPreview ? (
                    <img
                      src={formData.logoPreview}
                      alt="Logo Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm text-center">
                      No logo
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="primary-color">Primary Brand Color</Label>
                <div className="flex items-center gap-3 mt-2">
                  <ColorPicker
                    color={formData.primaryColor}
                    onChange={(color) => setFormData({ ...formData, primaryColor: color })}
                  />
                  <Input
                    id="primary-color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="font-mono"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Used for headers, buttons, and key elements
                </p>
              </div>
              <div>
                <Label htmlFor="secondary-color">Secondary Brand Color</Label>
                <div className="flex items-center gap-3 mt-2">
                  <ColorPicker
                    color={formData.secondaryColor}
                    onChange={(color) => setFormData({ ...formData, secondaryColor: color })}
                  />
                  <Input
                    id="secondary-color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="font-mono"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Used for accents and highlights
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="footer-text">Footer Text</Label>
              <Textarea
                id="footer-text"
                value={formData.footerText}
                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                placeholder="e.g., Powered by Your Agency Name"
                maxLength={100}
                rows={2}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Maximum 100 characters. Will appear at the bottom of email notifications.
              </p>
            </div>

            <Button onClick={handleSaveBranding}>Save Branding Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="templates" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Notification Templates</CardTitle>
            <CardDescription>
              Enable or disable notification templates for your agents. Your branding will be applied automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading templates...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Trigger Event</TableHead>
                    <TableHead>Customizable</TableHead>
                    <TableHead>Enabled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        {template.notification_type === 'email' ? (
                          <Badge variant="outline" className="gap-1">
                            <Mail className="h-3 w-3" />
                            Email
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            SMS
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {template.trigger_event.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </TableCell>
                      <TableCell>
                        <Badge variant={template.customizable ? "secondary" : "outline"}>
                          {template.customizable ? 'Yes' : 'Locked'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={templateSettings[template.id] !== false}
                          onCheckedChange={(checked) => handleToggleTemplate(template.id, checked)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setPreviewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview with Your Branding</DialogTitle>
            <DialogDescription>
              This is how the notification will look with your agency branding applied
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white">
            {renderPreview()}
          </div>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

export default NotificationBrandingSettings;
