import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingDashboard from "../settings/BillingDashboard";
import InvoiceList from "../settings/InvoiceList";
import PaymentMethods from "../settings/PaymentMethods";
import TransactionHistory from "../settings/TransactionHistory";
import CostBreakdownDashboard from "../settings/CostBreakdownDashboard";
import RateConfiguration from "../settings/RateConfiguration";
import ReportingTab from "../settings/ReportingTab";
import AgentSubscriptionDashboard from "./payment/AgentSubscriptionDashboard";

const AgentBillingTab = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6 flex-wrap">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="subscription">Subscription & Credits</TabsTrigger>
        <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
        <TabsTrigger value="reporting">Reporting</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="rate-config">Rate Config</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <BillingDashboard />
      </TabsContent>
      
      <TabsContent value="subscription">
        <AgentSubscriptionDashboard />
      </TabsContent>
      
      <TabsContent value="cost-breakdown">
        <CostBreakdownDashboard />
      </TabsContent>
      
      <TabsContent value="reporting">
        <ReportingTab />
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
      
      <TabsContent value="rate-config">
        <RateConfiguration />
      </TabsContent>
    </Tabs>
  );
};

export default AgentBillingTab;
