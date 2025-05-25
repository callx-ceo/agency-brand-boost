
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, TrendingDown } from "lucide-react";

interface WalletPanelProps {
  balance: number;
  estimatedSpend: number;
}

const WalletPanel = ({ balance, estimatedSpend }: WalletPanelProps) => {
  const aiToolSpend = 128.12;
  const totalSpend = estimatedSpend + aiToolSpend;
  const isLowBalance = balance < 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Wallet & Spending
          {isLowBalance && (
            <Badge variant="destructive">Low Balance</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Balance */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">
            ${balance.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Current Balance</div>
        </div>

        {/* Spend Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Call Spend (MTD)</span>
            <span className="font-medium">${estimatedSpend.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">AI Tools (MTD)</span>
            <span className="font-medium">${aiToolSpend.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between items-center font-semibold">
            <span>Total Spend (MTD)</span>
            <span>${totalSpend.toLocaleString()}</span>
          </div>
        </div>

        {/* Projected Days Remaining */}
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-800">
              ~{Math.round(balance / (totalSpend / 30))} days remaining at current rate
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Top Up Wallet
          </Button>
          <Button variant="outline" size="sm">
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletPanel;
