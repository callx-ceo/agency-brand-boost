
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface BillingPeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const BillingPeriodSelector = ({ selectedPeriod, onPeriodChange }: BillingPeriodSelectorProps) => {
  const predefinedPeriods = [
    { value: "current", label: "Current Month (December 2024)" },
    { value: "last-month", label: "Last Month (November 2024)" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "ytd", label: "Year to Date (2024)" },
    { value: "custom", label: "Custom Range" }
  ];

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-medium">Billing Period:</span>
      </div>
      
      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-64">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {predefinedPeriods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedPeriod === "custom" && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Select Date Range
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillingPeriodSelector;
