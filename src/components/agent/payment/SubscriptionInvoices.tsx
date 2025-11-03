import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionInvoices = () => {
  const { toast } = useToast();

  // Mock data - would come from Supabase agent_subscription_invoices
  const invoices = [
    {
      id: "inv_1",
      invoiceNumber: "INV-2025-001",
      amount: 199.0,
      platformFee: 99.0,
      callCredits: 100.0,
      status: "paid",
      billingPeriodStart: new Date(2025, 10, 1),
      billingPeriodEnd: new Date(2025, 10, 30),
      paidAt: new Date(2025, 10, 1),
    },
    {
      id: "inv_2",
      invoiceNumber: "INV-2025-002",
      amount: 99.0,
      platformFee: 99.0,
      callCredits: 0,
      status: "paid",
      billingPeriodStart: new Date(2025, 9, 1),
      billingPeriodEnd: new Date(2025, 9, 31),
      paidAt: new Date(2025, 9, 1),
    },
    {
      id: "inv_3",
      invoiceNumber: "INV-2025-003",
      amount: 149.0,
      platformFee: 49.0,
      callCredits: 100.0,
      status: "paid",
      billingPeriodStart: new Date(2025, 8, 15),
      billingPeriodEnd: new Date(2025, 8, 30),
      paidAt: new Date(2025, 8, 15),
    },
  ];

  const handleDownload = (invoiceNumber: string) => {
    toast({
      title: "Downloading Invoice",
      description: `${invoiceNumber} is being prepared...`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return (
      <Badge variant={variants[status] || "secondary"} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Invoice History</h3>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Billing Period</TableHead>
                <TableHead>Breakdown</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.paidAt?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {invoice.billingPeriodStart.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {invoice.billingPeriodEnd.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Platform Fee:</span>
                        <span>${invoice.platformFee.toFixed(2)}</span>
                      </div>
                      {invoice.callCredits > 0 && (
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Call Credits:</span>
                          <span>${invoice.callCredits.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(invoice.invoiceNumber)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionInvoices;
