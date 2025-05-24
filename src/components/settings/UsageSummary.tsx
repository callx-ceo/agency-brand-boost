
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Phone, TrendingUp, Users, DollarSign, Bot, Clock, Zap } from "lucide-react";

interface UsageSummaryProps {
  usageData: {
    totalCalls: number;
    qualifiedCalls: number;
    avgCallDurationMinutes: number;
    callConversionRate: number;
    estimatedCallSpend: {
      total: number;
      agencyPaid: number;
      agentPaid: number;
    };
    aiToolSpend: {
      total: number;
      agencyPaid: number;
      agentPaid: number;
    };
    telephonyCharges: {
      total: number;
      agencyPaid: number;
      agentPaid: number;
    };
    activeAgents: number;
    concurrencyUtilization: number;
  };
  showCostBreakdown: boolean;
  onToggleCostBreakdown: (checked: boolean) => void;
}

const UsageSummary = ({ usageData, showCostBreakdown, onToggleCostBreakdown }: UsageSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Usage Summary</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="cost-breakdown">Show Full Cost Breakdown</Label>
            <Switch
              id="cost-breakdown"
              checked={showCostBreakdown}
              onCheckedChange={onToggleCostBreakdown}
            />
          </div>
        </div>
        <CardDescription>Agency-paid usage for current billing period</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Call Performance */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Calls</span>
                    </div>
                    <p className="text-2xl font-bold">{usageData.totalCalls}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>All inbound calls received this period</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Qualified Calls</span>
                    </div>
                    <p className="text-2xl font-bold">{usageData.qualifiedCalls}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Calls that met qualification criteria</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Avg Duration</span>
                    </div>
                    <p className="text-2xl font-bold">{usageData.avgCallDurationMinutes}m</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average duration of qualified calls in minutes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Conversion Rate</span>
                    </div>
                    <p className="text-2xl font-bold">{usageData.callConversionRate}%</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of calls that were qualified</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Billing Related */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Call Spend</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${showCostBreakdown ? usageData.estimatedCallSpend.total : usageData.estimatedCallSpend.agencyPaid}
                    </p>
                    {showCostBreakdown && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <div>Agency: ${usageData.estimatedCallSpend.agencyPaid}</div>
                        <div>Agents: ${usageData.estimatedCallSpend.agentPaid}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Shows only costs currently paid by the agency. Agent-paid usage is excluded.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">AI Tools</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${showCostBreakdown ? usageData.aiToolSpend.total : usageData.aiToolSpend.agencyPaid}
                    </p>
                    {showCostBreakdown && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <div>Agency: ${usageData.aiToolSpend.agencyPaid}</div>
                        <div>Agents: ${usageData.aiToolSpend.agentPaid}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated cost from AI features like transcription and scoring</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Telephony</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${showCostBreakdown ? usageData.telephonyCharges.total : usageData.telephonyCharges.agencyPaid}
                    </p>
                    {showCostBreakdown && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <div>Agency: ${usageData.telephonyCharges.agencyPaid}</div>
                        <div>Agents: ${usageData.telephonyCharges.agentPaid}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated cost of telephony usage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Active Agents</span>
                    </div>
                    <p className="text-2xl font-bold">{usageData.activeAgents}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Agents who received at least 1 call this billing period</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageSummary;
