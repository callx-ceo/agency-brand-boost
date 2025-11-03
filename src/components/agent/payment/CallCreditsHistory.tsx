import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Phone, DollarSign, RefreshCw } from "lucide-react";

const CallCreditsHistory = () => {
  // Mock data - would come from Supabase call_credits_transactions
  const transactions = [
    {
      id: "1",
      type: "deposit",
      amount: 100.0,
      balanceAfter: 173.45,
      description: "Manual deposit",
      createdAt: new Date(2025, 10, 2),
    },
    {
      id: "2",
      type: "call_charge",
      amount: -2.35,
      balanceAfter: 73.45,
      description: "Call #12345 - 5 min",
      relatedCallId: "call-12345",
      createdAt: new Date(2025, 10, 1),
    },
    {
      id: "3",
      type: "call_charge",
      amount: -1.87,
      balanceAfter: 75.8,
      description: "Call #12344 - 4 min",
      relatedCallId: "call-12344",
      createdAt: new Date(2025, 10, 1),
    },
    {
      id: "4",
      type: "deposit",
      amount: 50.0,
      balanceAfter: 77.67,
      description: "Auto-refill",
      createdAt: new Date(2025, 9, 28),
    },
    {
      id: "5",
      type: "adjustment",
      amount: 5.0,
      balanceAfter: 27.67,
      description: "Promotional credit",
      createdAt: new Date(2025, 9, 25),
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case "call_charge":
        return <Phone className="h-4 w-4 text-blue-500" />;
      case "refund":
        return <ArrowUp className="h-4 w-4 text-yellow-500" />;
      case "adjustment":
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      deposit: "default",
      call_charge: "secondary",
      refund: "outline",
      adjustment: "outline",
    };
    return (
      <Badge variant={variants[type] || "secondary"} className="capitalize">
        {type.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Balance After</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(transaction.type)}
                    {getTransactionBadge(transaction.type)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    {transaction.relatedCallId && (
                      <p className="text-xs text-muted-foreground">ID: {transaction.relatedCallId}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${transaction.balanceAfter.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CallCreditsHistory;
