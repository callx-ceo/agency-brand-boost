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
import { DollarSign, Loader2, Filter, Plus, Wallet, AlertCircle, TrendingUp } from "lucide-react";
import AddFundsModal from "./AddFundsModal";
import BulkAddFundsModal from "./BulkAddFundsModal";
import AddAgencyCreditsModal from "./AddAgencyCreditsModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  },
  {
    agentId: "6",
    agentName: "Robert Taylor",
    agentEmail: "robert.taylor@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 420.00
  },
  {
    agentId: "7",
    agentName: "Jennifer Wilson",
    agentEmail: "jennifer.wilson@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 380.50
  },
  {
    agentId: "8",
    agentName: "William Brown",
    agentEmail: "william.brown@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 95.75
  },
  {
    agentId: "9",
    agentName: "Jessica Moore",
    agentEmail: "jessica.moore@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 290.00
  },
  {
    agentId: "10",
    agentName: "James Anderson",
    agentEmail: "james.anderson@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 315.25
  },
  {
    agentId: "11",
    agentName: "Linda Thomas",
    agentEmail: "linda.thomas@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 445.00
  },
  {
    agentId: "12",
    agentName: "Christopher Jackson",
    agentEmail: "christopher.jackson@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 110.50
  },
  {
    agentId: "13",
    agentName: "Patricia White",
    agentEmail: "patricia.white@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 365.00
  },
  {
    agentId: "14",
    agentName: "Daniel Harris",
    agentEmail: "daniel.harris@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 275.75
  },
  {
    agentId: "15",
    agentName: "Barbara Martin",
    agentEmail: "barbara.martin@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 490.00
  },
  {
    agentId: "16",
    agentName: "Matthew Thompson",
    agentEmail: "matthew.thompson@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 88.25
  },
  {
    agentId: "17",
    agentName: "Elizabeth Garcia",
    agentEmail: "elizabeth.garcia@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 325.50
  },
  {
    agentId: "18",
    agentName: "Joseph Martinez",
    agentEmail: "joseph.martinez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 405.00
  },
  {
    agentId: "19",
    agentName: "Susan Robinson",
    agentEmail: "susan.robinson@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 355.75
  },
  {
    agentId: "20",
    agentName: "Charles Clark",
    agentEmail: "charles.clark@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 102.50
  },
  {
    agentId: "21",
    agentName: "Margaret Rodriguez",
    agentEmail: "margaret.rodriguez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 430.00
  },
  {
    agentId: "22",
    agentName: "Thomas Lewis",
    agentEmail: "thomas.lewis@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 295.25
  },
  {
    agentId: "23",
    agentName: "Dorothy Lee",
    agentEmail: "dorothy.lee@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 385.50
  },
  {
    agentId: "24",
    agentName: "Richard Walker",
    agentEmail: "richard.walker@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 115.00
  },
  {
    agentId: "25",
    agentName: "Nancy Hall",
    agentEmail: "nancy.hall@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 340.75
  },
  {
    agentId: "26",
    agentName: "Paul Allen",
    agentEmail: "paul.allen@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 460.00
  },
  {
    agentId: "27",
    agentName: "Karen Young",
    agentEmail: "karen.young@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 310.25
  },
  {
    agentId: "28",
    agentName: "Mark Hernandez",
    agentEmail: "mark.hernandez@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 92.50
  },
  {
    agentId: "29",
    agentName: "Betty King",
    agentEmail: "betty.king@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 395.00
  },
  {
    agentId: "30",
    agentName: "Steven Wright",
    agentEmail: "steven.wright@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 425.75
  },
  {
    agentId: "31",
    agentName: "Helen Lopez",
    agentEmail: "helen.lopez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 370.50
  },
  {
    agentId: "32",
    agentName: "Kevin Hill",
    agentEmail: "kevin.hill@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 105.25
  },
  {
    agentId: "33",
    agentName: "Sandra Scott",
    agentEmail: "sandra.scott@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 335.00
  },
  {
    agentId: "34",
    agentName: "Brian Green",
    agentEmail: "brian.green@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 455.75
  },
  {
    agentId: "35",
    agentName: "Donna Adams",
    agentEmail: "donna.adams@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 305.50
  },
  {
    agentId: "36",
    agentName: "George Baker",
    agentEmail: "george.baker@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 98.00
  },
  {
    agentId: "37",
    agentName: "Carol Gonzalez",
    agentEmail: "carol.gonzalez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 415.25
  },
  {
    agentId: "38",
    agentName: "Edward Nelson",
    agentEmail: "edward.nelson@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 390.00
  },
  {
    agentId: "39",
    agentName: "Ruth Carter",
    agentEmail: "ruth.carter@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 345.75
  },
  {
    agentId: "40",
    agentName: "Jason Mitchell",
    agentEmail: "jason.mitchell@agency.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 108.50
  },
  {
    agentId: "41",
    agentName: "Sharon Perez",
    agentEmail: "sharon.perez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 475.00
  },
  {
    agentId: "42",
    agentName: "Ryan Roberts",
    agentEmail: "ryan.roberts@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 320.25
  },
  {
    agentId: "43",
    agentName: "Michelle Turner",
    agentEmail: "michelle.turner@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 360.50
  },
  {
    agentId: "44",
    agentName: "Gary Phillips",
    agentEmail: "gary.phillips@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 440.00
  },
  {
    agentId: "45",
    agentName: "Laura Campbell",
    agentEmail: "laura.campbell@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 285.75
  },
  {
    agentId: "46",
    agentName: "Timothy Parker",
    agentEmail: "timothy.parker@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 410.50
  },
  {
    agentId: "47",
    agentName: "Kimberly Evans",
    agentEmail: "kimberly.evans@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 375.00
  },
  {
    agentId: "48",
    agentName: "Jeffrey Edwards",
    agentEmail: "jeffrey.edwards@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 330.25
  },
  {
    agentId: "49",
    agentName: "Deborah Collins",
    agentEmail: "deborah.collins@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 465.50
  },
  {
    agentId: "50",
    agentName: "Ronald Stewart",
    agentEmail: "ronald.stewart@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 300.00
  },
  {
    agentId: "51",
    agentName: "Cynthia Sanchez",
    agentEmail: "cynthia.sanchez@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 435.75
  },
  {
    agentId: "52",
    agentName: "Jacob Morris",
    agentEmail: "jacob.morris@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 350.50
  },
  {
    agentId: "53",
    agentName: "Amy Rogers",
    agentEmail: "amy.rogers@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 480.00
  },
  {
    agentId: "54",
    agentName: "Raymond Reed",
    agentEmail: "raymond.reed@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 315.25
  },
  {
    agentId: "55",
    agentName: "Angela Cook",
    agentEmail: "angela.cook@agency.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 395.50
  }
];

const EnhancedAgentBilling = () => {
  const [agents, setAgents] = useState<AgentBillingData[]>(mockAgents);
  const [agencyPaymentMethod, setAgencyPaymentMethod] = useState<AgencyPaymentMethod>("credit_card");
  const [agencyCreditsBalance, setAgencyCreditsBalance] = useState<number>(0); // Start with 0 to show prompt
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentModeFilter, setPaymentModeFilter] = useState<"all" | PaymentMode>("all");
  const [updatingAgent, setUpdatingAgent] = useState<string | null>(null);
  const [selectedAgentIds, setSelectedAgentIds] = useState<Set<string>>(new Set());
  const [isBulkFundsModalOpen, setIsBulkFundsModalOpen] = useState(false);
  const [isAgencyCreditsModalOpen, setIsAgencyCreditsModalOpen] = useState(false);
  const [agencyPaymentMethods, setAgencyPaymentMethods] = useState<any[]>([
    // Mock payment method - in production this would come from database
    {
      id: "pm_mock123",
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
      isDefault: true,
    }
  ]);
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
  const [addFundsModal, setAddFundsModal] = useState<{
    isOpen: boolean;
    agentId: string;
    agentName: string;
    currentBalance: number;
  }>({
    isOpen: false,
    agentId: "",
    agentName: "",
    currentBalance: 0
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

  const handleOpenAddFunds = (agentId: string) => {
    const agent = agents.find(a => a.agentId === agentId);
    if (!agent) return;

    setAddFundsModal({
      isOpen: true,
      agentId,
      agentName: agent.agentName,
      currentBalance: agent.callCreditsBalance
    });
  };

  const handleAddFundsSuccess = (agentId: string, newBalance: number) => {
    setAgents(prev => prev.map(agent => 
      agent.agentId === agentId 
        ? { ...agent, callCreditsBalance: newBalance }
        : agent
    ));
  };

  const handleBulkAddFundsSuccess = (updates: { agentId: string; newBalance: number }[]) => {
    const totalDistributed = updates.reduce((sum, u) => {
      const agent = agents.find(a => a.agentId === u.agentId);
      return sum + (u.newBalance - (agent?.callCreditsBalance || 0));
    }, 0);

    // Deduct from agency balance
    setAgencyCreditsBalance(prev => prev - totalDistributed);
    
    setAgents(prev => prev.map(agent => {
      const update = updates.find(u => u.agentId === agent.agentId);
      return update ? { ...agent, callCreditsBalance: update.newBalance } : agent;
    }));
    setSelectedAgentIds(new Set());
  };

  const handleAgencyCreditsSuccess = (newBalance: number) => {
    setAgencyCreditsBalance(newBalance);
  };

  const handlePaymentMethodAdded = (method: any) => {
    setAgencyPaymentMethods([...agencyPaymentMethods, method]);
  };

  const agencyPaidAgents = agents.filter(a => a.paymentMode === "agency_paid");
  const lowBalanceThreshold = agencyPaidAgents.length * 100; // $100 per agent as threshold
  const hasLowBalance = agencyCreditsBalance < lowBalanceThreshold && agencyCreditsBalance > 0;
  const hasNoBalance = agencyCreditsBalance === 0;

  const handleSelectAgent = (agentId: string, isAgencyPaid: boolean) => {
    if (!isAgencyPaid) return; // Only allow selecting agency-paid agents
    
    setSelectedAgentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  const getSelectedAgents = () => {
    return agents.filter(agent => selectedAgentIds.has(agent.agentId));
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

  const agencyPaidFilteredAgents = filteredAgents.filter(a => a.paymentMode === "agency_paid");

  const handleSelectAll = () => {
    const agencyPaidAgents = filteredAgents.filter(a => a.paymentMode === "agency_paid");
    if (selectedAgentIds.size === agencyPaidAgents.length) {
      setSelectedAgentIds(new Set());
    } else {
      setSelectedAgentIds(new Set(agencyPaidAgents.map(a => a.agentId)));
    }
  };

  return (
    <>
      <AddFundsModal
        isOpen={addFundsModal.isOpen}
        onClose={() => setAddFundsModal({ ...addFundsModal, isOpen: false })}
        agentId={addFundsModal.agentId}
        agentName={addFundsModal.agentName}
        currentBalance={addFundsModal.currentBalance}
        onSuccess={handleAddFundsSuccess}
      />

      <BulkAddFundsModal
        isOpen={isBulkFundsModalOpen}
        onClose={() => setIsBulkFundsModalOpen(false)}
        selectedAgents={getSelectedAgents()}
        onSuccess={handleBulkAddFundsSuccess}
      />

      <AddAgencyCreditsModal
        isOpen={isAgencyCreditsModalOpen}
        onClose={() => setIsAgencyCreditsModalOpen(false)}
        currentBalance={agencyCreditsBalance}
        onSuccess={handleAgencyCreditsSuccess}
        paymentMethod={agencyPaymentMethod}
        existingPaymentMethods={agencyPaymentMethods}
        onPaymentMethodAdded={handlePaymentMethodAdded}
      />

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
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Agency Call Credits</CardTitle>
            <Button onClick={() => setIsAgencyCreditsModalOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Credits
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-3xl font-bold">
                <DollarSign className="h-8 w-8 text-primary" />
                <span>{agencyCreditsBalance.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Available for {agencyPaidAgents.length} agency-paid agents
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div className="text-right">
                <div className="text-sm font-medium">Est. Coverage</div>
                <div className="text-xs text-muted-foreground">
                  ~{agencyPaidAgents.length > 0 ? (agencyCreditsBalance / agencyPaidAgents.length).toFixed(0) : 0} per agent
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {hasNoBalance && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Credits Available</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>You need to add credits to your agency account before funding agency-paid agents.</span>
            <Button onClick={() => setIsAgencyCreditsModalOpen(true)} size="sm" variant="outline">
              Add Credits Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {hasLowBalance && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Balance Warning</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Your agency credit balance is running low. Consider adding more credits.</span>
            <Button onClick={() => setIsAgencyCreditsModalOpen(true)} size="sm" variant="outline">
              Add Credits
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Agent Payment Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure who pays for each agent's services
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedAgentIds.size > 0 && (
            <Button
              onClick={() => setIsBulkFundsModalOpen(true)}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              Add Funds to {selectedAgentIds.size} Agent{selectedAgentIds.size !== 1 ? 's' : ''}
            </Button>
          )}
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
              <TableHead className="w-[50px]">
                {agencyPaidFilteredAgents.length > 0 && (
                  <Checkbox
                    checked={selectedAgentIds.size === agencyPaidFilteredAgents.length && agencyPaidFilteredAgents.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                )}
              </TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Call Credits Balance</TableHead>
              <TableHead>Payment Mode Settings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No agents found
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.agentId}>
                  <TableCell>
                    {agent.paymentMode === "agency_paid" && (
                      <Checkbox
                        checked={selectedAgentIds.has(agent.agentId)}
                        onCheckedChange={() => handleSelectAgent(agent.agentId, true)}
                      />
                    )}
                  </TableCell>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">{agent.callCreditsBalance.toFixed(2)}</span>
                      </div>
                      {agent.paymentMode === "agency_paid" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenAddFunds(agent.agentId)}
                          className="ml-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Funds
                        </Button>
                      )}
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
