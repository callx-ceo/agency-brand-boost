import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentMethodsManager = () => {
  const { toast } = useToast();

  // Mock data - would come from Supabase agent_payment_methods
  const paymentMethods = [
    {
      id: "pm_1",
      cardBrand: "visa",
      cardLast4: "4242",
      expMonth: 12,
      expYear: 2026,
      isDefault: true,
    },
    {
      id: "pm_2",
      cardBrand: "mastercard",
      cardLast4: "5555",
      expMonth: 8,
      expYear: 2025,
      isDefault: false,
    },
  ];

  const handleSetDefault = (id: string) => {
    toast({
      title: "Default Payment Method Updated",
      description: "This card will be used for future charges.",
    });
  };

  const handleRemove = (id: string) => {
    toast({
      title: "Payment Method Removed",
      description: "The card has been removed from your account.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    toast({
      title: "Add Payment Method",
      description: "Opening Stripe payment form...",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {method.cardBrand} •••• {method.cardLast4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="default" className="ml-2">
                      Default
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                      className="flex-1"
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(method.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
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

export default PaymentMethodsManager;
