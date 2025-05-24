
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DollarSign, Phone, Brain, BarChart3, FileText } from "lucide-react";

// Mock default rates (would come from super admin settings)
const mockDefaultRates = {
  telephony: 0.05, // per minute
  transcription: 0.01, // per minute
  aiCoaching: 0.01, // per minute
  aiScoring: 0.005, // per minute
  callBalance: 25.00 // monthly seat license
};

const RateConfiguration = () => {
  const [rates, setRates] = useState(mockDefaultRates);

  const handleRateChange = (service: string, value: string) => {
    setRates({
      ...rates,
      [service]: parseFloat(value) || 0
    });
  };

  const handleSaveRates = () => {
    toast.success("Service rates updated successfully");
  };

  const serviceConfig = [
    {
      key: 'telephony',
      label: 'Telephony',
      description: 'Cost per minute for phone calls',
      icon: <Phone className="h-5 w-5" />,
      unit: 'per minute'
    },
    {
      key: 'transcription',
      label: 'Transcription',
      description: 'Cost per minute for call transcription',
      icon: <FileText className="h-5 w-5" />,
      unit: 'per minute'
    },
    {
      key: 'aiCoaching',
      label: 'AI Real-time Coaching',
      description: 'Cost per minute for AI coaching during calls',
      icon: <Brain className="h-5 w-5" />,
      unit: 'per minute'
    },
    {
      key: 'aiScoring',
      label: 'AI Call Scoring',
      description: 'Cost per minute for AI call analysis and scoring',
      icon: <BarChart3 className="h-5 w-5" />,
      unit: 'per minute'
    },
    {
      key: 'callBalance',
      label: 'Call Balance (Seat License)',
      description: 'Monthly seat license fee',
      icon: <DollarSign className="h-5 w-5" />,
      unit: 'per month'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Rate Configuration</CardTitle>
        <CardDescription>
          Configure the pricing rates for all services across the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {serviceConfig.map((service) => (
          <div key={service.key} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {service.icon}
              <div>
                <div className="font-medium">{service.label}</div>
                <div className="text-sm text-gray-600">{service.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">$</Label>
              <Input
                type="number"
                step="0.001"
                min="0"
                value={rates[service.key as keyof typeof rates]}
                onChange={(e) => handleRateChange(service.key, e.target.value)}
                className="w-24"
              />
              <span className="text-sm text-gray-500">{service.unit}</span>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button onClick={handleSaveRates}>Save Rate Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RateConfiguration;
