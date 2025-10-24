import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, TrendingUp, Gift } from "lucide-react";

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

  // Mock data - replace with Supabase queries filtering by agency
  const mockAgencyStats = {
    totalReferralsByAgents: 42,
    activeReferrals: 18,
    totalRewardsEarned: 4200.00,
    pendingRewards: 1800.00,
  };

  const mockAgencyReferrals: AgencyReferralData[] = [
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

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Agency Referral Program</CardTitle>
          <CardDescription>
            Track referrals made by your agents. Each agent earns $100 credit when their referred agent makes their first payment.
          </CardDescription>
        </CardHeader>
      </Card>

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
          <CardTitle>Agency Referrals</CardTitle>
          <CardDescription>Referrals made by your team members</CardDescription>
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
                  {mockAgencyReferrals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No referrals yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockAgencyReferrals.map((referral) => (
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
                  {mockAgencyReferrals.filter(r => r.status === "pending").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No pending referrals
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockAgencyReferrals
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
                  {mockAgencyReferrals.filter(r => r.status === "rewarded").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No completed referrals yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockAgencyReferrals
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