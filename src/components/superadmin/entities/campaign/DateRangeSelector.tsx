
import React from "react";
import { Button } from "@/components/ui/button";

interface DateRangeSelectorProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const DateRangeSelector = ({ dateRange, onDateRangeChange }: DateRangeSelectorProps) => {
  const dateRangeOptions = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last Month", "This Month", "This Year"];

  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-600">
        May 25, 2025 - May 25, 2025
      </div>
      <div className="flex gap-2">
        {dateRangeOptions.map((option) => (
          <Button
            key={option}
            variant={dateRange === option ? "default" : "outline"}
            size="sm"
            onClick={() => onDateRangeChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateRangeSelector;
