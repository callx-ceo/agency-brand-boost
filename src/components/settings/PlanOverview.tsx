
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { toast } from "sonner";
import UpgradePrompt from "./UpgradePrompt";

interface PlanOverviewProps {
  currentPlan: {
    name: string;
    tier: string;
    price: number;
    billingCycle: string;
    nextBillingDate: string;
    status: string;
    licenses: {
      total: number;
      assigned: number;
      available: number;
    };
  };
}

const PlanOverview = ({ currentPlan }: PlanOverviewProps) => {
  const isStarter = currentPlan.tier === "agency_starter";

  const handleUpgrade = () => {
    toast.success("Upgrade initiated! Redirecting to payment...");
  };

  const handleDowngrade = () => {
    toast.info("Downgrade request submitted for review");
  };

  const upgradeFeatures = [
    "Unlimited agent licenses",
    "White-label branding options",
    "Custom domain setup",
    "Advanced analytics & reporting",
    "Priority support",
    "Referral program access"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Current Plan
          <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>
            {currentPlan.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
            <p className="text-muted-foreground">
              ${currentPlan.price}/{currentPlan.billingCycle}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Next billing: {currentPlan.nextBillingDate}
            </p>
            
            {/* License Information */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Agent Licenses</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of agents who can access the platform</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Used</span>
                    <span>{currentPlan.licenses.assigned} of {currentPlan.licenses.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(currentPlan.licenses.assigned / currentPlan.licenses.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {currentPlan.licenses.available} licenses available
              </p>
            </div>
          </div>
          
          {isStarter && (
            <UpgradePrompt 
              upgradeFeatures={upgradeFeatures}
              onUpgrade={handleUpgrade}
            />
          )}
          
          {!isStarter && (
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleDowngrade}>
                Request Downgrade
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanOverview;
