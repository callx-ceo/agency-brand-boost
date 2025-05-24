
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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

export default InvoiceList;
