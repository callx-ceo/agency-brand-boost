import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Copy, CheckCircle2 } from "lucide-react";

interface PublisherInviteModalProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  campaignName?: string;
}

const PublisherInviteModal = ({ open, onClose, campaignId, campaignName }: PublisherInviteModalProps) => {
  const [email, setEmail] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSendInvite = async () => {
    if (!email || !publisherName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setPublisherName("");
      setCustomMessage("");
      onClose();
    } catch (error) {
      toast.error("Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateLink = () => {
    const link = `${window.location.origin}/publisher/accept-invite?campaign=${campaignId}&token=${Math.random().toString(36).substring(7)}`;
    setInviteLink(link);
    toast.success("Invitation link generated");
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invite Publisher</DialogTitle>
          <DialogDescription>
            {campaignName ? `Invite a publisher to join "${campaignName}"` : "Invite a publisher to your network"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Invitation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4" />
              Send Email Invitation
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publisherName">Publisher Name *</Label>
              <Input
                id="publisherName"
                placeholder="Publisher Company Name"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="publisher@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customMessage">Custom Message (Optional)</Label>
              <Textarea
                id="customMessage"
                placeholder="Add a personal message to your invitation..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleSendInvite} disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Link Generation */}
          <div className="space-y-4">
            <div className="text-sm font-semibold">Generate Invitation Link</div>
            
            {!inviteLink ? (
              <Button onClick={handleGenerateLink} variant="outline" className="w-full">
                Generate Shareable Link
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="flex-1 bg-transparent border-0 focus-visible:ring-0"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyLink}
                    className="flex-shrink-0"
                  >
                    {linkCopied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this link with publishers you want to invite. The link is valid for 7 days.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublisherInviteModal;
