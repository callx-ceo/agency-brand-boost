
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown } from "lucide-react";
import { toast } from "sonner";

type PlanTier = "agency_starter" | "agency_pro" | "enterprise";

const UpgradePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currentPlan: PlanTier = "agency_starter";

  const plans = [
    {
      id: "agency_starter" as PlanTier,
      name: "Agency Starter",
      price: 497,
      icon: <Star className="w-6 h-6" />,
      description: "Perfect for small agencies getting started",
      features: [
        "Up to 5 agent licenses",
        "Basic analytics",
        "Standard support",
        "CallX branding",
        "Core campaign management"
      ],
      isCurrent: currentPlan === "agency_starter",
      popular: false
    },
    {
      id: "agency_pro" as PlanTier,
      name: "Agency Pro",
      price: 997,
      icon: <Crown className="w-6 h-6" />,
      description: "Advanced features for growing agencies",
      features: [
        "Unlimited agent licenses",
        "Advanced analytics & reporting",
        "Priority support",
        "White-label options",
        "Custom domain",
        "Referral program",
        "Advanced campaign tools"
      ],
      isCurrent: currentPlan === "agency_pro",
      popular: true
    },
    {
      id: "enterprise" as PlanTier,
      name: "Enterprise",
      price: "Custom",
      icon: <Crown className="w-6 h-6" />,
      description: "Custom solutions for large organizations",
      features: [
        "Everything in Pro",
        "Publisher marketplace access",
        "Custom integrations",
        "Dedicated account manager",
        "Custom SLA",
        "Advanced security features",
        "Multi-tenant architecture"
      ],
      isCurrent: currentPlan === "enterprise",
      popular: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan) {
      toast.info("You're already on this plan");
      return;
    }
    
    setSelectedPlan(planId);
    if (planId === "enterprise") {
      toast.success("Enterprise inquiry submitted! Our team will contact you within 24 hours.");
    } else {
      toast.success(`Upgrade to ${plans.find(p => p.id === planId)?.name} initiated! Redirecting to payment...`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
      <p className="text-gray-600 mb-8">Choose the perfect plan for your agency's needs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${plan.isCurrent ? 'bg-gray-50' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                {typeof plan.price === 'number' && <span className="text-base font-normal text-gray-500">/month</span>}
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.isCurrent ? "secondary" : plan.popular ? "default" : "outline"}
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.isCurrent}
              >
                {plan.isCurrent 
                  ? "Current Plan" 
                  : plan.id === "enterprise" 
                    ? "Contact Sales" 
                    : `Upgrade to ${plan.name}`
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Need help choosing?</h3>
        <p className="text-gray-600 mb-4">
          Our team is here to help you find the perfect plan for your agency's specific needs.
        </p>
        <Button variant="outline">Schedule a Demo</Button>
      </div>
    </div>
  );
};

export default UpgradePlans;
