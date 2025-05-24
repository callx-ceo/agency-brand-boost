
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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

export default TransactionHistory;
