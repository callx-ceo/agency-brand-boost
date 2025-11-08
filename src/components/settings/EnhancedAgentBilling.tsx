import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DollarSign, Loader2, Filter } from "lucide-react";

type PaymentMode = "agency_paid" | "agent_paid";
type AgencyPaymentMethod = "invoicing" | "credit_card";

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
  const [agencyPaymentMethod, setAgencyPaymentMethod] = useState<AgencyPaymentMethod>("credit_card");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentModeFilter, setPaymentModeFilter] = useState<"all" | PaymentMode>("all");
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

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPaymentMode = paymentModeFilter === "all" || agent.paymentMode === paymentModeFilter;
    
    return matchesSearch && matchesPaymentMode;
  });

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

      <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agency Payment Method</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose how your agency pays for agency-paid agents
          </p>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={agencyPaymentMethod}
            onValueChange={(value) => {
              setAgencyPaymentMethod(value as AgencyPaymentMethod);
              toast.success(`Payment method updated to ${value === 'invoicing' ? 'Invoicing' : 'Credit Card'}`);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Label
              htmlFor="credit_card"
              className="flex flex-col items-start space-y-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
              <div className="flex items-center gap-2">
                <div className="font-semibold">Credit Card</div>
                {agencyPaymentMethod === "credit_card" && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Automatic monthly charges to your credit card for all agency-paid agents
              </p>
            </Label>
            <Label
              htmlFor="invoicing"
              className="flex flex-col items-start space-y-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="invoicing" id="invoicing" className="sr-only" />
              <div className="flex items-center gap-2">
                <div className="font-semibold">Invoicing</div>
                {agencyPaymentMethod === "invoicing" && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Receive monthly invoices for all agency-paid agents
              </p>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Agent Payment Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure who pays for each agent's services
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={paymentModeFilter} onValueChange={(value) => setPaymentModeFilter(value as "all" | PaymentMode)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="agency_paid">Agency Paid</SelectItem>
                <SelectItem value="agent_paid">Agent Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input 
            className="w-60" 
            placeholder="Search agents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
