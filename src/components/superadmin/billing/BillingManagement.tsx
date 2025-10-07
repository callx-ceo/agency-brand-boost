import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download,
  Building2,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Bot,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for agencies
const mockAgencies = [
  {
    id: "1",
    name: "Premier Insurance Group",
    status: "active",
    monthlySpend: 45230,
    outstandingBalance: 0,
    billingModel: "postpaid",
    lastPayment: "2024-12-15",
    agentCount: 12,
    services: {
      callCredits: { used: 2340, total: 5000, cost: 23400 },
      telephonyFees: { minutes: 1245, cost: 12450 },
      aiCoaching: { enabled: true, cost: 1200 },
      aiScoring: { enabled: true, cost: 800 }
    }
  },
  {
    id: "2",
    name: "Healthcare Solutions LLC",
    status: "active",
    monthlySpend: 32100,
    outstandingBalance: 5200,
    billingModel: "prepaid",
    lastPayment: "2024-12-10",
    agentCount: 8,
    services: {
      callCredits: { used: 1890, total: 3000, cost: 18900 },
      telephonyFees: { minutes: 890, cost: 8900 },
      aiCoaching: { enabled: true, cost: 1000 },
      aiScoring: { enabled: false, cost: 0 }
    }
  },
  {
    id: "3",
    name: "Final Expense Direct",
    status: "payment_overdue",
    monthlySpend: 28900,
    outstandingBalance: 15600,
    billingModel: "postpaid",
    lastPayment: "2024-11-20",
    agentCount: 6,
    services: {
      callCredits: { used: 1560, total: 2500, cost: 15600 },
      telephonyFees: { minutes: 780, cost: 7800 },
      aiCoaching: { enabled: false, cost: 0 },
      aiScoring: { enabled: true, cost: 600 }
    }
  }
];

// Mock data for individual agents
const mockAgents = [
  {
    id: "1",
    name: "Sarah Martinez",
    agency: "Premier Insurance Group",
    status: "active",
    billingModel: "agency_pays",
    monthlySpend: 3850,
    services: {
      callCredits: { agency: true, used: 195, cost: 1950 },
      telephonyFees: { agency: true, minutes: 140, cost: 1400 },
      aiCoaching: { agency: true, cost: 250 },
      aiScoring: { agency: false, cost: 250 }
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    agency: "Healthcare Solutions LLC",
    status: "active",
    billingModel: "mixed",
    monthlySpend: 4200,
    services: {
      callCredits: { agency: false, used: 210, cost: 2100 },
      telephonyFees: { agency: true, minutes: 156, cost: 1560 },
      aiCoaching: { agency: true, cost: 270 },
      aiScoring: { agency: false, cost: 270 }
    }
  }
];

const BillingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [expandedAgency, setExpandedAgency] = useState<string | null>(null);

  const totalRevenue = mockAgencies.reduce((sum, agency) => sum + agency.monthlySpend, 0);
  const totalOutstanding = mockAgencies.reduce((sum, agency) => sum + agency.outstandingBalance, 0);
  const activeAgencies = mockAgencies.filter(a => a.status === "active").length;
  const overdueAgencies = mockAgencies.filter(a => a.status === "payment_overdue").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "payment_overdue":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>;
      case "suspended":
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBillingModelBadge = (model: string) => {
    switch (model) {
      case "prepaid":
        return <Badge className="bg-blue-100 text-blue-800">Prepaid</Badge>;
      case "postpaid":
        return <Badge className="bg-purple-100 text-purple-800">Postpaid</Badge>;
      case "agency_pays":
        return <Badge className="bg-green-100 text-green-800">Agency Pays</Badge>;
      case "mixed":
        return <Badge className="bg-orange-100 text-orange-800">Mixed</Badge>;
      default:
        return <Badge variant="outline">{model}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-muted-foreground">Monitor and manage billing across all agencies and agents</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overdueAgencies} {overdueAgencies === 1 ? 'agency' : 'agencies'} overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agencies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgencies}</div>
            <p className="text-xs text-muted-foreground">
              {mockAgencies.length} total agencies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spend/Agency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / mockAgencies.length).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+8.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Agency vs Agent Billing */}
      <Tabs defaultValue="agencies" className="w-full">
        <TabsList>
          <TabsTrigger value="agencies">Agency Billing</TabsTrigger>
          <TabsTrigger value="agents">Agent Billing</TabsTrigger>
          <TabsTrigger value="services">Service Breakdown</TabsTrigger>
        </TabsList>

        {/* Agency Billing Tab */}
        <TabsContent value="agencies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agency Billing Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agencies..."
                      className="pl-8 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Billing Model</TableHead>
                    <TableHead>Agents</TableHead>
                    <TableHead>Monthly Spend</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgencies.map((agency) => (
                    <React.Fragment key={agency.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedAgency(expandedAgency === agency.id ? null : agency.id)}
                          >
                            {expandedAgency === agency.id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{agency.name}</TableCell>
                        <TableCell>{getStatusBadge(agency.status)}</TableCell>
                        <TableCell>{getBillingModelBadge(agency.billingModel)}</TableCell>
                        <TableCell>{agency.agentCount}</TableCell>
                        <TableCell className="font-semibold">${agency.monthlySpend.toLocaleString()}</TableCell>
                        <TableCell className={agency.outstandingBalance > 0 ? "text-red-600 font-semibold" : ""}>
                          ${agency.outstandingBalance.toLocaleString()}
                        </TableCell>
                        <TableCell>{agency.lastPayment}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                      
                      {expandedAgency === agency.id && (
                        <TableRow>
                          <TableCell colSpan={9} className="bg-muted/50">
                            <div className="p-4 space-y-3">
                              <h4 className="font-semibold text-sm">Service Breakdown</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-background p-3 rounded-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium">Call Credits</span>
                                  </div>
                                  <div className="text-lg font-bold">${agency.services.callCredits.cost.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {agency.services.callCredits.used} / {agency.services.callCredits.total} used
                                  </div>
                                </div>
                                
                                <div className="bg-background p-3 rounded-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium">Telephony Fees</span>
                                  </div>
                                  <div className="text-lg font-bold">${agency.services.telephonyFees.cost.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {agency.services.telephonyFees.minutes} minutes
                                  </div>
                                </div>
                                
                                <div className="bg-background p-3 rounded-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bot className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium">AI Coaching</span>
                                  </div>
                                  <div className="text-lg font-bold">
                                    {agency.services.aiCoaching.enabled ? `$${agency.services.aiCoaching.cost.toLocaleString()}` : 'N/A'}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {agency.services.aiCoaching.enabled ? 'Enabled' : 'Disabled'}
                                  </div>
                                </div>
                                
                                <div className="bg-background p-3 rounded-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bot className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium">AI Scoring</span>
                                  </div>
                                  <div className="text-lg font-bold">
                                    {agency.services.aiScoring.enabled ? `$${agency.services.aiScoring.cost.toLocaleString()}` : 'N/A'}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {agency.services.aiScoring.enabled ? 'Enabled' : 'Disabled'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Billing Tab */}
        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agent Billing Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents..."
                      className="pl-8 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Billing Model</TableHead>
                    <TableHead>Monthly Spend</TableHead>
                    <TableHead>Call Credits</TableHead>
                    <TableHead>Telephony</TableHead>
                    <TableHead>AI Services</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.agency}</TableCell>
                      <TableCell>{getStatusBadge(agent.status)}</TableCell>
                      <TableCell>{getBillingModelBadge(agent.billingModel)}</TableCell>
                      <TableCell className="font-semibold">${agent.monthlySpend.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          ${agent.services.callCredits.cost.toLocaleString()}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {agent.services.callCredits.agency ? "Agency" : "Agent"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          ${agent.services.telephonyFees.cost.toLocaleString()}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {agent.services.telephonyFees.agency ? "Agency" : "Agent"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            Coaching: ${agent.services.aiCoaching.cost}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {agent.services.aiCoaching.agency ? "Agency" : "Agent"}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            Scoring: ${agent.services.aiScoring.cost}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {agent.services.aiScoring.agency ? "Agency" : "Agent"}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Breakdown Tab */}
        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Call Credits Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${mockAgencies.reduce((sum, a) => sum + a.services.callCredits.cost, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mockAgencies.reduce((sum, a) => sum + a.services.callCredits.used, 0).toLocaleString()} total calls
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  Telephony Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${mockAgencies.reduce((sum, a) => sum + a.services.telephonyFees.cost, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mockAgencies.reduce((sum, a) => sum + a.services.telephonyFees.minutes, 0).toLocaleString()} total minutes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-green-600" />
                  AI Coaching Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${mockAgencies.reduce((sum, a) => sum + a.services.aiCoaching.cost, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mockAgencies.filter(a => a.services.aiCoaching.enabled).length} agencies using
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-orange-600" />
                  AI Scoring Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${mockAgencies.reduce((sum, a) => sum + a.services.aiScoring.cost, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mockAgencies.filter(a => a.services.aiScoring.enabled).length} agencies using
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
