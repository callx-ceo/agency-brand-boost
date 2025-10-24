import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Check, DollarSign, Users, TrendingUp, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  totalEarned: number;
  pendingRewards: number;
  accountBalance: number;
}

interface Referral {
  id: string;
  referred_agent_id: string;
  referred_agent_name: string;
  status: string;
  signup_date: string;
  first_payment_date: string | null;
  reward_date: string | null;
}

interface Reward {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  credited_date: string | null;
}

export const ReferralDashboard = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats>({
    referralCode: "",
    totalReferrals: 0,
    totalEarned: 0,
    pendingRewards: 0,
    accountBalance: 0,
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - will be replaced with actual Supabase calls once backend is set up
      const mockCode = "AGENT" + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      setStats({
        referralCode: mockCode,
        totalReferrals: 5,
        totalEarned: 500.00,
        pendingRewards: 2,
        accountBalance: 300.00,
      });

      setReferrals([
        {
          id: "1",
          referred_agent_id: "agent1",
          referred_agent_name: "John Smith",
          status: "rewarded",
          signup_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          first_payment_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          reward_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          referred_agent_id: "agent2",
          referred_agent_name: "Sarah Johnson",
          status: "pending",
          signup_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          first_payment_date: null,
          reward_date: null,
        },
      ]);

      setRewards([
        {
          id: "1",
          amount: 100.00,
          status: "credited",
          created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          credited_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          amount: 100.00,
          status: "pending",
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          credited_date: null,
        },
      ]);

    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast({
        title: "Error",
        description: "Failed to load referral data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const referralUrl = `${window.location.origin}/signup?ref=${stats.referralCode}`;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
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

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.accountBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All-time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">Successful referrals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRewards}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link with other agents. Earn $100 credit when they make their first payment!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm">
              {window.location.origin}/signup?ref={stats.referralCode}
            </div>
            <Button onClick={copyReferralLink} variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-4 p-4 bg-primary/10 rounded-md">
            <p className="text-sm font-medium">Referral Code: {stats.referralCode}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Referrals and Rewards */}
      <Tabs defaultValue="referrals">
        <TabsList>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
              <CardDescription>Track the status of your referred agents</CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No referrals yet. Start sharing your link!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Signup Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>First Payment</TableHead>
                      <TableHead>Reward Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">
                          {referral.referred_agent_name}
                        </TableCell>
                        <TableCell>
                          {new Date(referral.signup_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(referral.status)}</TableCell>
                        <TableCell>
                          {referral.first_payment_date
                            ? new Date(referral.first_payment_date).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {referral.reward_date
                            ? new Date(referral.reward_date).toLocaleDateString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
              <CardDescription>View your earned and pending rewards</CardDescription>
            </CardHeader>
            <CardContent>
              {rewards.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No rewards yet. Keep referring!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Credited Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewards.map((reward) => (
                      <TableRow key={reward.id}>
                        <TableCell>
                          {new Date(reward.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${reward.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(reward.status)}</TableCell>
                        <TableCell>
                          {reward.credited_date
                            ? new Date(reward.credited_date).toLocaleDateString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
