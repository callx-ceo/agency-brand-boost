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
  { id: "1", name: "Premier Insurance Group", status: "active", monthlySpend: 45230, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-15", agentCount: 12, services: { callCredits: { used: 2340, total: 5000, cost: 23400 }, telephonyFees: { minutes: 1245, cost: 12450 }, aiCoaching: { enabled: true, cost: 1200 }, aiScoring: { enabled: true, cost: 800 } } },
  { id: "2", name: "Healthcare Solutions LLC", status: "active", monthlySpend: 32100, outstandingBalance: 5200, billingModel: "prepaid", lastPayment: "2024-12-10", agentCount: 8, services: { callCredits: { used: 1890, total: 3000, cost: 18900 }, telephonyFees: { minutes: 890, cost: 8900 }, aiCoaching: { enabled: true, cost: 1000 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "3", name: "Final Expense Direct", status: "payment_overdue", monthlySpend: 28900, outstandingBalance: 15600, billingModel: "postpaid", lastPayment: "2024-11-20", agentCount: 6, services: { callCredits: { used: 1560, total: 2500, cost: 15600 }, telephonyFees: { minutes: 780, cost: 7800 }, aiCoaching: { enabled: false, cost: 0 }, aiScoring: { enabled: true, cost: 600 } } },
  { id: "4", name: "Medicare Advantage Partners", status: "active", monthlySpend: 38500, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-14", agentCount: 10, services: { callCredits: { used: 2100, total: 4000, cost: 21000 }, telephonyFees: { minutes: 1050, cost: 10500 }, aiCoaching: { enabled: true, cost: 1100 }, aiScoring: { enabled: true, cost: 700 } } },
  { id: "5", name: "Life Insurance Pros", status: "active", monthlySpend: 29800, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-12", agentCount: 7, services: { callCredits: { used: 1680, total: 3200, cost: 16800 }, telephonyFees: { minutes: 840, cost: 8400 }, aiCoaching: { enabled: true, cost: 900 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "6", name: "Senior Care Insurance", status: "active", monthlySpend: 41200, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-16", agentCount: 11, services: { callCredits: { used: 2260, total: 4500, cost: 22600 }, telephonyFees: { minutes: 1130, cost: 11300 }, aiCoaching: { enabled: true, cost: 1150 }, aiScoring: { enabled: true, cost: 750 } } },
  { id: "7", name: "ACA Enrollment Specialists", status: "payment_overdue", monthlySpend: 18600, outstandingBalance: 8400, billingModel: "postpaid", lastPayment: "2024-11-25", agentCount: 4, services: { callCredits: { used: 980, total: 2000, cost: 9800 }, telephonyFees: { minutes: 490, cost: 4900 }, aiCoaching: { enabled: false, cost: 0 }, aiScoring: { enabled: true, cost: 400 } } },
  { id: "8", name: "Guardian Financial Group", status: "active", monthlySpend: 35700, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-13", agentCount: 9, services: { callCredits: { used: 1960, total: 3800, cost: 19600 }, telephonyFees: { minutes: 980, cost: 9800 }, aiCoaching: { enabled: true, cost: 1050 }, aiScoring: { enabled: true, cost: 650 } } },
  { id: "9", name: "Nationwide Benefits Inc", status: "active", monthlySpend: 48900, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-15", agentCount: 13, services: { callCredits: { used: 2680, total: 5500, cost: 26800 }, telephonyFees: { minutes: 1340, cost: 13400 }, aiCoaching: { enabled: true, cost: 1300 }, aiScoring: { enabled: true, cost: 850 } } },
  { id: "10", name: "Family First Insurance", status: "active", monthlySpend: 26400, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-11", agentCount: 6, services: { callCredits: { used: 1460, total: 2800, cost: 14600 }, telephonyFees: { minutes: 730, cost: 7300 }, aiCoaching: { enabled: true, cost: 850 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "11", name: "United Health Advisors", status: "active", monthlySpend: 44600, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-16", agentCount: 11, services: { callCredits: { used: 2440, total: 4800, cost: 24400 }, telephonyFees: { minutes: 1220, cost: 12200 }, aiCoaching: { enabled: true, cost: 1200 }, aiScoring: { enabled: true, cost: 800 } } },
  { id: "12", name: "Secure Future Benefits", status: "suspended", monthlySpend: 0, outstandingBalance: 22300, billingModel: "postpaid", lastPayment: "2024-10-15", agentCount: 0, services: { callCredits: { used: 0, total: 0, cost: 0 }, telephonyFees: { minutes: 0, cost: 0 }, aiCoaching: { enabled: false, cost: 0 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "13", name: "Elite Medicare Solutions", status: "active", monthlySpend: 39800, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-14", agentCount: 10, services: { callCredits: { used: 2180, total: 4200, cost: 21800 }, telephonyFees: { minutes: 1090, cost: 10900 }, aiCoaching: { enabled: true, cost: 1100 }, aiScoring: { enabled: true, cost: 700 } } },
  { id: "14", name: "Advantage Insurance Group", status: "active", monthlySpend: 31200, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-12", agentCount: 8, services: { callCredits: { used: 1720, total: 3400, cost: 17200 }, telephonyFees: { minutes: 860, cost: 8600 }, aiCoaching: { enabled: true, cost: 950 }, aiScoring: { enabled: true, cost: 600 } } },
  { id: "15", name: "Platinum Coverage LLC", status: "active", monthlySpend: 27900, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-10", agentCount: 7, services: { callCredits: { used: 1540, total: 3000, cost: 15400 }, telephonyFees: { minutes: 770, cost: 7700 }, aiCoaching: { enabled: true, cost: 900 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "16", name: "Liberty Health Partners", status: "payment_overdue", monthlySpend: 22100, outstandingBalance: 11200, billingModel: "postpaid", lastPayment: "2024-11-28", agentCount: 5, services: { callCredits: { used: 1200, total: 2400, cost: 12000 }, telephonyFees: { minutes: 600, cost: 6000 }, aiCoaching: { enabled: false, cost: 0 }, aiScoring: { enabled: true, cost: 500 } } },
  { id: "17", name: "Golden Years Insurance", status: "active", monthlySpend: 36500, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-15", agentCount: 9, services: { callCredits: { used: 2000, total: 3900, cost: 20000 }, telephonyFees: { minutes: 1000, cost: 10000 }, aiCoaching: { enabled: true, cost: 1000 }, aiScoring: { enabled: true, cost: 650 } } },
  { id: "18", name: "Comprehensive Care Advisors", status: "active", monthlySpend: 42800, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-13", agentCount: 11, services: { callCredits: { used: 2340, total: 4600, cost: 23400 }, telephonyFees: { minutes: 1170, cost: 11700 }, aiCoaching: { enabled: true, cost: 1180 }, aiScoring: { enabled: true, cost: 780 } } },
  { id: "19", name: "Integrity Benefits Group", status: "active", monthlySpend: 33600, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-14", agentCount: 8, services: { callCredits: { used: 1840, total: 3600, cost: 18400 }, telephonyFees: { minutes: 920, cost: 9200 }, aiCoaching: { enabled: true, cost: 1000 }, aiScoring: { enabled: true, cost: 650 } } },
  { id: "20", name: "Trusted Shield Insurance", status: "active", monthlySpend: 29500, outstandingBalance: 0, billingModel: "prepaid", lastPayment: "2024-12-11", agentCount: 7, services: { callCredits: { used: 1620, total: 3100, cost: 16200 }, telephonyFees: { minutes: 810, cost: 8100 }, aiCoaching: { enabled: true, cost: 920 }, aiScoring: { enabled: false, cost: 0 } } },
  { id: "21", name: "Summit Health Solutions", status: "active", monthlySpend: 37200, outstandingBalance: 0, billingModel: "postpaid", lastPayment: "2024-12-16", agentCount: 9, services: { callCredits: { used: 2040, total: 4000, cost: 20400 }, telephonyFees: { minutes: 1020, cost: 10200 }, aiCoaching: { enabled: true, cost: 1050 }, aiScoring: { enabled: true, cost: 680 } } }
];

// Generate 100 agents distributed across the 21 agencies
const generateAgents = () => {
  const firstNames = ["Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Emily", "James", "Jessica", "John", "Amanda", "Christopher", "Ashley", "Daniel", "Michelle", "Matthew", "Stephanie", "Joshua", "Nicole", "Andrew", "Elizabeth", "Ryan", "Lauren", "Tyler", "Rebecca", "Brandon", "Samantha", "Kevin", "Rachel", "Eric", "Melissa", "Jason", "Amy", "Brian", "Kimberly", "Justin", "Angela", "Mark", "Heather", "Steven", "Laura", "Anthony", "Christina", "Jacob", "Amber", "William", "Megan", "Joseph", "Kelly", "Alexander"];
  const lastNames = ["Martinez", "Chen", "Johnson", "Williams", "Davis", "Rodriguez", "Miller", "Garcia", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Clark", "Lewis", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Morris", "Rogers", "Reed", "Cook"];
  const statuses = ["active", "active", "active", "active", "suspended"];
  const billingModels = ["agency_pays", "agency_pays", "agency_pays", "mixed", "agent_pays"];
  
  const agents = [];
  let agentId = 1;
  
  // Distribute agents across agencies based on agentCount
  mockAgencies.forEach((agency) => {
    for (let i = 0; i < agency.agentCount; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const billingModel = billingModels[Math.floor(Math.random() * billingModels.length)];
      
      const callCreditsUsed = Math.floor(Math.random() * 300) + 100;
      const telephonyMinutes = Math.floor(Math.random() * 200) + 80;
      
      const callCreditsAgency = billingModel === "agency_pays" || (billingModel === "mixed" && Math.random() > 0.5);
      const telephonyAgency = billingModel === "agency_pays" || (billingModel === "mixed" && Math.random() > 0.5);
      const aiCoachingAgency = billingModel === "agency_pays" || (billingModel === "mixed" && Math.random() > 0.5);
      const aiScoringAgency = billingModel === "agency_pays" || (billingModel === "mixed" && Math.random() > 0.5);
      
      const monthlySpend = 
        callCreditsUsed * 10 + 
        telephonyMinutes * 10 + 
        (Math.random() > 0.3 ? 250 : 0) + 
        (Math.random() > 0.4 ? 250 : 0);
      
      agents.push({
        id: agentId.toString(),
        name: `${firstName} ${lastName}`,
        agency: agency.name,
        status,
        billingModel,
        monthlySpend: Math.floor(monthlySpend),
        services: {
          callCredits: { agency: callCreditsAgency, used: callCreditsUsed, cost: callCreditsUsed * 10 },
          telephonyFees: { agency: telephonyAgency, minutes: telephonyMinutes, cost: telephonyMinutes * 10 },
          aiCoaching: { agency: aiCoachingAgency, cost: Math.random() > 0.3 ? 250 : 0 },
          aiScoring: { agency: aiScoringAgency, cost: Math.random() > 0.4 ? 250 : 0 }
        }
      });
      
      agentId++;
    }
  });
  
  return agents;
};

const mockAgents = generateAgents();

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
