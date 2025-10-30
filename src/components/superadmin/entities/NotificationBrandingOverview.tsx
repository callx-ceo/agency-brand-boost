import { useState, useEffect } from "react";
import { ArrowLeft, Building2, Palette, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NotificationBrandingOverviewProps {
  onBackToDashboard: () => void;
}

interface AgencyBranding {
  id: string;
  agency_id: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  footer_text?: string;
  updated_at: string;
}

const NotificationBrandingOverview = ({ onBackToDashboard }: NotificationBrandingOverviewProps) => {
  const [brandings, setBrandings] = useState<AgencyBranding[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedBranding, setSelectedBranding] = useState<AgencyBranding | null>(null);

  useEffect(() => {
    fetchBrandings();
  }, []);

  const fetchBrandings = async () => {
    try {
      const { data, error } = await supabase
        .from('agency_branding')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setBrandings(data || []);
    } catch (error) {
      console.error('Error fetching brandings:', error);
      toast.error('Failed to load agency brandings');
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!selectedBranding) return null;

    const sampleEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        ${selectedBranding.logo_url ? `
          <div style="text-align: center; padding: 20px; background: ${selectedBranding.primary_color};">
            <img src="${selectedBranding.logo_url}" alt="Agency Logo" style="max-height: 60px; max-width: 200px;" />
          </div>
        ` : ''}
        <div style="padding: 30px;">
          <h2 style="color: ${selectedBranding.primary_color}; margin-top: 0;">Performance Summary</h2>
          <p>Hi John Doe,</p>
          <p>You just completed a call! Here's how you did:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${selectedBranding.secondary_color};">
            <p style="margin: 5px 0;"><strong>Score:</strong> 85/100</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> 15 minutes</p>
            <p style="margin: 5px 0;"><strong>Outcome:</strong> Sale Completed</p>
          </div>
          <p><strong style="color: ${selectedBranding.primary_color};">Recommended Action:</strong> Focus on objection handling</p>
          <a href="#" style="display: inline-block; background: ${selectedBranding.primary_color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">View Full Report</a>
        </div>
        <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            ${selectedBranding.footer_text || 'Powered by CallX'}
          </p>
          <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
            © ${new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    `;

    return <div dangerouslySetInnerHTML={{ __html: sampleEmail }} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Agency Branding Overview</h1>
          <p className="text-muted-foreground">View all agency notification branding configurations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Agency Brandings
          </CardTitle>
          <CardDescription>
            All agency notification branding customizations in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading agency brandings...</div>
          ) : brandings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No agency brandings configured yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency ID</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Primary Color</TableHead>
                  <TableHead>Secondary Color</TableHead>
                  <TableHead>Footer Text</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brandings.map((branding) => (
                  <TableRow key={branding.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {branding.agency_id.substring(0, 8)}...
                      </div>
                    </TableCell>
                    <TableCell>
                      {branding.logo_url ? (
                        <img 
                          src={branding.logo_url} 
                          alt="Logo" 
                          className="h-8 max-w-[100px] object-contain"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">No logo</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border" 
                          style={{ backgroundColor: branding.primary_color }}
                        />
                        <span className="text-xs font-mono">{branding.primary_color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border" 
                          style={{ backgroundColor: branding.secondary_color }}
                        />
                        <span className="text-xs font-mono">{branding.secondary_color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {branding.footer_text ? (
                          branding.footer_text.substring(0, 30) + (branding.footer_text.length > 30 ? '...' : '')
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {format(new Date(branding.updated_at), 'MMM d, yyyy')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedBranding(branding);
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

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agency Branded Email Preview</DialogTitle>
            <DialogDescription>
              Example performance report with agency branding applied
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white">
            {renderPreview()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationBrandingOverview;
