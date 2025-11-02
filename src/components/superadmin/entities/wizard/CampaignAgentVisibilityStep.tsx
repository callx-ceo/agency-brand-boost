import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CampaignFormData } from "../types/campaignTypes";
import { Users, Search, X, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Agent {
  id: string;
  name: string;
  email: string;
  vertical: string;
  languages: string[];
  targetStates: string[];
  status: "active" | "paused";
}

interface CampaignAgentVisibilityStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

// Mock agents data - filtered by campaign vertical/language
const mockAgents: Agent[] = [
  { id: "agent_1", name: "Sarah Johnson", email: "sarah@agency.com", vertical: "Medicare", languages: ["English"], targetStates: ["CA", "TX", "FL"], status: "active" },
  { id: "agent_2", name: "Michael Chen", email: "michael@agency.com", vertical: "Medicare", languages: ["English", "Mandarin"], targetStates: ["CA", "NY"], status: "active" },
  { id: "agent_3", name: "Carlos Rodriguez", email: "carlos@agency.com", vertical: "Medicare", languages: ["English", "Spanish"], targetStates: ["FL", "TX", "AZ"], status: "active" },
  { id: "agent_4", name: "Jennifer Williams", email: "jennifer@agency.com", vertical: "Final Expense", languages: ["English"], targetStates: ["OH", "PA", "MI"], status: "active" },
  { id: "agent_5", name: "David Park", email: "david@agency.com", vertical: "Medicare", languages: ["English", "Korean"], targetStates: ["CA", "WA"], status: "paused" },
];

export const CampaignAgentVisibilityStep = ({ formData, updateFormData }: CampaignAgentVisibilityStepProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter agents based on campaign criteria (vertical, language, states)
  const eligibleAgents = mockAgents.filter(agent => {
    const matchesVertical = agent.vertical === formData.vertical;
    const matchesLanguage = agent.languages.includes(formData.language);
    const hasTargetStateOverlap = agent.targetStates.some(state => 
      formData.targetStates.includes(state)
    );
    return matchesVertical && matchesLanguage && hasTargetStateOverlap;
  });

  // Further filter by search
  const filteredAgents = eligibleAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const blockedAgents = formData.blockedAgents || [];
  
  const handleBlockAgent = (agentId: string) => {
    const newBlocked = blockedAgents.includes(agentId)
      ? blockedAgents.filter(id => id !== agentId)
      : [...blockedAgents, agentId];
    updateFormData({ blockedAgents: newBlocked });
  };

  const handleBlockAll = () => {
    if (blockedAgents.length === eligibleAgents.length) {
      updateFormData({ blockedAgents: [] });
    } else {
      updateFormData({ blockedAgents: eligibleAgents.map(a => a.id) });
    }
  };

  const activeAgentCount = eligibleAgents.length - blockedAgents.length;

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Agent Visibility:</strong> All eligible agents can receive calls from this campaign by default. 
          Use the block list below to exclude specific agents.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Visibility Management
          </CardTitle>
          <CardDescription>
            {eligibleAgents.length} eligible agents based on campaign criteria (vertical: {formData.vertical}, language: {formData.language})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
            <div className="space-y-1">
              <p className="text-sm font-medium">Active Agents</p>
              <p className="text-2xl font-bold text-primary">{activeAgentCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Blocked Agents</p>
              <p className="text-2xl font-bold text-destructive">{blockedAgents.length}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBlockAll}
            >
              {blockedAgents.length === eligibleAgents.length ? "Unblock All" : "Block All"}
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search agents by name or email..."
              className="pl-9"
            />
          </div>

          {/* Agent List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No eligible agents found</p>
                <p className="text-sm">
                  {eligibleAgents.length === 0
                    ? "No agents match the campaign criteria"
                    : "Try adjusting your search"}
                </p>
              </div>
            ) : (
              filteredAgents.map((agent) => {
                const isBlocked = blockedAgents.includes(agent.id);
                return (
                  <div
                    key={agent.id}
                    className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                      isBlocked 
                        ? "bg-destructive/5 border-destructive/20" 
                        : "bg-card hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={!isBlocked}
                        onCheckedChange={() => handleBlockAgent(agent.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{agent.name}</p>
                          {agent.status === "paused" && (
                            <Badge variant="outline" className="text-xs">Paused</Badge>
                          )}
                          {isBlocked && (
                            <Badge variant="destructive" className="text-xs">
                              <X className="w-3 h-3 mr-1" />
                              Blocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.email}</p>
                        <div className="flex gap-2 mt-1">
                          {agent.languages.map(lang => (
                            <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={isBlocked ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => handleBlockAgent(agent.id)}
                    >
                      {isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignAgentVisibilityStep;
