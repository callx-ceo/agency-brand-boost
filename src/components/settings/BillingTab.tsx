
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingDashboard from "./BillingDashboard";
import InvoiceList from "./InvoiceList";
import PaymentMethods from "./PaymentMethods";
import TransactionHistory from "./TransactionHistory";
import ServiceBillingSettings from "./ServiceBillingSettings";
import CallCreditsManagement from "./CallCreditsManagement";
import CostBreakdownDashboard from "./CostBreakdownDashboard";
import RateConfiguration from "./RateConfiguration";
import ReportingTab from "./ReportingTab";
import AgentSubscriptionDashboard from "../agent/payment/AgentSubscriptionDashboard";

interface BillingTabProps {
  onWhiteLabelChange?: (enabled: boolean) => void;
}

const BillingTab = ({ onWhiteLabelChange }: BillingTabProps) => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6 flex-wrap">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
        <TabsTrigger value="reporting">Reporting</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="agent-billing">Subscription & Credits</TabsTrigger>
        <TabsTrigger value="call-credits">Call Management</TabsTrigger>
        <TabsTrigger value="rate-config">Rate Config</TabsTrigger>
        <TabsTrigger value="settings">Service Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <BillingDashboard />
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
      
      <TabsContent value="agent-billing">
        <AgentSubscriptionDashboard />
      </TabsContent>
      
      <TabsContent value="call-credits">
        <CallCreditsManagement />
      </TabsContent>
      
      <TabsContent value="rate-config">
        <RateConfiguration />
      </TabsContent>
      
      <TabsContent value="settings">
        <ServiceBillingSettings onWhiteLabelChange={onWhiteLabelChange} />
      </TabsContent>
    </Tabs>
  );
};

export default BillingTab;
