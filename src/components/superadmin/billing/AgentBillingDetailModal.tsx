import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  CreditCard,
  Phone,
  Bot,
  Building2,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Edit,
} from "lucide-react";

interface AgentBillingDetailModalProps {
  agent: any;
  isOpen: boolean;
  onClose: () => void;
}

const mockAgentTransactions = [
  { id: "1", date: "2024-12-15", type: "Call Credits", amount: 1680, status: "completed" },
  { id: "2", date: "2024-12-14", type: "Telephony Fees", amount: 840, status: "completed" },
  { id: "3", date: "2024-12-01", type: "AI Coaching", amount: 250, status: "completed" },
  { id: "4", date: "2024-11-15", type: "Call Credits", amount: 1540, status: "completed" },
  { id: "5", date: "2024-11-14", type: "Telephony Fees", amount: 770, status: "completed" },
];

const mockCallHistory = [
  { id: "1", date: "2024-12-15 14:30", duration: "12:45", type: "Outbound", cost: 127.5 },
  { id: "2", date: "2024-12-15 11:20", duration: "08:32", type: "Outbound", cost: 85.2 },
  { id: "3", date: "2024-12-14 16:45", duration: "15:20", type: "Outbound", cost: 153.3 },
  { id: "4", date: "2024-12-14 10:15", duration: "06:15", type: "Outbound", cost: 62.5 },
  { id: "5", date: "2024-12-13 15:30", duration: "11:40", type: "Outbound", cost: 116.7 },
];

export const AgentBillingDetailModal = ({
  agent,
  isOpen,
  onClose,
}: AgentBillingDetailModalProps) => {
  if (!agent) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTransactionStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBillingModelBadge = (model: string) => {
    if (model === "agency_pays") {
      return <Badge className="bg-green-100 text-green-800">Agency Pays</Badge>;
    } else if (model === "agent_pays") {
      return <Badge className="bg-orange-100 text-orange-800">Agent Pays</Badge>;
    }
    return <Badge variant="outline">{model}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl flex items-center gap-3">
                <User className="w-6 h-6" />
                {agent.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                {getStatusBadge(agent.status)}
                {getBillingModelBadge(agent.billingModel)}
                <span className="text-sm text-muted-foreground">
                  Agent ID: {agent.id}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Settings
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="calls">Call History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Spend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${agent.monthlySpend.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+8%</span> vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Agency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{agent.agency}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Member since Jan 2024
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Calls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <Phone className="w-6 h-6 text-purple-600" />
                    {agent.services.callCredits.used}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {agent.services.telephonyFees.minutes} total minutes
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Billing Model
                    </span>
                    <p className="font-medium mt-1">
                      {agent.billingModel === "agency_pays"
                        ? "Agency Pays"
                        : "Agent Pays"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Payment Method
                    </span>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      {agent.billingModel === "agency_pays" ? (
                        <span className="text-sm text-muted-foreground">
                          Uses Agency Payment Method
                        </span>
                      ) : (
                        <>
                          {agent.paymentMethod === "credit_card" && (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Credit Card ••••{agent.lastCard4}
                            </>
                          )}
                          {agent.paymentMethod === "ach" && "ACH Transfer"}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Current Period
                    </span>
                    <p className="font-medium mt-1">Dec 1 - Dec 31, 2024</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Next Billing Date
                    </span>
                    <p className="font-medium mt-1">Jan 1, 2025</p>
                  </div>
                </div>

                {agent.billingModel === "agent_pays" && (
                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Call Credits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold">
                      ${agent.services.callCredits.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.services.callCredits.used} calls made this month
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Charged at $10 per call credit
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="w-5 h-5 text-purple-600" />
                    Telephony Fees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold">
                      ${agent.services.telephonyFees.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.services.telephonyFees.minutes} minutes used
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Charged at $10 per minute
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="w-5 h-5 text-green-600" />
                    AI Coaching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-2xl font-bold">
                      ${agent.services.aiCoaching.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.services.aiCoaching.cost > 0
                        ? "Active subscription"
                        : "Not subscribed"}
                    </p>
                  </div>
                  {agent.services.aiCoaching.cost === 0 && (
                    <Button variant="outline" size="sm" className="mt-3">
                      Enable AI Coaching
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="w-5 h-5 text-orange-600" />
                    AI Scoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-2xl font-bold">
                      ${agent.services.aiScoring.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.services.aiScoring.cost > 0
                        ? "Active subscription"
                        : "Not subscribed"}
                    </p>
                  </div>
                  {agent.services.aiScoring.cost === 0 && (
                    <Button variant="outline" size="sm" className="mt-3">
                      Enable AI Scoring
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAgentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className="font-semibold">
                      ${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getTransactionStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {agent.billingModel === "agency_pays"
                          ? agent.agency
                          : "Agent"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Call History Tab */}
          <TabsContent value="calls" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Call History</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCallHistory.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-mono text-sm">
                      {call.date}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {call.duration}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{call.type}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${call.cost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
