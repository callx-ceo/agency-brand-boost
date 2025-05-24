
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuickActions = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button variant="outline" onClick={() => copyToClipboard("invoice-123456")}>
          Download Latest Invoice
        </Button>
        <Button variant="outline">Update Payment Method</Button>
        <Button variant="outline">View Usage Details</Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
