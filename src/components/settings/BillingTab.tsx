import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { WalletCards } from "lucide-react";

// Mock data for demo purposes
const mockBillingOverview = {
  currentBalance: 125.50,
  nextInvoiceDate: "2023-11-01",
  billingCycle: "1st - 30th of month",
  currentPlan: { name: "Premium Plan", price: 29, currency: "USD", userLimit: 20, currentUserCount: 14 },
  primaryPaymentMethod: { type: "card", last4: "1234", brand: "Visa", expiryMonth: "08", expiryYear: "2024", isAutoPayEnabled: true },
  usageSummary: { qualifiedCalls: 350, billableMinutes: 7800, aiUsageCost: 15.00 },
  wallet: { balance: 50.00, currency: "USD" }
};

const mockInvoices = [
  {
    id: "inv_abc123",
    invoiceNumber: "INV-00123",
    issueDate: "2023-10-01",
    dueDate: "2023-10-15",
    totalAmount: 125.50,
    currency: "USD",
    status: "Paid"
  },
  {
    id: "inv_def456",
    invoiceNumber: "INV-00124",
    issueDate: "2023-10-15",
    dueDate: "2023-10-29",
    totalAmount: 89.75,
    currency: "USD",
    status: "Unpaid"
  },
  {
    id: "inv_ghi789",
    invoiceNumber: "INV-00125",
    issueDate: "2023-09-01",
    dueDate: "2023-09-15",
    totalAmount: 103.25,
    currency: "USD",
    status: "Paid"
  }
];

const mockPaymentMethods = [
  {
    id: "pm_xyz789",
    type: "card",
    isDefault: true,
    card: { brand: "visa", last4: "1234", exp_month: 8, exp_year: 2024 }
  },
  {
    id: "pm_abc123",
    type: "card",
    isDefault: false,
    card: { brand: "mastercard", last4: "5678", exp_month: 12, exp_year: 2025 }
  }
];

const mockTransactions = [
  {
    id: "txn_qrs456",
    date: "2023-10-05T10:30:00Z",
    description: "Payment for Invoice #INV-00123",
    amount: -85.50,
    currency: "USD",
    type: "Payment",
    status: "Completed"
  },
  {
    id: "txn_tuv789",
    date: "2023-10-02T14:15:00Z",
    description: "Wallet Top-up",
    amount: 100.00,
    currency: "USD",
    type: "WalletTopUp",
    status: "Completed"
  }
];

// Updated mock data for agent billing management with AI tool settings
const mockAgentSettings = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    billingModel: "AGENCY_BILLED",
    concurrencyCap: 10,
    balance: 250.75,
    aiTools: {
      status: "AGENCY_PAID",
      transcription: {
        status: "AGENCY_PAID",
        enabledByAgent: false
      },
      sentimentAnalysis: {
        status: "AGENCY_PAID",
        enabledByAgent: false
      }
    }
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    billingModel: "AGENT_BILLED",
    concurrencyCap: null,
    balance: 0,
    aiTools: {
      status: "DISABLED",
      transcription: {
        status: "DISABLED",
        enabledByAgent: false
      },
      sentimentAnalysis: {
        status: "DISABLED",
        enabledByAgent: false
      }
    }
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    billingModel: "AGENCY_BILLED",
    concurrencyCap: "unlimited",
    balance: 125.50,
    aiTools: {
      status: "MIXED",
      transcription: {
        status: "AGENCY_PAID",
        enabledByAgent: false
      },
      sentimentAnalysis: {
        status: "AGENT_SELF_PAID",
        enabledByAgent: true
      }
    }
  },
  {
    agentId: "agent_user_101",
    agentName: "Sarah Williams",
    agentEmail: "sarah.williams@example.com",
    billingModel: "AGENCY_BILLED",
    concurrencyCap: 25,
    balance: 75.25,
    aiTools: {
      status: "AGENT_SELF_PAID",
      transcription: {
        status: "AGENT_SELF_PAID",
        enabledByAgent: true
      },
      sentimentAnalysis: {
        status: "AGENT_SELF_PAID",
        enabledByAgent: true
      }
    }
  }
];

// Updated mock data for agency billing settings
const mockAgencyBillingSettings = {
  aiToolsEnabled: true,
  defaultNewAgentBillingModel: "AGENCY_BILLED",
  agencyPaidAiTools: {
    transcription: true,
    sentimentAnalysis: true,
    callScoring: false
  },
  allowAgentSelfPayAiTools: {
    transcription: true,
    sentimentAnalysis: true,
    callScoring: true
  }
};

const BillingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your current billing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${mockBillingOverview.currentBalance.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Next invoice on {mockBillingOverview.nextInvoiceDate}
            </p>
            <p className="text-sm text-gray-500">
              Billing cycle: {mockBillingOverview.billingCycle}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Pay Now</Button>
          </CardFooter>
        </Card>

        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold">
              {mockBillingOverview.currentPlan.name}
            </div>
            <p className="text-gray-500 mt-1">
              ${mockBillingOverview.currentPlan.price}/{mockBillingOverview.currentPlan.currency} monthly
            </p>
            <p className="text-sm mt-4">
              <span className="font-medium">{mockBillingOverview.currentPlan.currentUserCount}</span> of <span className="font-medium">{mockBillingOverview.currentPlan.userLimit}</span> users
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Change Plan</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Usage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Summary (Current Period)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">Qualified Calls</div>
              <div className="text-xl font-medium mt-1">{mockBillingOverview.usageSummary.qualifiedCalls}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">Billable Minutes</div>
              <div className="text-xl font-medium mt-1">{mockBillingOverview.usageSummary.billableMinutes}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">AI Usage Cost</div>
              <div className="text-xl font-medium mt-1">${mockBillingOverview.usageSummary.aiUsageCost.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Prepaid Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="text-2xl font-medium mt-1">
              ${mockBillingOverview.wallet.balance.toFixed(2)}
            </div>
          </div>
          <Button>Add Funds</Button>
        </CardContent>
      </Card>

      {/* Primary Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 h-12 w-16 rounded flex items-center justify-center">
              {mockBillingOverview.primaryPaymentMethod.brand}
            </div>
            <div>
              <div className="font-medium">
                {mockBillingOverview.primaryPaymentMethod.brand} **** {mockBillingOverview.primaryPaymentMethod.last4}
              </div>
              <div className="text-sm text-gray-500">
                Expires {mockBillingOverview.primaryPaymentMethod.expiryMonth}/{mockBillingOverview.primaryPaymentMethod.expiryYear}
              </div>
            </div>
          </div>
          <Button variant="outline">Manage Payment Methods</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const InvoiceList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Invoices</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search invoices..." />
          <Button variant="outline">Filter</Button>
        </div>
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
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.issueDate}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                  invoice.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="sm">View</Button>
                <Button variant="ghost" size="sm">Download</Button>
                {invoice.status === 'Unpaid' && (
                  <Button size="sm">Pay</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">Showing 1 to 3 of 3 entries</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <Button>Add New Payment Method</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPaymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-gray-100 h-12 w-16 rounded flex items-center justify-center capitalize">
                    {method.card.brand}
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {method.card.brand} **** {method.card.last4}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires {method.card.exp_month}/{method.card.exp_year}
                    </div>
                    {method.isDefault && (
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mt-1 inline-block">
                        Default
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button size="sm" variant="outline">Set Default</Button>
                  )}
                  <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search transactions..." />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">Showing 1 to 2 of 2 entries</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

// Updated Agent Billing Management component with AI tool status
const AgentBillingManagement = () => {
  const handleBillingModelChange = (agentId: string, newBillingModel: string) => {
    // In a real implementation, this would call an API to update the agent's billing model
    toast.success(`Updated billing model for agent ID ${agentId} to ${newBillingModel}`);
  };

  const handleConcurrencyCapChange = (agentId: string, cap: number | "unlimited") => {
    // In a real implementation, this would call an API to update the agent's concurrency cap
    toast.success(`Updated concurrency cap for agent ID ${agentId} to ${cap === "unlimited" ? "unlimited" : cap}`);
  };

  const getAiToolStatusBadge = (status: string) => {
    switch(status) {
      case "AGENCY_PAID":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">Agency Paid</span>;
      case "AGENT_SELF_PAID":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">Agent Self-Paid</span>;
      case "DISABLED":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">Disabled</span>;
      case "MIXED":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">Mixed</span>;
      default:
        return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const [expandedAgentId, setExpandedAgentId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Agent Billing Management</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search agents..." />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Current Billing Model</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Call Concurrency</TableHead>
            <TableHead>AI Tools Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAgentSettings.map((agent) => (
            <React.Fragment key={agent.agentId}>
              <TableRow>
                <TableCell>{agent.agentName}</TableCell>
                <TableCell>{agent.agentEmail}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.billingModel === 'AGENCY_BILLED' ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {agent.billingModel === 'AGENCY_BILLED' ? 'Billed to Agency' : 'Billed to Agent'}
                  </span>
                </TableCell>
                <TableCell>
                  {agent.billingModel === 'AGENCY_BILLED' ? (
                    <div className="flex items-center">
                      <WalletCards className="h-4 w-4 mr-1 text-gray-500" />
                      ${agent.balance.toFixed(2)}
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {agent.billingModel === 'AGENCY_BILLED' && (
                    <div className="flex items-center gap-2">
                      <select
                        className="border rounded p-1 text-sm"
                        value={agent.concurrencyCap === "unlimited" ? "unlimited" : agent.concurrencyCap || 0}
                        onChange={(e) => {
                          const value = e.target.value === "unlimited" ? "unlimited" : parseInt(e.target.value);
                          handleConcurrencyCapChange(agent.agentId, value);
                        }}
                      >
                        <option value="5">5 calls/day</option>
                        <option value="10">10 calls/day</option>
                        <option value="25">25 calls/day</option>
                        <option value="50">50 calls/day</option>
                        <option value="100">100 calls/day</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  )}
                  {agent.billingModel === 'AGENT_BILLED' && (
                    <span className="text-gray-400">Managed by agent</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getAiToolStatusBadge(agent.aiTools.status)}
                    <button 
                      onClick={() => setExpandedAgentId(expandedAgentId === agent.agentId ? null : agent.agentId)}
                      className="text-xs text-blue-600 hover:underline mt-1"
                    >
                      {expandedAgentId === agent.agentId ? "Hide details" : "Show details"}
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {agent.billingModel === 'AGENCY_BILLED' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBillingModelChange(agent.agentId, 'AGENT_BILLED')}
                      >
                        Set to Agent Billing
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBillingModelChange(agent.agentId, 'AGENCY_BILLED')}
                      >
                        Set to Agency Billing
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {expandedAgentId === agent.agentId && (
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={7}>
                    <div className="p-3">
                      <h4 className="text-sm font-medium mb-2">AI Tool Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-2 rounded border">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Transcription</span>
                            {getAiToolStatusBadge(agent.aiTools.transcription.status)}
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Sentiment Analysis</span>
                            {getAiToolStatusBadge(agent.aiTools.sentimentAnalysis.status)}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Note: Agents can only self-pay for tools if they are not covered by agency billing and if the agency allows self-payment.
                        Agent self-pay settings are managed by the agent in their own billing settings.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">Showing 1 to 4 of 4 entries</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

// Updated Billing Settings component with expanded AI tool configuration
const BillingSettings = () => {
  const [settings, setSettings] = useState({
    aiToolsEnabled: mockAgencyBillingSettings.aiToolsEnabled,
    defaultNewAgentBillingModel: mockAgencyBillingSettings.defaultNewAgentBillingModel,
    agencyPaidAiTools: { ...mockAgencyBillingSettings.agencyPaidAiTools },
    allowAgentSelfPayAiTools: { ...mockAgencyBillingSettings.allowAgentSelfPayAiTools }
  });

  const handleSaveSettings = () => {
    // In a real implementation, this would call an API to update the agency's billing settings
    toast.success("Billing settings updated successfully");
  };

  const handleAgencyPaidToolToggle = (tool: string, checked: boolean) => {
    setSettings({
      ...settings,
      agencyPaidAiTools: {
        ...settings.agencyPaidAiTools,
        [tool]: checked
      }
    });
  };

  const handleAgentSelfPayToolToggle = (tool: string, checked: boolean) => {
    setSettings({
      ...settings,
      allowAgentSelfPayAiTools: {
        ...settings.allowAgentSelfPayAiTools,
        [tool]: checked
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Agency-Paid AI Tools Section */}
      <Card>
        <CardHeader>
          <CardTitle>Agency-Paid AI Features</CardTitle>
          <CardDescription>Configure which AI-powered features will be billed to your agency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-tools-toggle">Enable AI Tools (Agency Billing)</Label>
              <div className="text-sm text-gray-500">
                Master switch for all agency-paid AI tools. When enabled, specific tools selected below will be billed to your agency.
              </div>
            </div>
            <Switch
              id="ai-tools-toggle"
              checked={settings.aiToolsEnabled}
              onCheckedChange={(checked) => setSettings({...settings, aiToolsEnabled: checked})}
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Specific AI Tools (Agency Paid)</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="transcription-toggle">Transcription</Label>
                  <div className="text-xs text-gray-500">Convert call audio to searchable text</div>
                </div>
                <Switch
                  id="transcription-toggle"
                  checked={settings.agencyPaidAiTools.transcription}
                  onCheckedChange={(checked) => handleAgencyPaidToolToggle('transcription', checked)}
                  disabled={!settings.aiToolsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sentiment-toggle">Sentiment Analysis</Label>
                  <div className="text-xs text-gray-500">Detect customer emotions during calls</div>
                </div>
                <Switch
                  id="sentiment-toggle"
                  checked={settings.agencyPaidAiTools.sentimentAnalysis}
                  onCheckedChange={(checked) => handleAgencyPaidToolToggle('sentimentAnalysis', checked)}
                  disabled={!settings.aiToolsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="call-scoring-toggle">AI Call Scoring</Label>
                  <div className="text-xs text-gray-500">Automated quality assessment of calls</div>
                </div>
                <Switch
                  id="call-scoring-toggle"
                  checked={settings.agencyPaidAiTools.callScoring}
                  onCheckedChange={(checked) => handleAgencyPaidToolToggle('callScoring', checked)}
                  disabled={!settings.aiToolsEnabled}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Self-Pay AI Tools Policy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Self-Paid AI Features</CardTitle>
          <CardDescription>Define which features agents can choose to pay for themselves if not covered by agency billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="agent-transcription-toggle">Transcription</Label>
                <div className="text-xs text-gray-500">Allow agents to self-pay for transcription</div>
              </div>
              <Switch
                id="agent-transcription-toggle"
                checked={settings.allowAgentSelfPayAiTools.transcription}
                onCheckedChange={(checked) => handleAgentSelfPayToolToggle('transcription', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="agent-sentiment-toggle">Sentiment Analysis</Label>
                <div className="text-xs text-gray-500">Allow agents to self-pay for sentiment analysis</div>
              </div>
              <Switch
                id="agent-sentiment-toggle"
                checked={settings.allowAgentSelfPayAiTools.sentimentAnalysis}
                onCheckedChange={(checked) => handleAgentSelfPayToolToggle('sentimentAnalysis', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="agent-call-scoring-toggle">AI Call Scoring</Label>
                <div className="text-xs text-gray-500">Allow agents to self-pay for call scoring</div>
              </div>
              <Switch
                id="agent-call-scoring-toggle"
                checked={settings.allowAgentSelfPayAiTools.callScoring}
                onCheckedChange={(checked) => handleAgentSelfPayToolToggle('callScoring', checked)}
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mt-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> When you allow agents to self-pay for features, they will need to set up their own payment methods. 
              Agents will only be charged for tools they explicitly enable in their own billing settings, and only if those tools aren't already 
              covered by agency billing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Default Billing Model Section */}
      <Card>
        <CardHeader>
          <CardTitle>Default Agent Billing Settings</CardTitle>
          <CardDescription>Configure default billing settings for new agents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-billing-model">Default billing for new agents:</Label>
            <select
              id="default-billing-model"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={settings.defaultNewAgentBillingModel}
              onChange={(e) => setSettings({...settings, defaultNewAgentBillingModel: e.target.value})}
            >
              <option value="AGENCY_BILLED">Billed to Agency</option>
              <option value="AGENT_BILLED">Billed to Agent</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const BillingTab = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="agent-billing">Agent Billing</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <BillingDashboard />
      </TabsContent>
      
      <TabsContent value="invoices">
        <InvoiceList />
      </TabsContent>
      
      <TabsContent value="payment-methods">
        <PaymentMethods />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionHistory />
      </TabsContent>
      
      <TabsContent value="agent-billing">
        <AgentBillingManagement />
      </TabsContent>
      
      <TabsContent value="settings">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  );
};

export default BillingTab;
