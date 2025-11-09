import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  DollarSign,
  Filter,
  Plus,
  Wallet,
  AlertCircle,
  TrendingUp,
  Building2,
  Users,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Search,
  CreditCard,
} from "lucide-react";
import AddFundsModal from "@/components/settings/AddFundsModal";
import BulkAddFundsModal from "@/components/settings/BulkAddFundsModal";
import AddAgencyCreditsModal from "@/components/settings/AddAgencyCreditsModal";

type PaymentMode = "agency_paid" | "agent_paid";
type AgencyPaymentMethod = "invoice" | "credit_card" | "both";

interface AgentData {
  agentId: string;
  agentName: string;
  agentEmail: string;
  paymentMode: PaymentMode;
  callCreditsBalance: number;
  agencyId: string;
}

interface AgencyData {
  agencyId: string;
  agencyName: string;
  creditsBalance: number;
  allowedPaymentMethod: AgencyPaymentMethod;
  agentCount: number;
  totalAgentCredits: number;
}

// Mock data
const mockAgencies: AgencyData[] = [
  {
    agencyId: "1",
    agencyName: "Premier Insurance Group",
    creditsBalance: 15000,
    allowedPaymentMethod: "credit_card",
    agentCount: 12,
    totalAgentCredits: 4800,
  },
  {
    agencyId: "2",
    agencyName: "Healthcare Solutions LLC",
    creditsBalance: 8500,
    allowedPaymentMethod: "both",
    agentCount: 8,
    totalAgentCredits: 3200,
  },
  {
    agencyId: "3",
    agencyName: "Final Expense Direct",
    creditsBalance: 500,
    allowedPaymentMethod: "invoice",
    agentCount: 6,
    totalAgentCredits: 1200,
  },
  {
    agencyId: "4",
    agencyName: "Medicare Advantage Partners",
    creditsBalance: 22000,
    allowedPaymentMethod: "credit_card",
    agentCount: 15,
    totalAgentCredits: 6200,
  },
  {
    agencyId: "5",
    agencyName: "Life Insurance Pros",
    creditsBalance: 12500,
    allowedPaymentMethod: "both",
    agentCount: 10,
    totalAgentCredits: 3800,
  },
  {
    agencyId: "6",
    agencyName: "Senior Care Insurance",
    creditsBalance: 18900,
    allowedPaymentMethod: "invoice",
    agentCount: 14,
    totalAgentCredits: 5600,
  },
  {
    agencyId: "7",
    agencyName: "ACA Enrollment Specialists",
    creditsBalance: 750,
    allowedPaymentMethod: "credit_card",
    agentCount: 5,
    totalAgentCredits: 900,
  },
  {
    agencyId: "8",
    agencyName: "Guardian Financial Group",
    creditsBalance: 16200,
    allowedPaymentMethod: "both",
    agentCount: 11,
    totalAgentCredits: 4200,
  },
  {
    agencyId: "9",
    agencyName: "Nationwide Benefits Inc",
    creditsBalance: 24500,
    allowedPaymentMethod: "invoice",
    agentCount: 18,
    totalAgentCredits: 7800,
  },
  {
    agencyId: "10",
    agencyName: "Family First Insurance",
    creditsBalance: 9800,
    allowedPaymentMethod: "credit_card",
    agentCount: 7,
    totalAgentCredits: 2400,
  },
  {
    agencyId: "11",
    agencyName: "United Health Advisors",
    creditsBalance: 19500,
    allowedPaymentMethod: "both",
    agentCount: 13,
    totalAgentCredits: 5200,
  },
  {
    agencyId: "12",
    agencyName: "Secure Future Benefits",
    creditsBalance: 300,
    allowedPaymentMethod: "invoice",
    agentCount: 4,
    totalAgentCredits: 600,
  },
  {
    agencyId: "13",
    agencyName: "Elite Medicare Solutions",
    creditsBalance: 21000,
    allowedPaymentMethod: "credit_card",
    agentCount: 16,
    totalAgentCredits: 6800,
  },
  {
    agencyId: "14",
    agencyName: "Advantage Insurance Group",
    creditsBalance: 13800,
    allowedPaymentMethod: "both",
    agentCount: 9,
    totalAgentCredits: 3600,
  },
  {
    agencyId: "15",
    agencyName: "Platinum Coverage LLC",
    creditsBalance: 11200,
    allowedPaymentMethod: "invoice",
    agentCount: 8,
    totalAgentCredits: 3000,
  },
  {
    agencyId: "16",
    agencyName: "Liberty Health Partners",
    creditsBalance: 850,
    allowedPaymentMethod: "credit_card",
    agentCount: 6,
    totalAgentCredits: 1400,
  },
  {
    agencyId: "17",
    agencyName: "Golden Years Insurance",
    creditsBalance: 17600,
    allowedPaymentMethod: "both",
    agentCount: 12,
    totalAgentCredits: 4900,
  },
  {
    agencyId: "18",
    agencyName: "Comprehensive Care Advisors",
    creditsBalance: 20200,
    allowedPaymentMethod: "invoice",
    agentCount: 15,
    totalAgentCredits: 6400,
  },
  {
    agencyId: "19",
    agencyName: "Integrity Benefits Group",
    creditsBalance: 14500,
    allowedPaymentMethod: "credit_card",
    agentCount: 10,
    totalAgentCredits: 4100,
  },
  {
    agencyId: "20",
    agencyName: "Trusted Shield Insurance",
    creditsBalance: 10800,
    allowedPaymentMethod: "both",
    agentCount: 8,
    totalAgentCredits: 2800,
  },
  {
    agencyId: "21",
    agencyName: "Summit Health Solutions",
    creditsBalance: 18400,
    allowedPaymentMethod: "invoice",
    agentCount: 13,
    totalAgentCredits: 5500,
  },
  {
    agencyId: "22",
    agencyName: "Apex Benefits Partners",
    creditsBalance: 23000,
    allowedPaymentMethod: "credit_card",
    agentCount: 17,
    totalAgentCredits: 7200,
  },
  {
    agencyId: "23",
    agencyName: "Patriot Insurance Services",
    creditsBalance: 12000,
    allowedPaymentMethod: "both",
    agentCount: 9,
    totalAgentCredits: 3400,
  },
  {
    agencyId: "24",
    agencyName: "Evergreen Coverage Inc",
    creditsBalance: 950,
    allowedPaymentMethod: "invoice",
    agentCount: 5,
    totalAgentCredits: 1100,
  },
  {
    agencyId: "25",
    agencyName: "Beacon Health Insurance",
    creditsBalance: 16800,
    allowedPaymentMethod: "credit_card",
    agentCount: 11,
    totalAgentCredits: 4600,
  },
  {
    agencyId: "26",
    agencyName: "Midwest Insurance Alliance",
    creditsBalance: 19900,
    allowedPaymentMethod: "both",
    agentCount: 14,
    totalAgentCredits: 6000,
  },
  {
    agencyId: "27",
    agencyName: "Horizon Benefits Group",
    creditsBalance: 15400,
    allowedPaymentMethod: "invoice",
    agentCount: 10,
    totalAgentCredits: 4300,
  },
  {
    agencyId: "28",
    agencyName: "Pacific Coast Insurance",
    creditsBalance: 21800,
    allowedPaymentMethod: "credit_card",
    agentCount: 16,
    totalAgentCredits: 6900,
  },
  {
    agencyId: "29",
    agencyName: "Mountain View Coverage",
    creditsBalance: 8900,
    allowedPaymentMethod: "both",
    agentCount: 7,
    totalAgentCredits: 2600,
  },
  {
    agencyId: "30",
    agencyName: "Atlantic Insurance Partners",
    creditsBalance: 13200,
    allowedPaymentMethod: "invoice",
    agentCount: 9,
    totalAgentCredits: 3700,
  },
  {
    agencyId: "31",
    agencyName: "Sunshine State Benefits",
    creditsBalance: 700,
    allowedPaymentMethod: "credit_card",
    agentCount: 4,
    totalAgentCredits: 800,
  },
  {
    agencyId: "32",
    agencyName: "Capital Health Advisors",
    creditsBalance: 17200,
    allowedPaymentMethod: "both",
    agentCount: 12,
    totalAgentCredits: 5000,
  },
  {
    agencyId: "33",
    agencyName: "Empire Insurance Group",
    creditsBalance: 22500,
    allowedPaymentMethod: "invoice",
    agentCount: 17,
    totalAgentCredits: 7400,
  },
  {
    agencyId: "34",
    agencyName: "Keystone Benefits LLC",
    creditsBalance: 11800,
    allowedPaymentMethod: "credit_card",
    agentCount: 8,
    totalAgentCredits: 3200,
  },
  {
    agencyId: "35",
    agencyName: "Pinnacle Coverage Solutions",
    creditsBalance: 19200,
    allowedPaymentMethod: "both",
    agentCount: 14,
    totalAgentCredits: 5800,
  },
  {
    agencyId: "36",
    agencyName: "American Shield Insurance",
    creditsBalance: 14800,
    allowedPaymentMethod: "invoice",
    agentCount: 10,
    totalAgentCredits: 4400,
  },
  {
    agencyId: "37",
    agencyName: "Victory Benefits Group",
    creditsBalance: 16500,
    allowedPaymentMethod: "credit_card",
    agentCount: 11,
    totalAgentCredits: 4700,
  },
  {
    agencyId: "38",
    agencyName: "Coastal Health Partners",
    creditsBalance: 9500,
    allowedPaymentMethod: "both",
    agentCount: 7,
    totalAgentCredits: 2500,
  },
  {
    agencyId: "39",
    agencyName: "Heritage Insurance Services",
    creditsBalance: 18600,
    allowedPaymentMethod: "invoice",
    agentCount: 13,
    totalAgentCredits: 5700,
  },
  {
    agencyId: "40",
    agencyName: "Frontier Benefits Inc",
    creditsBalance: 450,
    allowedPaymentMethod: "credit_card",
    agentCount: 3,
    totalAgentCredits: 500,
  },
  {
    agencyId: "41",
    agencyName: "United Coverage Alliance",
    creditsBalance: 20800,
    allowedPaymentMethod: "both",
    agentCount: 15,
    totalAgentCredits: 6500,
  },
  {
    agencyId: "42",
    agencyName: "Prime Health Solutions",
    creditsBalance: 23500,
    allowedPaymentMethod: "invoice",
    agentCount: 18,
    totalAgentCredits: 7900,
  },
  {
    agencyId: "43",
    agencyName: "Regional Insurance Experts",
    creditsBalance: 12600,
    allowedPaymentMethod: "credit_card",
    agentCount: 9,
    totalAgentCredits: 3500,
  },
  {
    agencyId: "44",
    agencyName: "Unified Benefits Group",
    creditsBalance: 15900,
    allowedPaymentMethod: "both",
    agentCount: 11,
    totalAgentCredits: 4800,
  },
  {
    agencyId: "45",
    agencyName: "Strategic Coverage Partners",
    creditsBalance: 17800,
    allowedPaymentMethod: "invoice",
    agentCount: 12,
    totalAgentCredits: 5300,
  },
  {
    agencyId: "46",
    agencyName: "Excellence Insurance LLC",
    creditsBalance: 10200,
    allowedPaymentMethod: "credit_card",
    agentCount: 8,
    totalAgentCredits: 2900,
  },
  {
    agencyId: "47",
    agencyName: "Prestige Benefits Solutions",
    creditsBalance: 21500,
    allowedPaymentMethod: "both",
    agentCount: 16,
    totalAgentCredits: 6700,
  },
  {
    agencyId: "48",
    agencyName: "Cornerstone Health Group",
    creditsBalance: 13500,
    allowedPaymentMethod: "invoice",
    agentCount: 9,
    totalAgentCredits: 3800,
  },
  {
    agencyId: "49",
    agencyName: "Pioneer Insurance Services",
    creditsBalance: 600,
    allowedPaymentMethod: "credit_card",
    agentCount: 4,
    totalAgentCredits: 700,
  },
  {
    agencyId: "50",
    agencyName: "Crown Benefits Partners",
    creditsBalance: 19600,
    allowedPaymentMethod: "both",
    agentCount: 14,
    totalAgentCredits: 5900,
  },
  {
    agencyId: "51",
    agencyName: "Legacy Coverage Group",
    creditsBalance: 24200,
    allowedPaymentMethod: "invoice",
    agentCount: 19,
    totalAgentCredits: 8100,
  },
  {
    agencyId: "52",
    agencyName: "Triumph Insurance Alliance",
    creditsBalance: 11400,
    allowedPaymentMethod: "credit_card",
    agentCount: 8,
    totalAgentCredits: 3100,
  },
  {
    agencyId: "53",
    agencyName: "Noble Health Advisors",
    creditsBalance: 16000,
    allowedPaymentMethod: "both",
    agentCount: 11,
    totalAgentCredits: 4500,
  },
];

const mockAgents: AgentData[] = [
  {
    agentId: "1",
    agentName: "John Smith",
    agentEmail: "john.smith@premier.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 250.0,
    agencyId: "1",
  },
  {
    agentId: "2",
    agentName: "Sarah Johnson",
    agentEmail: "sarah.johnson@premier.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 125.5,
    agencyId: "1",
  },
  {
    agentId: "3",
    agentName: "Michael Chen",
    agentEmail: "michael.chen@healthcare.com",
    paymentMode: "agency_paid",
    callCreditsBalance: 500.0,
    agencyId: "2",
  },
  {
    agentId: "4",
    agentName: "Emily Davis",
    agentEmail: "emily.davis@finalexpense.com",
    paymentMode: "agent_paid",
    callCreditsBalance: 75.25,
    agencyId: "3",
  },
];

interface SuperAdminCallCreditsManagementProps {
  onBackToDashboard?: () => void;
}

const SuperAdminCallCreditsManagement = ({ onBackToDashboard }: SuperAdminCallCreditsManagementProps) => {
  const [agencies] = useState<AgencyData[]>(mockAgencies);
  const [agents] = useState<AgentData[]>(mockAgents);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentModeFilter, setPaymentModeFilter] = useState<"all" | PaymentMode>("all");
  const [selectedAgentIds, setSelectedAgentIds] = useState<Set<string>>(new Set());
  const [isBulkFundsModalOpen, setIsBulkFundsModalOpen] = useState(false);
  const [isAgencyCreditsModalOpen, setIsAgencyCreditsModalOpen] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState<{
    isOpen: boolean;
    agentId: string;
    agentName: string;
    currentBalance: number;
  }>({
    isOpen: false,
    agentId: "",
    agentName: "",
    currentBalance: 0,
  });

  const selectedAgency = selectedAgencyId
    ? agencies.find((a) => a.agencyId === selectedAgencyId)
    : null;

  const filteredAgencies = agencies.filter((agency) =>
    agency.agencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const agencyAgents = selectedAgencyId
    ? agents.filter((agent) => agent.agencyId === selectedAgencyId)
    : [];

  const filteredAgents = agencyAgents.filter((agent) => {
    const matchesSearch =
      agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      paymentModeFilter === "all" || agent.paymentMode === paymentModeFilter;
    return matchesSearch && matchesFilter;
  });

  const agencyPaidAgents = filteredAgents.filter(
    (agent) => agent.paymentMode === "agency_paid"
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAgentIds(new Set(agencyPaidAgents.map((a) => a.agentId)));
    } else {
      setSelectedAgentIds(new Set());
    }
  };

  const handleSelectAgent = (agentId: string, checked: boolean) => {
    const newSelected = new Set(selectedAgentIds);
    if (checked) {
      newSelected.add(agentId);
    } else {
      newSelected.delete(agentId);
    }
    setSelectedAgentIds(newSelected);
  };

  const handleAddFundsToAgent = (agentId: string) => {
    const agent = agents.find((a) => a.agentId === agentId);
    if (agent) {
      setAddFundsModal({
        isOpen: true,
        agentId,
        agentName: agent.agentName,
        currentBalance: agent.callCreditsBalance,
      });
    }
  };

  const handleBulkDistribute = () => {
    if (selectedAgentIds.size === 0) {
      toast.error("Please select at least one agent");
      return;
    }
    setIsBulkFundsModalOpen(true);
  };

  const totalCredits = agencies.reduce(
    (sum, agency) => sum + agency.creditsBalance,
    0
  );
  const totalAgents = agencies.reduce(
    (sum, agency) => sum + agency.agentCount,
    0
  );
  const lowBalanceAgencies = agencies.filter(
    (a) => a.creditsBalance < 1000
  ).length;

  const getPaymentMethodBadge = (method: AgencyPaymentMethod) => {
    switch (method) {
      case "credit_card":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CreditCard className="w-3 h-3 mr-1" />
            Card Only
          </Badge>
        );
      case "invoice":
        return (
          <Badge className="bg-purple-100 text-purple-800">Invoice Only</Badge>
        );
      case "both":
        return (
          <Badge className="bg-green-100 text-green-800">Card or Invoice</Badge>
        );
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  const getPaymentModeBadge = (mode: PaymentMode) => {
    return mode === "agency_paid" ? (
      <Badge className="bg-green-100 text-green-800">Agency Paid</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800">Agent Paid</Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBackToDashboard && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDashboard}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold">Call Credits Management</h1>
            <p className="text-muted-foreground">
              Manage call credits across all agencies and agents
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      {!selectedAgencyId && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Credits Pool
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalCredits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all agencies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Agencies
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencies.length}</div>
              <p className="text-xs text-muted-foreground">Active agencies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAgents}</div>
              <p className="text-xs text-muted-foreground">Across all agencies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Balance Alert
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowBalanceAgencies}</div>
              <p className="text-xs text-muted-foreground">
                Agencies below $1,000
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      {!selectedAgencyId ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Agencies</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency Name</TableHead>
                  <TableHead>Credits Balance</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Agents</TableHead>
                  <TableHead>Total Agent Credits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgencies.map((agency) => (
                  <TableRow key={agency.agencyId}>
                    <TableCell className="font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => setSelectedAgencyId(agency.agencyId)}
                      >
                        {agency.agencyName}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">
                          ${agency.creditsBalance.toLocaleString()}
                        </span>
                        {agency.creditsBalance < 1000 && (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPaymentMethodBadge(agency.allowedPaymentMethod)}
                    </TableCell>
                    <TableCell>{agency.agentCount}</TableCell>
                    <TableCell className="font-mono">
                      ${agency.totalAgentCredits.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAgencyId(agency.agencyId)}
                      >
                        <ChevronRight className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Agency Details Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAgencyId(null)}
                    >
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Back to Agencies
                    </Button>
                  </div>
                  <CardTitle className="text-2xl">{selectedAgency?.agencyName}</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {selectedAgency?.agentCount} agents
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Agency Credits Balance
                  </div>
                  <div className="text-3xl font-bold">
                    ${selectedAgency?.creditsBalance.toLocaleString()}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setIsAgencyCreditsModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Agency Credits
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Agents Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agent Call Credits</CardTitle>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select
                    value={paymentModeFilter}
                    onValueChange={(value: any) => setPaymentModeFilter(value)}
                  >
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agents</SelectItem>
                      <SelectItem value="agency_paid">Agency Paid</SelectItem>
                      <SelectItem value="agent_paid">Agent Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleBulkDistribute}
                    disabled={selectedAgentIds.size === 0}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Bulk Distribute ({selectedAgentIds.size})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          agencyPaidAgents.length > 0 &&
                          selectedAgentIds.size === agencyPaidAgents.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        {agent.paymentMode === "agency_paid" && (
                          <Checkbox
                            checked={selectedAgentIds.has(agent.agentId)}
                            onCheckedChange={(checked) =>
                              handleSelectAgent(agent.agentId, checked as boolean)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {agent.agentName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {agent.agentEmail}
                      </TableCell>
                      <TableCell>{getPaymentModeBadge(agent.paymentMode)}</TableCell>
                      <TableCell>
                        <span className="font-mono">
                          ${agent.callCreditsBalance.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {agent.paymentMode === "agency_paid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddFundsToAgent(agent.agentId)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Funds
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modals */}
      {selectedAgency && (
        <>
          <AddAgencyCreditsModal
            isOpen={isAgencyCreditsModalOpen}
            onClose={() => setIsAgencyCreditsModalOpen(false)}
            currentBalance={selectedAgency.creditsBalance}
            allowedPaymentMethod={selectedAgency.allowedPaymentMethod}
            onSuccess={(newBalance) => {
              toast.success("Agency credits added successfully");
              setIsAgencyCreditsModalOpen(false);
            }}
          />

          <BulkAddFundsModal
            isOpen={isBulkFundsModalOpen}
            onClose={() => setIsBulkFundsModalOpen(false)}
            selectedAgents={agencyPaidAgents.filter((agent) =>
              selectedAgentIds.has(agent.agentId)
            )}
            agencyCreditsBalance={selectedAgency.creditsBalance}
            onSuccess={(updates) => {
              toast.success("Funds distributed successfully");
              setSelectedAgentIds(new Set());
              setIsBulkFundsModalOpen(false);
            }}
            onAddAgencyCredits={() => {
              setIsBulkFundsModalOpen(false);
              setIsAgencyCreditsModalOpen(true);
            }}
          />
        </>
      )}

      <AddFundsModal
        isOpen={addFundsModal.isOpen}
        onClose={() => {
          setAddFundsModal({
            isOpen: false,
            agentId: "",
            agentName: "",
            currentBalance: 0,
          });
        }}
        agentId={addFundsModal.agentId}
        agentName={addFundsModal.agentName}
        currentBalance={addFundsModal.currentBalance}
        onSuccess={(agentId, newBalance) => {
          toast.success("Funds added successfully");
          setAddFundsModal({
            isOpen: false,
            agentId: "",
            agentName: "",
            currentBalance: 0,
          });
        }}
      />
    </div>
  );
};

export default SuperAdminCallCreditsManagement;
