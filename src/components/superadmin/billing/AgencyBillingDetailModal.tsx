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
  Building2,
  CreditCard,
  Phone,
  Bot,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Edit,
  ArrowRight,
} from "lucide-react";

interface AgencyBillingDetailModalProps {
  agency: any;
  isOpen: boolean;
  onClose: () => void;
  onViewAgents?: (agencyId: string) => void;
}

const mockTransactions = [
  { id: "1", date: "2024-12-15", type: "Payment", amount: 45230, status: "completed", method: "Credit Card ••••3003" },
  { id: "2", date: "2024-11-15", type: "Payment", amount: 43100, status: "completed", method: "Credit Card ••••3003" },
  { id: "3", date: "2024-10-15", type: "Payment", amount: 41800, status: "completed", method: "Credit Card ••••3003" },
  { id: "4", date: "2024-09-15", type: "Refund", amount: -500, status: "completed", method: "Credit Card ••••3003" },
  { id: "5", date: "2024-09-14", type: "Payment", amount: 42300, status: "completed", method: "Credit Card ••••3003" },
];

const mockInvoices = [
  { id: "INV-2024-12", date: "2024-12-01", dueDate: "2024-12-15", amount: 45230, status: "paid" },
  { id: "INV-2024-11", date: "2024-11-01", dueDate: "2024-11-15", amount: 43100, status: "paid" },
  { id: "INV-2024-10", date: "2024-10-01", dueDate: "2024-10-15", amount: 41800, status: "paid" },
  { id: "INV-2024-09", date: "2024-09-01", dueDate: "2024-09-15", amount: 42300, status: "paid" },
];

export const AgencyBillingDetailModal = ({
  agency,
  isOpen,
  onClose,
  onViewAgents,
}: AgencyBillingDetailModalProps) => {
  if (!agency) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "payment_overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
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

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Building2 className="w-6 h-6" />
                {agency.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                {getStatusBadge(agency.status)}
                <span className="text-sm text-muted-foreground">
                  Agency ID: {agency.id}
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
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
                    ${agency.monthlySpend.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+12%</span> vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Outstanding Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      agency.outstandingBalance > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    ${agency.outstandingBalance.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {agency.outstandingBalance > 0 ? "Payment required" : "All paid"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    {agency.agentCount}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    agents under this agency
                  </p>
                  {onViewAgents && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => {
                        onViewAgents(agency.id);
                        onClose();
                      }}
                    >
                      View All Agents
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
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
                      {agency.billingModel === "prepaid" ? "Prepaid" : "Postpaid"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Payment Method
                    </span>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      {agency.paymentMethod === "credit_card" && (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Credit Card ••••{agency.lastCard4}
                        </>
                      )}
                      {agency.paymentMethod === "ach" && "ACH Transfer"}
                      {agency.paymentMethod === "invoice" && "Invoice"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Last Payment
                    </span>
                    <p className="font-medium mt-1">{agency.lastPayment}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Next Billing Date
                    </span>
                    <p className="font-medium mt-1">2025-01-15</p>
                  </div>
                </div>
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
                      ${agency.services.callCredits.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agency.services.callCredits.used} /{" "}
                      {agency.services.callCredits.total} credits used
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (agency.services.callCredits.used /
                            agency.services.callCredits.total) *
                          100
                        }%`,
                      }}
                    />
                  </div>
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
                      ${agency.services.telephonyFees.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agency.services.telephonyFees.minutes} minutes used
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
                      {agency.services.aiCoaching.enabled
                        ? `$${agency.services.aiCoaching.cost.toLocaleString()}`
                        : "N/A"}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agency.services.aiCoaching.enabled
                        ? "Active subscription"
                        : "Not subscribed"}
                    </p>
                  </div>
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
                      {agency.services.aiScoring.enabled
                        ? `$${agency.services.aiScoring.cost.toLocaleString()}`
                        : "N/A"}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agency.services.aiScoring.enabled
                        ? "Active subscription"
                        : "Not subscribed"}
                    </p>
                  </div>
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-mono text-sm">
                      TXN-{transaction.id}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className="text-sm">
                      {transaction.method}
                    </TableCell>
                    <TableCell
                      className={`font-semibold ${
                        transaction.amount < 0 ? "text-red-600" : ""
                      }`}
                    >
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getTransactionStatusBadge(transaction.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Invoice History</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono font-medium">
                      {invoice.id}
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="font-semibold">
                      ${invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getInvoiceStatusBadge(invoice.status)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
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
