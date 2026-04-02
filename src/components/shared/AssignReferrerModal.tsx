import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AgentOption {
  id: string;
  name: string;
  agency?: string;
  email?: string;
}

interface AssignReferrerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** If provided, pre-selects this agent as the one being assigned a referrer */
  preSelectedAgent?: AgentOption;
  /** The level determines label wording */
  level: "agency" | "superadmin";
}

// Mock agents list — replace with real Supabase query
const mockAgents: AgentOption[] = [
  { id: "a1", name: "John Smith", agency: "Acme Insurance Group", email: "john@acme.com" },
  { id: "a2", name: "Sarah Johnson", agency: "Elite Coverage LLC", email: "sarah@elite.com" },
  { id: "a3", name: "Mike Davis", agency: "Premier Agents Co", email: "mike@premier.com" },
  { id: "a4", name: "Emily Brown", agency: "Top Tier Agency", email: "emily@toptier.com" },
  { id: "a5", name: "Lisa Anderson", agency: "Growth Insurance", email: "lisa@growth.com" },
  { id: "a6", name: "Robert Wilson", agency: "Wilson & Associates", email: "robert@wilson.com" },
  { id: "a7", name: "David Park", agency: "InnovateLab Insurance", email: "david@innovate.com" },
  { id: "a8", name: "Rachel Green", agency: "MediaHub Agency", email: "rachel@mediahub.com" },
];

export const AssignReferrerModal = ({
  open,
  onOpenChange,
  preSelectedAgent,
  level,
}: AssignReferrerModalProps) => {
  const [searchLegacy, setSearchLegacy] = useState("");
  const [searchReferrer, setSearchReferrer] = useState("");
  const [selectedLegacyAgent, setSelectedLegacyAgent] = useState<AgentOption | null>(preSelectedAgent || null);
  const [selectedReferrer, setSelectedReferrer] = useState<AgentOption | null>(null);
  const [rewardAmount, setRewardAmount] = useState("100.00");
  const [commissionType, setCommissionType] = useState("one_time");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredLegacyAgents = mockAgents.filter(
    (a) =>
      a.id !== selectedReferrer?.id &&
      (a.name.toLowerCase().includes(searchLegacy.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchLegacy.toLowerCase()))
  );

  const filteredReferrers = mockAgents.filter(
    (a) =>
      a.id !== selectedLegacyAgent?.id &&
      (a.name.toLowerCase().includes(searchReferrer.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchReferrer.toLowerCase()))
  );

  const handleSubmit = async () => {
    if (!selectedLegacyAgent || !selectedReferrer) {
      toast.error("Please select both the legacy agent and the referring agent");
      return;
    }
    if (selectedLegacyAgent.id === selectedReferrer.id) {
      toast.error("An agent cannot refer themselves");
      return;
    }

    setIsSubmitting(true);

    // TODO: Replace with Supabase insert into referrals table
    console.log("Assigning referrer:", {
      legacy_agent_id: selectedLegacyAgent.id,
      legacy_agent_name: selectedLegacyAgent.name,
      referrer_agent_id: selectedReferrer.id,
      referrer_agent_name: selectedReferrer.name,
      reward_amount: parseFloat(rewardAmount),
      commission_type: commissionType,
      notes,
      assigned_by_level: level,
    });

    await new Promise((r) => setTimeout(r, 800));

    toast.success(
      `Referral assigned: ${selectedReferrer.name} → ${selectedLegacyAgent.name}`,
      { description: `Commission: $${parseFloat(rewardAmount).toFixed(2)} (${commissionType === "one_time" ? "One-time" : "Recurring"})` }
    );

    setIsSubmitting(false);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setSelectedLegacyAgent(preSelectedAgent || null);
    setSelectedReferrer(null);
    setSearchLegacy("");
    setSearchReferrer("");
    setRewardAmount("100.00");
    setCommissionType("one_time");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Assign Referrer to Legacy Agent
          </DialogTitle>
          <DialogDescription>
            Manually assign a referring agent to a legacy agent for commission tracking. This creates a referral record retroactively.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Legacy Agent Selection */}
          <div className="space-y-2">
            <Label className="font-semibold">Legacy Agent (being referred)</Label>
            {selectedLegacyAgent && !preSelectedAgent ? (
              <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{selectedLegacyAgent.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedLegacyAgent.agency} • {selectedLegacyAgent.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLegacyAgent(null)}>Change</Button>
              </div>
            ) : preSelectedAgent ? (
              <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{preSelectedAgent.name}</p>
                  <p className="text-xs text-muted-foreground">{preSelectedAgent.agency} • {preSelectedAgent.email}</p>
                </div>
                <Badge variant="secondary">Pre-selected</Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agent by name or email..."
                    value={searchLegacy}
                    onChange={(e) => setSearchLegacy(e.target.value)}
                    className="pl-9"
                  />
                </div>
                {searchLegacy && (
                  <div className="max-h-36 overflow-y-auto rounded-md border divide-y">
                    {filteredLegacyAgents.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-3">No agents found</p>
                    ) : (
                      filteredLegacyAgents.map((agent) => (
                        <button
                          key={agent.id}
                          className="w-full text-left px-3 py-2 hover:bg-accent transition-colors"
                          onClick={() => { setSelectedLegacyAgent(agent); setSearchLegacy(""); }}
                        >
                          <p className="text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.agency}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Referrer Agent Selection */}
          <div className="space-y-2">
            <Label className="font-semibold">Referring Agent (gets commission)</Label>
            {selectedReferrer ? (
              <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{selectedReferrer.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedReferrer.agency} • {selectedReferrer.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReferrer(null)}>Change</Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search referring agent..."
                    value={searchReferrer}
                    onChange={(e) => setSearchReferrer(e.target.value)}
                    className="pl-9"
                  />
                </div>
                {searchReferrer && (
                  <div className="max-h-36 overflow-y-auto rounded-md border divide-y">
                    {filteredReferrers.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-3">No agents found</p>
                    ) : (
                      filteredReferrers.map((agent) => (
                        <button
                          key={agent.id}
                          className="w-full text-left px-3 py-2 hover:bg-accent transition-colors"
                          onClick={() => { setSelectedReferrer(agent); setSearchReferrer(""); }}
                        >
                          <p className="text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.agency}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Commission Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reward-amt">Commission Amount ($)</Label>
              <Input
                id="reward-amt"
                type="number"
                step="0.01"
                min="0"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission-type">Commission Type</Label>
              <Select value={commissionType} onValueChange={setCommissionType}>
                <SelectTrigger id="commission-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one_time">One-time</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="assign-notes">Notes (optional)</Label>
            <Input
              id="assign-notes"
              placeholder="e.g. Legacy agent from 2024 migration"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-xs text-destructive">
              This manually creates a referral record. The referring agent will receive commission credit based on the settings above. This action is logged for audit purposes.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => { resetForm(); onOpenChange(false); }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedLegacyAgent || !selectedReferrer || isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Referrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
