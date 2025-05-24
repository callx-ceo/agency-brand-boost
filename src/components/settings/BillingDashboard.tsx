
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for billing overview
const mockBillingOverview = {
  currentBalance: 125.50,
  nextInvoiceDate: "2023-11-01",
  billingCycle: "1st - 30th of month",
  currentPlan: { name: "Premium Plan", price: 29, currency: "USD", userLimit: 20, currentUserCount: 14 },
  primaryPaymentMethod: { type: "card", last4: "1234", brand: "Visa", expiryMonth: "08", expiryYear: "2024", isAutoPayEnabled: true },
  usageSummary: { qualifiedCalls: 350, billableMinutes: 7800, aiUsageCost: 15.00 },
  wallet: { balance: 50.00, currency: "USD" }
};

const BillingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your current billing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${mockBillingOverview.currentBalance.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Next invoice on {mockBillingOverview.nextInvoiceDate}
            </p>
            <p className="text-sm text-gray-500">
              Billing cycle: {mockBillingOverview.billingCycle}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Pay Now</Button>
          </CardFooter>
        </Card>

        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold">
              {mockBillingOverview.currentPlan.name}
            </div>
            <p className="text-gray-500 mt-1">
              ${mockBillingOverview.currentPlan.price}/{mockBillingOverview.currentPlan.currency} monthly
            </p>
            <p className="text-sm mt-4">
              <span className="font-medium">{mockBillingOverview.currentPlan.currentUserCount}</span> of <span className="font-medium">{mockBillingOverview.currentPlan.userLimit}</span> users
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Change Plan</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Usage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Summary (Current Period)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">Qualified Calls</div>
              <div className="text-xl font-medium mt-1">{mockBillingOverview.usageSummary.qualifiedCalls}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">Billable Minutes</div>
              <div className="text-xl font-medium mt-1">{mockBillingOverview.usageSummary.billableMinutes}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">AI Usage Cost</div>
              <div className="text-xl font-medium mt-1">${mockBillingOverview.usageSummary.aiUsageCost.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Prepaid Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="text-2xl font-medium mt-1">
              ${mockBillingOverview.wallet.balance.toFixed(2)}
            </div>
          </div>
          <Button>Add Funds</Button>
        </CardContent>
      </Card>

      {/* Primary Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 h-12 w-16 rounded flex items-center justify-center">
              {mockBillingOverview.primaryPaymentMethod.brand}
            </div>
            <div>
              <div className="font-medium">
                {mockBillingOverview.primaryPaymentMethod.brand} **** {mockBillingOverview.primaryPaymentMethod.last4}
              </div>
              <div className="text-sm text-gray-500">
                Expires {mockBillingOverview.primaryPaymentMethod.expiryMonth}/{mockBillingOverview.primaryPaymentMethod.expiryYear}
              </div>
            </div>
          </div>
          <Button variant="outline">Manage Payment Methods</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingDashboard;
