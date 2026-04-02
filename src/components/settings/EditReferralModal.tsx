import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ReferralData {
  id: string;
  agent_name: string;
  referred_name: string;
  referred_agency?: string;
  status: string;
  signup_date: string;
  first_payment_date: string | null;
  reward_amount: number;
  reward_status: string;
}

interface EditReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referral: ReferralData | null;
  onSave: (updated: ReferralData) => void;
}

export const EditReferralModal = ({ open, onOpenChange, referral, onSave }: EditReferralModalProps) => {
  const [formData, setFormData] = useState({
    referred_name: "",
    referred_agency: "",
    status: "",
    reward_amount: 0,
    reward_status: "",
    notes: "",
  });

  useEffect(() => {
    if (referral) {
      setFormData({
        referred_name: referral.referred_name,
        referred_agency: referral.referred_agency || "",
        status: referral.status,
        reward_amount: referral.reward_amount,
        reward_status: referral.reward_status,
        notes: "",
      });
    }
  }, [referral]);

  const handleSave = () => {
    if (!referral) return;
    onSave({
      ...referral,
      referred_name: formData.referred_name,
      referred_agency: formData.referred_agency || undefined,
      status: formData.status,
      reward_amount: formData.reward_amount,
      reward_status: formData.reward_status,
    });
    toast.success("Referral updated successfully");
    onOpenChange(false);
  };

  if (!referral) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Referral</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label className="text-muted-foreground text-xs">Referring Agent</Label>
            <p className="font-medium">{referral.agent_name}</p>
          </div>

          <div className="space-y-2">
            <Label>Referred Agent Name</Label>
            <Input
              value={formData.referred_name}
              onChange={(e) => setFormData({ ...formData, referred_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Referred Agency</Label>
            <Input
              value={formData.referred_agency}
              onChange={(e) => setFormData({ ...formData, referred_agency: e.target.value })}
              placeholder="Optional"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Referral Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="rewarded">Rewarded</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Reward Status</Label>
              <Select value={formData.reward_status} onValueChange={(v) => setFormData({ ...formData, reward_status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="credited">Credited</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reward Amount ($)</Label>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={formData.reward_amount}
              onChange={(e) => setFormData({ ...formData, reward_amount: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Reason for edit..."
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
