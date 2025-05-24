
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingDashboard from "./BillingDashboard";
import InvoiceList from "./InvoiceList";
import PaymentMethods from "./PaymentMethods";
import TransactionHistory from "./TransactionHistory";
import EnhancedAgentBilling from "./EnhancedAgentBilling";
import ServiceBillingSettings from "./ServiceBillingSettings";
import CallCreditsManagement from "./CallCreditsManagement";

const BillingTab = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="agent-billing">Agent Billing</TabsTrigger>
        <TabsTrigger value="call-credits">Call Credits</TabsTrigger>
        <TabsTrigger value="settings">Service Settings</TabsTrigger>
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
      
      <TabsContent value="agent-billing">
        <EnhancedAgentBilling />
      </TabsContent>
      
      <TabsContent value="call-credits">
        <CallCreditsManagement />
      </TabsContent>
      
      <TabsContent value="settings">
        <ServiceBillingSettings />
      </TabsContent>
    </Tabs>
  );
};

export default BillingTab;
