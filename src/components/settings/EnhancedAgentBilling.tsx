import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type PaymentMode = Database["public"]["Enums"]["payment_mode"];

interface AgentBillingData {
  agentId: string;
  agentName: string;
  agentEmail: string;
  paymentMode: PaymentMode;
  callCreditsBalance: number;
}

const EnhancedAgentBilling = () => {
  const [agents, setAgents] = useState<AgentBillingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingAgent, setUpdatingAgent] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      
      // Get current user's agency
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get agency members
      const { data: memberRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, agency_id')
        .eq('role', 'agent');

      if (rolesError) throw rolesError;

      // Get agency for current user to filter members
      const { data: currentUserRoles } = await supabase
        .from('user_roles')
        .select('agency_id')
        .eq('user_id', user.id)
        .eq('role', 'owner')
        .single();

      if (!currentUserRoles) return;

      // Filter to only members of the current user's agency
      const agencyMembers = memberRoles?.filter(
        role => role.agency_id === currentUserRoles.agency_id
      ) || [];

      // Get payment settings for these agents
      const agentIds = agencyMembers.map(m => m.user_id);
      
      const { data: paymentSettings, error: settingsError } = await supabase
        .from('agent_payment_settings')
        .select('agent_id, payment_mode, call_credits_balance')
        .in('agent_id', agentIds);

      if (settingsError) throw settingsError;

      // Combine the data
      const agentsData: AgentBillingData[] = agencyMembers.map(member => {
        const settings = paymentSettings?.find(s => s.agent_id === member.user_id);
        return {
          agentId: member.user_id,
          agentName: member.user_id.substring(0, 8), // Placeholder - would need profiles table
          agentEmail: "agent@example.com", // Placeholder - would need profiles table
          paymentMode: settings?.payment_mode || 'agency_paid',
          callCreditsBalance: Number(settings?.call_credits_balance || 0)
        };
      });

      setAgents(agentsData);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error('Failed to load agent billing data');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentModeChange = async (agentId: string, newMode: PaymentMode) => {
    try {
      setUpdatingAgent(agentId);
      
      const { error } = await supabase
        .from('agent_payment_settings')
        .update({ payment_mode: newMode })
        .eq('agent_id', agentId);

      if (error) throw error;

      // Update local state
      setAgents(prev => prev.map(agent => 
        agent.agentId === agentId 
          ? { ...agent, paymentMode: newMode }
          : agent
      ));

      toast.success(`Payment mode updated to ${newMode === 'agency_paid' ? 'Agency Paid' : 'Agent Paid'}`);
    } catch (error) {
      console.error('Error updating payment mode:', error);
      toast.error('Failed to update payment mode');
    } finally {
      setUpdatingAgent(null);
    }
  };

  const getBillingBadge = (paymentMode: PaymentMode) => {
    return paymentMode === "agency_paid" ? (
      <Badge variant="secondary">Agency Paid</Badge>
    ) : (
      <Badge variant="outline">Agent Paid</Badge>
    );
  };

  const filteredAgents = agents.filter(agent =>
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Agent Payment Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure who pays for each agent's services
          </p>
        </div>
        <Input 
          className="w-60" 
          placeholder="Search agents..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Call Credits Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No agents found
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.agentId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{agent.agentName}</div>
                      <div className="text-sm text-muted-foreground">{agent.agentEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getBillingBadge(agent.paymentMode)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{agent.callCreditsBalance.toFixed(2)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Agent</span>
                      <Switch 
                        checked={agent.paymentMode === "agency_paid"}
                        onCheckedChange={(checked) => 
                          handlePaymentModeChange(
                            agent.agentId, 
                            checked ? "agency_paid" : "agent_paid"
                          )
                        }
                        disabled={updatingAgent === agent.agentId}
                      />
                      <span className="text-sm text-muted-foreground">Agency</span>
                      {updatingAgent === agent.agentId && (
                        <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default EnhancedAgentBilling;
