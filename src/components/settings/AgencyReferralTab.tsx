import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DollarSign, Users, TrendingUp, Gift, Search, CalendarIcon, UserPlus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { AssignReferrerModal } from "@/components/shared/AssignReferrerModal";
import { EditReferralModal } from "@/components/settings/EditReferralModal";

interface AgencyReferralData {
  id: string;
  agent_name: string;
  referred_name: string;
  referred_agency?: string;
  status: string;
  signup_date: string;
  first_payment_date: string | null;
  reward_amount: number;
  reward_status: string;
}

export const AgencyReferralTab = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [showAssignReferrer, setShowAssignReferrer] = useState(false);
  const [editingReferral, setEditingReferral] = useState<AgencyReferralData | null>(null);

  // Mock data - replace with Supabase queries filtering by agency
  const mockAgencyStats = {
    totalReferralsByAgents: 42,
    activeReferrals: 18,
    totalRewardsEarned: 4200.00,
    pendingRewards: 1800.00,
  };

  const [referrals, setReferrals] = useState<AgencyReferralData[]>([
    {
      id: "1",
      agent_name: "John Smith",
      referred_name: "Sarah Johnson",
      referred_agency: "Elite Coverage LLC",
      status: "rewarded",
      signup_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      first_payment_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      reward_amount: 100.00,
      reward_status: "credited",
    },
    {
      id: "2",
      agent_name: "Mike Davis",
      referred_name: "Emily Brown",
      referred_agency: undefined,
      status: "pending",
      signup_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      first_payment_date: null,
      reward_amount: 100.00,
      reward_status: "pending",
    },
  ]);

  const handleSaveReferral = (updated: AgencyReferralData) => {
    setReferrals(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
      pending: "warning",
      qualified: "secondary",
      rewarded: "success",
      cancelled: "destructive",
      approved: "secondary",
      credited: "success",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const filteredReferrals = referrals.filter((ref) => {
    const matchesSearch = 
      ref.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.referred_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const signupDate = new Date(ref.signup_date);
    const matchesDateRange = 
      (!dateFrom || signupDate >= dateFrom) &&
      (!dateTo || signupDate <= dateTo);
    
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Agency Referral Program</CardTitle>
            <CardDescription>
              Track referrals made by your agents. Each agent earns $100 credit when their referred agent makes their first payment.
            </CardDescription>
          </div>
          <Button onClick={() => setShowAssignReferrer(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Referrer to Legacy Agent
          </Button>
        </CardHeader>
      </Card>

      <AssignReferrerModal
        open={showAssignReferrer}
        onOpenChange={setShowAssignReferrer}
        level="agency"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgencyStats.totalReferralsByAgents}</div>
            <p className="text-xs text-muted-foreground">By your agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgencyStats.activeReferrals}</div>
            <p className="text-xs text-muted-foreground">Pending payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAgencyStats.totalRewardsEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Credits to agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAgencyStats.pendingRewards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agency Referrals</CardTitle>
              <CardDescription>Referrals made by your team members</CardDescription>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
              
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">All Referrals</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="rewarded">Rewarded</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Your Agent</TableHead>
                    <TableHead>Referred Agent</TableHead>
                    <TableHead>Referred Agency</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Reward Amount</TableHead>
                    <TableHead>Reward Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No referrals found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.agent_name}</TableCell>
                        <TableCell className="font-medium">{referral.referred_name}</TableCell>
                        <TableCell>{referral.referred_agency || "-"}</TableCell>
                        <TableCell>
                          {new Date(referral.signup_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(referral.status)}</TableCell>
                        <TableCell>
                          {referral.first_payment_date
                            ? new Date(referral.first_payment_date).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${referral.reward_amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(referral.reward_status)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Your Agent</TableHead>
                    <TableHead>Referred Agent</TableHead>
                    <TableHead>Referred Agency</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.filter(r => r.status === "pending").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No pending referrals
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals
                      .filter(r => r.status === "pending")
                      .map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.agent_name}</TableCell>
                          <TableCell className="font-medium">{referral.referred_name}</TableCell>
                          <TableCell>{referral.referred_agency || "-"}</TableCell>
                          <TableCell>
                            {new Date(referral.signup_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(referral.status)}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="rewarded" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Your Agent</TableHead>
                    <TableHead>Referred Agent</TableHead>
                    <TableHead>Referred Agency</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Reward Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.filter(r => r.status === "rewarded").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No completed referrals yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals
                      .filter(r => r.status === "rewarded")
                      .map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.agent_name}</TableCell>
                          <TableCell className="font-medium">{referral.referred_name}</TableCell>
                          <TableCell>{referral.referred_agency || "-"}</TableCell>
                          <TableCell>
                            {referral.first_payment_date
                              ? new Date(referral.first_payment_date).toLocaleDateString()
                              : "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            ${referral.reward_amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{getStatusBadge(referral.reward_status)}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};