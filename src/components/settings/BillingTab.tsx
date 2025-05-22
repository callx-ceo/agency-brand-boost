
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock data for demo purposes
const mockBillingOverview = {
  currentBalance: 125.50,
  nextInvoiceDate: "2023-11-01",
  billingCycle: "1st - 30th of month",
  currentPlan: { name: "Premium Plan", price: 29, currency: "USD", userLimit: 20, currentUserCount: 14 },
  primaryPaymentMethod: { type: "card", last4: "1234", brand: "Visa", expiryMonth: "08", expiryYear: "2024", isAutoPayEnabled: true },
  usageSummary: { qualifiedCalls: 350, billableMinutes: 7800, aiUsageCost: 15.00 },
  wallet: { balance: 50.00, currency: "USD" }
};

const mockInvoices = [
  {
    id: "inv_abc123",
    invoiceNumber: "INV-00123",
    issueDate: "2023-10-01",
    dueDate: "2023-10-15",
    totalAmount: 125.50,
    currency: "USD",
    status: "Paid"
  },
  {
    id: "inv_def456",
    invoiceNumber: "INV-00124",
    issueDate: "2023-10-15",
    dueDate: "2023-10-29",
    totalAmount: 89.75,
    currency: "USD",
    status: "Unpaid"
  },
  {
    id: "inv_ghi789",
    invoiceNumber: "INV-00125",
    issueDate: "2023-09-01",
    dueDate: "2023-09-15",
    totalAmount: 103.25,
    currency: "USD",
    status: "Paid"
  }
];

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

const mockTransactions = [
  {
    id: "txn_qrs456",
    date: "2023-10-05T10:30:00Z",
    description: "Payment for Invoice #INV-00123",
    amount: -85.50,
    currency: "USD",
    type: "Payment",
    status: "Completed"
  },
  {
    id: "txn_tuv789",
    date: "2023-10-02T14:15:00Z",
    description: "Wallet Top-up",
    amount: 100.00,
    currency: "USD",
    type: "WalletTopUp",
    status: "Completed"
  }
];

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

const InvoiceList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Invoices</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search invoices..." />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.issueDate}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                  invoice.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="sm">View</Button>
                <Button variant="ghost" size="sm">Download</Button>
                {invoice.status === 'Unpaid' && (
                  <Button size="sm">Pay</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">Showing 1 to 3 of 3 entries</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

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
                  <div className="bg-gray-100 h-12 w-16 rounded flex items-center justify-center capitalize">
                    {method.card.brand}
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {method.card.brand} **** {method.card.last4}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires {method.card.exp_month}/{method.card.exp_year}
                    </div>
                    {method.isDefault && (
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mt-1 inline-block">
                        Default
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button size="sm" variant="outline">Set Default</Button>
                  )}
                  <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
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

const TransactionHistory = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search transactions..." />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">Showing 1 to 2 of 2 entries</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

const BillingTab = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <BillingDashboard />
      </TabsContent>
      
      <TabsContent value="invoices">
        <InvoiceList />
      </TabsContent>
      
      <TabsContent value="payment-methods">
        <PaymentMethods />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionHistory />
      </TabsContent>
    </Tabs>
  );
};

export default BillingTab;
