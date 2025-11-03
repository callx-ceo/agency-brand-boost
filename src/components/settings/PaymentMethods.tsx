
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockPaymentMethods = [
  {
    id: "pm_xyz789",
    type: "card",
    isDefault: true,
    card: { brand: "visa", last4: "1234", exp_month: 8, exp_year: 2024 }
  },
  {
    id: "pm_abc123",
    type: "card",
    isDefault: false,
    card: { brand: "mastercard", last4: "5678", exp_month: 12, exp_year: 2025 }
  }
];

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <Button>Add New Payment Method</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPaymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-muted h-12 w-16 rounded flex items-center justify-center capitalize">
                    {method.card.brand}
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {method.card.brand} **** {method.card.last4}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {method.card.exp_month}/{method.card.exp_year}
                    </div>
                    {method.isDefault && (
                      <Badge variant="default" className="mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button size="sm" variant="outline">Set Default</Button>
                  )}
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
