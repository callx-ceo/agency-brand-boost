import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { DollarSign, Loader2 } from "lucide-react";

type PaymentMode = "agency_paid" | "agent_paid";

interface AgentBillingData {
  agentId: string;
  agentName: string;
  agentEmail: string;
  paymentMode: PaymentMode;
  callCreditsBalance: number;
}

// Mock data for demonstration
const mockAgents: AgentBillingData[] = [
  {
    agentId: "1",
    agentName: "John Smith",
    agentEmail: "john.smith@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 250.00
  },
  {
    agentId: "2",
    agentName: "Sarah Johnson",
    agentEmail: "sarah.johnson@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 125.50
  },
  {
    agentId: "3",
    agentName: "Michael Chen",
    agentEmail: "michael.chen@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 500.00
  },
  {
    agentId: "4",
    agentName: "Emily Davis",
    agentEmail: "emily.davis@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 75.25
  },
  {
    agentId: "5",
    agentName: "David Martinez",
    agentEmail: "david.martinez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 350.00
  }
];

const EnhancedAgentBilling = () => {
  const [agents, setAgents] = useState<AgentBillingData[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingAgent, setUpdatingAgent] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    agentId: string;
    agentName: string;
    newMode: PaymentMode;
  }>({
    isOpen: false,
    agentId: "",
    agentName: "",
    newMode: "agency_paid"
  });

  const handlePaymentModeRequest = (agentId: string, newMode: PaymentMode) => {
    const agent = agents.find(a => a.agentId === agentId);
    if (!agent) return;

    setConfirmDialog({
      isOpen: true,
      agentId,
      agentName: agent.agentName,
      newMode
    });
  };

  const handleConfirmPaymentModeChange = () => {
    const { agentId, newMode } = confirmDialog;
    setUpdatingAgent(agentId);
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    
    // Simulate API call
    setTimeout(() => {
      setAgents(prev => prev.map(agent => 
        agent.agentId === agentId 
          ? { ...agent, paymentMode: newMode }
          : agent
      ));

      toast.success(`Payment mode updated to ${newMode === 'agency_paid' ? 'Agency Paid' : 'Agent Paid'}`);
      setUpdatingAgent(null);
    }, 500);
  };

  const handleCancelPaymentModeChange = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const getBillingBadge = (paymentMode: PaymentMode) => {
    return paymentMode === "agency_paid" ? (
      <Badge variant="secondary">Agency Paid</Badge>
    ) : (
      <Badge variant="outline">Agent Paid</Badge>
    );
  };

  const filteredAgents = agents.filter(agent =>
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleCancelPaymentModeChange()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment Mode Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the payment mode for <strong>{confirmDialog.agentName}</strong> to{" "}
              <strong>{confirmDialog.newMode === "agency_paid" ? "Agency Paid" : "Agent Paid"}</strong>?
              {confirmDialog.newMode === "agent_paid" && (
                <span className="block mt-2 text-warning">
                  The agent will be responsible for paying their own call credits.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelPaymentModeChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPaymentModeChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Agent Payment Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure who pays for each agent's services
          </p>
        </div>
        <Input 
          className="w-60" 
          placeholder="Search agents..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Call Credits Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No agents found
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.agentId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{agent.agentName}</div>
                      <div className="text-sm text-muted-foreground">{agent.agentEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getBillingBadge(agent.paymentMode)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{agent.callCreditsBalance.toFixed(2)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RadioGroup
                        value={agent.paymentMode}
                        onValueChange={(value) => handlePaymentModeRequest(agent.agentId, value as PaymentMode)}
                        disabled={updatingAgent === agent.agentId}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="agent_paid" id={`agent-paid-${agent.agentId}`} />
                          <Label htmlFor={`agent-paid-${agent.agentId}`} className="text-sm font-normal cursor-pointer">
                            Agent Paid
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="agency_paid" id={`agency-paid-${agent.agentId}`} />
                          <Label htmlFor={`agency-paid-${agent.agentId}`} className="text-sm font-normal cursor-pointer">
                            Agency Paid
                          </Label>
                        </div>
                      </RadioGroup>
                      {updatingAgent === agent.agentId && (
                        <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      </div>
    </>
  );
};

export default EnhancedAgentBilling;
