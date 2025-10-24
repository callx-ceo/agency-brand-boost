import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search, DollarSign, Users, TrendingUp, Gift, ChevronLeft, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReferralManagementProps {
  onBackToDashboard: () => void;
}

interface ReferralData {
  id: string;
  referrer_name: string;
  referrer_agency: string;
  referred_name: string;
  referred_agency?: string;
  status: string;
  signup_date: string;
  first_payment_date: string | null;
  reward_amount: number;
  reward_status: string;
}

const ReferralManagement = ({ onBackToDashboard }: ReferralManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // Mock data - replace with Supabase queries
  const mockStats = {
    totalReferrals: 247,
    activeReferrals: 89,
    totalRewardsIssued: 15800.00,
    pendingRewards: 8900.00,
  };

  const mockReferrals: ReferralData[] = [
    {
      id: "1",
      referrer_name: "John Smith",
      referrer_agency: "Acme Insurance Group",
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
      referrer_name: "Mike Davis",
      referrer_agency: "Premier Agents Co",
      referred_name: "Emily Brown",
      referred_agency: undefined,
      status: "pending",
      signup_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      first_payment_date: null,
      reward_amount: 100.00,
      reward_status: "pending",
    },
    {
      id: "3",
      referrer_name: "Lisa Anderson",
      referrer_agency: "Top Tier Agency",
      referred_name: "Robert Wilson",
      referred_agency: "Wilson & Associates",
      status: "qualified",
      signup_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      first_payment_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      reward_amount: 100.00,
      reward_status: "approved",
    },
  ];

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

  const filteredReferrals = mockReferrals.filter((ref) => {
    const matchesSearch = 
      ref.referrer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.referred_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.referrer_agency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const signupDate = new Date(ref.signup_date);
    const matchesDateRange = 
      (!dateFrom || signupDate >= dateFrom) &&
      (!dateTo || signupDate <= dateTo);
    
    const matchesFilters = matchesSearch && matchesDateRange;
    
    if (activeTab === "all") return matchesFilters;
    if (activeTab === "pending") return matchesFilters && ref.status === "pending";
    if (activeTab === "rewarded") return matchesFilters && ref.status === "rewarded";
    return matchesFilters;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBackToDashboard}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Referral Management</h1>
            <p className="text-muted-foreground">Monitor and manage the platform referral program</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">All-time referrals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeReferrals}</div>
            <p className="text-xs text-muted-foreground">Pending payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards Issued</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalRewardsIssued.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Credits distributed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.pendingRewards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Referrals</CardTitle>
              <CardDescription>View and manage all platform referrals</CardDescription>
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
              <TabsTrigger value="all">All Referrals</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="rewarded">Rewarded</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Referrer Agency</TableHead>
                    <TableHead>Referred Agent</TableHead>
                    <TableHead>Referred Agency</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Reward Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No referrals found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.referrer_name}</TableCell>
                        <TableCell>{referral.referrer_agency}</TableCell>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagement;