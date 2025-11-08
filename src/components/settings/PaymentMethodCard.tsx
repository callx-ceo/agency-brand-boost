import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface PaymentMethodCardProps {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  brand,
  last4,
  expMonth,
  expYear,
  isDefault = false,
}) => {
  const brandColors: Record<string, string> = {
    visa: "bg-blue-600",
    mastercard: "bg-orange-600",
    amex: "bg-green-600",
    discover: "bg-purple-600",
  };

  const getBrandColor = (brand: string) => {
    return brandColors[brand.toLowerCase()] || "bg-gray-600";
  };

  return (
    <Card className="border-2">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${getBrandColor(brand)} h-12 w-16 rounded flex items-center justify-center`}>
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-medium capitalize flex items-center gap-2">
                {brand} •••• {last4}
                {isDefault && (
                  <Badge variant="default" className="ml-1">
                    Default
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Expires {expMonth.toString().padStart(2, '0')}/{expYear}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;
