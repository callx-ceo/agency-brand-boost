
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DollarSign, Phone, Brain, BarChart3, FileText, Lock, Percent, PhoneIncoming } from "lucide-react";

// Mock base rates set by super admin (read-only for agencies)
const mockBaseRates = {
  telephony: 0.05, // per minute
  transcription: 0.01, // per minute
  aiCoaching: 0.01, // per minute
  aiScoring: 0.005, // per minute
  callBalance: 97.00, // monthly seat license
  inboundCalls: 2.50 // minimum bid per inbound call
};

// Agency markup percentages
const mockAgencyMarkups = {
  telephony: 10, // 10% markup
  transcription: 15, // 15% markup
  aiCoaching: 20, // 20% markup
  aiScoring: 15, // 15% markup
  callBalance: 5, // 5% markup on seat license
  inboundCalls: 15 // 15% markup on inbound calls
};

const RateConfiguration = () => {
  const [markups, setMarkups] = useState(mockAgencyMarkups);

  const handleMarkupChange = (service: string, value: string) => {
    setMarkups({
      ...markups,
      [service]: parseFloat(value) || 0
    });
  };

  const calculateChargedRate = (baseRate: number, markup: number) => {
    return baseRate * (1 + markup / 100);
  };

  const handleSaveMarkups = () => {
    toast.success("Agency markup rates updated successfully");
  };

  const serviceConfig = [
    {
      key: 'telephony',
      label: 'Telephony',
      description: 'Cost per minute for phone calls',
      icon: <Phone className="h-5 w-5" />,
      unit: 'per minute',
      allowMarkup: true
    },
    {
      key: 'transcription',
      label: 'Transcription',
      description: 'Cost per minute for call transcription',
      icon: <FileText className="h-5 w-5" />,
      unit: 'per minute',
      allowMarkup: true
    },
    {
      key: 'aiCoaching',
      label: 'AI Real-time Coaching',
      description: 'Cost per minute for AI coaching during calls',
      icon: <Brain className="h-5 w-5" />,
      unit: 'per minute',
      allowMarkup: true
    },
    {
      key: 'aiScoring',
      label: 'AI Call Scoring',
      description: 'Cost per minute for AI call analysis and scoring',
      icon: <BarChart3 className="h-5 w-5" />,
      unit: 'per minute',
      allowMarkup: true
    },
    {
      key: 'callBalance',
      label: 'Call Balance (Seat License)',
      description: 'Monthly seat license fee',
      icon: <DollarSign className="h-5 w-5" />,
      unit: 'per month',
      allowMarkup: true
    },
    {
      key: 'inboundCalls',
      label: 'Inbound Calls (Minimum Bid)',
      description: 'Minimum bid rate per inbound call - agents can bid higher',
      icon: <PhoneIncoming className="h-5 w-5" />,
      unit: 'per call',
      allowMarkup: true,
      isBidRate: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Rate Configuration</CardTitle>
        <CardDescription>
          Base rates are set by CallX Super Admin. You can add markups for agent-billed services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {serviceConfig.map((service) => {
          const baseRate = mockBaseRates[service.key as keyof typeof mockBaseRates];
          const markup = markups[service.key as keyof typeof markups];
          const chargedRate = calculateChargedRate(baseRate, markup);
          
          return (
            <div key={service.key} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {service.icon}
                  <div>
                    <div className="font-medium">{service.label}</div>
                    <div className="text-sm text-gray-600">{service.description}</div>
                    {service.isBidRate && (
                      <div className="text-xs text-blue-600 mt-1">
                        Agents can set their bid above this minimum rate
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Super Admin Rate
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Base Rate */}
                <div className="p-3 bg-gray-50 rounded">
                  <Label className="text-xs text-gray-500">
                    {service.isBidRate ? 'Minimum Bid Rate' : 'Base Rate'}
                  </Label>
                  <div className="text-lg font-semibold">
                    ${baseRate.toFixed(service.key === 'callBalance' ? 2 : service.key === 'inboundCalls' ? 2 : 3)} {service.unit}
                  </div>
                </div>
                
                {/* Markup */}
                <div className="p-3 bg-blue-50 rounded">
                  <Label className="text-xs text-gray-500">Agency Markup</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={markup}
                      onChange={(e) => handleMarkupChange(service.key, e.target.value)}
                      className="w-20 h-8"
                    />
                    <Percent className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                {/* Charged Rate */}
                <div className="p-3 bg-green-50 rounded">
                  <Label className="text-xs text-gray-500">
                    {service.isBidRate ? 'Agent Minimum Bid' : 'Agent Charged Rate'}
                  </Label>
                  <div className="text-lg font-semibold">
                    ${chargedRate.toFixed(service.key === 'callBalance' ? 2 : service.key === 'inboundCalls' ? 2 : 3)} {service.unit}
                  </div>
                  {markup > 0 && (
                    <div className="text-xs text-green-600">
                      +${(chargedRate - baseRate).toFixed(service.key === 'callBalance' ? 2 : service.key === 'inboundCalls' ? 2 : 3)} profit
                    </div>
                  )}
                  {service.isBidRate && (
                    <div className="text-xs text-blue-600 mt-1">
                      Agents bid above this rate
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <Button onClick={handleSaveMarkups}>Save Markup Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RateConfiguration;
