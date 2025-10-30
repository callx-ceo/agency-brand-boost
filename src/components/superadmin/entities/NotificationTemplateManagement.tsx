import { useState, useEffect } from "react";
import { ArrowLeft, Mail, MessageSquare, Plus, Edit, Trash2, Eye, Send, Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationTemplateManagementProps {
  onBackToDashboard: () => void;
}

interface NotificationTemplate {
  id: string;
  name: string;
  notification_type: 'email' | 'sms';
  trigger_event: string;
  subject?: string;
  body_html: string;
  body_sms?: string;
  customizable: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const NotificationTemplateManagement = ({ onBackToDashboard }: NotificationTemplateManagementProps) => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    notification_type: 'email' as 'email' | 'sms',
    trigger_event: '',
    subject: '',
    body_html: '',
    body_sms: '',
    customizable: true,
    active: true
  });

  const triggerEvents = [
    { value: 'call_completed', label: 'After Call Completed' },
    { value: 'low_balance', label: 'Low Balance Alert' },
    { value: 'payment_success', label: 'Payment Success' },
    { value: 'payment_failed', label: 'Payment Failed' },
    { value: 'daily_summary', label: 'Daily Performance Summary' },
    { value: 'weekly_summary', label: 'Weekly Performance Summary' },
    { value: 'monthly_summary', label: 'Monthly Performance Summary' },
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates((data || []) as NotificationTemplate[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setFormData({
      name: '',
      notification_type: 'email',
      trigger_event: '',
      subject: '',
      body_html: '',
      body_sms: '',
      customizable: true,
      active: true
    });
    setEditDialogOpen(true);
  };

  const handleEdit = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      notification_type: template.notification_type,
      trigger_event: template.trigger_event,
      subject: template.subject || '',
      body_html: template.body_html,
      body_sms: template.body_sms || '',
      customizable: template.customizable,
      active: template.active
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedTemplate) {
        const { error } = await supabase
          .from('notification_templates')
          .update(formData)
          .eq('id', selectedTemplate.id);

        if (error) throw error;
        toast.success('Template updated successfully');
      } else {
        const { error } = await supabase
          .from('notification_templates')
          .insert([formData]);

        if (error) throw error;
        toast.success('Template created successfully');
      }

      setEditDialogOpen(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    }
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('notification_templates')
        .delete()
        .eq('id', selectedTemplate.id);

      if (error) throw error;
      toast.success('Template deleted successfully');
      setDeleteDialogOpen(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  const handleToggleActive = async (template: NotificationTemplate) => {
    try {
      const { error } = await supabase
        .from('notification_templates')
        .update({ active: !template.active })
        .eq('id', template.id);

      if (error) throw error;
      toast.success(`Template ${!template.active ? 'activated' : 'deactivated'}`);
      fetchTemplates();
    } catch (error) {
      console.error('Error toggling template:', error);
      toast.error('Failed to update template');
    }
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    let content = selectedTemplate.notification_type === 'email' 
      ? selectedTemplate.body_html 
      : selectedTemplate.body_sms || '';

    // Replace placeholders with example data
    content = content
      .replace(/{{agent_name}}/g, 'John Doe')
      .replace(/{{score}}/g, '85')
      .replace(/{{duration}}/g, '15')
      .replace(/{{outcome}}/g, 'Sale Completed')
      .replace(/{{recommended_action}}/g, 'Focus on objection handling')
      .replace(/{{balance}}/g, '50.00')
      .replace(/{{threshold}}/g, '25.00')
      .replace(/{{amount}}/g, '100.00')
      .replace(/{{new_balance}}/g, '150.00')
      .replace(/{{date}}/g, new Date().toLocaleDateString())
      .replace(/{{primary_color}}/g, '#3B82F6')
      .replace(/{{footer}}/g, '<p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">© 2024 CallX. All rights reserved.</p>');

    return selectedTemplate.notification_type === 'email' ? (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    ) : (
      <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md">
        {content}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Notification Template Management</h1>
          <p className="text-muted-foreground">Create and manage email and SMS notification templates</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
          <CardDescription>
            Manage templates for automated notifications. Agencies can customize branding for templates marked as "customizable"
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading templates...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Trigger Event</TableHead>
                  <TableHead>Customizable</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>
                      {triggerEvents.find(e => e.value === template.trigger_event)?.label || template.trigger_event}
                    </TableCell>
                    <TableCell>
                      <Badge variant={template.customizable ? "secondary" : "outline"}>
                        {template.customizable ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={template.active ? "default" : "secondary"}>
                        {template.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(template)}
                        >
                          {template.active ? (
                            <PowerOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate ? 'Edit Template' : 'Create Template'}</DialogTitle>
            <DialogDescription>
              {selectedTemplate ? 'Update the notification template settings' : 'Create a new notification template'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Performance Report - After Call"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Notification Type</Label>
                <Select
                  value={formData.notification_type}
                  onValueChange={(value: 'email' | 'sms') => setFormData({ ...formData, notification_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trigger">Trigger Event</Label>
                <Select
                  value={formData.trigger_event}
                  onValueChange={(value) => setFormData({ ...formData, trigger_event: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerEvents.map((event) => (
                      <SelectItem key={event.value} value={event.value}>
                        {event.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.notification_type === 'email' && (
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Use {{variable}} for dynamic content"
                />
              <p className="text-xs text-muted-foreground mt-1">
                Available variables: {'{{agent_name}}'}, {'{{score}}'}, {'{{date}}'}, etc.
              </p>
              </div>
            )}

            <div>
              <Label htmlFor="body">
                {formData.notification_type === 'email' ? 'Email Body (HTML)' : 'SMS Body'}
              </Label>
              <Textarea
                id="body"
                value={formData.notification_type === 'email' ? formData.body_html : formData.body_sms}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [formData.notification_type === 'email' ? 'body_html' : 'body_sms']: e.target.value 
                })}
                rows={10}
                placeholder={formData.notification_type === 'email' 
                  ? "Enter HTML content with {{variables}}" 
                  : "Enter SMS text with {{variables}}"}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use {'{{primary_color}}'} for brand color, {'{{footer}}'} for agency footer
              </p>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="customizable">Allow Agency Branding Customization</Label>
              <Switch
                id="customizable"
                checked={formData.customizable}
                onCheckedChange={(checked) => setFormData({ ...formData, customizable: checked })}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedTemplate ? 'Update' : 'Create'} Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Preview with sample data
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4">
            {renderPreview()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationTemplateManagement;
